from django.contrib import admin
from django.urls import path, include
from rest_framework.authtoken import views as auth_views
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('api-token-auth/', auth_views.obtain_auth_token),  # Add this li
]