from rest_framework import permissions, status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.views import APIView
from api.serializers import MusicFileSerializer
from api.tasks import process_file_task  # Import the Celery task

class MusicFileUploadView(APIView):
    # Require the user to be authenticated to access this view
    permission_classes = [permissions.IsAuthenticated]

    # Specify the parsers to handle file uploads
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        # Deserialize the incoming data
        serializer = MusicFileSerializer(data=request.data)
        
        # Check if the data is valid
        if serializer.is_valid():
            # Save the valid data to create a new MusicFile instance
            music_file = serializer.save(user=request.user)
            
            # Trigger the asynchronous processing task
            process_file_task.delay(music_file.file.path)
            
            # Return the serialized data and a 201 Created status
            return Response({
                'message': 'File uploaded successfully. Processing in progress.',
                'data': serializer.data
            }, status=status.HTTP_201_CREATED)
        else:
            # Return the validation errors and a 400 Bad Request status
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)