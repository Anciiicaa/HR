"""hr URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from rest_framework.routers import DefaultRouter
from . import views
router = DefaultRouter()
router.register(r'sqlconnect', views.SqlConnectListAPIView, basename='sqlconnect')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('sqlconnect/', views.SqlConnectListAPIView.as_view({'get': 'list_all'}), name='sqlconnect-list-all'),
    path('sqlconnect/<int:pk>/', views.SqlConnectListAPIView.as_view({'get': 'retrieve_one'}), name='sqlconnect-retrieve-one'),
    #path('sqlconnect/', views.SqlConnectListAPIView.as_view({'post': 'list_alll'}), name='sqlconnect-list-alll'),
]
urlpatterns += router.urls
