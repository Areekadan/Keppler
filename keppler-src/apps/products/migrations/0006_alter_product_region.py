# Generated by Django 4.2.8 on 2024-04-01 22:45

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("cities_light", "0011_alter_city_country_alter_city_region_and_more"),
        ("products", "0005_product_region"),
    ]

    operations = [
        migrations.AlterField(
            model_name="product",
            name="region",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                to="cities_light.region",
                verbose_name="Region/State",
            ),
        ),
    ]
