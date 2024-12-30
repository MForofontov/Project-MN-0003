from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import force_text
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from users.tokens import email_verification_token

User = get_user_model()

class VerifyEmailView(APIView):
    """
    View to handle email verification.
    """
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
            user.is_email_confirmed = True
            user.save()
            return JsonResponse({'message': 'Email verified successfully.'})
        else:
            return JsonResponse({'message': 'Email verification failed.'}, status=400)
