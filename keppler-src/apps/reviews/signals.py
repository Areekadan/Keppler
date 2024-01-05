from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import Review


@receiver(post_save, sender=Review)
def update_product_on_review_save(sender, instance, created, **kwargs):
    product = instance.product
    product.update_rating_and_review_count()


@receiver(post_delete, sender=Review)
def update_product_on_review_delete(sender, instance, **kwargs):
    product = instance.product
    product.update_rating_and_review_count()
