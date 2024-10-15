import os
from datetime import datetime
from django.db import models
from django.contrib.auth import get_user_model

# Get the custom user model
User = get_user_model()

def user_directory_path(instance: 'MusicFile', filename: str) -> str:
    """
    Generate a file path for a new music file.

    Parameters
    ----------
    instance : MusicFile
        The instance of the MusicFile model.
    filename : str
        The original filename of the uploaded file.

    Returns
    -------
    str
        The generated file path.
    """
    
    uploaded_at = instance.uploaded_at.strftime('%Y-%m-%d_%H-%M-%S')
    name, ext = os.path.splitext(filename)
    unique_filename = f'{name}_{uploaded_at}.{ext}'
    # Return the unique file path
    return f'user_{instance.user.id}/music/{unique_filename}'


class MusicFile(models.Model):
    """
    Model representing a music file uploaded by a user.
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='music_files')
    file_name = models.CharField(max_length=255, blank=True)
    title = models.CharField(max_length=255, blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    file_path = models.FileField(upload_to=user_directory_path)

    def __str__(self) -> str:
        """
        Return a string representation of the music file.

        Returns
        -------
        str
            The title of the music file.
        """
        return self.title