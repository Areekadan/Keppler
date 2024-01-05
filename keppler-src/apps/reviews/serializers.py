from rest_framework import serializers
from .models import Review


class ReviewSerializer(serializers.ModelSerializer):
    reviewer = serializers.SerializerMethodField()
    product_title = serializers.SerializerMethodField()

    class Meta:
        model = Review
        fields = ["reviewer", "product_title", "rating", "comment", "photo"]

    def get_reviewer(self, obj):
        return obj.reviewer.username

    def get_product_title(self, obj):
        return obj.product.title
