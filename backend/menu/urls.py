from django.urls import path
from .import views

urlpatterns = [
    
    #these two are the admin accessable api end points to add a new category or the
    #new item to the menu....
    path('category/',views.CategoryView.as_view(),name="categoryadd"),
    path('menuitem/',views.MenuItemView.as_view(),name="menuitemadd"),
]
