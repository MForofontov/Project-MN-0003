from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from users.serializers import UserSerializer, UserProfileSerializer
from django.contrib.auth import get_user_model
from rest_framework.decorators import permission_classes
from django.http import HttpRequest
from models import CustomUser
from typing import Any, Dict

# Import the user model
User = get_user_model()

class UserCreateView(generics.CreateAPIView):
    """
    View to create a new user.
    """
    permission_classes = [permissions.AllowAny]
    # Allow only POST requests
    http_method_names = ['post']
    # Specify the serializer class to use
    serializer_class = UserSerializer

    def create(self, request: HttpRequest, *args: Any, **kwargs: Any) -> Response:
        """
        Handles POST requests to create a new user.

        Parameters
        ----------
        request : HttpRequest
            The HTTP request object.

        Returns
        -------
        Response
            A response containing the serialized user data and a 201 Created status.
        """
        # Get the serializer with the request data
        serializer: UserSerializer = self.get_serializer(data=request.data)
        # Validate the data and raise an exception if invalid
        serializer.is_valid(raise_exception=True)
        # Save the validated data to create a new user
        user: CustomUser = serializer.save()
        # Get the headers for the response
        headers: Dict[str, str] = self.get_success_headers(serializer.data)
        # Optionally: Add any post-creation logic here (e.g., sending a welcome email)
        
        # Return the serialized data with a 201 Created status
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class UserProfileView(APIView):
    """
    View to retrieve and update the profile of the authenticated user.
    """
    # Require the user to be authenticated to access this view
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request: HttpRequest, *args: Any, **kwargs: Any) -> Response:
        """
        Handles GET requests to retrieve the profile of the authenticated user.

        Parameters
        ----------
        request : HttpRequest
            The HTTP request object.

        Returns
        -------
        Response
            A response containing the serialized user profile data and a 200 OK status.
        """
        # Get the authenticated user
        user: CustomUser = request.user
        # Serialize the user data
        serializer: UserProfileSerializer = UserProfileSerializer(user)
        # Return the serialized data with a 200 OK status
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request: HttpRequest, *args: Any, **kwargs: Any) -> Response:
        """
        Handles POST requests to update the profile of the authenticated user.

        Parameters
        ----------
        request : HttpRequest
            The HTTP request object.

        Returns
        -------
        Response
            A response containing the serialized updated user profile data and a 200 OK status,
            or a response containing validation errors and a 400 Bad Request status.
        """
        # Get the authenticated user
        user: CustomUser = request.user
        # Get the serializer with the request data and allow partial updates
        serializer: UserProfileSerializer = UserProfileSerializer(user, data=request.data, partial=True)
        # Check if the provided data is valid
        if serializer.is_valid():
            # Save the validated data to update the user profile
            serializer.save()
            # Return the serialized data with a 200 OK status
            return Response(serializer.data, status=status.HTTP_200_OK)
        # Return validation errors with a 400 Bad Request status
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserStatusView(APIView):
    """
    View to check if the user is authenticated.
    """
    # Require the user to be authenticated to access this view
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request: HttpRequest, *args: Any, **kwargs: Any) -> HttpResponse:
        """
        Handles GET requests to check if the user is authenticated.

        Parameters
        ----------
        request : HttpRequest
            The HTTP request object.

        Returns
        -------
        HttpResponse
            A response indicating the user is authenticated.
        """
        # Return a response indicating the user is authenticated
        return Response({"message": "User is authenticated"}, status=status.HTTP_200_OK)
