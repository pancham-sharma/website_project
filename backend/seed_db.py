import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from courses.models import Course, Branch, Semester, ContentStatus
from subjects.models import Subject, Chapter, Note, Video

def seed():
    # Course
    course, _ = Course.objects.get_or_create(
        name="B.Tech",
        code="BTECH",
        status=ContentStatus.PUBLISHED
    )
    
    # Branch
    cse, _ = Branch.objects.get_or_create(
        course=course,
        name="Computer Science & Engineering",
        short_name="CSE",
        code="CSE",
        status=ContentStatus.PUBLISHED
    )
    
    # Semester
    sem3, _ = Semester.objects.get_or_create(
        branch=cse,
        number=3,
        status=ContentStatus.PUBLISHED
    )
    
    # Subject
    ds, _ = Subject.objects.get_or_create(
        name="Data Structures",
        code="CS-301",
        branch=cse,
        semester=sem3,
        status=ContentStatus.PUBLISHED,
        credits=4
    )
    
    # Chapter
    ch1, _ = Chapter.objects.get_or_create(
        subject=ds,
        title="Introduction to Data Structures",
        number=1,
        status=ContentStatus.PUBLISHED
    )
    
    # Note
    Note.objects.get_or_create(
        title="Introduction Notes",
        subject=ds,
        chapter=ch1,
        status=ContentStatus.PUBLISHED
    )
    
    print("Database seeded with Data Structures (CSE Sem 3)!")

if __name__ == '__main__':
    seed()
