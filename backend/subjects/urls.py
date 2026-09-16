from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    SubjectViewSet, ChapterViewSet, SyllabusViewSet,
    NoteViewSet, VideoViewSet, PYQViewSet,
    PracticeQuestionViewSet, InterviewQuestionViewSet
)

router = DefaultRouter()
router.register(r'subjects', SubjectViewSet)
router.register(r'chapters', ChapterViewSet)
router.register(r'syllabus', SyllabusViewSet)
router.register(r'notes', NoteViewSet)
router.register(r'videos', VideoViewSet)
router.register(r'pyqs', PYQViewSet)
router.register(r'practice-questions', PracticeQuestionViewSet)
router.register(r'interview-questions', InterviewQuestionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
