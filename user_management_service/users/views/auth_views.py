from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from users.serializers import CustomTokenObtainPairSerializer
from django.conf import settings

# Custom view to refresh JWT tokens using a refresh token stored in cookies
class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        # Retrieve the refresh token from cookies
        refresh_token = request.COOKIES.get('refreshToken')
        if not refresh_token:
            # Return an error response if the refresh token is missing
            return Response({'detail': 'Refresh token missing'}, status=status.HTTP_400_BAD_REQUEST)

        # Initialize the serializer with the refresh token
        serializer = self.get_serializer(data={'refresh': refresh_token})
        try:
            # Validate the serializer data
            serializer.is_valid(raise_exception=True)
        except Exception as e:
            # Return an error response if validation fails
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        # Create a response with the validated data
        response = Response(serializer.validated_data)
        # Retrieve the new access token from the validated data
        access_token = serializer.validated_data.get('access')

        response.set_cookie(
            key=settings.SIMPLE_JWT['AUTH_COOKIE'],
            value=access_token,
            expires=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
            secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
            httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
            samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE'],
            max_age=3600  # 1 hour
        )

        # Remove the refresh and access tokens from the response data
        response.data.pop('refresh', None)
        response.data.pop('access', None)

        # Return the response
        return response

# Custom view to obtain JWT tokens (access and refresh) and store them in cookies
class CustomTokenObtainPairView(TokenObtainPairView):
    # Specify the custom serializer class to use
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        # Initialize the serializer with the request data
        serializer = self.get_serializer(data=request.data)
        # Validate the serializer data
        serializer.is_valid(raise_exception=True)
        # Create a response with the validated data
        response = Response(serializer.validated_data)

        # Retrieve the refresh and access tokens from the validated data
        access_token = serializer.validated_data['access']
        refresh_token = serializer.validated_data['refresh']

        # Set the access token in cookies
        response.set_cookie(
            key=settings.SIMPLE_JWT['AUTH_COOKIE'],
            value=access_token,
            expires=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
            secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
            httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
            samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE'],
            max_age=3600  # 1 hour
        )
        response.set_cookie(
            key='refreshToken',
            value=refresh_token,
            expires=settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'],
            secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
            httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
            samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE'],
            max_age=3600 * 24  # 1 day
        )

        # Remove the refresh and access tokens from the response data
        response.data.pop('refresh')
        response.data.pop('access')

        # Return the response
        return response

# View to handle user logout by deleting JWT tokens from cookies
class LogoutView(APIView):
    # Require the user to be authenticated to access this view
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        # Create a response indicating successful logout
        response = Response({"detail": "Successfully logged out."}, status=status.HTTP_200_OK)
        # Delete the access and refresh tokens from cookies
        response.delete_cookie('accessToken')
        response.delete_cookie('refreshToken')
        # Return the response
        return response

# View to check if the user is authenticated
class UserStatusView(APIView):
    # Require the user to be authenticated to access this view
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        # Return a response indicating the user is authenticated
        return Response({"message": "User is authenticated"}, status=status.HTTP_200_OK)
