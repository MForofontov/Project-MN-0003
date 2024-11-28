#!/bin/sh

# Wait for the database to be ready
/wait-for-it.sh db:5432 --timeout=60 --strict -- echo "Database is up"

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Create a superuser if it doesn't exist
echo "Creating superuser"
python manage.py shell -c "
from django.contrib.auth import get_user_model;
import os;
User = get_user_model();
if not User.objects.filter(email=os.environ.get('DJANGO_SUPERUSER_EMAIL')).exists():
    User.objects.create_superuser(
        email=os.environ.get('DJANGO_SUPERUSER_EMAIL'),
        password=os.environ.get('DJANGO_SUPERUSER_PASSWORD')
    )
"

# Start the Django development server
python manage.py runserver 0.0.0.0:8000