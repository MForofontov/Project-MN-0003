from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from users.serializers import UserSerializer, UserProfileSerializer
from django.contrib.auth import get_user_model
from django.http import HttpRequest, HttpResponse
from models import CustomUser
from users.tasks.send_verification_email import send_verification_email
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

    def create(self, request: HttpRequest) -> Response:
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
        # Check if the user already exists
        email = request.data.get('email')
        if CustomUser.objects.filter(email=email).exists():
            return Response({'detail': 'User with this email already exists.'},
                            status=status.HTTP_400_BAD_REQUEST)

        # Get the serializer with the request data
        serializer: UserSerializer = self.get_serializer(data=request.data)
        # Validate the data and raise an exception if invalid
        serializer.is_valid(raise_exception=True)
        # Save the validated data to create a new user
        user: CustomUser = serializer.save()
        # Get the headers for the response
        headers: Dict[str, str] = self.get_success_headers(serializer.data)
        
        # If the user is created successfully, send an email verification link
        #send_verification_email.delay(user.id)
        
        # Return the serialized data with a 201 Created status
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class UserProfileView(APIView):
    """
    View to retrieve and update the profile of the authenticated user.
    """
    # Require the user to be authenticated to access this view
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request: HttpRequest) -> Response:
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

    def post(self, request: HttpRequest) -> Response:
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

    def get(self, request: HttpRequest) -> HttpResponse:
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

class RequestEmailConfirmationView(APIView):
    """
    View to request email confirmation for the authenticated user.
    """
    # Require the user to be authenticated to access this view
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request: HttpRequest) -> Response:
        """
        Handles POST requests to request email confirmation for the authenticated user.

        Parameters
        ----------
        request : HttpRequest
            The HTTP request object.

        Returns
        -------
        Response
            A response indicating that the email confirmation request has been sent.
        """
        # Get the authenticated user
        user: CustomUser = request.user

        # Check if the user's email is already confirmed
        if user.is_email_confirmed:
            return Response({"message": "Email is already confirmed"}, status=status.HTTP_200_OK)

        # Send the email verification link
        #send_verification_email.delay(user.id)

        # Return a response indicating that the email confirmation request has been sent
        return Response({"message": "Email confirmation request sent"}, status=status.HTTP_200_OK)