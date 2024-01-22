from django.urls import path

from .views import CreateSellerRating

urlpatterns = [
    path("<str:profile_id>/", CreateSellerRating.as_view(), name="create-seller-review")
]
