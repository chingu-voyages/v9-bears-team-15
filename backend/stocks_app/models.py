from django.db import models

class Stock(models.Model):
    stockSymbol = models.CharField(max_length=10)
    purchasePrice = models.DecimalField(max_digits=10,decimal_places=2)
    currentPrice = models.DecimalField(max_digits=10,decimal_places=2)
    purchased_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
