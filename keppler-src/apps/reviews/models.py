from django.db import models
from django.utils.translation import gettext_lazy as _

from apps.common.models import TimeStampedUUIDModel
from apps.products.models import Product
from keppler.settings.base import AUTH_USER_MODEL


class Review(TimeStampedUUIDModel):
    class Rating(models.IntegerChoices):
        ONE = 1, _("Poor")
        TWO = 2, _("Fair")
        THREE = 3, _("Good")
        FOUR = 4, _("Very Good")
        FIVE = 5, _("Excellent")

    reviewer = models.ForeignKey(
        AUTH_USER_MODEL, verbose_name=_("Reviewer"), on_delete=models.CASCADE
    )
    product = models.ForeignKey(
        Product,
        verbose_name=_("Reviewed Product"),
        related_name="product_reviews",
        on_delete=models.CASCADE,
    )
    rating = models.IntegerField(
        verbose_name=_("Rating"), choices=Rating.choices, default=Rating.THREE
    )
    comment = models.TextField(verbose_name=_("Comment"))
    photo = models.ImageField(
        verbose_name=_("Image of Product Experience"),
        null=True,
        blank=True,
        upload_to="review_images/",
    )

    class Meta:
        unique_together = ["reviewer", "product"]

    def __str__(self):
        if self.rating is not None:
            rating_label = self.get_rating_display()
            return f"Rating by {self.reviewer} for {self.product.title}: {rating_label}"
        else:
            return f"Rating by {self.reviewer} for {self.product.title}"
