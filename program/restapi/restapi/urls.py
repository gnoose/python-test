from django.contrib import admin
from django.urls import re_path, path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    re_path(r'^', include('products.urls')),
]
