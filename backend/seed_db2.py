import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from courses.models import Course, Branch, Semester, ContentStatus
from subjects.models import Subject

def seed():
    # Fetch existing B.Tech
    btech = Course.objects.filter(code="BTECH").first()
    
    # Add B.Tech Branches
    ee, _ = Branch.objects.get_or_create(course=btech, name="Electrical Engineering", short_name="EE", code="EE", status=ContentStatus.PUBLISHED)
    me, _ = Branch.objects.get_or_create(course=btech, name="Mechanical Engineering", short_name="ME", code="ME", status=ContentStatus.PUBLISHED)
    ce, _ = Branch.objects.get_or_create(course=btech, name="Civil Engineering", short_name="CE", code="CE", status=ContentStatus.PUBLISHED)
    
    for branch in [ee, me, ce]:
        for i in range(1, 9):
            Semester.objects.get_or_create(branch=branch, number=i, status=ContentStatus.PUBLISHED)

    # Add BCA
    bca, _ = Course.objects.get_or_create(name="BCA (Bachelor of Computer Applications)", code="BCA", status=ContentStatus.PUBLISHED)
    bca_gen, _ = Branch.objects.get_or_create(course=bca, name="General", short_name="GEN", code="BCA-GEN", status=ContentStatus.PUBLISHED)
    for i in range(1, 7):
        Semester.objects.get_or_create(branch=bca_gen, number=i, status=ContentStatus.PUBLISHED)

    # Add MCA
    mca, _ = Course.objects.get_or_create(name="MCA (Master of Computer Applications)", code="MCA", status=ContentStatus.PUBLISHED)
    mca_gen, _ = Branch.objects.get_or_create(course=mca, name="General", short_name="GEN", code="MCA-GEN", status=ContentStatus.PUBLISHED)
    for i in range(1, 5):
        Semester.objects.get_or_create(branch=mca_gen, number=i, status=ContentStatus.PUBLISHED)

    # Add B.Sc
    bsc, _ = Course.objects.get_or_create(name="B.Sc (Bachelor of Science)", code="BSC", status=ContentStatus.PUBLISHED)
    bsc_cs, _ = Branch.objects.get_or_create(course=bsc, name="Computer Science", short_name="CS", code="BSC-CS", status=ContentStatus.PUBLISHED)
    bsc_it, _ = Branch.objects.get_or_create(course=bsc, name="Information Technology", short_name="IT", code="BSC-IT", status=ContentStatus.PUBLISHED)
    
    for branch in [bsc_cs, bsc_it]:
        for i in range(1, 7):
            Semester.objects.get_or_create(branch=branch, number=i, status=ContentStatus.PUBLISHED)
            
    print("Database seeded with additional courses (BCA, MCA, B.Sc) and branches (EE, ME, CE)!")

if __name__ == '__main__':
    seed()
