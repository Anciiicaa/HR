# hr/serializers.py

from rest_framework import serializers
from .models import sqlconnect

class SqlConnectSerializer(serializers.ModelSerializer):
    class Meta:
        model = sqlconnect
        fields = '__all__'
