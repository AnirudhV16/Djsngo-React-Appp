from django.shortcuts import render
from rest_framework.views import APIView
from .models import Cart,CartItem
from .serializers import CartItemSerializer,CartSerializer
from menu.models import MenuItem
from menu.serializers import MenuItemSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated

# Create your views here.
class CartHandlerView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self,request,*args,**kwargs):
        cart,created=Cart.objects.get_or_create(user=request.user)
        serializer=CartSerializer(cart)
        # the created is a boolean that helps in the understanding of the cart creation
        # retreival happend? if the cart is present for the user the it retreives the cart
        # related to the user else the new cart item is created related to the user that is
        # requesting....
        if created:
            message = "A new cart has been created for the user."
        else:
            message = "User's cart retrieved."
        return Response(
            {"cart": serializer.data, "message": message},
            status=status.HTTP_200_OK
        )
    # this post method returns the cart details to the user requested either by 
    # newly creatibg it or by retreiving the existing one....
class CartItemsHandlerView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self,request,*args,**kwargs):
        cart,created=Cart.objects.get_or_create(user=request.user)
        item_id=request.data.get("item_id")
        quantity=request.data.get("quantity")
        try:
            item=MenuItem.objects.get(id=item_id)
        except MenuItem.DoesNotExist:
            return Response({"message":"its an error adding item to cart...."},status=status.HTTP_404_NOT_FOUND)
        
        cart_item,created=CartItem.objects.get_or_create(cart=cart,item=item,defaults={"quantity": quantity})
        if created:
            cart_item.quantity=quantity
            cart_item.save()
            return Response({"message":"the cartitem is created"},status=status.HTTP_200_OK)
        else:
            cart_item.quantity+=quantity
            cart_item.save()
            return Response({"message":"the cartitem is updated"},status=status.HTTP_200_OK)

class CartItemsListView(ListAPIView):
    permission_classes = [IsAuthenticated] 
    serializer_class = CartItemSerializer

    def get_queryset(self):
        # Retrieve the cart for the current user
        try:
            cart = Cart.objects.get(user=self.request.user)
            #items=cart.items.all()
            return CartItem.objects.filter(cart_id=cart.id)
        except Cart.DoesNotExist:
            return CartItem.objects.none()  # Return an empty queryset if no cart exists
