from django.urls import path

from .views import (GetProfileAPIView, SellerListAPIView,
                    TopSellersListAPIView, UpdateProfileAPIView)

urlpatterns = [
    path("me/", GetProfileAPIView.as_view(), name="get_profile"),
    path(
        "update/<str:username>/", UpdateProfileAPIView.as_view(), name="update_profile"
    ),
    path("sellers/all/", SellerListAPIView.as_view(), name="all-sellers"),
    path("top-sellers/all/", TopSellersListAPIView.as_view(), name="top-sellers"),
]
