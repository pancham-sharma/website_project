from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import get_user_model
from .serializers import UserRegistrationSerializer, StudentProfileSerializer
from .models import StudentProfile

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = UserRegistrationSerializer

class StudentProfileView(generics.RetrieveUpdateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = StudentProfileSerializer

    def get_object(self):
        # Create profile if it somehow doesn't exist
        profile, created = StudentProfile.objects.get_or_create(user=self.request.user)
        return profile

