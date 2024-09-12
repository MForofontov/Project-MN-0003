from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from api.serializers import UserSerializer, UserProfileSerializer
from django.contrib.auth import get_user_model

# Import the user model
User = get_user_model()

# View to create a new user
class UserCreateView(generics.CreateAPIView):
    # Allow only POST requests
    http_method_names = ['post']
    # Specify the serializer class to use
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        # Get the serializer with the request data
        serializer = self.get_serializer(data=request.data)
        # Validate the data and raise an exception if invalid
        serializer.is_valid(raise_exception=True)
        # Save the validated data to create a new user
        user = serializer.save()
        # Get the headers for the response
        headers = self.get_success_headers(serializer.data)
        # Return the serialized data with a 201 Created status
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

# View to retrieve and update the profile of the authenticated user
class UserProfileView(APIView):
    # Require the user to be authenticated to access this view
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        # Get the authenticated user
        user = request.user
        # Serialize the user data
        serializer = UserProfileSerializer(user)
        # Return the serialized data with a 200 OK status
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        # Get the authenticated user
        user = request.user
        # Get the serializer with the request data and allow partial updates
        serializer = UserProfileSerializer(user, data=request.data, partial=True)
        # Check if the provided data is valid
        if serializer.is_valid():
            # Save the validated data to update the user profile
            serializer.save()
            # Return the serialized data with a 200 OK status
            return Response(serializer.data, status=status.HTTP_200_OK)
        # Return validation errors with a 400 Bad Request status
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
