from django.urls import re_path
from products import views

urlpatterns = [
    re_path(r'^api/v0/products', views.products_list),
    re_path(r'^', views.hello_world),
]