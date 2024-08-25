from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class UserBalance(models.Model):
    user= models.OneToOneField(User, on_delete=models.CASCADE)
    balance= models.DecimalField(max_digits=18 , decimal_places=9)



class GameResult(models.Model):
    user = models.ForeignKey(User , on_delete=models.CASCADE)
    bet_amount=models.DecimalField(max_digits=18 , decimal_places=9)
    chosen_side=models.CharField(max_length=10)
    result = models.CharField(max_length=5)
    won = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True)









