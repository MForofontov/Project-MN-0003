#!/bin/sh

# Wait for the database to be ready
/wait-for-it.sh db:5432 --timeout=60 --strict -- echo "Database is up"

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Create a superuser
python manage.py createsuperuser --noinput --email $DJANGO_SUPERUSER_EMAIL --password $DJANGO_SUPERUSER_PASSWORD

# Start the Django development server
python manage.py runserver 0.0.0.0:8000