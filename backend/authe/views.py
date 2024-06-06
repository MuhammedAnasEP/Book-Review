from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegisterSerializer

# Create your views here.

class Register(APIView):
    def post(setlf, request):
        """
        Handles the POST request for user registration.
        First check the data using serializer. If the data is valid, save the user and return the response.
        If the data is not valid, return the error message.
        """
        data = request.data
        serializer = RegisterSerializer(data=data)

        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            if user is not None:
                return Response({'status':'Registered', 'data':serializer.data}, status=status.HTTP_201_CREATED)
        
        return Response({'error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
