import os
from django.db.models.signals import post_delete
from django.dispatch import receiver
from .models import MusicFile

@receiver(post_delete, sender=MusicFile)
def delete_report_file(sender: type, instance: MusicFile, **kwargs: dict) -> None:
    """
    Signal handler that deletes the file associated with a MusicFile instance
    when the instance is deleted.

    Parameters
    ----------
    sender : type
        The model class that sent the signal.
    instance : MusicFile
        The instance of the model that is being deleted.
    **kwargs : dict
        Additional keyword arguments.

    Returns
    -------
    None
    """
    # Check if the instance has a file associated with it
    if instance.file:
        # Check if the file exists in the filesystem
        if os.path.isfile(instance.file.path):
            # Remove the file from the filesystem
            os.remove(instance.file.path)