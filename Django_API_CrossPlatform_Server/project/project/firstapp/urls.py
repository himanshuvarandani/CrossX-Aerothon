
from django.urls import path
from .views import index,run_server,main,download_file

urlpatterns = [
    path('backend_request', index),
    path('Run_Server', run_server),
    path('download_file', download_file),
    path('', main),
]