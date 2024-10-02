from celery import shared_task
import time  # Example for simulating a long process
from django.core.files.base import ContentFile
from django.db import transaction
from reports.models import Report
from music.models import MusicFile

@shared_task
def process_file_task(file_path: str) -> None:
    """
    Process the uploaded file asynchronously and generate a report.

    Parameters
    ----------
    file_path : str
        The path to the uploaded file.

    Returns
    -------
    None
    """
    # Add your file processing logic here
    # For example, you could transcode the audio file, extract metadata, etc.
    print(f"Processing file: {file_path}")
    
    # Simulate a long process
    time.sleep(10)
    
    print(f"Finished processing file: {file_path}")

    # Find the MusicFile instance associated with the file_path
    try:
        music_file = MusicFile.objects.get(file=file_path)
    except MusicFile.DoesNotExist:
        print(f"MusicFile with path {file_path} does not exist.")
        return

    # Generate the report content
    report_content = f"Analysis of {music_file.title}\n"
    report_content += "This is a placeholder for the actual analysis.\n"

    # Create a ContentFile from the report content
    report_file = ContentFile(report_content.encode('utf-8'))

    # Create a new Report instance and save the report file
    with transaction.atomic():
        report = Report(
            user=music_file.user,
            music_file=music_file,
            title=f"Report for {music_file.title}"
        )
        report.file.save(f'report_{music_file.id}.txt', report_file)
        report.save()

    print(f"Report generated and saved for file: {file_path}")