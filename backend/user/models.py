# your_app/models.py

from django.contrib.auth.models import AbstractUser
from django.db import models

class Image(models.Model):
    image = models.ImageField(upload_to='media/profile_images/', blank=True)

    def __str__(self):
        return f"Image {self.id}"

class CustomUser(AbstractUser):
    image = models.ForeignKey('Image', on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.username
