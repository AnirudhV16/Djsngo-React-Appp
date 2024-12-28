from django.urls import path
from .views import CreateUserView,ProfImageListView
'''@csrf_exempt
class CreateUserView(generics.CreateAPIView):
    queryset=CustomUser.objects.all()
    serializer_class=UserSerializer
    permission_classes=[AllowAny]

@csrf_exempt
class ProfImageListView(generics.ListAPIView):
    queryset = Image.objects.all()  # Corrected property name
    serializer_class = ImageSerializer
    permission_classes = [AllowAny]
    path('register/',CreateUserView.as_view(),name="register"),
    path('profimages/',ProfImageListView.as_view(),name="profimgs"),'''
urlpatterns=[
    path('register/',CreateUserView.as_view(),name="register"),
    path('profimages/',ProfImageListView.as_view(),name="profimgs"),
]
