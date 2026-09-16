from rest_framework import viewsets, permissions
from .models import Subject, Chapter, Syllabus, Note, Video, PYQ, PracticeQuestion, InterviewQuestion
from .serializers import (
    SubjectSerializer, ChapterSerializer, SyllabusSerializer,
    NoteSerializer, VideoSerializer, PYQSerializer,
    PracticeQuestionSerializer, InterviewQuestionSerializer
)
from courses.models import ContentStatus

class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return request.user and request.user.is_authenticated
        return request.user and request.user.is_staff

class PublishedOnlyForStudentsMixin:
    def get_queryset(self):
        queryset = self.queryset
        if hasattr(self.request, 'user') and self.request.user.is_staff:
            return queryset
        return queryset.filter(status=ContentStatus.PUBLISHED)

class SubjectViewSet(PublishedOnlyForStudentsMixin, viewsets.ModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
    permission_classes = [IsAdminOrReadOnly]
    filterset_fields = ['branch', 'semester']
    search_fields = ['name', 'code', 'description']

class ChapterViewSet(PublishedOnlyForStudentsMixin, viewsets.ModelViewSet):
    queryset = Chapter.objects.all()
    serializer_class = ChapterSerializer
    permission_classes = [IsAdminOrReadOnly]
    filterset_fields = ['subject']

class SyllabusViewSet(PublishedOnlyForStudentsMixin, viewsets.ModelViewSet):
    queryset = Syllabus.objects.all()
    serializer_class = SyllabusSerializer
    permission_classes = [IsAdminOrReadOnly]
    filterset_fields = ['subject', 'branch', 'semester']

class NoteViewSet(PublishedOnlyForStudentsMixin, viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = [IsAdminOrReadOnly]
    filterset_fields = ['subject', 'chapter']
    search_fields = ['title', 'description', 'tags']

class VideoViewSet(PublishedOnlyForStudentsMixin, viewsets.ModelViewSet):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer
    permission_classes = [IsAdminOrReadOnly]
    filterset_fields = ['subject', 'chapter']
    search_fields = ['title', 'description', 'channel_name']

class PYQViewSet(PublishedOnlyForStudentsMixin, viewsets.ModelViewSet):
    queryset = PYQ.objects.all()
    serializer_class = PYQSerializer
    permission_classes = [IsAdminOrReadOnly]
    filterset_fields = ['subject', 'chapter', 'year', 'solved_status', 'branch', 'semester']

class PracticeQuestionViewSet(PublishedOnlyForStudentsMixin, viewsets.ModelViewSet):
    queryset = PracticeQuestion.objects.all()
    serializer_class = PracticeQuestionSerializer
    permission_classes = [IsAdminOrReadOnly]
    filterset_fields = ['subject', 'chapter', 'difficulty']

class InterviewQuestionViewSet(PublishedOnlyForStudentsMixin, viewsets.ModelViewSet):
    queryset = InterviewQuestion.objects.all()
    serializer_class = InterviewQuestionSerializer
    permission_classes = [IsAdminOrReadOnly]
    filterset_fields = ['subject', 'chapter', 'difficulty', 'topic']
