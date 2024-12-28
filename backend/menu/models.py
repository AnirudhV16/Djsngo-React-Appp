from django.db import models

class category(models.Model):
    CATEGORY_CHOICES = [
        ("starters", "Starters"),
        ("main_course", "Main Course"),
        ("desserts", "Desserts"),
        ("beverages", "Beverages"),
    ]
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    def __str__(self):
        return self.category

class MenuItem(models.Model):
    """
    Represents an individual item on the menu.
    """
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category=models.ForeignKey(category, on_delete=models.CASCADE)
    is_available = models.BooleanField(default=True)
    image = models.ImageField(upload_to="media/menu_images/", blank=True, null=True)  # New image field

    def __str__(self):
        return self.name
