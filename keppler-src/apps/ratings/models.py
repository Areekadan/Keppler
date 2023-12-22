from django.db import models
from django.utils.translation import gettext_lazy as _
from keppler.settings.base import AUTH_USER_MODEL
from apps.common.models import TimeStampedUUIDModel
from apps.profiles.models import Profile

class Rating(TimeStampedUUIDModel):

    class Range(models.IntegerChoices):
        Rating_1 = 1, _("Poor")
        Rating_2 = 2, _("Fair")
        Rating_3 = 3, _("Good")
        Rating_4 = 4, _("Very Good")
        Rating_5 = 5, _("Excellent")
    
    reviewer = models.ForeignKey(AUTH_USER_MODEL, verbose_name=_("Reviewer"), on_delete=models.SET_NULL, null=True)
    seller = models.ForeignKey(Profile, verbose_name=_("Rated seller"), 
        related_name="seller_review", on_delete=models.SET_NULL, null=True)
    rating = models.IntegerField(verbose_name=_("Rating"), choices=Range.choices,
        help_text="Select a rating: 1=Poor, 2=Fair, 3=Good, 4=Very Good, 5=Excellent. Choose a number that best reflects your evaluation.", default=0)
    comment = models.TextField(verbose_name=_("Comment"))

    class Meta:
        unique_together = ["reviewer", "seller"]

    def __str__(self):
        if self.rating is not None:
            rating_label = self.get_rating_display()
            return f"Rating by {self.reviewer} for {self.seller}: {rating_label}"
        else:
            return f"Rating by {self.reviewer} for {self.seller}"
    
