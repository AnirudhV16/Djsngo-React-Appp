from django.shortcuts import render
from rest_framework.views import APIView
from .models import Order,OrderItem
from .serializers import OrderItemSerializer
from menu.models import MenuItem
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated

# Create your views here.
class OrderView(APIView):
    permission_classes=[IsAuthenticated]
    def post(self,request,*args,**kwargs):
        order=Order.objects.create(user=request.user)
        quantity=request.data.get("quantity")
        item_id=request.data.get("item_id")
        try:
            item = MenuItem.objects.get(id=item_id)
        except MenuItem.DoesNotExist:
            return Response({"error": "MenuItem not found"}, status=status.HTTP_404_NOT_FOUND)
        order_item = OrderItem.objects.create(order=order, item=item, quantity=quantity)
        # Update the total price of the order
        order.total_price += item.price * quantity
        order.save()
        return Response({"message":"ordercreated"},status=status.HTTP_201_CREATED)
class OrderItemsListView(ListAPIView):
    permission_classes = [IsAuthenticated] 
    serializer_class = OrderItemSerializer

    def get_queryset(self):
        # Get all orders for the current user
        user_orders = Order.objects.filter(user=self.request.user)
        if not user_orders.exists():
            return OrderItem.objects.none()

        # Get all OrderItems across all the user's orders
        return OrderItem.objects.filter(order__in=user_orders)
