from django.urls import path, include
from users.views.authentication_views import (CustomTokenObtainPairView,
                                    CustomTokenRefreshView,
                                    LogoutView)
from users.views.users_views import (UserRegistrationView,
                                     UserProfileView,
                                     UserStatusView)
from users.views.csrf_token_views import get_csrf_token
from users.views.google_authentication_views import (GoogleLoginView,
                                     GoogleCallbackView,
                                     RefreshGoogleTokenView)
from users.views.verify_email_views import (VerifyEmailView,
                                            ValidateEmailVerificationLinkView,
                                            RequestEmailVerificationView,
                                            ResendEmailVerificationView)


urlpatterns = [
    # User Management
    path('create/', UserRegistrationView.as_view(), name='user-create'),
    path('profile/', UserProfileView.as_view(), name='user-profile'),
    path('status/', UserStatusView.as_view(), name='user-status'),

    # Authentication
    path('login/', CustomTokenObtainPairView.as_view(), name='login'),
    path('refresh-token/', CustomTokenRefreshView.as_view(), name='refresh-token'),
    path('logout/', LogoutView.as_view(), name='logout'),

    # Google OAuth
    path('google/login/', GoogleLoginView.as_view(), name='google-login'),
    path('google/callback/', GoogleCallbackView.as_view(), name='google-callback'),
    path('google/refresh_token/', RefreshGoogleTokenView.as_view(), name='google-refresh-token'),

    # Email Verification
    path('verify-email/', VerifyEmailView.as_view(), name='verify-email'),
    path('validate-email-verification-link', ValidateEmailVerificationLinkView.as_view(), name='validate_email_link'),
    path('request-email-verification/', RequestEmailVerificationView.as_view(), name='request-email-verification'),
    path('resend-email-verification', ResendEmailVerificationView.as_view(), name='resend-email-verification'),
]
