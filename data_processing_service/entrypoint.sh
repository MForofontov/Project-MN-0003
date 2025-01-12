#!/bin/sh

# Wait for the database to be ready
/data_processing_service_docker/wait-for-it.sh db_data_processing_service:5433 --timeout=60 --strict -- echo "Database is up"

# Wait for Redis to be ready
/data_processing_service_docker/wait-for-it.sh data_processing_service_redis:6380 --timeout=60 --strict -- echo "Redis is up"

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Start the Django development server
python manage.py runserver 0.0.0.0:8001
