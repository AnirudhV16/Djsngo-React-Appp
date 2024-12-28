from django.db import models
from user.models import CustomUser
from menu.models import MenuItem

class Order(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    items = models.ManyToManyField(MenuItem, through='OrderItem')
    '''status = models.CharField(
        max_length=20,
        choices=[('Placed', 'Placed'), ('Prepared', 'Prepared'), ('Delivered', 'Delivered')],
        default='Placed'
    )'''
    total_price = models.DecimalField(max_digits=10, decimal_places=2,default=0)
    created_at = models.DateTimeField(auto_now_add=True)

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    item = models.ForeignKey(MenuItem, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
