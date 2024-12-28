from django.shortcuts import render
from rest_framework.permissions import IsAdminUser,AllowAny
from rest_framework.generics import CreateAPIView,ListAPIView
from .models import category,MenuItem
from .serializers import categoryserializer,MenuItemSerializer
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
@method_decorator(csrf_exempt, name='dispatch')
class CategoryView(CreateAPIView):
    queryset = category.objects.all()
    serializer_class = categoryserializer
    permission_classes = [IsAdminUser]

@method_decorator(csrf_exempt, name='dispatch')
class MenuItemView(CreateAPIView):
    queryset = MenuItem.objects.all()
    serializer_class = MenuItemSerializer
    permission_classes = [IsAdminUser]


@method_decorator(csrf_exempt, name='dispatch')
class CategoryListView(ListAPIView):
    queryset = category.objects.all()
    serializer_class = categoryserializer
    permission_classes = [AllowAny]

@method_decorator(csrf_exempt, name='dispatch')
class MenuItemListView(ListAPIView):
    serializer_class = MenuItemSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = MenuItem.objects.all()
        category_id = self.request.query_params.get("category_id")  # Use query parameters
        if category_id:
            queryset = queryset.filter(category_id=category_id)  # Filter by category_id
        return queryset


