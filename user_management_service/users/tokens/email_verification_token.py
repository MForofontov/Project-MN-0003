from django.contrib.auth.tokens import PasswordResetTokenGenerator
from datetime import datetime, timedelta

class EmailVerificationTokenGenerator(PasswordResetTokenGenerator):
    """
    Custom token generator for email verification.
    
    This class extends Django's PasswordResetTokenGenerator to create tokens
    for email verification purposes. The token is generated using the user's
    primary key, a timestamp, and the user's email confirmation status.
    """
    def _make_hash_value(self, user, timestamp):
        """
        Generate a hash value to be used in the token.

        Parameters
        ----------
        user : CustomUser
            The user for whom the token is being generated.
        timestamp : int
            The timestamp when the token is generated.

        Returns
        -------
        str
            A string representing the hash value.
        """
        return (
            str(user.pk) + str(timestamp) + str(user.is_email_confirmed)
        )

    def has_token_expired(self, user, token):
        """
        Check if the token has expired.
        """
        try:
            timestamp = self._get_timestamp(token)
            expiration_date = datetime.fromtimestamp(timestamp) + timedelta(days=1)  # Assuming 1 day expiration
            return datetime.now() > expiration_date
        except Exception:
            return False
    
    def _get_timestamp(self, token):
        """
        Extract the timestamp from the token.

        Parameters
        ----------
        token : str
            The token from which to extract the timestamp.

        Returns
        -------
        int
            The timestamp extracted from the token.
        """
        try:
            ts_b36, _ = token.split("-")
            return int(ts_b36, 36)
        except ValueError:
            return None

# Create an instance of the EmailVerificationTokenGenerator
email_verification_token = EmailVerificationTokenGenerator()