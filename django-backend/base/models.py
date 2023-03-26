from django.db import models
from django.contrib.auth.models import User
from djmoney.models.fields import MoneyField
from django.contrib.postgres.fields import ArrayField

class Note(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    body = models.TextField()

class Store_Items(models.Model):
    title = models.CharField(max_length=64)
    sku_num = models.IntegerField()
    description = models.CharField(max_length=256)
    price = MoneyField(max_digits=14, decimal_places=2, default_currency='NZD')
    stock_quant = models.IntegerField()
    category = models.CharField(max_length=64)
    img_url = models.CharField(max_length=256)

class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    item = models.ForeignKey(Store_Items, related_name='item', on_delete=models.CASCADE, null=True)
    qty = models.IntegerField()