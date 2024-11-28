from django.db import models
from django.contrib.auth import get_user_model
from music.models import MusicFile

User = get_user_model()

class Report(models.Model):
    """
    Model representing a report uploaded by a user.
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reports')
    music_file = models.ForeignKey(MusicFile, on_delete=models.CASCADE, related_name='reports')
    title = models.CharField(max_length=255)
    result = models.TextField()
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        """
        Return a string representation of the report.

        Returns
        -------
        str
            The title of the report.
        """
        return self.title