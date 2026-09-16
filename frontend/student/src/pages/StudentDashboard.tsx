import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Book, FileText, HelpCircle, CheckSquare, Bookmark, Settings, LogOut, Download, PlaySquare } from 'lucide-react';
import api from '../api';

export const StudentDashboard: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const [profileRes, coursesRes] = await Promise.all([
          api.get('/accounts/profile/', { headers: { Authorization: `Bearer ${token}` } }),
          api.get('/courses/')
        ]);
        setProfile(profileRes.data);
        setCourses(coursesRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const getProfileText = () => {
    if (!profile || !courses.length) return "Loading...";
    const course = courses.find(c => c.id === profile.course);
    const branch = course?.branches.find((b: any) => b.id === profile.branch);
    const semester = branch?.semesters.find((s: any) => s.id === profile.semester);
    if (!course || !branch || !semester) return "Profile Not Setup";
    return `${course.name} ${branch.name} • Semester ${semester.number} • Enrolled Since 2026`;
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] -m-4 sm:-m-6 lg:-m-8">
      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Navigation Sidebar */}
        <div className="w-64 border-r border-border bg-surface-container-lowest flex flex-col shrink-0 overflow-y-auto hidden md:flex">
          <div className="p-4 border-b border-border">
            <h2 className="text-xl font-bold text-primary flex items-center">
              <span className="w-6 h-6 bg-primary text-primary-foreground rounded flex items-center justify-center mr-2 text-xs">S</span>
              EduCare
            </h2>
          </div>
          
          <div className="flex-1 py-4 flex flex-col gap-1">
            <div className="px-4 text-xs font-bold uppercase tracking-wider text-outline-variant mb-2 mt-2">Menu</div>
            <Link to="/dashboard" className="flex items-center px-6 py-2.5 bg-surface-container-low text-primary font-bold border-r-2 border-primary">
              <Home className="w-4 h-4 mr-3" /> Dashboard
            </Link>
            <Link to="/courses" className="flex items-center px-6 py-2.5 text-muted-foreground hover:bg-surface-container-low hover:text-foreground font-medium transition-colors">
              <Book className="w-4 h-4 mr-3" /> My Courses
            </Link>
            
            <div className="px-4 text-xs font-bold uppercase tracking-wider text-outline-variant mb-2 mt-4">Resources</div>
            <Link to="#" className="flex items-center px-6 py-2.5 text-muted-foreground hover:bg-surface-container-low hover:text-foreground font-medium transition-colors">
              <FileText className="w-4 h-4 mr-3" /> Notes
            </Link>
            <Link to="#" className="flex items-center px-6 py-2.5 text-muted-foreground hover:bg-surface-container-low hover:text-foreground font-medium transition-colors">
              <HelpCircle className="w-4 h-4 mr-3" /> PYQs
            </Link>
            <Link to="#" className="flex items-center px-6 py-2.5 text-muted-foreground hover:bg-surface-container-low hover:text-foreground font-medium transition-colors">
              <CheckSquare className="w-4 h-4 mr-3" /> Practice
            </Link>
            <Link to="#" className="flex items-center px-6 py-2.5 text-muted-foreground hover:bg-surface-container-low hover:text-foreground font-medium transition-colors">
              <Download className="w-4 h-4 mr-3" /> Downloads
            </Link>
            
            <div className="px-4 text-xs font-bold uppercase tracking-wider text-outline-variant mb-2 mt-4">Account</div>
            <Link to="#" className="flex items-center px-6 py-2.5 text-muted-foreground hover:bg-surface-container-low hover:text-foreground font-medium transition-colors">
              <Bookmark className="w-4 h-4 mr-3" /> Bookmarks
            </Link>
            <Link to="#" className="flex items-center px-6 py-2.5 text-muted-foreground hover:bg-surface-container-low hover:text-foreground font-medium transition-colors">
              <Settings className="w-4 h-4 mr-3" /> Settings
            </Link>
          </div>
          
          <div className="p-4 border-t border-border">
            <button className="flex items-center w-full px-4 py-2 text-muted-foreground hover:bg-surface-container-low hover:text-foreground font-medium transition-colors rounded">
              <LogOut className="w-4 h-4 mr-3" /> Sign Out
            </button>
          </div>
        </div>
        
        {/* Main Content Area */}
        <div className="flex-1 bg-surface-container-lowest overflow-y-auto p-6 md:p-8">
          
          <div className="flex justify-between items-center mb-8 border-b border-border pb-6">
            <div>
              <h1 className="text-display-sm font-bold tracking-tight text-primary mb-1">Welcome back!</h1>
              <p className="text-muted-foreground">{getProfileText()}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-surface-container border border-border flex items-center justify-center font-bold text-lg text-primary">
              A
            </div>
          </div>
          
          {/* Continue Learning Banner */}
          <div className="bg-surface-container-lowest border border-border rounded-xl p-6 mb-10 shadow-sm relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 bg-surface-container text-[10px] uppercase font-bold tracking-wider rounded">Continue Learning</span>
                <span className="text-xs text-muted-foreground">Database Management Systems</span>
              </div>
              <h2 className="text-xl font-bold text-primary mb-2">Chapter 3.4: Relational Algebra Fundamentals</h2>
              <p className="text-sm text-muted-foreground max-w-2xl">Recent Activity: You left off at "Select, Project, and Rename Operations" on Slide 12.</p>
            </div>
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="w-full md:w-24">
                <div className="flex justify-between text-xs font-medium mb-1"><span>Progress</span><span>65%</span></div>
                <div className="w-full bg-surface-container rounded-full h-1.5">
                  <div className="bg-primary h-1.5 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
              <Link to="/subject/dbms" className="px-6 py-2.5 bg-primary text-primary-foreground font-medium rounded hover:bg-accent transition-colors shrink-0 flex items-center shadow-sm">
                Resume Learning
              </Link>
            </div>
          </div>
          
          {/* Recent Learning Focus Grid */}
          <div className="mb-10">
            <h2 className="text-title-md font-bold text-primary mb-4 flex items-center justify-between">
              Recent Learning Focus
              <span className="text-xs font-bold text-outline-variant hover:text-primary cursor-pointer">VIEW ALL</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { type: 'Notes', title: 'Relational Algebra', course: 'DBMS', time: '2 hours ago', icon: FileText },
                { type: 'Video', title: 'Process Scheduling Algorithms', course: 'OS', time: '1 day ago', icon: PlaySquare },
                { type: 'PYQ', title: 'AKTU 2023 OS Paper', course: 'OS', time: '2 days ago', icon: HelpCircle },
                { type: 'Practice', title: 'Computer Networks Topologies', course: 'CN', time: '3 days ago', icon: CheckSquare }
              ].map((item, i) => (
                <div key={i} className="bg-surface-container-lowest border border-border rounded-lg p-4 hover:border-primary transition-colors cursor-pointer group shadow-sm hover:shadow-md">
                  <div className="flex justify-between mb-3">
                    <item.icon className="w-5 h-5 text-outline-variant group-hover:text-primary transition-colors" />
                    <span className="text-[10px] uppercase font-bold bg-surface-container px-1.5 py-0.5 rounded text-muted-foreground">{item.course}</span>
                  </div>
                  <h3 className="font-bold text-sm text-primary mb-1 line-clamp-2">{item.title}</h3>
                  <div className="text-xs text-muted-foreground">{item.time}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Enrolled Courses */}
          <div className="mb-10">
            <h2 className="text-title-md font-bold text-primary mb-4">Enrolled Courses (Semester 5)</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { name: 'Database Management Systems', code: 'CS-502', progress: 45 },
                { name: 'Operating Systems', code: 'CS-501', progress: 12 },
                { name: 'Computer Networks', code: 'CS-503', progress: 5 }
              ].map((course, i) => (
                <div key={i} className="bg-surface-container-lowest border border-border rounded-xl p-5 hover:border-primary transition-all shadow-sm">
                  <span className="text-[10px] bg-surface-container px-1.5 py-0.5 rounded text-outline-variant uppercase font-bold tracking-wider mb-2 inline-block">{course.code}</span>
                  <h3 className="font-bold text-base text-primary mb-4 line-clamp-1 hover:underline cursor-pointer">{course.name}</h3>
                  <div className="w-full">
                    <div className="flex justify-between text-[10px] font-bold text-outline-variant mb-1">
                      <span>Course Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="w-full bg-surface-container rounded-full h-1.5 mb-4">
                      <div className="bg-primary h-1.5 rounded-full" style={{ width: `${course.progress}%` }}></div>
                    </div>
                  </div>
                  <Link to={`/subject/${course.code.toLowerCase().replace('-', '')}`} className="w-full py-2 border border-border rounded text-sm font-bold text-center block hover:bg-surface-container-low transition-colors">
                    Access Course
                  </Link>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};
