from rest_framework.response import Response
from rest_framework import viewsets
from .models import sqlconnect
from .serializers import SqlConnectSerializer
from rest_framework.decorators import action
from rest_framework.renderers import JSONRenderer
import pyodbc
from . import settings

conn = pyodbc.connect(settings.CONNECTION_STRING)

class SqlConnectListAPIView(viewsets.ModelViewSet):
    queryset = sqlconnect.objects.all()
    serializer_class = SqlConnectSerializer

    @action(detail=False, methods=['get'])
    def list_all(self, request):
        cursor = conn.cursor()
        cursor.execute("select * from Employee")
        result = cursor.fetchall()
        serializer = SqlConnectSerializer(result, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def retrieve_one(self, request, pk=None):
        cursor = conn.cursor()
        cursor.execute("select * from Employee where ID=?", (pk,))
        result = cursor.fetchall()
        serializer = SqlConnectSerializer(result, many=True)
        return Response(serializer.data)

