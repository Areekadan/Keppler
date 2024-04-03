import logging

import django_filters
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q
from rest_framework import filters, generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView

from .exceptions import ProductNotFound
from .models import Product, ProductViews
from .pagination import ProductPagination
from .serializers import (
    ProductCreateSerializer,
    ProductSerializer,
    ProductViewSerializer,
)
from cities_light.models import Country, City, Region
from .serializers import CountrySerializer, CitySerializer, RegionSerializer

logger = logging.getLogger(__name__)


class ProductFilter(django_filters.FilterSet):
    country = django_filters.NumberFilter(field_name="country__id")
    region = django_filters.NumberFilter(field_name="region__id")
    city = django_filters.NumberFilter(field_name="city__id")
    price = django_filters.CharFilter(method="filter_price")
    advert_type = django_filters.CharFilter(
        field_name="advert_type", lookup_expr="iexact"
    )
    product_type = django_filters.CharFilter(
        field_name="product_type", lookup_expr="iexact"
    )
    product_status = django_filters.CharFilter(
        field_name="product_status", lookup_expr="iexact"
    )

    class Meta:
        model = Product
        fields = [
            "advert_type",
            "product_type",
            "product_status",
            "price",
            "country",
            "region",
            "city",
        ]

    def filter_price(self, queryset, name, value):
        if value == "$0+":
            return queryset.filter(price__gte=0, price__lte=50)
        elif value == "$50+":
            return queryset.filter(price__gte=50, price__lte=100)
        elif value == "$100+":
            return queryset.filter(price__gte=100, price__lte=500)
        elif value == "$500+":
            return queryset.filter(price__gte=500, price__lte=1000)
        elif value == "$1000+":
            return queryset.filter(price__gte=1000, price__lte=5000)
        elif value == "$5000+":
            return queryset.filter(price__gte=5000)
        elif value == "Any":
            return queryset
        return queryset


class ListAllProductsAPIView(generics.ListAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all().order_by("-created_at")
    pagination_class = ProductPagination
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]
    filterset_class = ProductFilter
    search_fields = ["country", "city", "region"]
    ordering_fields = ["created_at"]


class ListSellersProductsAPIView(generics.ListAPIView):
    serializer_class = ProductSerializer
    pagination_class = ProductPagination
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]
    filterset_class = ProductFilter
    search_fields = ["country", "city", "region"]
    ordering_fields = ["created_at"]

    def get_queryset(self):
        user = self.request.user
        queryset = Product.objects.filter(user=user).order_by("-created_at")
        return queryset


class ProductViewsAPIView(generics.ListAPIView):
    serializer_class = ProductViewSerializer
    queryset = ProductViews.objects.all()


class ProductDetailView(APIView):
    def get(self, request, slug):
        product = Product.objects.get(slug=slug)

        x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
        if x_forwarded_for:
            ip = x_forwarded_for.split(",")[0]
        else:
            ip = request.META.get("REMOTE_ADDR")

        if not ProductViews.objects.filter(product=product, ip=ip).exists():
            ProductViews.objects.create(product=product, ip=ip)
            product.views += 1
            product.save()

        serializer = ProductSerializer(product, context={"request": request})

        return Response(serializer.data, status=status.HTTP_200_OK)


class UpdateProductAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def put(self, request, slug):
        try:
            product = Product.objects.get(slug=slug)
        except Product.DoesNotExist:
            raise ProductNotFound

        user = request.user
        if product.user != user:
            return Response(
                {"error": "You are not authorized to edit this product."},
                status=status.HTTP_403_FORBIDDEN,
            )
        data = request.data
        serializer = ProductSerializer(product, data=data, many=False)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)


class CreateProductAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        user = request.user
        profile = user.profile

        if not profile.is_seller:
            return Response(
                {"error": "You are not registered as a seller."},
                status=status.HTTP_403_FORBIDDEN,
            )

        data = request.data
        data["user"] = request.user.pkid
        serializer = ProductCreateSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            logger.info(
                f"Product {serializer.data.get('title')} created by {user.username}"
            )
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DeleteProductAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, slug):
        try:
            product = Product.objects.get(slug=slug)
        except Product.DoesNotExist:
            raise ProductNotFound

        user = request.user
        if product.user != user:
            return Response(
                {"error": "You are not authorized to delete this product."},
                status=status.HTTP_403_FORBIDDEN,
            )

        product.delete()
        return Response(
            {"success": "Product deletion successful"},
            status=status.HTTP_204_NO_CONTENT,
        )


@api_view(["POST"])
def uploadProductImage(request):
    data = request.data

    product_id = data["product_id"]
    product = Product.objects.get(id=product_id)
    cover_photo = request.FILES.get("cover_photo")
    if cover_photo:
        product.cover_photo = cover_photo
    photo1 = request.FILES.get("photo1")
    if photo1:
        product.photo1 = photo1
    photo2 = request.FILES.get("photo2")
    if photo2:
        product.photo2 = photo2
    photo3 = request.FILES.get("photo3")
    if photo3:
        product.photo3 = photo3
    photo4 = request.FILES.get("photo4")
    if photo4:
        product.photo4 = photo4
    product.save()
    return Response("Image(s) uploaded")


class ProductSearchAPIView(APIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = ProductCreateSerializer

    def post(self, request):
        queryset = Product.objects.filter(published_status=True)
        data = self.request.data

        advert_type = data.get("advert_type")
        if advert_type:
            queryset = queryset.filter(advert_type__iexact=advert_type)

        product_type = data.get("product_type")
        if product_type:
            queryset = queryset.filter(product_type__iexact=product_type)

        product_status = data.get("product_status")
        if product_status:
            queryset = queryset.filter(product_status__iexact=product_status)

        country_id = data.get("country")
        if country_id:
            queryset = queryset.filter(country__id=country_id)

        price = data.get("price")
        if price:
            if price == "$0+":
                price = 0
            elif price == "$50+":
                price = 50
            elif price == "$100+":
                price = 100
            elif price == "$500+":
                price = 500
            elif price == "$1000+":
                price = 1000
            elif price == "$5000+":
                price = 5000
            elif price == "Any":
                price = -1

            if price != -1:
                queryset = queryset.filter(price__gte=price)

        catch_phrase = data.get("catch_phrase")
        if catch_phrase:
            queryset = queryset.filter(
                Q(description__icontains=catch_phrase)
                | Q(title__icontains=catch_phrase)
                | Q(advert_type__iexact=catch_phrase)
                | Q(product_type__iexact=catch_phrase)
            )

        serializer = ProductSerializer(queryset, many=True)

        return Response(serializer.data)


class CountriesWithProductsListView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = CountrySerializer

    def get_queryset(self):
        country_ids = Product.objects.values_list("country", flat=True).distinct()
        queryset = Country.objects.filter(id__in=country_ids).order_by("name")
        return queryset


class CitiesWithProductsListView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = CitySerializer

    def get_queryset(self):
        city_ids = Product.objects.values_list("city", flat=True).distinct()
        queryset = City.objects.filter(id__in=city_ids).order_by("name")
        return queryset


class RegionsWithProductsListView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = CitySerializer

    def get_queryset(self):
        region_ids = Product.objects.values_list("region", flat=True).distinct()
        queryset = Region.objects.filter(id__in=region_ids).order_by("name")
        return queryset


class CountryListView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = CountrySerializer
    queryset = Country.objects.all().order_by("name")


class RegionsForCountryAPIView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = RegionSerializer

    def get_queryset(self):
        country_id = self.kwargs.get("country_id")
        return Region.objects.filter(country_id=country_id).order_by("name")


class CitiesForRegionAPIView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = CitySerializer

    def get_queryset(self):
        region_id = self.kwargs.get("region_id")
        return City.objects.filter(region_id=region_id).order_by("name")
