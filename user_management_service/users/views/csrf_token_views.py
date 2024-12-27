from django.http import JsonResponse, HttpRequest
from django.views.decorators.csrf import ensure_csrf_cookie

@ensure_csrf_cookie
def get_csrf_token(request: HttpRequest) -> JsonResponse:
    """
    View to set the CSRF token in the client's cookies.

    This view is decorated with ensure_csrf_cookie to ensure that a CSRF token
    is set in the client's cookies. It returns a JSON response indicating that
    the CSRF token has been set.

    Parameters
    ----------
    request : HttpRequest
        The HTTP request object.

    Returns
    -------
    JsonResponse
        A JSON response indicating that the CSRF token has been set.
    """
    return JsonResponse({'message': 'CSRF token set'})