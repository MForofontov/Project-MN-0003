from django.utils.deprecation import MiddlewareMixin

class TokenToAuthorizationHeaderMiddleware(MiddlewareMixin):
    def process_request(self, request):
        # Extract the token from the HTTP-only cookie
        token = request.COOKIES.get('accessToken')
        if token:
            # Add the token to the request headers
            request.META['HTTP_AUTHORIZATION'] = f'Bearer {token}'