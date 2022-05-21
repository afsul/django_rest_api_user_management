from django.contrib import admin
from django.urls import path
from django.urls import path, include
from rest_framework import routers
from api.views import CRUDByAdmin

router = routers.DefaultRouter()
router.register(r'admin_home', CRUDByAdmin, 'admin_home')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include("api.urls")),
    path('', include((router.urls, 'api')))
]   