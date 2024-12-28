from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from .models import CustomUser,Image
from rest_framework import generics
from rest_framework.views import APIView
from .serializers import UserSerializer,ImageSerializer
from rest_framework.permissions import IsAuthenticated ,AllowAny
from rest_framework.response import Response
from rest_framework import status


class CreateUserView(generics.CreateAPIView):
    query_set=CustomUser.objects.all()
    serializer_class=UserSerializer
    permission_classes=[AllowAny]
class UserDetailView(APIView):
    serializer_class=UserSerializer
    permission_classes=[IsAuthenticated]
    def get(self, request, *args, **kwargs):
        user = request.user  # Get the authenticated user
        serializer = self.serializer_class(user)  # Serialize the user object
        return Response(serializer.data)  # Return the serialized data

class ProfImageListView(generics.ListAPIView):
    queryset = Image.objects.all()  # Corrected property name
    serializer_class = ImageSerializer
    permission_classes = [AllowAny]

class ProfImageView(APIView):
    serializer_class = ImageSerializer
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        image_id = request.query_params.get("image_id")
        if not image_id:
            return Response({"error": "image_id is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            image = Image.objects.get(id=image_id)
        except Image.DoesNotExist:
            return Response({"error": "Image not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.serializer_class(image)
        return Response(serializer.data, status=status.HTTP_200_OK)



