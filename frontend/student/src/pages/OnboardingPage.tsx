import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { GraduationCap, BookOpen, Layers } from 'lucide-react';

export const OnboardingPage: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch courses on mount
    const fetchCourses = async () => {
      try {
        const response = await api.get('/courses/');
        const data = response.data.results || response.data;
        setCourses(data);
      } catch (err) {
        console.error("Failed to load courses");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCourses();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourse || !selectedBranch || !selectedSemester) return;
    
    setIsSaving(true);
    try {
      const accessToken = localStorage.getItem('access_token');
      await api.put('/accounts/profile/', {
        course: selectedCourse,
        branch: selectedBranch,
        semester: selectedSemester
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      // Redirect to dashboard on success
      navigate('/dashboard');
    } catch (err) {
      console.error("Failed to save profile", err);
    } finally {
      setIsSaving(false);
    }
  };

  const safeCourses = Array.isArray(courses) ? courses : [];
  const currentCourse = safeCourses.find(c => c?.id?.toString() === selectedCourse);
  const branches = currentCourse?.branches || [];
  const currentBranch = branches.find((b: any) => b?.id?.toString() === selectedBranch);
  const semesters = currentBranch?.semesters || [];

  if (isLoading) {
    return <div className="min-h-[80vh] flex items-center justify-center">Loading options...</div>;
  }

  if (safeCourses.length === 0 && !isLoading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold mb-4">No Courses Available</h2>
        <p className="mb-4 text-muted-foreground">The administrator hasn't added any courses yet.</p>
        <button onClick={() => navigate('/login')} className="btn btn-ghost text-sm underline mt-4">
          Back to Login
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-[500px] bg-surface-container-lowest border border-border rounded-lg shadow-sm p-8">
        <div className="text-center mb-8">
          <div className="h-12 w-12 bg-primary text-primary-foreground rounded-lg flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="h-8 w-8" />
          </div>
          <h1 className="text-2xl font-semibold text-primary tracking-tight mb-2">Set Up Your Profile</h1>
          <p className="text-muted-foreground text-sm">
            Select your academic details so we can tailor the study material for you.
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-6" style={{ padding: '0 10px' }}>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-outline-variant">Course</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-outline">
                <BookOpen className="h-5 w-5" />
              </div>
              <select
                required
                value={selectedCourse}
                onChange={e => {
                  setSelectedCourse(e.target.value);
                  setSelectedBranch('');
                  setSelectedSemester('');
                }}
                className="w-full pl-12 pr-4 py-4 text-base border border-input rounded bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              >
                <option value="">Select a Course</option>
                {safeCourses.map(course => (
                  <option key={course.id} value={course.id}>{course.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-outline-variant">Branch</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-outline">
                <BookOpen className="h-5 w-5" />
              </div>
              <select
                required
                value={selectedBranch}
                onChange={e => {
                  setSelectedBranch(e.target.value);
                  setSelectedSemester('');
                }}
                disabled={!selectedCourse}
                className="w-full pl-12 pr-4 py-4 text-base border border-input rounded bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:border-primary outline-none disabled:opacity-50"
              >
                <option value="">Select a Branch</option>
                {branches.map((branch: any) => (
                  <option key={branch.id} value={branch.id}>{branch.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-outline-variant">Semester</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-outline">
                <Layers className="h-5 w-5" />
              </div>
              <select
                required
                value={selectedSemester}
                onChange={e => setSelectedSemester(e.target.value)}
                disabled={!selectedBranch}
                className="w-full pl-12 pr-4 py-4 text-base border border-input rounded bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:border-primary outline-none disabled:opacity-50"
              >
                <option value="">Select a Semester</option>
                {semesters.map((semester: any) => (
                  <option key={semester.id} value={semester.id}>Semester {semester.number}</option>
                ))}
              </select>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={!selectedCourse || !selectedBranch || !selectedSemester || isSaving}
            className="w-full bg-primary hover:bg-accent text-primary-foreground font-medium rounded-md py-3 transition-colors disabled:opacity-50 mt-4"
          >
            {isSaving ? 'Saving...' : 'Save and Go to Dashboard →'}
          </button>
        </form>
      </div>
    </div>
  );
};
