from django.urls import path
from api.views.auth_views import CustomTokenObtainPairView, CustomTokenRefreshView, UserStatusView, LogoutView
from api.views.users_views import UserCreateView, UserProfileView
from api.views.music_file_upload import MusicFileUploadView
from api.views.csrf_token_views import get_csrf_token

urlpatterns = [
    path("create/", UserCreateView.as_view(), name="user-create"),
    path('token/', CustomTokenObtainPairView.as_view(), name='token-obtain-pair'),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token-refresh'),
    path('status/', UserStatusView.as_view(), name='user-status'),
    path('logout/', LogoutView.as_view(), name='logout'),

    path('profile/', UserProfileView.as_view(), name='user-profile'),
    
    path('csrf/', get_csrf_token, name='get-csrf-token'),
    
    path('upload/', MusicFileUploadView.as_view(), name='file-upload'),
]