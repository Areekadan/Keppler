from django.urls import path

from .views import CreateProductReview

urlpatterns = [
    path(
        "<str:product_id>/", CreateProductReview.as_view(), name="create-product-review"
    )
]
