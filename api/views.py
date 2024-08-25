from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from .models import UserBalance, GameResult
from django.contrib.auth.models import User
from decimal import Decimal

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_balance(request):
    try:
        balance, created = UserBalance.objects.get_or_create(user=request.user, defaults={'balance': Decimal('0')})
        return Response({'balance': str(balance.balance)}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def flip_coin(request):
    bet_amount = request.data.get('bet_amount')
    chosen_side = request.data.get('chosen_side')

    if not bet_amount or not chosen_side:
        return Response({'error': 'Bet amount and chosen side are required'}, status=status.HTTP_400_BAD_REQUEST)

    # Convert bet_amount to Decimal
    try:
        bet_amount = Decimal(bet_amount)
    except:
        return Response({'error': 'Invalid bet amount'}, status=status.HTTP_400_BAD_REQUEST)

    # Simplified coin flip logic
    import random
    result = random.choice(['heads', 'tails'])
    won = result == chosen_side

    try:
        balance = UserBalance.objects.get(user=request.user)
        if won:
            balance.balance += bet_amount
        else:
            if balance.balance < bet_amount:
                return Response({'error': 'Insufficient balance'}, status=status.HTTP_400_BAD_REQUEST)
            balance.balance -= bet_amount 
        balance.save()

        GameResult.objects.create(
            user=request.user,
            bet_amount=bet_amount,
            chosen_side=chosen_side,
            result=result,
            won=won
        )

        return Response({
            'result': result,
            'won': won,
            'balance': str(balance.balance)
        }, status=status.HTTP_200_OK)
    except UserBalance.DoesNotExist:
        return Response({'error': 'Balance not found'}, status=status.HTTP_404_NOT_FOUND)


from django.shortcuts import render

def index(request):
    return render(request, 'index.html')
