# Use an official Python runtime as a parent image
FROM python:latest

# Set the working directory in the container
WORKDIR /Backend_docker

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the current directory contents into the container at /app
COPY . .

# Expose the port the app runs on
EXPOSE 8000

# Set environment variables to avoid creating pyc files and keep the terminal unbuffered
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Install wait-for-it
RUN apt-get update && apt-get install -y wait-for-it

# Your entrypoint or CMD can use wait-for-it
CMD ["wait-for-it","db:5432", "--", "sh", "-c", "python manage.py makemigrations && python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]

