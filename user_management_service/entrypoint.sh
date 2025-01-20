#!/bin/sh

# Wait for the database to be ready
/user_management_service_docker/wait-for-it.sh db_user_management_service:5432 --timeout=60 --strict -- echo "[INFO] Database is up for user_management_service"

# Wait for Redis to be ready
/user_management_service_docker/wait-for-it.sh redis_user_management_service:6379 --timeout=60 --strict -- echo "[INFO] Redis is up for user_management_service"

# Wait for Kafka to be ready
/user_management_service_docker/wait-for-it.sh kafka_user_management_service:9092 --timeout=60 --strict -- echo "[INFO] Kafka is up for user_management_service"

# Run migrations
echo "[INFO] Running migrations for user_management_service"
python manage.py makemigrations
python manage.py migrate

# Create a superuser if it doesn't exist
echo "[INFO] Creating superuser"
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
echo "[INFO] user_management_service is up and running"
python manage.py runserver 0.0.0.0:8000