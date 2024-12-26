from django.urls import path, include
from users.views.auth_views import (CustomTokenObtainPairView,
                                    CustomTokenRefreshView,
                                    UserStatusView,
                                    LogoutView,)
from users.views.users_views import UserCreateView, UserProfileView
from users.views.csrf_token_views import get_csrf_token
from users.views.google_auth import GoogleLoginView, GoogleCallbackView, RefreshGoogleTokenView

urlpatterns = [
    path("create/", UserCreateView.as_view(), name="user-create"),
    path('token/', CustomTokenObtainPairView.as_view(), name='token-obtain-pair'),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token-refresh'),
    path('status/', UserStatusView.as_view(), name='user-status'),
    path('logout/', LogoutView.as_view(), name='logout'),

    path('profile/', UserProfileView.as_view(), name='user-profile'),
    
    path('csrf/', get_csrf_token, name='get-csrf-token'),

    path('google/login/', GoogleLoginView.as_view(), name='google-login'),
    path('google/callback/', GoogleCallbackView.as_view(), name='google-callback'),
    path('google/refresh_token', RefreshGoogleTokenView.as_view(), name='google-refresh-token')
    path('accounts/', include('allauth.urls')),

]