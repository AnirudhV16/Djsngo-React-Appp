from .models import CartItem,Cart
from rest_framework import serializers
from menu.serializers import MenuItemSerializer

    
class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model=Cart
        fields="__all__"

class CartItemSerializer(serializers.ModelSerializer):
    item = MenuItemSerializer()
    class Meta:
        model = CartItem
        fields = "__all__"  # Includes all fields in the model
