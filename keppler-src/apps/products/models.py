import random
import string

from autoslug import AutoSlugField
from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator
from django.db import models
from django.db.models.query import QuerySet
from django.utils.translation import gettext_lazy as _
from django_countries.fields import CountryField

from apps.common.models import TimeStampedUUIDModel

User = get_user_model()


class ProductPublishedManager(models.Manager):
    def get_queryset(self):
        return (
            super(ProductPublishedManager, self)
            .get_queryset()
            .filter(published_status=True)
        )


class Product(TimeStampedUUIDModel):
    class ProductStatus(models.TextChoices):
        ACTIVE = "Active", _("Active")
        DISCONTINUED = "Discontinued", _("Discontinued")
        OUT_OF_STOCK = "Out of Stock", _("Out of Stock")

    class AdvertType(models.TextChoices):
        PREORDER = "Preorder", _("Preorder")
        LIMITED_EDITION = "Limited Edition", _("Limited Edition")
        EXCLUSIVE = "Exclusive", _("Exclusive")
        CLEARANCE = "Clearance", _("Clearance")
        USED = "Used", _("Used")
        REFURBISHED = "Refurbished", _("Refurbished")
        HANDMADE = "Handmade", _("Handmade")
        VINTAGE = "Vintage", _("Vintage")
        COLLECTIBLE = "Collectible", _("Collectible")
        CUSTOMIZABLE = "Customizable", _("Customizable")
        BUNDLE = "Bundle", _("Bundle")
        DIGITAL_DOWNLOAD = "Digital Download", _("Digital Download")
        SUBSCRIPTION = "Subscription", _("Subscription")
        OTHER = "Other", _("Other")

    class ProductType(models.TextChoices):
        ELECTRONICS = "Electronics", _("Electronics")
        BOOKS = "Books", _("Books")
        CLOTHING = "Clothing", _("Clothing")
        BEAUTY = "Beauty", _("Beauty")
        HOME_APPLIANCES = "Home Appliances", _("Home Appliances")
        TOYS = "Toys", _("Toys")
        SPORTS = "Sports", _("Sports")
        GROCERY = "Grocery", _("Grocery")
        AUTOMOTIVE = "Automotive", _("Automotive")
        MUSIC = "Music", _("Music")
        HEALTH = "Health", _("Health")
        GARDEN = "Garden", _("Garden")
        PET_SUPPLIES = "Pet Supplies", _("Pet Supplies")
        OTHER = "Other", _("Other")

    user = models.ForeignKey(
        User,
        verbose_name=_("Seller or Customer"),
        related_name="seller_customer",
        on_delete=models.DO_NOTHING,
    )
    title = models.CharField(verbose_name=_("Product Title"), max_length=250)
    slug = AutoSlugField(populate_from="title", unique=True, always_update=True)
    ref_code = models.CharField(
        verbose_name=_("Product Reference Code"),
        max_length=255,
        unique=True,
        blank=True,
    )
    description = models.TextField(
        verbose_name=_("Product Description"),
        default="Introducing the all-new and phenominal product of the century.",
    )
    country = CountryField(
        verbose_name=_("Country"), default="CA", blank_label="(Select a Country)"
    )
    city = models.CharField(verbose_name=_("City"), max_length=180, default="Edmonton")
    postal_code = models.CharField(
        verbose_name=_("Postal Code"), max_length=100, default="T6Y2V5"
    )
    street_address = models.CharField(
        verbose_name=_("Street Address"),
        max_length=250,
        default="2645 Summers Street 28A Ave",
    )
    price = models.DecimalField(
        verbose_name=_("Price"),
        max_digits=9,
        decimal_places=2,
        default=0.0,
        validators=[MinValueValidator(0.0)],
    )
    quantity = models.PositiveIntegerField(
        verbose_name=_("Quantity"), default=0, validators=[MinValueValidator(0)]
    )
    tax = models.DecimalField(
        verbose_name=_("Tax"),
        max_digits=6,
        decimal_places=2,
        default=0.05,
        validators=[MinValueValidator(0.0)],
        help_text="5% goods and services tax charged",
    )
    cover_photo = models.ImageField(
        verbose_name=_("Main Product Image"),
        default="/product_sample.jpg",
        null=True,
        blank=True,
    )
    photo1 = models.ImageField(default="/product_sample.jpg", null=True, blank=True)
    photo2 = models.ImageField(default="/product_sample.jpg", null=True, blank=True)
    photo3 = models.ImageField(default="/product_sample.jpg", null=True, blank=True)
    photo4 = models.ImageField(default="/product_sample.jpg", null=True, blank=True)
    # if in the future we need to use a related model uncomment this section
    # image = models.ImageField(verbose_name=_("Main Product Image"), upload_to="product_images/", null=True, blank=True)
    # additional_images = models.ManyToManyField('ProductImage', related_name='product_images', blank=True)
    advert_type = models.CharField(
        verbose_name=_("Advert Type"),
        max_length=50,
        choices=AdvertType.choices,
        default=AdvertType.OTHER,
    )
    product_type = models.CharField(
        verbose_name=_("Product Type"),
        max_length=80,
        choices=ProductType.choices,
        default=ProductType.OTHER,
    )
    product_status = models.CharField(
        verbose_name=_("Status"),
        max_length=50,
        choices=ProductStatus.choices,
        default=ProductStatus.ACTIVE,
    )
    length = models.DecimalField(
        verbose_name=_("Length"),
        max_digits=6,
        decimal_places=2,
        null=True,
        blank=True,
        validators=[MinValueValidator(0.0)],
    )
    width = models.DecimalField(
        verbose_name=_("Width"),
        max_digits=6,
        decimal_places=2,
        null=True,
        blank=True,
        validators=[MinValueValidator(0.0)],
    )
    height = models.DecimalField(
        verbose_name=_("Height"),
        max_digits=6,
        decimal_places=2,
        null=True,
        blank=True,
        validators=[MinValueValidator(0.0)],
    )
    weight = models.DecimalField(
        verbose_name=_("Weight"),
        max_digits=6,
        decimal_places=2,
        null=True,
        blank=True,
        validators=[MinValueValidator(0.0)],
    )
    average_rating = models.FloatField(
        verbose_name=_("Average Rating"),
        default=0.0,
        null=True,
        blank=True,
        validators=[MinValueValidator(0.0)],
    )
    review_count = models.PositiveIntegerField(
        verbose_name=_("Review Count"), default=0, null=True, blank=True
    )
    published_status = models.BooleanField(
        verbose_name=_("Published Status"), default=False
    )
    views = models.IntegerField(verbose_name=_("Total Views"), default=0)
    objects = models.Manager()
    published = ProductPublishedManager()

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Product"

    def save(self, *args, **kwargs):
        self.title = str.title(self.title)
        self.description = str.capitalize(self.description)
        self.ref_code = "".join(
            random.choices(string.ascii_uppercase + string.digits, k=10)
        )
        super(Product, self).save(*args, **kwargs)

    @property
    def final_product_price(self):
        tax_percentage = self.tax
        product_price = self.price
        tax_amount = round(tax_percentage * product_price, 2)
        price_after_tax = float(round(product_price + tax_amount, 2))
        return price_after_tax

    def update_rating_and_review_count(self):
        reviews = self.product_reviews.all()
        total_rating = sum([review.rating for review in reviews])
        review_count = reviews.count()
        self.review_count = review_count
        if review_count > 0:
            self.average_rating = total_rating / review_count
        else:
            self.average_rating = 0
        self.save()


class ProductViews(TimeStampedUUIDModel):
    ip = models.CharField(verbose_name=_("IP Adress"), max_length=250)
    product = models.ForeignKey(
        Product, related_name="product_views", on_delete=models.CASCADE
    )

    def __str__(self):
        return f"{self.product.title} has {self.product.views} view(s)"

    class Meta:
        verbose_name = "Views on Product"
        verbose_name_plural = "Product Views"


# if in the future we need to use a related model uncomment this section for now 5 images is mandatory or preffered
# class ProductImage(models.Model):
#     image = models.ImageField(
#         verbose_name=_("Image"), upload_to="product_additional_images/"
#     )
#     product = models.ForeignKey(
#         Product,
#         related_name="product_images",
#         on_delete=models.CASCADE,
#     )

#     class Meta:
#         verbose_name = _("Product Image")
#         verbose_name_plural = _("Product Images")
