from rest_framework import serializers

from .models import Review


class ReviewSerializer(serializers.ModelSerializer):
    reviewer = serializers.SerializerMethodField()
    product_title = serializers.SerializerMethodField()
    reviewer_profile_photo = serializers.SerializerMethodField()
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")

    class Meta:
        model = Review
        fields = [
            "reviewer",
            "product_title",
            "rating",
            "comment",
            "photo",
            "reviewer_profile_photo",
            "created_at",
        ]

    def get_reviewer(self, obj):
        return obj.reviewer.username

    def get_product_title(self, obj):
        return obj.product.title

    def get_reviewer_profile_photo(self, obj):
        if obj.reviewer.profile.profile_photo:
            return obj.reviewer.profile.profile_photo.url
        return None
