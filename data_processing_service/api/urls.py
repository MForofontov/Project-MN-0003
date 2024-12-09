from django.urls import path
from api.views.music_file_upload import MusicFileUploadView

urlpatterns = [
    path('file-upload/', MusicFileUploadView.as_view(), name='file-upload'),
]
