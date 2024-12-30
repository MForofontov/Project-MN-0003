from celery import shared_task
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.conf import settings
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from users.models import CustomUser
from users.tokens.email_verification_token import email_verification_token

@shared_task
def send_verification_email(user_id):
    """
    Sends a verification email to the user.

    Parameters
    ----------
    user_id : int
        The ID of the user to send the verification email to.
    """
    try:
        user = CustomUser.objects.get(pk=user_id)
        token = email_verification_token.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        verification_link = f"{settings.FRONTEND_URL}/verify-email/{uid}/{token}/"
        subject = "Verify your email address"
        message = render_to_string('email_verification.html', {
            'user': user,
            'verification_link': verification_link,
        })
        send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [user.email])
    except CustomUser.DoesNotExist:
        pass
