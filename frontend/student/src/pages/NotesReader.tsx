import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Menu, Download, Maximize2, Search, FileText, Bookmark, Printer } from 'lucide-react';

export const NotesReader: React.FC = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] -m-4 sm:-m-6 lg:-m-8">
      
      {/* Top Header */}
      <div className="h-14 border-b border-border bg-surface-container-lowest flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1.5 hover:bg-surface-container rounded-md">
            <Menu className="w-5 h-5 text-primary" />
          </button>
          <div className="flex items-center text-xs font-medium text-muted-foreground hidden md:flex">
            <Link to="/courses" className="hover:text-foreground">Courses</Link>
            <ChevronRight className="w-3 h-3 mx-1" />
            <Link to={`/subject/${subjectId}`} className="hover:text-foreground">Database Management Systems</Link>
            <ChevronRight className="w-3 h-3 mx-1" />
            <span className="text-foreground">Chapter 3: Relational Algebra</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="p-1.5 text-muted-foreground hover:text-primary hover:bg-surface-container rounded-md" title="Search inside notes">
            <Search className="w-5 h-5" />
          </button>
          <button className="p-1.5 text-muted-foreground hover:text-primary hover:bg-surface-container rounded-md" title="Bookmark">
            <Bookmark className="w-5 h-5" />
          </button>
          <button className="p-1.5 text-muted-foreground hover:text-primary hover:bg-surface-container rounded-md" title="Print">
            <Printer className="w-5 h-5" />
          </button>
          <div className="w-px h-4 bg-border mx-1"></div>
          <button className="flex items-center px-3 py-1.5 bg-primary text-primary-foreground text-xs font-bold rounded hover:bg-accent transition-colors">
            <Download className="w-3.5 h-3.5 mr-1.5" /> Download Full PDF
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Sidebar (Table of Contents) */}
        {sidebarOpen && (
          <div className="w-72 border-r border-border bg-surface-container-lowest flex flex-col shrink-0 overflow-y-auto custom-scrollbar">
            <div className="p-4 border-b border-border sticky top-0 bg-surface-container-lowest z-10">
              <h3 className="font-bold text-sm uppercase tracking-wider text-outline-variant mb-3">Table of Contents</h3>
              <div className="bg-surface-container rounded p-3 flex gap-3">
                <FileText className="w-8 h-8 text-primary shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-primary leading-tight">Relational Algebra & Extended Operators</h4>
                  <p className="text-xs text-muted-foreground mt-1">14 Pages • 1.2 MB</p>
                </div>
              </div>
            </div>
            
            <div className="p-2">
              {[
                { id: 1, title: 'Introduction to Relational Model', active: false },
                { id: 2, title: 'Relational Algebra Fundamentals', active: false },
                { id: 3, title: 'Select (σ) and Project (π) Operations', active: false },
                { id: 4, title: 'Set Operations (Union, Intersect, Diff)', active: false },
                { id: 5, title: 'Extended Relational Operators', active: true },
                { id: 6, title: 'Joins (Inner, Outer, Natural)', active: false },
                { id: 7, title: 'Division Operator (÷)', active: false },
                { id: 8, title: 'Practice Examples', active: false },
              ].map((topic) => (
                <div key={topic.id} className={`flex items-start gap-3 p-2.5 rounded-lg cursor-pointer mb-1 text-sm ${topic.active ? 'bg-surface-container-low font-bold text-primary border-l-2 border-primary' : 'hover:bg-surface-container font-medium text-muted-foreground border-l-2 border-transparent'}`}>
                  <span className="shrink-0 text-xs text-outline-variant w-4">{topic.id}.</span>
                  <span className="leading-snug">{topic.title}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Main PDF View Area */}
        <div className="flex-1 bg-surface-container-low flex flex-col relative overflow-hidden">
          
          {/* Reader Controls */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 flex items-center bg-surface-container-lowest border border-border shadow-md rounded-full px-4 py-1.5 gap-4">
            <button className="text-muted-foreground hover:text-primary"><ChevronLeft className="w-4 h-4" /></button>
            <span className="text-xs font-bold text-primary w-12 text-center">Page 5 of 14</span>
            <button className="text-muted-foreground hover:text-primary"><ChevronRight className="w-4 h-4" /></button>
            <div className="w-px h-3 bg-border"></div>
            <button className="text-xs font-bold text-muted-foreground hover:text-primary">-</button>
            <span className="text-xs font-bold text-primary w-8 text-center">100%</span>
            <button className="text-xs font-bold text-muted-foreground hover:text-primary">+</button>
            <div className="w-px h-3 bg-border"></div>
            <button className="text-muted-foreground hover:text-primary"><Maximize2 className="w-3.5 h-3.5" /></button>
          </div>
          
          {/* PDF Page (Mock) */}
          <div className="flex-1 overflow-y-auto p-4 md:p-8 flex justify-center custom-scrollbar">
            <div className="w-full max-w-3xl bg-surface-container-lowest border border-border shadow-sm p-10 md:p-14 min-h-[1100px]">
              
              <h2 className="text-2xl font-bold text-primary mb-6 border-b border-border pb-4">
                5. Extended Relational Operators
              </h2>
              
              <p className="text-body-lg text-foreground mb-6 leading-relaxed">
                Relational Algebra is a procedural query language consisting of a set of operations that take one or two relations as input and produce a new relation as their result. In addition to the fundamental operations, extended operators add power and convenience.
              </p>
              
              <div className="bg-surface-container-low border border-border rounded-lg p-6 mb-6">
                <h3 className="font-bold text-lg mb-3">Generalized Projection</h3>
                <p className="text-sm text-muted-foreground mb-4">Extends the projection operation by allowing arithmetic functions to be used in the projection list.</p>
                
                <div className="bg-background border border-border p-4 rounded font-mono text-sm">
                  π (salary, salary * 1.1) (EMPLOYEE)
                </div>
              </div>

              <div className="bg-surface-container-low border border-border rounded-lg p-6 mb-6">
                <h3 className="font-bold text-lg mb-3">Aggregate Functions</h3>
                <p className="text-sm text-muted-foreground mb-4">Takes a collection of values and returns a single value as a result. Commonly used aggregate functions are SUM, AVG, MAX, MIN, COUNT.</p>
                
                <div className="bg-background border border-border p-4 rounded font-mono text-sm">
                  G COUNT(emp_id), SUM(salary) (EMPLOYEE)
                </div>
              </div>

              <div className="mt-12 text-sm text-muted-foreground text-center pt-8 border-t border-border">
                EduCare Notes for DBMS • Chapter 3 • Page 5
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};
