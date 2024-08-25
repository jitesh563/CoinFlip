from django.urls import path
from .views import get_balance, flip_coin
from .views import index

urlpatterns = [
    path('', index, name='index'),
    path('get_balance/', get_balance, name='get_balance'),
    path('flip_coin/', flip_coin, name='flip_coin'),
]
