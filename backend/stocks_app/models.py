from django.db import models

class Stock(models.Model):
    firstName = models.CharField(max_length=50)
    lastName = models.CharField(max_length=50)
    userName = models.CharField(max_length=50)
    password = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    stockSymbol = models.CharField(max_length=10, blank=False)
    #purchasePrice = models.DecimalField(10,2)
    #currentPrice = models.DecimalField(10,2)
    purchased_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
