from django.contrib import admin

from .models import Product, ProductViews


class ProductAdmin(admin.ModelAdmin):
    list_display = ["title", "country", "advert_type", "product_type", "product_status"]
    list_filter = ["country", "advert_type", "product_type", "product_status"]


admin.site.register(Product, ProductAdmin)
admin.site.register(ProductViews)
