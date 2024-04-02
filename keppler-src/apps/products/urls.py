from django.urls import path

from . import views

urlpatterns = [
    path("all/", views.ListAllProductsAPIView.as_view(), name="all-products"),
    path(
        "sellers/", views.ListSellersProductsAPIView.as_view(), name="sellers-products"
    ),
    path("create/", views.CreateProductAPIView.as_view(), name="product-create"),
    path(
        "details/<slug:slug>/",
        views.ProductDetailView.as_view(),
        name="product-details",
    ),
    path(
        "update/<slug:slug>/",
        views.UpdateProductAPIView.as_view(),
        name="update-product",
    ),
    path("upload-image/", views.uploadProductImage, name="upload-product-image"),
    path(
        "delete/<slug:slug>/",
        views.DeleteProductAPIView.as_view(),
        name="delete-product",
    ),
    path("search/", views.ProductSearchAPIView.as_view(), name="product-search"),
    path(
        "countries-with-products/",
        views.CountriesWithProductsListView.as_view(),
        name="countries-with-products",
    ),
    path("countries/", views.CountryListView.as_view(), name="country-list"),
    path(
        "regions/<int:country_id>/",
        views.RegionsForCountryAPIView.as_view(),
        name="regions-for-country",
    ),
    path(
        "cities/<int:region_id>/",
        views.CitiesForRegionAPIView.as_view(),
        name="cities-for-region",
    ),
]
