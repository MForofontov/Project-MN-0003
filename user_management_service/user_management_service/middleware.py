from django.utils.deprecation import MiddlewareMixin

class TokenToAuthorizationHeaderMiddleware(MiddlewareMixin):
    def process_request(self, request):
        token = request.COOKIES.get('access_token')
        if token:
            # Add the token to the request headers
            request.META['HTTP_AUTHORIZATION'] = f'Bearer {token}'