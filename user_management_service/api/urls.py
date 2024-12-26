from django.urls import path, include
from users.views.auth_views import (CustomTokenObtainPairView,
                                    CustomTokenRefreshView,
                                    UserStatusView,
                                    LogoutView,
                                    google_login_callback)
from users.views.users_views import UserCreateView, UserProfileView
from users.views.csrf_token_views import get_csrf_token

urlpatterns = [
    path("create/", UserCreateView.as_view(), name="user-create"),
    path('token/', CustomTokenObtainPairView.as_view(), name='token-obtain-pair'),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token-refresh'),
    path('status/', UserStatusView.as_view(), name='user-status'),
    path('logout/', LogoutView.as_view(), name='logout'),

    path('profile/', UserProfileView.as_view(), name='user-profile'),
    
    path('csrf/', get_csrf_token, name='get-csrf-token'),

    path('accounts/google/login/callback/', google_login_callback, name='google_login_view'),
    path('accounts/', include('allauth.urls')),

]