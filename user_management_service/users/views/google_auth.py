import requests
from django.http import HttpResponseRedirect, JsonResponse
from django.conf import settings
from django.views import View
from users.models import CustomUser
from rest_framework_simplejwt.tokens import RefreshToken

class GoogleLoginView(View):
    def get(self, request):
        google_auth_url = (
            "https://accounts.google.com/o/oauth2/v2/auth?"
            "response_type=code&"
            f"client_id={settings.SOCIALACCOUNT_PROVIDERS['google']['APP']['client_id']}&"
            "redirect_uri=http://localhost:8000/api/google/callback/&"
            "scope=email profile"
        )
        return HttpResponseRedirect(google_auth_url)

class GoogleCallbackView(View):
    def get(self, request):
        code = request.GET.get('code')
        token_url = "https://oauth2.googleapis.com/token"
        token_data = {
            'code': code,
            'client_id': settings.SOCIALACCOUNT_PROVIDERS['google']['APP']['client_id'],
            'client_secret': settings.SOCIALACCOUNT_PROVIDERS['google']['APP']['secret'],
            'redirect_uri': 'http://localhost:8000/api/google/callback/',
            'grant_type': 'authorization_code'
        }
        token_response = requests.post(token_url, data=token_data)
        token_json = token_response.json()
        access_token = token_json.get('access_token')
        google_refresh_token = token_json.get('refresh_token')
        user_info_url = "https://www.googleapis.com/oauth2/v1/userinfo"
        user_info_params = {'access_token': access_token}
        user_info_response = requests.get(user_info_url, params=user_info_params)
        user_info = user_info_response.json()

        email = user_info.get('email')
        first_name = user_info.get('given_name')
        last_name = user_info.get('family_name')

        # Check if user exists
        user, created = CustomUser.objects.get_or_create(
            email=email,
            defaults={'first_name': first_name, 'last_name': last_name, 'username': email}
        )

        # Generate tokens using RefreshToken
        refresh = RefreshToken.for_user(user)
        access_token_jwt = str(refresh.access_token)
        refresh_token_jwt = str(refresh)

        # Create response
        response = HttpResponseRedirect('http://localhost:5173/dashboard')  # Replace with your frontend URL

        # Set HTTP-only cookies for access and refresh tokens
        response.set_cookie('accessToken', access_token_jwt, httponly=True, secure=False, samesite='Lax')
        response.set_cookie('refreshToken', refresh_token_jwt, httponly=True, secure=False, samesite='Lax')
        response.set_cookie('googleRefreshToken', google_refresh_token, httponly=True, secure=False, samesite='Lax')

        return response

class RefreshGoogleTokenView(View):
    def post(self, request):
        user = request.user
        google_refresh_token = user.google_refresh_token

        token_url = "https://oauth2.googleapis.com/token"
        token_data = {
            'client_id': settings.SOCIALACCOUNT_PROVIDERS['google']['APP']['client_id'],
            'client_secret': settings.SOCIALACCOUNT_PROVIDERS['google']['APP']['secret'],
            'refresh_token': google_refresh_token,
            'grant_type': 'refresh_token'
        }
        token_response = requests.post(token_url, data=token_data)

        if token_response.status_code == 200:
            token_json = token_response.json()
            new_google_access_token = token_json.get('access_token')

            # Generate new JWT tokens using the new Google access token
            refresh = RefreshToken.for_user(user)
            access_token_jwt = str(refresh.access_token)
            refresh_token_jwt = str(refresh)

            # Create response
            response = JsonResponse({'message': 'Tokens refreshed'})

            # Set HTTP-only cookies for access and refresh tokens
            response.set_cookie('accessToken', access_token_jwt, httponly=True, secure=False, samesite='Lax')
        else:
            # Create response indicating failure
            response = JsonResponse({'message': 'Failed to refresh tokens'}, status=400)

            # Clear the access and refresh tokens from cookies
            response.delete_cookie('accessToken')
            response.delete_cookie('refreshToken')
            response.delete_cookie('googleRefreshToken')

        return response