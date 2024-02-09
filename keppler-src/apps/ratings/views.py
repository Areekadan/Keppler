from django.contrib.auth import get_user_model
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.profiles.models import Profile

from .models import Rating

User = get_user_model()


class CreateSellerRating(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, profile_id):
        seller_profile = Profile.objects.get(id=profile_id, is_seller=True)
        data = request.data

        profile_user = User.objects.get(pkid=seller_profile.user.pkid)
        if profile_user.email == request.user.email:
            return Response(
                {"message": "You cannot rate your own profile."},
                status=status.HTTP_403_FORBIDDEN,
            )

        alreadyExists = Rating.objects.filter(
            reviewer=request.user, seller=seller_profile
        ).exists()

        if alreadyExists:
            return Response(
                {"detail": "You have already left a review on this profile."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        elif data["rating"] == 0:
            return Response(
                {"detail": "Please select a rating."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        else:
            rating = Rating.objects.create(
                reviewer=request.user,
                seller=seller_profile,
                rating=data["rating"],
                comment=data["comment"],
            )
            ratings = seller_profile.seller_review.all()
            seller_profile.num_reviews = len(ratings)

            total = 0
            for i in ratings:
                total += i.rating

            seller_profile.rating = round(total / len(ratings), 2)
            return Response("Review Added")
