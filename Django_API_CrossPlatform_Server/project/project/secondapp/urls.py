
from django.urls import path
try:
    from .views import index1
    urlpatterns = [
    path('demo/', index1),]
except BaseException as ex:
    from .demo_backup import index2
    urlpatterns = [
    path('demo/', index2),]


