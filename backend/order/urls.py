from django.urls import path
from .views import OrderView,OrderItemsListView

urlpatterns=[
    path('order/item/add/',OrderView.as_view(),name="orderitem"),
    path('order/item/list/',OrderItemsListView.as_view(),name="orderlist"),
]