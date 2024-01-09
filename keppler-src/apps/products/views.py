import logging
import django_filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView

from .exceptions import ProductNotFound
from .models import Product, ProductViews
from .pagination import ProductPagination
from .serializers import (
    ProductSerializer,
    ProductCreateSerializer,
    ProductViewSerializer,
)

logger = logging.getLogger(__name__)


class ProductFilter(django_filters.FilterSet):
    advert_type = django_filters.CharFilter(
        field_name="advert_type", lookup_expr="iexact"
    )
    product_type = django_filters.CharFilter(
        field_name="product_type", lookup_expr="iexact"
    )
    product_status = django_filters.CharFilter(
        field_name="product_status", lookup_expr="iexact"
    )
    price = django_filters.NumberFilter()
    price__gt = django_filters.NumberFilter(field_name="price", lookup_expr="gt")
    price__lt = django_filters.NumberFilter(field_name="price", lookup_expr="lt")

    class Meta:
        model = Product
        fields = ["advert_type", "product_type", "product_status", "price"]


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
    search_fields = ["country", "city"]
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
    search_fields = ["country", "city"]
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
    product.cover_photo = request.FILES.get("cover_photo")
    product.photo1 = request.FILES.get("photo1")
    product.photo2 = request.FILES.get("photo2")
    product.photo3 = request.FILES.get("photo3")
    product.photo4 = request.FILES.get("photo4")
    product.save()
    return Response("Image(s) uploaded")


class ProductSearchAPIView(APIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = ProductCreateSerializer

    def post(self, request):
        queryset = Product.objects.filter(published_status=True)
        data = self.request.data

        advert_type = data["advert_type"]
        queryset = queryset.filter(advert_type__iexact=advert_type)

        product_type = data["product_type"]
        queryset = queryset.filter(product_type__iexact=product_type)

        product_status = data["product_status"]
        queryset = queryset.filter(product_status__iexact=product_status)

        price = data["price"]
        if price == "$0+":
            price = 0
        elif price == "$50+":
            price = 50
        elif price == "$100+":
            price = 100
        elif price == "$500+":
            price = 500
        elif price == "$1000":
            price = 1000
        elif price == "$5000+":
            price = 5000
        elif price == "Any":
            price = -1

        if price != -1:
            queryset = queryset.filter(price__gte=price)

        catch_phrase = data["catch_phrase"]
        queryset = queryset.filter(description__icontains=catch_phrase)

        serializer = ProductSerializer(queryset, many=True)

        return Response(serializer.data)
