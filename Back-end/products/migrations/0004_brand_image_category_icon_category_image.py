# Generated by Django 5.1.2 on 2024-11-18 10:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("products", "0003_product_icon_alter_product_image_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="brand",
            name="image",
            field=models.ImageField(blank=True, null=True, upload_to="brand_images/"),
        ),
        migrations.AddField(
            model_name="category",
            name="icon",
            field=models.ImageField(blank=True, null=True, upload_to="category_icons/"),
        ),
        migrations.AddField(
            model_name="category",
            name="image",
            field=models.ImageField(
                blank=True, null=True, upload_to="category_images/"
            ),
        ),
    ]
