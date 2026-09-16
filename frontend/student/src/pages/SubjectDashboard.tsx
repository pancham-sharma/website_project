import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { BookOpen, FileText, PlaySquare, HelpCircle, CheckSquare, Clock, Download, ChevronRight, Lock } from 'lucide-react';

export const SubjectDashboard: React.FC = () => {
  const { subjectId } = useParams<{ subjectId: string }>();


  // Dummy data matching the mockup
  const chapters = [
    { id: 1, title: 'Introduction to Database Systems & Architecture', progress: 100, completed: true },
    { id: 2, title: 'Conceptual Modeling via Entity-Relationship (ER) Model', progress: 100, completed: true },
    { id: 3, title: 'Relational Model & Relational Algebra', progress: 80, completed: false },
    { id: 4, title: 'Structured Query Language (SQL) Mastering', progress: 0, completed: false, locked: false },
    { id: 5, title: 'Database Refinement & Normalization', progress: 0, completed: false, locked: true },
    { id: 6, title: 'Transaction Management & Concurrency Control', progress: 0, completed: false, locked: true },
  ];

  return (
    <div className="flex flex-col pb-20 pt-8 flex-1">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-muted-foreground mb-6 overflow-x-auto whitespace-nowrap hide-scrollbar">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <Link to="/courses" className="hover:text-foreground">Courses</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <Link to="/branch/cse/semesters" className="hover:text-foreground">B.Tech CSE</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <Link to="/semester/5/subjects" className="hover:text-foreground">Semester 5</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-foreground font-medium">Database Management Systems</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Main Content Area */}
        <div className="flex-1">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-display-sm font-bold tracking-tight text-primary mb-2">Database Management Systems</h1>
            <p className="text-body-lg text-muted-foreground mb-6">
              Comprehensive study material covering ER models, relational algebra, SQL queries, normalization, indexing, concurrency control, and transaction management.
            </p>
            
            <div className="flex flex-wrap gap-4 text-sm font-medium">
              <Link to={`/subject/${subjectId}/notes`} className="flex items-center px-4 py-2 bg-surface-container-low border border-border rounded-md hover:border-primary transition-colors">
                <FileText className="w-4 h-4 mr-2" /> PDF Notes
              </Link>
              <Link to={`/subject/${subjectId}/videos`} className="flex items-center px-4 py-2 bg-surface-container-low border border-border rounded-md hover:border-primary transition-colors">
                <PlaySquare className="w-4 h-4 mr-2" /> Video Lectures
              </Link>
              <Link to={`/subject/${subjectId}/pyq`} className="flex items-center px-4 py-2 bg-surface-container-low border border-border rounded-md hover:border-primary transition-colors">
                <HelpCircle className="w-4 h-4 mr-2" /> PYQs (Solved)
              </Link>
              <Link to={`/subject/${subjectId}/practice`} className="flex items-center px-4 py-2 bg-surface-container-low border border-border rounded-md hover:border-primary transition-colors">
                <CheckSquare className="w-4 h-4 mr-2" /> Practice MCQs
              </Link>
            </div>
          </div>

          <div className="flex space-x-6 border-b border-border mb-6 text-sm font-bold">
            <button className="pb-2 border-b-2 border-primary text-primary">Curriculum / Roadmap</button>
            <button className="pb-2 border-transparent text-muted-foreground hover:text-foreground">Downloads (14)</button>
            <button className="pb-2 border-transparent text-muted-foreground hover:text-foreground">Bookmarks</button>
            <button className="pb-2 border-transparent text-muted-foreground hover:text-foreground">Discussions</button>
          </div>

          {/* Chapters List */}
          <div className="flex justify-between items-end mb-4">
            <h2 className="text-title-lg font-bold text-primary flex items-center gap-2">
              <BookOpen className="w-5 h-5" /> Curriculum Chapter Roadmap
            </h2>
            <span className="text-sm font-medium text-muted-foreground">3 of 12 Chapters Completed</span>
          </div>

          <div className="space-y-4 mb-12">
            {chapters.map((chapter) => (
              <div key={chapter.id} className={`bg-surface-container-lowest border ${chapter.locked ? 'border-border opacity-60' : chapter.progress > 0 && chapter.progress < 100 ? 'border-primary ring-1 ring-primary' : 'border-border'} rounded-xl p-5 relative overflow-hidden transition-all hover:border-primary`}>
                
                {chapter.locked && (
                  <div className="absolute inset-0 bg-surface-container-lowest/50 z-10 flex items-center justify-center backdrop-blur-[1px]">
                    <div className="bg-background px-4 py-2 rounded-full border border-border shadow-sm flex items-center text-sm font-bold text-muted-foreground">
                      <Lock className="w-4 h-4 mr-2" /> Complete previous modules to unlock
                    </div>
                  </div>
                )}
                
                {/* Status indicator line */}
                {!chapter.locked && (
                  <div className={`absolute left-0 top-0 bottom-0 w-1 ${chapter.completed ? 'bg-primary' : chapter.progress > 0 ? 'bg-primary' : 'bg-transparent'}`}></div>
                )}
                
                <div className="flex gap-4">
                  <div className="shrink-0 flex flex-col items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${chapter.completed ? 'bg-primary text-primary-foreground' : 'bg-surface-container text-foreground'}`}>
                      {chapter.id}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="text-[10px] font-bold text-outline-variant uppercase tracking-wider mb-1 block">Chapter {chapter.id} • {(chapter.progress === 100 ? 'Completed' : chapter.progress > 0 ? 'In Progress' : 'Not Started')}</span>
                        <h3 className="text-lg font-bold text-primary">{chapter.title}</h3>
                      </div>
                      
                      {!chapter.locked && (
                        <span className="text-xs font-bold px-2 py-1 bg-surface-container rounded">{chapter.progress}%</span>
                      )}
                    </div>
                    
                    <div className="flex gap-4 mt-4 text-xs font-medium">
                      <span className="flex items-center text-muted-foreground hover:text-foreground cursor-pointer"><FileText className="w-3.5 h-3.5 mr-1" /> 4 Notes</span>
                      <span className="flex items-center text-muted-foreground hover:text-foreground cursor-pointer"><PlaySquare className="w-3.5 h-3.5 mr-1" /> 6 Videos</span>
                      <span className="flex items-center text-muted-foreground hover:text-foreground cursor-pointer"><HelpCircle className="w-3.5 h-3.5 mr-1" /> PYQs</span>
                    </div>
                    
                    {!chapter.locked && chapter.progress > 0 && chapter.progress < 100 && (
                      <div className="mt-4 flex gap-3">
                        <Link to={`/subject/${subjectId}/notes`} className="px-4 py-2 bg-primary text-primary-foreground text-sm font-bold rounded hover:bg-accent transition-colors flex items-center">
                          Resume Chapter <ChevronRight className="w-4 h-4 ml-1" />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Recommended Notes / PYQs */}
          <div className="mb-12">
            <h2 className="text-title-md font-bold text-primary mb-4">Recommended Notes & Exam Prep Material</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: 'GATE 2024 Database Systems Subject Solutions', type: 'PYQ', time: '1 hour ago' },
                { title: 'Normalization Decision Matrix & Formulas', type: 'Notes', time: '3 hours ago' },
                { title: 'B-Trees vs B+Trees: Technical Breakdown', type: 'Notes', time: '1 day ago' }
              ].map((item, i) => (
                <div key={i} className="bg-surface-container-lowest border border-border rounded-xl p-4 flex flex-col justify-between hover:border-primary transition-colors cursor-pointer group">
                  <div>
                    <span className="text-[10px] bg-surface-container font-bold px-1.5 py-0.5 rounded text-outline-variant mb-2 inline-block">{item.type}</span>
                    <h3 className="font-bold text-sm text-primary mb-2 group-hover:underline leading-tight line-clamp-2">{item.title}</h3>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-xs text-muted-foreground flex items-center"><Clock className="w-3 h-3 mr-1" /> {item.time}</span>
                    <Download className="w-4 h-4 text-outline group-hover:text-primary transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Right Sidebar */}
        <div className="w-full lg:w-80 flex flex-col gap-6 shrink-0">
          
          {/* Progress Tracker */}
          <div className="bg-surface-container-lowest border border-border rounded-xl p-5 shadow-sm">
            <h3 className="font-bold text-base border-b border-border pb-3 mb-4 flex items-center justify-between">
              Learning Metrics
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-muted-foreground">Curriculum Syllabus</span>
                  <span className="text-primary">28% (3/12 Chapters)</span>
                </div>
                <div className="w-full bg-surface-container rounded-full h-1.5">
                  <div className="bg-primary h-1.5 rounded-full" style={{ width: '28%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-muted-foreground">Practice Questions Solved</span>
                  <span className="text-primary">42% (68/150)</span>
                </div>
                <div className="w-full bg-surface-container rounded-full h-1.5">
                  <div className="bg-primary h-1.5 rounded-full" style={{ width: '42%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-muted-foreground">Video Lectures Watched</span>
                  <span className="text-primary">15% (6/40)</span>
                </div>
                <div className="w-full bg-surface-container rounded-full h-1.5">
                  <div className="bg-primary h-1.5 rounded-full" style={{ width: '15%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-surface-container-lowest border border-border rounded-xl p-5 shadow-sm">
            <h3 className="font-bold text-base border-b border-border pb-3 mb-4 flex items-center justify-between">
              Recent Academic Activity
            </h3>
            <div className="space-y-4">
              {[
                { action: 'Downloaded PDF', target: 'Normalization Rules Cheat Sheet', time: '2 hours ago' },
                { action: 'Watched Video', target: 'Entity-Relationship Model Basics', time: '1 day ago' },
                { action: 'Scored 85% in practice quiz', target: 'SQL Joins', time: '2 days ago' }
              ].map((activity, i) => (
                <div key={i} className="flex gap-3">
                  <div className="mt-1 w-2 h-2 rounded-full bg-primary shrink-0"></div>
                  <div>
                    <p className="text-sm">
                      <span className="font-bold text-primary">{activity.action}</span> for <span className="text-muted-foreground font-medium">{activity.target}</span>
                    </p>
                    <span className="text-xs text-outline-variant">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};
