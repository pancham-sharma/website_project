import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronDown, ThumbsUp, BookmarkPlus, HelpCircle, AlertCircle, FileText, PlaySquare, CheckSquare } from 'lucide-react';

export const InterviewPrepPage: React.FC = () => {
  return (
    <div className="flex flex-col pb-20 pt-8 flex-1">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-muted-foreground mb-6">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-foreground font-medium">Interview Prep</span>
      </div>

      <div className="mb-8">
        <h1 className="text-display-sm font-bold tracking-tight text-primary mb-2">Engineering Interview Preparation & Viva Voce</h1>
        <p className="text-body-lg text-muted-foreground">
          Frequently asked technical interview questions, lab viva questions, and theoretical concepts asked in top tech company interviews.
        </p>
      </div>

      {/* Stats Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 border-y border-border py-6">
        <div>
          <div className="text-3xl font-bold text-primary mb-1">450+</div>
          <div className="text-xs uppercase font-bold text-outline-variant tracking-wider">Questions Solved</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-primary mb-1">14</div>
          <div className="text-xs uppercase font-bold text-outline-variant tracking-wider">Subjects Covered</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-primary mb-1">85%</div>
          <div className="text-xs uppercase font-bold text-outline-variant tracking-wider">Confidence Score</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-primary mb-1">DBMS & Networks</div>
          <div className="text-xs uppercase font-bold text-outline-variant tracking-wider">Strongest Areas</div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Main Q&A Area */}
        <div className="flex-1 flex flex-col gap-8">
          
          {/* Detailed Question View */}
          <div className="bg-surface-container-lowest border border-border rounded-xl p-6 md:p-8 shadow-sm relative">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-2 py-1 bg-surface-container text-xs font-bold rounded uppercase tracking-wider">DBMS</span>
              <span className="px-2 py-1 bg-surface-container text-xs font-bold rounded uppercase tracking-wider">Normalization</span>
              <span className="px-2 py-1 bg-surface-container-low border border-border text-xs font-bold rounded uppercase tracking-wider text-muted-foreground">High Frequency</span>
            </div>
            
            <h2 className="text-xl font-bold text-primary mb-6 leading-relaxed">
              What is Normalization? What is the difference between Boyce-Codd Normal Form (BCNF) and 3rd Normal Form (3NF)?
            </h2>
            
            <div className="prose prose-sm max-w-none prose-headings:text-primary prose-p:text-foreground prose-strong:text-primary">
              <p className="font-medium text-muted-foreground mb-4">
                <strong>TL;DR:</strong> BCNF is a stricter version of 3NF.
              </p>
              
              <p className="mb-4">
                <strong>Normalization</strong> is the process of organizing data in a database to reduce redundancy and improve data integrity. It involves dividing large tables into smaller, less redundant tables and defining relationships between them. The main goal is to isolate data so that additions, deletions, and modifications can be made in just one table and then propagated through the rest of the database via defined relationships.
              </p>
              
              <h3 className="text-lg font-bold mb-3 mt-6">Key Difference (3NF vs BCNF):</h3>
              <p className="mb-4">
                Both 3NF and BCNF deal with functional dependencies. The primary difference lies in the treatment of non-trivial functional dependencies <code>X → Y</code>.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="border border-border rounded-lg p-4 bg-surface-container-low">
                  <h4 className="font-bold text-primary border-b border-border pb-2 mb-3">3rd Normal Form (3NF)</h4>
                  <p className="text-sm mb-2">For every non-trivial functional dependency X → Y:</p>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    <li><code>X</code> must be a superkey, <strong>OR</strong></li>
                    <li><code>Y</code> must be a prime attribute (part of some candidate key)</li>
                  </ul>
                </div>
                <div className="border border-border rounded-lg p-4 bg-surface-container-low">
                  <h4 className="font-bold text-primary border-b border-border pb-2 mb-3">Boyce-Codd Normal Form (BCNF)</h4>
                  <p className="text-sm mb-2">For every non-trivial functional dependency X → Y:</p>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    <li><code>X</code> <strong>MUST</strong> be a superkey.</li>
                    <li className="text-muted-foreground italic">No alternative condition exists.</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-surface-container p-4 rounded-lg border-l-4 border-primary">
                <h4 className="font-bold text-sm mb-2 flex items-center"><AlertCircle className="w-4 h-4 mr-2" /> Interview Tip</h4>
                <p className="text-sm text-muted-foreground">
                  Interviewers love to ask "Is every BCNF relation in 3NF?" (Yes) and "Is every 3NF relation in BCNF?" (No, because 3NF allows the exception where Y is a prime attribute). Be ready with an example showing a relation in 3NF but not BCNF.
                </p>
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-border">
              <button className="text-muted-foreground hover:text-primary transition-colors flex items-center text-sm font-bold">
                <HelpCircle className="w-4 h-4 mr-2" /> Need Clarification?
              </button>
              <div className="flex gap-3">
                <button className="p-2 border border-border rounded hover:bg-surface-container transition-colors"><ThumbsUp className="w-4 h-4" /></button>
                <button className="p-2 border border-border rounded hover:bg-surface-container transition-colors"><BookmarkPlus className="w-4 h-4" /></button>
                <button className="px-6 py-2 bg-primary text-primary-foreground text-sm font-bold rounded hover:bg-accent transition-colors">
                  Next Question
                </button>
              </div>
            </div>
          </div>
          
          {/* Top Interview Questions Accordion */}
          <div>
            <h3 className="font-bold text-lg text-primary mb-4 flex items-center justify-between border-b border-border pb-2">
              Top Interview Questions (DBMS)
              <span className="text-xs font-normal text-muted-foreground">Showing 3 of 50 questions</span>
            </h3>
            
            <div className="space-y-3">
              {[
                { title: 'Explain ACID properties with real-world banking transaction examples.', tag: 'DBMS - Core', active: false },
                { title: 'How do B-Trees optimize query performance compared to Binary Search Trees?', tag: 'DBMS - Indexing', active: false },
                { title: 'Differentiate between Cross Join, Inner Join, and Outer Join.', tag: 'SQL Queries', active: false }
              ].map((q, i) => (
                <div key={i} className="bg-surface-container-lowest border border-border rounded-lg p-4 hover:border-primary cursor-pointer transition-colors shadow-sm flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-outline-variant mb-1 block">{q.tag}</span>
                    <h4 className="font-bold text-sm text-foreground leading-snug">{q.title}</h4>
                  </div>
                  <ChevronDown className="w-5 h-5 text-outline shrink-0 mt-1" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Study Material */}
        <div className="w-full lg:w-80 shrink-0 flex flex-col gap-6">
          <div className="bg-surface-container-lowest border border-border rounded-xl p-5 shadow-sm">
            <h3 className="font-bold text-sm uppercase tracking-wider text-primary border-b border-border pb-3 mb-4 flex items-center">
              <FileText className="w-4 h-4 mr-2" /> Reference Material
            </h3>
            
            <div className="space-y-4">
              <div className="flex gap-3 items-start group cursor-pointer">
                <FileText className="w-4 h-4 text-outline group-hover:text-primary transition-colors shrink-0 mt-1" />
                <div>
                  <h4 className="text-sm font-bold group-hover:underline leading-tight">Database Normalization Cheat Sheet</h4>
                  <p className="text-xs text-muted-foreground">1-page summary of 1NF, 2NF, 3NF, BCNF rules</p>
                </div>
              </div>
              <div className="flex gap-3 items-start group cursor-pointer">
                <PlaySquare className="w-4 h-4 text-outline group-hover:text-primary transition-colors shrink-0 mt-1" />
                <div>
                  <h4 className="text-sm font-bold group-hover:underline leading-tight">Video: BCNF vs 3NF with Examples</h4>
                  <p className="text-xs text-muted-foreground">12 min explanation</p>
                </div>
              </div>
              <div className="flex gap-3 items-start group cursor-pointer">
                <CheckSquare className="w-4 h-4 text-outline group-hover:text-primary transition-colors shrink-0 mt-1" />
                <div>
                  <h4 className="text-sm font-bold group-hover:underline leading-tight">Practice MCQs on Normalization</h4>
                  <p className="text-xs text-muted-foreground">25 questions to test knowledge</p>
                </div>
              </div>
            </div>
            
            <button className="w-full mt-6 py-2 border border-border rounded text-sm font-bold hover:bg-surface-container transition-colors text-primary">
              View All Materials
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
