# Generated by Django 4.2.8 on 2024-02-07 14:54

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("reviews", "0002_alter_review_rating"),
    ]

    operations = [
        migrations.AlterField(
            model_name="review",
            name="rating",
            field=models.IntegerField(
                choices=[
                    (1, "Poor"),
                    (2, "Fair"),
                    (3, "Good"),
                    (4, "Very Good"),
                    (5, "Excellent"),
                ],
                default=3,
                verbose_name="Rating",
            ),
        ),
    ]
