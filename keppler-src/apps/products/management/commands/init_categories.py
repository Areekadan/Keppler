from django.core.management.base import BaseCommand
from ...models import Category, SubCategory


class Command(BaseCommand):
    help = "Initializes the database with default categories and subcategories"

    def handle(self, *args, **options):
        categories = {
            "Clothing, Shoes, Jewelry": ["Men", "Women"],
            "Health & Beauty": ["Beauty", "Health & Personal Care"],
            "Grocery": ["Beverages", "Snacks & Sweets"],
        }

        for category_name, subcategory_names in categories.items():
            category, created = Category.objects.get_or_create(name=category_name)
            msg_part = "created" if created else "already exists"
            self.stdout.write(
                self.style.SUCCESS(f'Category "{category_name}" {msg_part}.')
            )

            for subcategory_name in subcategory_names:
                subcategory, created = SubCategory.objects.get_or_create(
                    name=subcategory_name, parent_category=category
                )
                msg_part = "created" if created else "already exists"
                self.stdout.write(
                    self.style.SUCCESS(
                        f'  Subcategory "{subcategory_name}" {msg_part} under "{category_name}".'
                    )
                )

        self.stdout.write(
            self.style.SUCCESS("Successfully initialized categories and subcategories.")
        )
