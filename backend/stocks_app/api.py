from .models import Stock
from rest_framework import viewsets, permissions
from rest_framework.decorators import action, detail_route, list_route
from rest_framework.response import Response
from .serializers import StockSerializer

#User Viewset
class StockViewSet(viewsets.ModelViewSet):
    queryset = Stock.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = StockSerializer

    @list_route(methods=['get'])
    def fetch_stock(self, request):
        key = 'YD43NGRDHKUNLAFD'
        url = 'https://www.alphavantage.co/query'
        params = 'function=GLOBAL_QUOTE&symbol=MSFT&apikey='
        print('This will be stock data')
        return Response({'status':'stock search endpoint'})