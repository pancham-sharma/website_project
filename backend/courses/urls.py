from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CourseViewSet, BranchViewSet, SemesterViewSet

router = DefaultRouter()
router.register(r'courses', CourseViewSet)
router.register(r'branches', BranchViewSet)
router.register(r'semesters', SemesterViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
