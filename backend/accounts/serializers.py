from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password

User = get_user_model()

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'first_name', 'last_name')
        
    def create(self, validated_data):
        # We enforce email as username in the model, but Django AbstractUser still needs username
        # So we can set username to email if it's not provided
        email = validated_data.get('email')
        username = validated_data.get('username', email)
        
        user = User.objects.create(
            username=username,
            email=email,
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            password=make_password(validated_data['password']),
            role=User.Role.STUDENT
        )
        return user

from .models import StudentProfile

class StudentProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentProfile
        fields = ('course', 'branch', 'semester')

