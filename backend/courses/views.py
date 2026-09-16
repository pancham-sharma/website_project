from rest_framework import viewsets, permissions
from .models import Course, Branch, Semester, ContentStatus
from .serializers import CourseSerializer, BranchSerializer, SemesterSerializer

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

class CourseViewSet(PublishedOnlyForStudentsMixin, viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsAdminOrReadOnly]
    search_fields = ['name', 'code', 'description']

class BranchViewSet(PublishedOnlyForStudentsMixin, viewsets.ModelViewSet):
    queryset = Branch.objects.all()
    serializer_class = BranchSerializer
    permission_classes = [IsAdminOrReadOnly]
    filterset_fields = ['course']
    search_fields = ['name', 'short_name', 'code']

class SemesterViewSet(PublishedOnlyForStudentsMixin, viewsets.ModelViewSet):
    queryset = Semester.objects.all()
    serializer_class = SemesterSerializer
    permission_classes = [IsAdminOrReadOnly]
    filterset_fields = ['branch']
