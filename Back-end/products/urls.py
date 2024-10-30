from django.urls import path
from .views import ProductListCreate

urlpatterns = [
    path("products/", ProductListCreate.as_view(), name="product_list_create"),
]
