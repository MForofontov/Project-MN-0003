#!/bin/sh

# Wait for the database to be ready
/wait-for-it.sh db:5433 --timeout=60 --strict -- echo "Database is up"

# Wait for Redis to be ready
/wait-for-it.sh redis:6379 --timeout=60 --strict -- echo "Redis is up"

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Start the Django development server
python manage.py runserver 0.0.0.0:8001
