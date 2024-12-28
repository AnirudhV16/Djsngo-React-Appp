from rest_framework import serializers
from .models import MenuItem,category

class categoryserializer(serializers.ModelSerializer):
    class Meta:
        model=category
        fields="__all__"
class MenuItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuItem
        fields = "__all__"  # Includes all fields in the model
