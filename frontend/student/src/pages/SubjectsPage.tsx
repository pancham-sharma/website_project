import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronRight, Search, CheckSquare, Clock, FolderOpen } from 'lucide-react';

export const SubjectsPage: React.FC = () => {
  const { semesterId } = useParams<{ semesterId: string }>();

  const subjects = [
    {
      id: 'dbms',
      code: 'CS-502',
      type: 'Core',
      name: 'Database Management Systems',
      desc: 'Relational algebra, SQL, Normalization, Concurrency Control, Transaction Mgmt, and distributed database architecture.',
      progress: 45,
      chapters: 12,
      resources: 64,
      status: 'In Progress'
    },
    {
      id: 'cn',
      code: 'CS-503',
      type: 'Core',
      name: 'Computer Networks',
      desc: 'OSI model, TCP/IP, IP addressing, routing algorithms, medium access control protocols, and network security.',
      progress: 15,
      chapters: 10,
      resources: 52,
      status: 'Started'
    },
    {
      id: 'os',
      code: 'CS-501',
      type: 'Core',
      name: 'Operating Systems',
      desc: 'Process management, CPU scheduling, deadlocks, memory management, virtual memory, and file systems.',
      progress: 0,
      chapters: 14,
      resources: 88,
      status: 'Not Started'
    },
    {
      id: 'se',
      code: 'CS-504',
      type: 'Core',
      name: 'Software Engineering',
      desc: 'Agile/SDLC models, requirement engineering, UML diagrams, software testing methodologies, and project management.',
      progress: 80,
      chapters: 8,
      resources: 42,
      status: 'Advanced'
    },
    {
      id: 'web',
      code: 'CS-505',
      type: 'Elective',
      name: 'Web Technologies',
      desc: 'HTML5, CSS3, JavaScript ES6+, React.js fundamentals, Node.js backend integration, and RESTful API design.',
      progress: 100,
      chapters: 9,
      resources: 75,
      status: 'Completed'
    },
    {
      id: 'ai',
      code: 'CS-506',
      type: 'Elective',
      name: 'Artificial Intelligence',
      desc: 'Search algorithms, Knowledge representation, Expert systems, NLP fundamentals, and introductory machine learning.',
      progress: 5,
      chapters: 11,
      resources: 50,
      status: 'Started'
    }
  ];

  return (
    <div className="flex flex-col pb-20 pt-8 flex-1">
      
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-muted-foreground mb-6 overflow-x-auto whitespace-nowrap hide-scrollbar">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <Link to="/courses" className="hover:text-foreground">Courses</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <Link to="/branch/cse" className="hover:text-foreground">Engineering</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <Link to="/branch/cse/semesters" className="hover:text-foreground">Semesters</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-foreground font-medium">Semester {semesterId || 5}</span>
      </div>

      {/* Header */}
      <div className="mb-8 flex flex-col lg:flex-row justify-between items-start gap-6">
        <div>
          <h1 className="text-display-sm font-bold tracking-tight text-primary mb-2">Semester 5 Subjects</h1>
          <p className="text-body-lg text-muted-foreground max-w-3xl">
            B.Tech Computer Science & Engineering • Academic Session 2024-2025 • <span className="text-primary font-medium">6 Subjects Allocated</span>
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-outline">
              <Search className="w-4 h-4" />
            </div>
            <input 
              type="text" 
              className="w-full p-2 pl-10 text-sm border border-border rounded bg-surface-container-lowest focus:ring-2 focus:ring-surface-variant focus:border-primary outline-none transition-all"
              placeholder="Search subjects in Sem 5..."
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">View:</span>
            <select className="border border-border bg-surface-container-lowest text-sm rounded px-3 py-2 outline-none font-medium cursor-pointer w-full sm:w-auto focus:ring-2 focus:ring-surface-variant">
              <option>Grid View</option>
              <option>List View</option>
            </select>
          </div>
        </div>
      </div>

      {/* Progress Banner */}
      <div className="bg-surface-container-lowest border border-border rounded-xl p-5 mb-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded bg-surface-container flex items-center justify-center shrink-0">
            <FolderOpen className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-bold text-base text-primary">Semester 5 Progress Overview</h3>
            <p className="text-sm text-muted-foreground">3/6 Subjects Started • 1 Subject Completed</p>
          </div>
        </div>
        <div className="w-full md:w-1/3 flex items-center gap-4">
          <div className="flex-1">
            <div className="w-full bg-surface-container rounded-full h-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: '38%' }}></div>
            </div>
          </div>
          <span className="text-sm font-bold text-primary shrink-0">38%</span>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {subjects.map((sub) => (
          <div key={sub.id} className="bg-surface-container-lowest border border-border rounded-xl flex flex-col group hover:border-primary transition-all shadow-sm relative overflow-hidden">
            
            <div className="p-5 flex-1">
              <div className="flex justify-between items-start mb-4">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded ${
                  sub.type === 'Core' ? 'bg-surface-container text-foreground' : 'bg-surface-container-low border border-border text-muted-foreground'
                }`}>
                  {sub.code} • {sub.type}
                </span>
                
                {sub.progress === 100 ? (
                  <span className="flex items-center text-xs font-bold text-primary"><CheckSquare className="w-3.5 h-3.5 mr-1" /> Done</span>
                ) : sub.progress > 0 ? (
                  <span className="text-xs font-medium text-outline-variant">{sub.status}</span>
                ) : null}
              </div>
              
              <h3 className="font-bold text-lg text-primary mb-2 group-hover:underline cursor-pointer leading-tight">{sub.name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-3 mb-5 leading-relaxed">
                {sub.desc}
              </p>
              
              <div className="grid grid-cols-2 gap-4 text-xs font-medium text-outline-variant border-t border-border pt-4 mb-4">
                <div className="flex flex-col">
                  <span className="uppercase text-[10px] tracking-wider mb-1">Chapters</span>
                  <span className="text-foreground text-sm font-bold">{sub.chapters}</span>
                </div>
                <div className="flex flex-col">
                  <span className="uppercase text-[10px] tracking-wider mb-1">Resources</span>
                  <span className="text-foreground text-sm font-bold">{sub.resources}</span>
                </div>
              </div>
              
              <div className="w-full">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider mb-1.5 text-outline-variant">
                  <span>Subject Progress</span>
                  <span className={sub.progress > 0 ? 'text-primary' : ''}>{sub.progress}%</span>
                </div>
                <div className="w-full bg-surface-container rounded-full h-1.5">
                  <div className={`h-1.5 rounded-full ${sub.progress === 100 ? 'bg-primary' : sub.progress > 0 ? 'bg-primary opacity-80' : 'bg-transparent'}`} style={{ width: `${sub.progress}%` }}></div>
                </div>
              </div>
            </div>
            
            <Link to={`/subject/${sub.id}`} className="border-t border-border bg-surface-container-low p-4 flex justify-center items-center transition-colors rounded-b-xl text-sm font-bold text-primary hover:bg-surface-container">
              {sub.progress > 0 ? 'Resume Subject' : 'Start Subject'}
            </Link>
          </div>
        ))}
      </div>
      
      {/* Footer info */}
      <div className="flex items-start gap-3 p-4 bg-surface-container-low border border-border rounded-lg text-sm text-muted-foreground">
        <Clock className="w-5 h-5 text-outline shrink-0 mt-0.5" />
        <p>
          Academic syllabus mapped dynamically for standard engineering universities. Practical/Lab components and final assessments must be completed according to university schedules. <span className="font-medium text-primary hover:underline cursor-pointer">Customize your syllabus</span>
        </p>
      </div>

    </div>
  );
};
