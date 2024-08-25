from rest_framework import serializers
from .models import UserBalance , GameResult

class UserBalanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserBalance
        fields = ['balance']


class GameResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameResult
        fields = ['bet_amount','chosen_side','result','won','timestamp']




