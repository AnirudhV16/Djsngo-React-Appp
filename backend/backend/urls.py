from django.contrib import admin
from django.urls import path, include
from user.views import ProfImageView,UserDetailView
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView
from menu import views
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls),
    #path('/',HomeView,name='home'),
    path('category/list/',views.CategoryListView.as_view(),name="categorylist"),
    path('menu/',views.MenuItemListView.as_view(),name="menu"),
    path('user/token/',TokenObtainPairView.as_view(),name='get_token'),
    path('user/token/refresh/',TokenRefreshView.as_view(),name='refresh'),
    path('user/details/',UserDetailView.as_view(),name="details"),
    path('api-auth',include("rest_framework.urls")),
    path('user/',include('menu.urls')),
    path('user/',include('cart.urls')),
    path('user/',include('order.urls')),
    path('user/',include('user.urls')),
    path('pic/',ProfImageView.as_view(),name="profimg"),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)