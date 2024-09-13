from django.contrib.auth import get_user_model
from django.db import models
from django.utils.translation import gettext_lazy as _
from django_countries.fields import CountryField
from phonenumber_field.modelfields import PhoneNumberField

from apps.common.models import TimeStampedUUIDModel

User = get_user_model()


class Gender(models.TextChoices):
    MALE = "Male", _("Male")
    FEMALE = "Female", _("Female")
    OTHER = "Other", _("Other")


class Profile(TimeStampedUUIDModel):
    user = models.OneToOneField(User, related_name="profile", on_delete=models.CASCADE)
    phone_number = PhoneNumberField(
        verbose_name=_("phone Number"), max_length=30, default="+17809659789"
    )
    about_me = models.TextField(
        verbose_name=_("About me"),
        default="Hello! I'm new here and currently working on filling out my profile. "
        "I have a wide range of products and skills that I'm excited to share with this community. "
        "Please check back later to learn more about me or feel free to reach out and connect!",
    )
    license = models.CharField(
        verbose_name=_("Business license"), max_length=20, blank=True, null=True
    )
    profile_photo = models.ImageField(
        verbose_name=_("Profile Photo"), default="/profile_default.png"
    )
    gender = models.CharField(
        verbose_name=_("Gender"),
        choices=Gender.choices,
        default=Gender.OTHER,
        max_length=20,
    )
    country = CountryField(
        verbose_name=_("Country"), default="CA", blank=False, null=False
    )
    city = models.CharField(
        verbose_name=_("City"),
        max_length=180,
        default="Edmonton",
        blank=False,
        null=False,
    )
    is_customer = models.BooleanField(
        verbose_name=_("Customer"),
        default=False,
        help_text=_("Looking to buy a product?"),
    )
    is_seller = models.BooleanField(
        verbose_name=_("Seller"),
        default=False,
        help_text=_("Looking to sell products?"),
    )
    top_sellers = models.BooleanField(verbose_name=_("Top Seller"), default=False)
    rating = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    num_reviews = models.IntegerField(
        verbose_name=_("Number of Reviews"), default=0, null=True, blank=True
    )

    def __str__(self):
        return f"{self.user.username}'s Profile"
