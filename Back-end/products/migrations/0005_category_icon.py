# Generated by Django 5.1.2 on 2024-11-11 13:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("products", "0004_brand_image"),
    ]

    operations = [
        migrations.AddField(
            model_name="category",
            name="icon",
            field=models.ImageField(blank=True, null=True, upload_to="category_icons/"),
        ),
    ]
