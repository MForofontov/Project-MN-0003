from django.db import models
from django.contrib.auth import get_user_model

# Create your models here.

User = get_user_model()

def user_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
    return 'user_{0}/{1}'.format(instance.user.id, filename)

class MusicFile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='music_files')
    title = models.CharField(max_length=255)
    file = models.FileField(upload_to=user_directory_path)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title