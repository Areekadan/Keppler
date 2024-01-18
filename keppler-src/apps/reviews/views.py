from django.contrib.auth import get_user_model
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from apps.products.models import Product
from .models import Review

User = get_user_model


class CreateProductReview(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, product_id):
        product = Product.objects.get(id=product_id)
        data = request.data

        if product.user.pkid == request.user.pkid:
            return Response(
                {"message": "You cannot review your own product."},
                status=status.HTTP_403_FORBIDDEN,
            )

        alreadyExists = Review.objects.filter(
            reviewer=request.user, product=product
        ).exists()

        if alreadyExists:
            return Response(
                {"detail": "You have already left a review on this product."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        elif data["rating"] == 0:
            return Response(
                {"detail": "Please select a rating."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        else:
            review = Review.objects.create(
                reviewer=request.user,
                product=product,
                rating=data["rating"],
                comment=data["comment"],
                photo=data.get("photo", None),
            )
            product.update_rating_and_review_count()
            return Response("Review Added")
