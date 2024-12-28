from .models import CustomUser, Image
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model= CustomUser
        fields=["id","username","password","image"]
        extra_kwargs={"passsword":{"write_only":True}}
    
    def create(self, validated_data):
        user=CustomUser.objects.create_user(**validated_data)
        return user

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model= Image
        fields="__all__"
