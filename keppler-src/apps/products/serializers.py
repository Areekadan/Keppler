from django_countries.serializer_fields import CountryField
from django_countries.serializers import CountryFieldMixin
from rest_framework import serializers
from cities_light.models import Country, City, Region

from apps.reviews.serializers import ReviewSerializer

from .models import Product, ProductViews, Category, SubCategory


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ["id", "name"]


class RegionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Region
        fields = ["id", "name"]


class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ["id", "name"]


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name"]


class SubCategorySerializer(serializers.ModelSerializer):
    parent_category = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all()
    )
    parent_category_name = serializers.CharField(
        source="parent_category.name", read_only=True
    )

    class Meta:
        model = SubCategory
        fields = ["id", "name", "parent_category", "parent_category_name"]


class ProductSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    category = SubCategorySerializer(read_only=True)
    country = CountrySerializer(read_only=True)
    region = RegionSerializer(read_only=True)
    city = CitySerializer(read_only=True)
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
            "category",
            "title",
            "slug",
            "ref_code",
            "description",
            "country",
            "region",
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
    country = serializers.PrimaryKeyRelatedField(queryset=Country.objects.all())
    region = serializers.PrimaryKeyRelatedField(
        queryset=Region.objects.all(), allow_null=True
    )
    city = serializers.PrimaryKeyRelatedField(queryset=City.objects.all())

    class Meta:
        model = Product
        exclude = ["updated_at", "pkid"]

    def create(self, validated_data):
        product = Product.objects.create(**validated_data)
        return product


class ProductViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductViews
        exclude = ["updated_at", "pkid"]
