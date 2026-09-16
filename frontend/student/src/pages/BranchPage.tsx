import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronRight, CheckSquare, Clock, ArrowRight, Laptop, Settings, Zap, Database, Building2, Brain, Activity, ShieldCheck } from 'lucide-react';

export const BranchPage: React.FC = () => {

  const branches = [
    {
      id: 'cse',
      name: 'Computer Science & Engineering',
      desc: 'Core algorithms, software engineering, systems programming, network security, computer architecture, and advanced theoretical computer science.',
      icon: Laptop,
      subjects: 42,
      students: '12K',
      recommended: true
    },
    {
      id: 'it',
      name: 'Information Technology',
      desc: 'Focus on applied computing, database management systems, network administration, web technologies, and enterprise software architecture.',
      icon: Database,
      subjects: 38,
      students: '8.5K',
      recommended: false
    },
    {
      id: 'aiml',
      name: 'Artificial Intelligence & ML',
      desc: 'Deep learning networks, natural language processing, computer vision, predictive analytics models, and intelligent automated systems.',
      icon: Brain,
      subjects: 35,
      students: '15K',
      recommended: true
    },
    {
      id: 'ds',
      name: 'Data Science',
      desc: 'Big data analytics, statistical modeling, data visualization, predictive intelligence systems, structured data mining, and distributed cloud computing.',
      icon: Activity,
      subjects: 32,
      students: '9K',
      recommended: false
    },
    {
      id: 'ece',
      name: 'Electronics & Communication',
      desc: 'Analog/digital circuits, signal processing, VLSI design, microprocessor architecture, telecommunication networks, and embedded systems.',
      icon: Zap,
      subjects: 45,
      students: '10K',
      recommended: true
    },
    {
      id: 'eee',
      name: 'Electrical Engineering',
      desc: 'Power systems analysis, control engineering, power electronics, high voltage machines, smart power grids, and sustainable energy mechanisms.',
      icon: ShieldCheck,
      subjects: 44,
      students: '7K',
      recommended: false
    },
    {
      id: 'me',
      name: 'Mechanical Engineering',
      desc: 'Thermodynamics, fluid mechanics, CAD/CAM/CAE modeling, machine kinematics, manufacturing processes, and structural material science.',
      icon: Settings,
      subjects: 48,
      students: '8K',
      recommended: false
    },
    {
      id: 'ce',
      name: 'Civil Engineering',
      desc: 'Structural analysis, concrete technology, geotech engineering, transport infrastructure, fluid hydraulics, and environmental resource management.',
      icon: Building2,
      subjects: 46,
      students: '6K',
      recommended: false
    }
  ];

  return (
    <div className="flex flex-col pb-20 pt-8 flex-1">
      
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-muted-foreground mb-6">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <Link to="/courses" className="hover:text-foreground">Courses</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-foreground font-medium">B.Tech (Bachelor of Technology)</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* Main Content */}
        <div className="flex-1">
          <div className="mb-10">
            <h1 className="text-display-sm font-bold tracking-tight text-primary mb-2">Choose Your Branch</h1>
            <p className="text-body-lg text-muted-foreground">Select your engineering discipline to access structured syllabi, verified previous papers, university PYQs, and curated video lectures.</p>
            
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-outline">
                  <Search className="w-5 h-5" />
                </div>
                <input 
                  type="text" 
                  className="w-full p-3 pl-12 text-base border border-border rounded-lg bg-surface-container-lowest focus:ring-2 focus:ring-surface-variant focus:border-primary outline-none transition-all"
                  placeholder="Search across branches like 'Artificial Intelligence' or 'ECE'..."
                />
              </div>
              <button className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-accent transition-colors flex items-center justify-center whitespace-nowrap shadow-sm">
                Search
              </button>
            </div>
          </div>

          {/* Top Recommendations */}
          <div className="mb-12">
            <h2 className="text-title-md font-bold text-primary mb-4 flex items-center">
              Top Recommendations
              <span className="ml-2 text-xs font-normal text-muted-foreground">Most active engineering streams in the platform this semester</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {branches.filter(b => b.recommended).map(branch => (
                <Link key={branch.id} to={`/branch/${branch.id}/semesters`} className="bg-surface-container-lowest border border-border rounded-xl p-5 hover:border-primary transition-all group shadow-sm hover:shadow-md">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-base text-primary leading-tight line-clamp-2">{branch.name}</h3>
                    <span className="px-2 py-0.5 bg-surface-container-low border border-border rounded text-xs font-medium text-muted-foreground whitespace-nowrap">{branch.id.toUpperCase()}</span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">{branch.desc}</p>
                  <div className="flex justify-between items-center text-xs font-medium text-outline-variant">
                    <div className="flex items-center gap-1"><CheckSquare className="w-3.5 h-3.5" /> {branch.subjects} Subjects</div>
                    <div className="text-primary font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center">Explore <ArrowRight className="w-3 h-3 ml-1"/></div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* All Branches */}
          <div>
            <div className="flex justify-between items-center mb-4 border-b border-border pb-2">
              <h2 className="text-title-md font-bold text-primary">All Engineering Branches</h2>
              <span className="text-sm text-muted-foreground">{branches.length} options available</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {branches.map(branch => (
                <div key={branch.id} className="bg-surface-container-lowest border border-border rounded-xl flex flex-col group hover:border-primary transition-all shadow-sm">
                  <div className="p-5 flex-1">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-surface-container rounded-lg flex items-center justify-center text-primary shrink-0">
                          <branch.icon className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-lg text-primary leading-tight group-hover:underline cursor-pointer">{branch.name}</h3>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-5 leading-relaxed">{branch.desc}</p>
                    
                    <div className="flex gap-6 text-sm text-outline-variant">
                      <div className="flex items-center gap-1.5"><CheckSquare className="w-4 h-4" /> <span className="font-medium text-foreground">{branch.subjects}</span> <span className="hidden sm:inline">Core Subjects</span></div>
                      <div className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> <span className="font-medium text-foreground">{branch.students}</span> <span className="hidden sm:inline">Active Students</span></div>
                    </div>
                  </div>
                  
                  <div className="border-t border-border bg-surface-container-low rounded-b-xl px-5 py-3 flex justify-between items-center">
                    <div className="flex gap-2">
                      <span className="text-xs bg-surface-container px-2 py-1 rounded font-medium">B.Tech</span>
                      <span className="text-xs bg-surface-container px-2 py-1 rounded font-medium">{branch.id.toUpperCase()}</span>
                    </div>
                    <Link to={`/branch/${branch.id}/semesters`} className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded hover:bg-accent transition-colors flex items-center">
                      Explore Branch <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-full lg:w-80 flex flex-col gap-6 shrink-0">
          
          <div className="bg-surface-container-lowest border border-border rounded-xl p-5 shadow-sm">
            <h3 className="font-bold text-base border-b border-border pb-3 mb-4 flex items-center justify-between">
              B.Tech Branches <span className="text-xs bg-surface-container px-2 py-0.5 rounded font-medium">Top 5</span>
            </h3>
            <ul className="space-y-1">
              {[
                { name: 'Computer Science (CSE)', count: '12,450' },
                { name: 'Artificial Intelligence', count: '8,210' },
                { name: 'Electronics & Comm.', count: '5,100' },
                { name: 'Information Technology', count: '4,890' },
                { name: 'Data Science & Analytics', count: '3,200' },
              ].map((b, i) => (
                <li key={i} className="flex justify-between items-center text-sm p-2 hover:bg-surface-container-low rounded cursor-pointer transition-colors group">
                  <span className="text-muted-foreground group-hover:text-primary font-medium flex items-center gap-2">
                    <span className="w-4 h-4 flex items-center justify-center bg-surface-container text-[10px] rounded text-outline-variant">{i+1}</span>
                    {b.name}
                  </span>
                  <span className="text-xs text-outline-variant font-medium">{b.count}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-3 border-t border-border">
              <Link to="/courses" className="text-xs font-bold text-primary flex items-center hover:underline">
                View all branches <ChevronRight className="w-3 h-3 ml-1" />
              </Link>
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-border rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-surface-container rounded-lg flex items-center justify-center">
                <CheckSquare className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-bold text-base leading-tight">AICTE Syllabus Aligned</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              All courses are properly structured according to standard UGC/AICTE syllabus requirements for Indian engineering universities.
            </p>
            <button className="w-full py-2 border border-border rounded text-sm font-medium hover:bg-surface-container-low transition-colors">
              View Syllabus Details
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
};
