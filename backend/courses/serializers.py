from rest_framework import serializers
from .models import Course, Branch, Semester

class SemesterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Semester
        fields = '__all__'

class BranchSerializer(serializers.ModelSerializer):
    semesters = SemesterSerializer(many=True, read_only=True)
    
    class Meta:
        model = Branch
        fields = '__all__'

class CourseSerializer(serializers.ModelSerializer):
    branches = BranchSerializer(many=True, read_only=True)
    
    class Meta:
        model = Course
        fields = '__all__'
