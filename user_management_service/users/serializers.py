from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model

User = get_user_model() # This will refer to CustomUser due to AUTH_USER_MODEL setting in settings.py

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        # Call the parent class's get_token method to get the default token
        token = super().get_token(user)
        # Add custom claims here if needed
        return token

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        # Specify the model to be serialized
        model = User
        # Define the fields to include in the serialized output
        fields = ('id', 'email', 'password')
        # Specify that the password field should be write-only
        extra_kwargs = {'password': {'write_only': True}}
        
    def create(self, validated_data):
        # Create a new user instance using the validated data
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
        )
        # Return the created user instance
        return user

class UserProfileSerializer(serializers.ModelSerializer):
    # Meta class to specify the model and fields to be serialized
    class Meta:
        # Specify the model to be serialized
        model = User
        # Define the fields to include in the serialized output
        fields = ['email', 'first_name', 'last_name', 'date_of_birth', 'phone_number', 'address']

