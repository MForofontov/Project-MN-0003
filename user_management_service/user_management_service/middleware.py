from django.utils.deprecation import MiddlewareMixin
from django.utils.module_loading import import_string


class TokenToAuthorizationHeaderMiddleware(MiddlewareMixin):
    def process_request(self, request):
        # Lazy import settings to avoid circular import
        settings = import_string('django.conf.settings')
        
        # Extract the token from the HTTP-only cookie
        token = request.COOKIES.get(settings.SIMPLE_JWT['ACCESS_COOKIE'])
        if token:
            # Add the token to the request headers
            request.META['HTTP_AUTHORIZATION'] = f'Bearer {token}'