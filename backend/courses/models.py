from django.db import models
from django.utils import timezone

class ContentStatus(models.TextChoices):
    DRAFT = 'Draft', 'Draft'
    PUBLISHED = 'Published', 'Published'
    ARCHIVED = 'Archived', 'Archived'

class Course(models.Model):
    name = models.CharField(max_length=255)
    code = models.CharField(max_length=50, blank=True)
    description = models.TextField(blank=True)
    thumbnail = models.ImageField(upload_to='courses/', blank=True, null=True)
    difficulty = models.CharField(max_length=50, blank=True)
    learning_objectives = models.TextField(blank=True)
    prerequisites = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=ContentStatus.choices, default=ContentStatus.DRAFT)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name

class Branch(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='branches')
    name = models.CharField(max_length=255)
    short_name = models.CharField(max_length=50, blank=True)
    code = models.CharField(max_length=50, blank=True)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='branches/', blank=True, null=True)
    status = models.CharField(max_length=20, choices=ContentStatus.choices, default=ContentStatus.DRAFT)
    
    def __str__(self):
        return f"{self.course.name} - {self.name}"

class Semester(models.Model):
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE, related_name='semesters')
    number = models.PositiveIntegerField()
    name = models.CharField(max_length=100, blank=True)
    description = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=ContentStatus.choices, default=ContentStatus.DRAFT)
    
    class Meta:
        ordering = ['number']
        unique_together = ('branch', 'number')
        
    def __str__(self):
        return f"{self.branch.name} - Semester {self.number}"
