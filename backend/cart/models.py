from django.db import models
from user.models import CustomUser
from menu.models import MenuItem

class Cart(models.Model):
    user=models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    items=models.ManyToManyField(MenuItem, through='CartItem')
class CartItem(models.Model):
    cart=models.ForeignKey(Cart, on_delete=models.CASCADE)
    item=models.ForeignKey(MenuItem, on_delete=models.CASCADE)
    quantity=models.PositiveIntegerField()