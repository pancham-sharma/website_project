from rest_framework import serializers
from .models import Subject, Chapter, Syllabus, Note, Video, PYQ, PracticeQuestion, InterviewQuestion

class SyllabusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Syllabus
        fields = '__all__'

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'

class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = '__all__'

class PYQSerializer(serializers.ModelSerializer):
    class Meta:
        model = PYQ
        fields = '__all__'

class PracticeQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PracticeQuestion
        fields = '__all__'

class InterviewQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = InterviewQuestion
        fields = '__all__'

class ChapterSerializer(serializers.ModelSerializer):
    notes = NoteSerializer(many=True, read_only=True)
    videos = VideoSerializer(many=True, read_only=True)
    pyqs = PYQSerializer(many=True, read_only=True)
    practice_questions = PracticeQuestionSerializer(many=True, read_only=True)
    interview_questions = InterviewQuestionSerializer(many=True, read_only=True)

    class Meta:
        model = Chapter
        fields = '__all__'

class SubjectSerializer(serializers.ModelSerializer):
    chapters = ChapterSerializer(many=True, read_only=True)
    syllabus = SyllabusSerializer(read_only=True)
    
    class Meta:
        model = Subject
        fields = '__all__'
