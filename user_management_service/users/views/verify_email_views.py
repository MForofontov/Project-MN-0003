from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import force_text
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from django.http import HttpRequest
from users.tokens.email_verification_token import email_verification_token
from users.models import CustomUser
from users.tasks.send_verification_email import send_verification_email

User = get_user_model()

class VerifyEmailView(APIView):
    """
    View to handle email verification.
    """
    permission_classes = [AllowAny]

    def get(self, request, uidb64, token):
        """
        Handles GET requests for email verification.

        Parameters
        ----------
        request : HttpRequest
            The HTTP request object.
        uidb64 : str
            The base64 encoded user ID.
        token : str
            The verification token.

        Returns
        -------
        JsonResponse
            A JSON response indicating the result of the email verification.
        """
        try:
            # Decode the user ID
            uid = force_text(urlsafe_base64_decode(uidb64))
            
            # Get the user object
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None

        # Check if the token is valid
        if user is not None and email_verification_token.check_token(user, token):
            user.is_email_verified = True
            user.save()
            return JsonResponse({'message': 'Email verified successfully.'})
        else:
            return JsonResponse({'message': 'Email verification failed.'}, status=400)

class RequestEmailVerificationView(APIView):
    """
    View to request email verification for the authenticated user.
    """
    # Require the user to be authenticated to access this view
    permission_classes = [IsAuthenticated]

    def post(self, request: HttpRequest) -> Response:
        """
        Handles POST requests to request email verification for the authenticated user.

        Parameters
        ----------
        request : HttpRequest
            The HTTP request object.

        Returns
        -------
        Response
            A response indicating that the email verification request has been sent.
        """
        # Get the authenticated user
        user: CustomUser = request.user

        # Check if the user's email is already verified
        if user.is_email_verified:
            return Response({"message": "Email is already verified"}, status=status.HTTP_200_OK)

        # Send the email verification link
        send_verification_email.delay(user.id)

        # Return a response indicating that the email verification request has been sent
        return Response({"message": "Email verification request sent"}, status=status.HTTP_200_OK)
