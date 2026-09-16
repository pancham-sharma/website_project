import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronRight, Filter, Search, Download, Eye, EyeOff } from 'lucide-react';

export const PYQPage: React.FC = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const [showAnswer, setShowAnswer] = useState<number | null>(null);

  const pyqs = [
    {
      id: 1,
      year: 2023,
      university: 'AKTU',
      marks: 10,
      question: 'Consider a relational database schema: EMPLOYEE (empId, name, deptId, salary) and DEPARTMENT (deptId, dname). Write a SQL query to find the names of employees who earn more than the average salary of their respective departments.',
      solution: `SELECT e.name 
FROM EMPLOYEE e 
WHERE e.salary > (
  SELECT AVG(salary) 
  FROM EMPLOYEE e2 
  WHERE e2.deptId = e.deptId
);`,
      tags: ['SQL', 'Correlated Subqueries', 'Aggregate Functions']
    },
    {
      id: 2,
      year: 2022,
      university: 'AKTU',
      marks: 5,
      question: 'What is a Transaction? Explain the ACID properties of a transaction with suitable examples.',
      solution: `A transaction is a logical unit of work that contains one or more SQL statements.
      
ACID Properties:
1. Atomicity: Either all operations of the transaction are reflected properly in the database or none are. (e.g., in a bank transfer, both debit and credit must happen together).
2. Consistency: Execution of a transaction in isolation preserves the consistency of the database.
3. Isolation: Even though multiple transactions may execute concurrently, each transaction must be unaware of other concurrently executing transactions.
4. Durability: After a transaction completes successfully, the changes it has made to the database persist, even if there are system failures.`,
      tags: ['Transaction Management', 'ACID']
    },
    {
      id: 3,
      year: 2021,
      university: 'AKTU',
      marks: 10,
      question: 'Define BCNF. How does it differ from 3NF? Prove that a relation with two attributes is always in BCNF.',
      solution: `BCNF (Boyce-Codd Normal Form) is a stricter version of 3NF. A relation is in BCNF if and only if for every non-trivial functional dependency X -> Y, X is a superkey.

Difference from 3NF: 3NF allows a functional dependency X -> Y if Y is a prime attribute, even if X is not a superkey. BCNF does not allow this exception. Thus, every BCNF relation is in 3NF, but not vice versa.

Proof for 2 attributes (A, B):
Possible FDs:
1. No FDs: Candidate key is {A, B}. No non-trivial FDs exist to violate BCNF.
2. A -> B: Candidate key is A. LHS (A) is a superkey. BCNF satisfied.
3. B -> A: Candidate key is B. LHS (B) is a superkey. BCNF satisfied.
4. A -> B and B -> A: Both A and B are candidate keys. LHS of both FDs are superkeys. BCNF satisfied.
Thus, any relation with exactly two attributes is always in BCNF.`,
      tags: ['Normalization', 'BCNF', 'Proof']
    }
  ];

  return (
    <div className="flex flex-col pb-20 pt-8 flex-1">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-muted-foreground mb-6">
        <Link to={`/subject/${subjectId}`} className="hover:text-foreground">DBMS Dashboard</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-foreground font-medium">Previous Year Questions (PYQs)</span>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
        <div>
          <h1 className="text-display-sm font-bold tracking-tight text-primary mb-2">Previous Year Questions</h1>
          <p className="text-body-lg text-muted-foreground">University examination papers sorted by topics, with detailed solutions.</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Filters */}
        <div className="w-full lg:w-64 shrink-0 flex flex-col gap-6">
          <div className="bg-surface-container-lowest border border-border rounded-xl p-5">
            <h3 className="font-bold text-sm uppercase tracking-wider text-outline-variant mb-4 flex items-center">
              <Filter className="w-4 h-4 mr-2" /> Filter Questions
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold mb-2 block">University / Board</label>
                <select className="w-full border border-border rounded p-2 text-sm bg-surface-container-lowest outline-none">
                  <option>AKTU (UPTU)</option>
                  <option>Mumbai University</option>
                  <option>VTU</option>
                  <option>GATE</option>
                </select>
              </div>
              
              <div>
                <label className="text-xs font-bold mb-2 block">Exam Year</label>
                <select className="w-full border border-border rounded p-2 text-sm bg-surface-container-lowest outline-none">
                  <option>All Years</option>
                  <option>2023</option>
                  <option>2022</option>
                  <option>2021</option>
                </select>
              </div>
              
              <div>
                <label className="text-xs font-bold mb-2 block">Topic / Chapter</label>
                <select className="w-full border border-border rounded p-2 text-sm bg-surface-container-lowest outline-none">
                  <option>All Topics</option>
                  <option>SQL & Relational Algebra</option>
                  <option>Normalization</option>
                  <option>Transaction Management</option>
                </select>
              </div>
              
              <div>
                <label className="text-xs font-bold mb-2 block">Marks Weightage</label>
                <div className="flex gap-2 text-xs">
                  <button className="flex-1 py-1.5 border border-border rounded bg-surface-container font-medium">All</button>
                  <button className="flex-1 py-1.5 border border-border rounded hover:bg-surface-container">2-5</button>
                  <button className="flex-1 py-1.5 border border-border rounded hover:bg-surface-container">10+</button>
                </div>
              </div>
            </div>
            
            <button className="w-full mt-6 py-2 bg-primary text-primary-foreground text-sm font-bold rounded">
              Apply Filters
            </button>
          </div>

          <button className="w-full py-3 border border-border bg-surface-container-lowest rounded-xl flex items-center justify-center gap-2 text-sm font-bold text-primary hover:bg-surface-container-low transition-colors">
            <Download className="w-4 h-4" /> Download Full PDF Paper
          </button>
        </div>

        {/* Right Questions Area */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-outline">
              <Search className="w-5 h-5" />
            </div>
            <input 
              type="text" 
              className="w-full p-3 pl-12 text-sm border border-border rounded-xl bg-surface-container-lowest focus:ring-2 focus:ring-primary outline-none transition-all shadow-sm"
              placeholder="Search specific questions, keywords, or topics..."
            />
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="font-bold text-primary">Showing 42 Questions</span>
            <div className="flex gap-2">
              <span className="text-muted-foreground">Sort by:</span>
              <select className="border-none bg-transparent outline-none font-bold text-primary cursor-pointer">
                <option>Newest First</option>
                <option>Highest Marks</option>
              </select>
            </div>
          </div>

          <div className="space-y-6">
            {pyqs.map((q) => (
              <div key={q.id} className="bg-surface-container-lowest border border-border rounded-xl overflow-hidden shadow-sm">
                <div className="p-5 border-b border-border bg-surface-container-low flex justify-between items-start">
                  <div className="flex flex-wrap gap-2 mb-2 md:mb-0">
                    <span className="px-2 py-0.5 bg-background border border-border rounded text-xs font-bold text-outline-variant">{q.university} {q.year}</span>
                    <span className="px-2 py-0.5 bg-background border border-border rounded text-xs font-bold text-outline-variant">{q.marks} Marks</span>
                  </div>
                  <div className="flex gap-2">
                    {q.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 bg-surface-container rounded text-[10px] font-bold uppercase tracking-wider text-muted-foreground hidden sm:block">{tag}</span>
                    ))}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex gap-4">
                    <span className="text-lg font-bold text-outline-variant shrink-0">Q{q.id}.</span>
                    <p className="text-body-lg text-foreground font-medium leading-relaxed">
                      {q.question}
                    </p>
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <button 
                      onClick={() => setShowAnswer(showAnswer === q.id ? null : q.id)}
                      className="px-4 py-2 border border-primary text-primary text-sm font-bold rounded flex items-center hover:bg-surface-container-low transition-colors"
                    >
                      {showAnswer === q.id ? <><EyeOff className="w-4 h-4 mr-2" /> Hide Solution</> : <><Eye className="w-4 h-4 mr-2" /> View Solution</>}
                    </button>
                  </div>
                  
                  {showAnswer === q.id && (
                    <div className="mt-6 p-5 bg-surface-container-low border-l-4 border-primary rounded-r">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-3">Step-by-step Solution:</h4>
                      <pre className="whitespace-pre-wrap font-sans text-sm text-foreground leading-relaxed">
                        {q.solution}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
