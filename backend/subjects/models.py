from django.db import models
from django.utils import timezone
from courses.models import Semester, Branch

class ContentStatus(models.TextChoices):
    DRAFT = 'Draft', 'Draft'
    PUBLISHED = 'Published', 'Published'
    ARCHIVED = 'Archived', 'Archived'

class Subject(models.Model):
    name = models.CharField(max_length=255)
    code = models.CharField(max_length=50)
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE, related_name='subjects', null=True, blank=True)
    semester = models.ForeignKey(Semester, on_delete=models.CASCADE, related_name='subjects')
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='subjects/', blank=True, null=True)
    credits = models.PositiveIntegerField(default=3)
    difficulty = models.CharField(max_length=50, blank=True)
    status = models.CharField(max_length=20, choices=ContentStatus.choices, default=ContentStatus.DRAFT)
    display_order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['display_order', 'name']

    def __str__(self):
        return f"{self.name} ({self.code})"

class Chapter(models.Model):
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='chapters')
    title = models.CharField(max_length=255)
    number = models.PositiveIntegerField(default=1)
    description = models.TextField(blank=True)
    learning_objectives = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=ContentStatus.choices, default=ContentStatus.DRAFT)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'number']

    def __str__(self):
        return f"{self.subject.name} - Ch {self.number}: {self.title}"

class Syllabus(models.Model):
    title = models.CharField(max_length=255)
    subject = models.OneToOneField(Subject, on_delete=models.CASCADE, related_name='syllabus')
    academic_year = models.CharField(max_length=20, blank=True)
    description = models.TextField(blank=True)
    file = models.FileField(upload_to='syllabus/')
    status = models.CharField(max_length=20, choices=ContentStatus.choices, default=ContentStatus.DRAFT)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"Syllabus: {self.subject.name}"

class Note(models.Model):
    title = models.CharField(max_length=255)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='notes')
    chapter = models.ForeignKey(Chapter, on_delete=models.SET_NULL, null=True, blank=True, related_name='notes')
    description = models.TextField(blank=True)
    file = models.FileField(upload_to='notes/')
    thumbnail = models.ImageField(upload_to='notes/thumbnails/', blank=True, null=True)
    tags = models.CharField(max_length=255, blank=True)
    status = models.CharField(max_length=20, choices=ContentStatus.choices, default=ContentStatus.DRAFT)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class Video(models.Model):
    title = models.CharField(max_length=255)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='videos')
    chapter = models.ForeignKey(Chapter, on_delete=models.SET_NULL, null=True, blank=True, related_name='videos')
    description = models.TextField(blank=True)
    youtube_url = models.URLField()
    channel_name = models.CharField(max_length=255, blank=True)
    thumbnail_url = models.URLField(blank=True)
    display_order = models.PositiveIntegerField(default=0)
    status = models.CharField(max_length=20, choices=ContentStatus.choices, default=ContentStatus.DRAFT)
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ['display_order', 'created_at']

    def __str__(self):
        return self.title

class PYQ(models.Model):
    SOLVED = 'Solved'
    UNSOLVED = 'Unsolved'
    SOLVED_CHOICES = [(SOLVED, 'Solved'), (UNSOLVED, 'Unsolved')]

    title = models.CharField(max_length=255)
    university = models.CharField(max_length=255, blank=True)
    year = models.PositiveIntegerField()
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='pyqs')
    chapter = models.ForeignKey(Chapter, on_delete=models.SET_NULL, null=True, blank=True, related_name='pyqs')
    file = models.FileField(upload_to='pyqs/')
    solved_status = models.CharField(max_length=20, choices=SOLVED_CHOICES, default=UNSOLVED)
    description = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=ContentStatus.choices, default=ContentStatus.DRAFT)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.title} ({self.year})"

class PracticeQuestion(models.Model):
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='practice_questions')
    chapter = models.ForeignKey(Chapter, on_delete=models.SET_NULL, null=True, blank=True, related_name='practice_questions')
    question = models.TextField()
    difficulty = models.CharField(max_length=50, blank=True)
    question_type = models.CharField(max_length=50, default='MCQ')
    options = models.JSONField(help_text="Format: ['A', 'B', 'C', 'D']")
    correct_answer = models.CharField(max_length=255)
    explanation = models.TextField(blank=True)
    marks = models.PositiveIntegerField(default=1)
    tags = models.CharField(max_length=255, blank=True)
    status = models.CharField(max_length=20, choices=ContentStatus.choices, default=ContentStatus.DRAFT)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"Practice: {self.question[:30]}..."

class InterviewQuestion(models.Model):
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='interview_questions')
    chapter = models.ForeignKey(Chapter, on_delete=models.SET_NULL, null=True, blank=True, related_name='interview_questions')
    question = models.TextField()
    answer = models.TextField()
    explanation = models.TextField(blank=True)
    difficulty = models.CharField(max_length=50, blank=True)
    topic = models.CharField(max_length=255, blank=True)
    tags = models.CharField(max_length=255, blank=True)
    status = models.CharField(max_length=20, choices=ContentStatus.choices, default=ContentStatus.DRAFT)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"Interview: {self.question[:30]}..."
