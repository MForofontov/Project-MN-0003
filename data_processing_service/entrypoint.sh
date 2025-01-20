#!/bin/sh

# Wait for the database to be ready
/data_processing_service_docker/wait-for-it.sh db_data_processing_service:5433 --timeout=60 --strict -- echo "[INFO] Database is up for data_processing_service"

# Wait for Redis to be ready
/data_processing_service_docker/wait-for-it.sh data_processing_service_redis:6380 --timeout=60 --strict -- echo "[INFO] Redis is up for data_processing_service"

# Wait for Kafka to be ready
/user_management_service_docker/wait-for-it.sh kafka_user_management_service:9092 --timeout=60 --strict -- echo "[INFO] Kafka is up for data_processing_service"

# Run migrations
echo "[INFO] Running migrations for data_processing_service"
python manage.py makemigrations
python manage.py migrate

# Start the Django development server
echo "[INFO] data_processing_service_docker is up and running"
python manage.py runserver 0.0.0.0:8001
