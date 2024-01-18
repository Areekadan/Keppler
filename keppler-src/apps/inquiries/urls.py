from django.urls import path
from .views import SendInquiry

urlpatterns = [path("", SendInquiry.as_view(), name="send-inquiry")]
