from django.db import models
from django.contrib.auth import get_user_model
from music.models import MusicFile

User = get_user_model()

def report_directory_path(instance: 'Report', filename: str) -> str:
    """
    Generate a file path for a new report file.

    Parameters
    ----------
    instance : Report
        The instance of the Report model.
    filename : str
        The original filename of the uploaded file.

    Returns
    -------
    str
        The generated file path.
    """
    # file will be uploaded to MEDIA_ROOT/user_<id>/reports/<filename>
    return 'user_{0}/reports/{1}'.format(instance.user.id, filename)

class Report(models.Model):
    """
    Model representing a report uploaded by a user.
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reports')
    music_file = models.ForeignKey(MusicFile, on_delete=models.CASCADE, related_name='reports')
    title = models.CharField(max_length=255)
    file = models.FileField(upload_to=report_directory_path)
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