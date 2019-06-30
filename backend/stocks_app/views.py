from django.shortcuts import render

# Create your views here.
def fetchStock(request):
    key = 'YD43NGRDHKUNLAFD'
    url = 'https://www.alphavantage.co/query'
    params = 'function=GLOBAL_QUOTE&symbol=MSFT&apikey='
    return render(request, 'This will be stock data')