from django.contrib.auth.tokens import PasswordResetTokenGenerator

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

# Create an instance of the EmailVerificationTokenGenerator
email_verification_token = EmailVerificationTokenGenerator()