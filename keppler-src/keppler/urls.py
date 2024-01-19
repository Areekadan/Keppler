from django.conf import settings
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static

urlpatterns = [
    path("supersecret/", admin.site.urls),
    path("api/v1/auth/", include("djoser.urls")),
    path("api/v1/auth/", include("djoser.urls.jwt")),
    path("api/v1/profile/", include("apps.profiles.urls")),
    path("api/v1/products/", include("apps.products.urls")),
    path("api/v1/ratings/", include("apps.ratings.urls")),
    path("api/v1/reviews/", include("apps.reviews.urls")),
    path("api/v1/inquiries/", include("apps.inquiries.urls")),
]

admin.site.site_header = "Keppler Admin"
admin.site.site_title = "Keppler Admin Portal"
admin.site.index_title = "Welcome to Kepplers Admin Portal"
