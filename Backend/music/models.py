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
    # file will be uploaded to MEDIA_ROOT/user_<id>/music/<filename>
    return 'user_{0}/music/{1}'.format(instance.user.id, filename)

class MusicFile(models.Model):
    """
    Model representing a music file uploaded by a user.
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='music_files')
    title = models.CharField(max_length=255)
    file = models.FileField(upload_to=user_directory_path)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        """
        Return a string representation of the music file.

        Returns
        -------
        str
            The title of the music file.
        """
        return self.title