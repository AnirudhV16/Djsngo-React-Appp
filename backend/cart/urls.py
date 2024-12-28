from django.urls import path
from .views import CartHandlerView,CartItemsHandlerView,CartItemsListView

urlpatterns=[
    path('cart/create/',CartHandlerView().as_view(),name="cartcreat"),
    path('cart/item/add/',CartItemsHandlerView().as_view(),name="cartitemsadd"),
    path('cart/list/',CartItemsListView.as_view(),name="cartitemslist"),
]