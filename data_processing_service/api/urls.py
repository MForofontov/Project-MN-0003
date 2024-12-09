from django.urls import path
from process_music_files.views.music_file_upload import MusicFileUploadView

urlpatterns = [
    path('file-upload/', MusicFileUploadView.as_view(), name='file-upload'),
]
