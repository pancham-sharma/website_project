import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, FileText, CheckCircle, BookOpen, AlertTriangle, ArrowRight, Download } from 'lucide-react';

export const SemestersPage: React.FC = () => {

  const semesters = [
    { num: 1, title: 'Semester 1', desc: 'Foundation Math, Physics, Basic Programming & Communication', core: 5, practical: 3, elective: 0 },
    { num: 2, title: 'Semester 2', desc: 'Engineering Math II, Chemistry, Engineering Graphics & Mechanics', core: 5, practical: 4, elective: 0 },
    { num: 3, title: 'Semester 3', desc: 'Data Structures, Digital Logic, Discrete Math & OOP', core: 6, practical: 3, elective: 0 },
    { num: 4, title: 'Semester 4', desc: 'Computer Organization, Algorithms, Theory of Computation', core: 6, practical: 3, elective: 0 },
    { num: 5, title: 'Semester 5', desc: 'DBMS, Operating Systems, Computer Networks & Software Engg', core: 5, practical: 3, elective: 1, active: true },
    { num: 6, title: 'Semester 6', desc: 'Web Technologies, Compiler Design, AI & Electives', core: 4, practical: 2, elective: 2 },
    { num: 7, title: 'Semester 7', desc: 'Cloud Computing, Machine Learning & Major Project Phase I', core: 3, practical: 1, elective: 3 },
    { num: 8, title: 'Semester 8', desc: 'Industrial Training, Major Project Phase II & Electives', core: 1, practical: 1, elective: 2 },
  ];

  return (
    <div className="flex flex-col pb-20 pt-8">
      
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-muted-foreground mb-6">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <Link to="/courses" className="hover:text-foreground">Courses</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <Link to="/branch/cse" className="hover:text-foreground">Engineering</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-foreground font-medium">Semesters</span>
      </div>

      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-display-sm font-bold tracking-tight text-primary mb-2">Student Semesters</h1>
          <p className="text-body-lg text-muted-foreground max-w-3xl">
            <span className="font-semibold text-foreground">B.Tech Computer Science & Engineering (CSE)</span>: Syllabus and curriculum mapping according to standard Indian engineering universities.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">Academic Year:</span>
          <select className="border border-border bg-surface-container-lowest text-sm rounded px-3 py-1.5 outline-none font-medium text-primary cursor-pointer focus:ring-2 focus:ring-surface-variant">
            <option>2024 - 2025 (Current)</option>
            <option>2023 - 2024</option>
          </select>
        </div>
      </div>

      {/* Active Semester Banner */}
      <div className="bg-surface-container-lowest border border-border rounded-xl p-6 mb-12 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-primary"></div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-2 py-0.5 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider rounded">Active Semester</span>
              <span className="text-xs text-muted-foreground font-medium">B.Tech CSE • Semester 5 (3rd Year)</span>
            </div>
            <h2 className="text-title-lg font-bold text-primary mb-2">Resume Semester 5: Core Computing & Systems</h2>
            <p className="text-sm text-muted-foreground">You are currently accessing materials for Database Management Systems (DBMS), Operating Systems (OS), and Computer Networks (CN).</p>
            
            <div className="flex items-center gap-4 mt-4 text-xs font-medium text-outline-variant">
              <span className="flex items-center gap-1 text-primary"><BookOpen className="w-3.5 h-3.5" /> 5/6 Subjects Accessed</span>
              <span className="flex items-center gap-1"><FileText className="w-3.5 h-3.5" /> 24 PDFs Downloaded</span>
              <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5" /> 4 PYQs Solved</span>
            </div>
          </div>
          
          <div className="w-full md:w-64 flex flex-col gap-4">
            <div>
              <div className="flex justify-between text-xs font-bold text-primary mb-1">
                <span>Semester Completion</span>
                <span>45%</span>
              </div>
              <div className="w-full bg-surface-container rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            <Link to="/semester/5/subjects" className="w-full py-2.5 bg-primary text-primary-foreground font-medium rounded-md hover:bg-accent transition-colors flex items-center justify-center shadow-sm">
              Resume Semester 5 <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto border-b border-border mb-8 hide-scrollbar">
        <div className="flex space-x-6 text-sm font-medium">
          <button className="pb-3 border-b-2 border-primary text-primary font-bold whitespace-nowrap">All Semesters (1-8)</button>
          <button className="pb-3 border-b-2 border-transparent text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap">First Year (Sem 1-2)</button>
          <button className="pb-3 border-b-2 border-transparent text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap">Second Year (Sem 3-4)</button>
          <button className="pb-3 border-b-2 border-transparent text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap">Third Year (Sem 5-6)</button>
          <button className="pb-3 border-b-2 border-transparent text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap">Fourth Year (Sem 7-8)</button>
        </div>
      </div>

      {/* Semesters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {semesters.map((sem) => (
          <div key={sem.num} className={`bg-surface-container-lowest border ${sem.active ? 'border-primary ring-1 ring-primary' : 'border-border'} rounded-xl flex flex-col group hover:border-primary transition-all shadow-sm relative overflow-hidden`}>
            
            {sem.active && (
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-bl">
                Current
              </div>
            )}
            
            <div className="p-5 flex-1">
              <div className="flex gap-2 mb-3">
                {[...Array(3)].map((_, i) => <div key={i} className="w-1.5 h-1.5 rounded-full bg-outline-variant"></div>)}
              </div>
              <h3 className="font-bold text-title-md text-primary mb-2 group-hover:underline cursor-pointer">{sem.title}</h3>
              <div className="text-xs text-outline-variant font-medium mb-3 uppercase tracking-wider">
                Year {Math.ceil(sem.num / 2)} • {sem.num % 2 !== 0 ? 'Odd Semester' : 'Even Semester'}
              </div>
              <p className="text-sm text-muted-foreground line-clamp-3 mb-6 leading-relaxed h-14">
                {sem.desc}
              </p>
              
              <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-xs border-t border-border pt-4">
                <div className="flex items-center gap-1.5 text-foreground font-medium">
                  <div className="w-2 h-2 rounded bg-primary"></div> {sem.core} Core
                </div>
                <div className="flex items-center gap-1.5 text-foreground font-medium">
                  <div className="w-2 h-2 rounded bg-surface-tint"></div> {sem.practical} Labs
                </div>
                <div className="flex items-center gap-1.5 text-foreground font-medium">
                  <div className="w-2 h-2 rounded border border-outline"></div> {sem.elective} Elective
                </div>
              </div>
            </div>
            
            <Link to={`/semester/${sem.num}/subjects`} className={`border-t border-border p-4 flex justify-between items-center transition-colors rounded-b-xl text-sm font-medium ${sem.active ? 'bg-primary text-primary-foreground hover:bg-accent' : 'bg-surface-container-low text-primary hover:bg-surface-container'}`}>
              Explore Semester
              <ChevronRight className={`w-4 h-4 ${sem.active ? 'text-primary-foreground' : 'text-outline group-hover:text-primary'} transition-colors`} />
            </Link>
          </div>
        ))}
      </div>

      {/* Info Section */}
      <div className="bg-surface-container-lowest border border-border rounded-xl p-6 shadow-sm flex flex-col md:flex-row gap-6 items-start">
        <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center shrink-0 text-primary">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-bold text-lg text-primary mb-2">Academic Prerequisite Guidelines</h3>
          <p className="text-sm text-muted-foreground mb-4 max-w-3xl leading-relaxed">
            Students are advised to follow the recommended semester progression. Core subjects from earlier semesters (like Data Structures in Sem 3) form the foundational prerequisites for advanced subjects (like Algorithms in Sem 4 and DBMS in Sem 5). Attempting advanced subjects without clearing prerequisites may result in poor comprehension.
          </p>
          <div className="flex gap-4">
            <button className="px-4 py-2 border border-border rounded bg-background text-sm font-medium hover:bg-surface-container-low transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" /> Download Full Syllabus PDF
            </button>
            <button className="px-4 py-2 border border-border rounded bg-background text-sm font-medium hover:bg-surface-container-low transition-colors flex items-center gap-2">
              Academic Credits Info
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
