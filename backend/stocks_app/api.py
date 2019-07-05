from .models import Stock
from rest_framework import viewsets, permissions
from rest_framework.decorators import action, detail_route, list_route
from rest_framework.response import Response
from .serializers import StockSerializer
import requests

#User Viewset
class StockViewSet(viewsets.ModelViewSet):
    queryset = Stock.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = StockSerializer

    def callStockAPI(self, symbol):
        url = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol={}&apikey=YD43NGRDHKUNLAFD'.format(symbol)
        r = requests.get(url)
        return r.json()

    @list_route(methods=['get'])
    def fetch_stock(self, request):
        url = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol={}&apikey=YD43NGRDHKUNLAFD'.format(request.query_params['symbol'])
        r = requests.get(url)
        return Response(r.json()['Global Quote'])

    @list_route(methods=['get'])
    def update_stocks(self, request):
        arr= []
        for stock in Stock.objects.all():
            stockResults = self.callStockAPI(stock.stockSymbol)
            stock.currentPrice = stockResults["Global Quote"]["05. price"]
            stock.save(update_fields=['currentPrice'])
        return Response({'stocks':'stocks updated'})
        