from django_countries.serializer_fields import CountryField
from django_countries.serializers import CountryFieldMixin
from rest_framework import serializers

from apps.reviews.serializers import ReviewSerializer

from .models import Product, ProductViews


class ProductSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    country = CountryField(name_only=True)
    reviews = serializers.SerializerMethodField(read_only=True)
    profile_photo = serializers.SerializerMethodField()
    cover_photo = serializers.SerializerMethodField()
    photo1 = serializers.SerializerMethodField()
    photo2 = serializers.SerializerMethodField()
    photo3 = serializers.SerializerMethodField()
    photo4 = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            "id",
            "user",
            "title",
            "slug",
            "ref_code",
            "description",
            "country",
            "city",
            "postal_code",
            "street_address",
            "price",
            "quantity",
            "tax",
            "profile_photo",
            "cover_photo",
            "photo1",
            "photo2",
            "photo3",
            "photo4",
            "advert_type",
            "product_type",
            "product_status",
            "length",
            "width",
            "height",
            "weight",
            "average_rating",
            "review_count",
            "reviews",
            "published_status",
            "views",
            "final_product_price",
        ]

    def get_user(self, obj):
        return obj.user.username

    def get_reviews(self, obj):
        reviews = obj.product_reviews.all()
        serializer = ReviewSerializer(reviews, many=True)
        return serializer.data

    def get_profile_photo(self, obj):
        return obj.user.profile.profile_photo.url

    def get_cover_photo(self, obj):
        return obj.cover_photo.url

    def get_photo1(self, obj):
        return obj.photo1.url

    def get_photo2(self, obj):
        return obj.photo2.url

    def get_photo3(self, obj):
        return obj.photo3.url

    def get_photo4(self, obj):
        return obj.photo4.url


class ProductCreateSerializer(serializers.ModelSerializer):
    country = CountryField(name_only=True)

    class Meta:
        model = Product
        exclude = ["updated_at", "pkid"]


class ProductViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductViews
        exclude = ["updated_at", "pkid"]
