# Generated by Django 4.2.8 on 2024-04-05 15:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("products", "0008_alter_subcategory_unique_together_and_more"),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name="subcategory",
            unique_together=set(),
        ),
        migrations.AlterField(
            model_name="subcategory",
            name="parent_category",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="subcategories",
                to="products.category",
                verbose_name="Parent Category",
            ),
        ),
        migrations.AlterUniqueTogether(
            name="subcategory",
            unique_together={("name", "parent_category")},
        ),
        migrations.RemoveField(
            model_name="subcategory",
            name="main_category",
        ),
    ]