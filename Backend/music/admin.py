from django.contrib import admin
from django.apps import apps

# Register your models here.

# Get all models from the current app
models = apps.get_models()

# Register each model with the admin site
for model in models:
    try:
        admin.site.register(model)
    except admin.sites.AlreadyRegistered:
        pass  # If the model is already registered, skip it