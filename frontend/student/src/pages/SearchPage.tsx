import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, FileText, PlaySquare, HelpCircle, CheckSquare, BookOpen, ExternalLink } from 'lucide-react';

interface SearchResult {
  type: 'Notes' | 'Video' | 'PYQ' | 'Practice' | 'Subject';
  title: string;
  subject: string;
  description: string;
  id: string;
}

// Static corpus to search over — will be supplemented by real API data
const CORPUS: SearchResult[] = [
  { type: 'Subject', title: 'Data Structures & Algorithms', subject: 'DSA', description: 'Arrays, Trees, Graphs, sorting, dynamic programming, and complexity analysis.', id: 'dsa' },
  { type: 'Subject', title: 'DBMS (Database Management Systems)', subject: 'DBMS', description: 'Relational algebra, SQL, Normalization, Concurrency Control, and Transaction Management.', id: 'dbms' },
  { type: 'Subject', title: 'Operating Systems', subject: 'OS', description: 'Process management, CPU scheduling, memory management, and file systems.', id: 'os' },
  { type: 'Subject', title: 'Computer Networks', subject: 'CN', description: 'OSI model, TCP/IP, IP addressing, routing algorithms, and network security.', id: 'cn' },
  { type: 'Subject', title: 'Object-Oriented Programming', subject: 'OOP', description: 'Classes, inheritance, polymorphism, encapsulation, and design patterns.', id: 'oop' },
  { type: 'Notes', title: 'DBMS Normalization Notes (1NF, 2NF, 3NF, BCNF)', subject: 'DBMS', description: 'Detailed notes on database normalization with examples and exercises.', id: 'dbms' },
  { type: 'Notes', title: 'OS Process Scheduling Algorithms', subject: 'OS', description: 'FCFS, SJF, Round Robin, Priority Scheduling with solved examples.', id: 'os' },
  { type: 'Notes', title: 'Computer Networks: TCP/IP Model Explained', subject: 'CN', description: 'Layer-by-layer breakdown of the TCP/IP protocol suite with diagrams.', id: 'cn' },
  { type: 'Video', title: 'Data Structures: Binary Trees & BST', subject: 'DSA', description: 'Visual explanation of tree structures, traversals, and insertion/deletion operations.', id: 'dsa' },
  { type: 'Video', title: 'DBMS: SQL Queries and Joins', subject: 'DBMS', description: 'Complete video guide on writing SQL joins, subqueries, and aggregate functions.', id: 'dbms' },
  { type: 'PYQ', title: 'AKTU 2023 DBMS Solved Paper', subject: 'DBMS', description: 'Complete solved question paper for Database Management Systems (CS-502).', id: 'dbms' },
  { type: 'PYQ', title: 'AKTU 2022 OS Question Paper', subject: 'OS', description: 'Year-wise solved PYQ for Operating Systems with detailed solutions.', id: 'os' },
  { type: 'Practice', title: 'DBMS MCQ Practice Set (100 Questions)', subject: 'DBMS', description: 'Self-assessment quiz covering all DBMS topics with explanations.', id: 'dbms' },
  { type: 'Practice', title: 'DSA Coding Problems: Arrays & Strings', subject: 'DSA', description: '50 handpicked coding problems for interview preparation.', id: 'dsa' },
  { type: 'Subject', title: 'Python Programming', subject: 'Python', description: 'Python fundamentals, OOP, file handling, and libraries for engineering students.', id: 'python' },
  { type: 'Subject', title: 'Java Programming', subject: 'Java', description: 'Core Java concepts, OOP principles, collections, and multithreading.', id: 'java' },
  { type: 'Subject', title: 'Software Engineering', subject: 'SE', description: 'SDLC models, Agile, design patterns, testing strategies, and project management.', id: 'se' },
  { type: 'Subject', title: 'Artificial Intelligence', subject: 'AI', description: 'Search algorithms, machine learning basics, neural networks, and reasoning.', id: 'ai' },
  { type: 'Subject', title: 'Web Development', subject: 'WebDev', description: 'HTML, CSS, JavaScript, React, REST APIs, and full-stack development basics.', id: 'webdev' },
  { type: 'Subject', title: 'React', subject: 'WebDev', description: 'React hooks, components, state management, and modern React patterns.', id: 'webdev' },
];

const ICON_MAP = {
  Notes: FileText,
  Video: PlaySquare,
  PYQ: HelpCircle,
  Practice: CheckSquare,
  Subject: BookOpen,
};

const TYPE_COLOR: Record<string, string> = {
  Notes: 'bg-blue-50 text-blue-700',
  Video: 'bg-purple-50 text-purple-700',
  PYQ: 'bg-orange-50 text-orange-700',
  Practice: 'bg-green-50 text-green-700',
  Subject: 'bg-gray-100 text-gray-700',
};

export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [inputValue, setInputValue] = useState(query);
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase();
    const filtered = CORPUS.filter(
      item =>
        item.title.toLowerCase().includes(q) ||
        item.subject.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.type.toLowerCase().includes(q)
    );
    setResults(filtered);
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setSearchParams({ q: inputValue.trim() });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-8" role="search">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-outline">
            <Search className="w-5 h-5" aria-hidden="true" />
          </div>
          <input
            type="search"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            className="w-full p-4 pl-12 pr-32 text-base border-2 border-primary rounded-xl bg-background focus:ring-4 focus:ring-primary/20 outline-none shadow-sm"
            placeholder="Search subjects, notes, PYQs, tutorials..."
            aria-label="Refine search"
            autoFocus
          />
          <button type="submit" className="absolute right-2 top-2 bottom-2 px-6 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-accent transition-colors" aria-label="Search">
            Search
          </button>
        </div>
      </form>

      {/* Results Header */}
      {query && (
        <div className="mb-5">
          {results.length > 0 ? (
            <p className="text-sm text-muted-foreground">
              Showing <strong>{results.length}</strong> result{results.length !== 1 ? 's' : ''} for "<strong>{query}</strong>"
            </p>
          ) : (
            <div className="text-center py-16">
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" aria-hidden="true" />
              <h2 className="text-lg font-bold text-primary mb-2">No study material found for "{query}"</h2>
              <p className="text-sm text-muted-foreground mb-6">Try a different keyword or browse all subjects.</p>
              <Link to="/courses" className="inline-flex items-center px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-accent transition-colors">
                Browse All Subjects
              </Link>
            </div>
          )}
        </div>
      )}

      {!query && (
        <div className="text-center py-20 text-muted-foreground">
          <Search className="w-12 h-12 mx-auto mb-4 text-outline" aria-hidden="true" />
          <p className="text-lg font-medium">Start typing to search study materials</p>
        </div>
      )}

      {/* Results List */}
      {results.length > 0 && (
        <div className="space-y-3">
          {results.map((result, i) => {
            const Icon = ICON_MAP[result.type];
            return (
              <div key={i} className="flex items-start gap-4 p-5 bg-surface-container-lowest border border-border rounded-xl hover:border-primary transition-colors group">
                <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                  <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${TYPE_COLOR[result.type]}`}>
                      {result.type}
                    </span>
                    <span className="text-xs text-muted-foreground font-medium">{result.subject}</span>
                  </div>
                  <h3 className="font-bold text-base text-primary group-hover:underline leading-snug mb-1">{result.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{result.description}</p>
                </div>
                <Link
                  to={`/subject/${result.id}`}
                  className="shrink-0 flex items-center gap-1.5 px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-surface-container transition-colors self-center"
                  aria-label={`Open ${result.title}`}
                >
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                  Open
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
