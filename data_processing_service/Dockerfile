# Use an official Python runtime as a parent image
FROM python:latest

# Set the working directory in the container
WORKDIR /data_processing_service_docker

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the current directory contents into the container at /data_processing_service_docker
COPY . .

# Ensure wait-for-it.sh is executable
RUN chmod +x /data_processing_service_docker/wait-for-it.sh

# Expose the port the app runs on
EXPOSE 8001

# Set environment variables to avoid creating pyc files and keep the terminal unbuffered
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Your entrypoint or CMD can use wait-for-it
CMD ["sh", "entrypoint.sh"]

