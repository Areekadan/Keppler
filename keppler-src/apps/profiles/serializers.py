from django_countries.serializer_fields import CountryField
from rest_framework import serializers

from apps.ratings.serializers import RatingSerializer

from .models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username")
    first_name = serializers.CharField(source="user.first_name")
    last_name = serializers.CharField(source="user.last_name")
    profile_photo = serializers.SerializerMethodField()
    email = serializers.EmailField(source="user.email")
    full_name = serializers.SerializerMethodField(read_only=True)
    country = CountryField(name_only=True)
    reviews = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Profile
        fields = [
            "username",
            "first_name",
            "last_name",
            "full_name",
            "email",
            "id",
            "phone_number",
            "profile_photo",
            "about_me",
            "license",
            "gender",
            "country",
            "city",
            "is_customer",
            "is_seller",
            "rating",
            "num_reviews",
            "reviews",
        ]

    def get_full_name(self, obj):
        return f"{obj.user.first_name.title()} {obj.user.last_name.title()}"

    def get_reviews(self, obj):
        reviews = obj.seller_review.all()
        serializer = RatingSerializer(reviews, many=True)
        return serializer.data

    def get_profile_photo(self, obj):
        return obj.profile_photo.url

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if instance.top_sellers:
            representation["top_sellers"] = True
        return representation


class UpdateProfileSerializer(serializers.ModelSerializer):
    country = CountryField(name_only=True)

    class Meta:
        model = Profile
        fields = [
            "phone_number",
            "profile_photo",
            "about_me",
            "license",
            "gender",
            "country",
            "city",
            "is_customer",
            "is_seller",
        ]

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if instance.top_sellers:
            representation["top_sellers"] = True
        return representation
