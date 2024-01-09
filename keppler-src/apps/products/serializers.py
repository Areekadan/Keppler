from django_countries.serializer_fields import CountryField
from django_countries.serializers import CountryFieldMixin
from rest_framework import serializers
from apps.reviews.serializers import ReviewSerializer
from .models import Product, ProductViews


class ProductSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    country = CountryField(name_only=True)
    reviews = serializers.SerializerMethodField(read_only=True)

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


class ProductCreateSerializer(serializers.ModelSerializer):
    country = CountryField(name_only=True)

    class Meta:
        model = Product
        exclude = ["updated_at", "pkid"]


class ProductViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductViews
        exclude = ["updated_at", "pkid"]
