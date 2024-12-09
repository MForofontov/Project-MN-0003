from rest_framework import serializers
from process_music_files.models import MusicFile

class MusicFileSerializer(serializers.ModelSerializer):
    # Meta class to specify the model and fields to be serialized
    class Meta:
        # Specify the model to be serialized
        model = MusicFile
        # Specify the fields to be included in the serialization
        fields = ['title', 'file_path']
