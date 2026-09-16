import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ChevronRight, FileText, PlaySquare, HelpCircle, CheckSquare, BookOpen, Cpu, Network, Code, Database, Settings, Brain } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../api';

/* ─────────────────── Animated Background ─────────────────── */
const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let animId: number;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const dots: { x: number; y: number; vx: number; vy: number; r: number }[] = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach(d => {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > canvas.width) d.vx *= -1;
        if (d.y < 0 || d.y > canvas.height) d.vy *= -1;

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(34, 197, 94, 0.15)';
        ctx.fill();
      });

      // Draw lines between nearby dots
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(34, 197, 94, ${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
};

/* ─────────────────── Subject Card ─────────────────── */
interface Subject { id: string; name: string; desc: string; icon: React.ElementType; }

const SubjectCard: React.FC<{ subject: Subject; onClick: () => void }> = ({ subject, onClick }) => (
  <button
    onClick={onClick}
    className="group flex flex-col bg-surface-container-lowest border border-border hover:border-primary rounded-xl p-5 transition-all hover:shadow-md text-left w-full"
    aria-label={`View ${subject.name}`}
  >
    <div className="w-10 h-10 bg-surface-container rounded-lg flex items-center justify-center mb-3 group-hover:bg-primary/10 transition-colors">
      <subject.icon className="w-5 h-5 text-primary" aria-hidden="true" />
    </div>
    <h3 className="font-bold text-base mb-2 group-hover:text-primary leading-tight">{subject.name}</h3>
    <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed flex-1">{subject.desc}</p>
    <div className="flex items-center text-primary opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium">
      View Subject <ChevronRight className="w-4 h-4 ml-1" aria-hidden="true" />
    </div>
  </button>
);

/* ─────────────────── HomePage ─────────────────── */
const STATIC_SUBJECTS: Subject[] = [
  { id: 'dsa', name: 'Data Structures & Algorithms', desc: 'Arrays, Trees, Graphs, sorting, dynamic programming, and complexity analysis.', icon: Code },
  { id: 'dbms', name: 'DBMS', desc: 'Relational algebra, SQL, Normalization, Concurrency Control, and Transaction Management.', icon: Database },
  { id: 'os', name: 'Operating Systems', desc: 'Process management, CPU scheduling, memory management, and file systems.', icon: Cpu },
  { id: 'cn', name: 'Computer Networks', desc: 'OSI model, TCP/IP, IP addressing, routing algorithms, and network security.', icon: Network },
  { id: 'oop', name: 'Object-Oriented Programming', desc: 'Classes, inheritance, polymorphism, encapsulation, and design patterns.', icon: Settings },
  { id: 'ai', name: 'Artificial Intelligence', desc: 'Search algorithms, machine learning basics, neural networks, and reasoning.', icon: Brain },
  { id: 'se', name: 'Software Engineering', desc: 'SDLC models, Agile, design patterns, testing strategies, and project management.', icon: BookOpen },
  { id: 'webdev', name: 'Web Development', desc: 'HTML, CSS, JavaScript, React, REST APIs, and full-stack development.', icon: Code },
];

export const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSubjectClick = (subject: Subject) => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: `/subject/${subject.id}` }, message: 'Please login first to access study material.' } });
    } else {
      navigate(`/subject/${subject.id}`);
    }
  };

  const handleTagClick = (tag: string) => {
    setSearchQuery(tag);
    navigate(`/search?q=${encodeURIComponent(tag)}`);
  };

  return (
    <div className="flex flex-col pb-20">

      {/* ── Hero ── */}
      <section className="relative flex flex-col items-center justify-center py-20 lg:py-28 text-center px-4 overflow-hidden rounded-2xl mb-12">
        <AnimatedBackground />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-primary mb-5 leading-tight">
            Everything You Need to Learn.<br />
            <span className="text-foreground/80">All in One Place.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Find curated notes, tutorials, verified PYQs with solutions, practice question sets, and
            interview prep materials tailored for B.Tech engineering students.
          </p>

          {/* Hero Search */}
          <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto relative" role="search">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-outline">
              <Search className="w-5 h-5" aria-hidden="true" />
            </div>
            <input
              type="search"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full p-4 pl-12 pr-32 text-base border-2 border-primary rounded-xl bg-background/90 focus:ring-4 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-md"
              placeholder="Search subjects, notes, PYQs, tutorials..."
              aria-label="Search study material"
            />
            <button
              type="submit"
              className="absolute right-2 top-2 bottom-2 px-6 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-accent transition-colors"
              aria-label="Search"
            >
              Search
            </button>
          </form>

          {/* Popular Tags */}
          <div className="flex flex-wrap justify-center gap-2 mt-5">
            <span className="text-sm text-muted-foreground self-center">Try:</span>
            {['DBMS', 'Computer Networks', 'Operating Systems', 'Data Structures', 'Python', 'React'].map(tag => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className="px-3 py-1 bg-background/80 border border-border rounded-full text-xs text-foreground cursor-pointer hover:border-primary hover:text-primary transition-colors"
                aria-label={`Search for ${tag}`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories Bar ── */}
      <div className="border-y border-border bg-surface-container-lowest sticky top-16 z-40 mb-12">
        <div className="flex overflow-x-auto py-3 px-4 gap-6 text-sm font-medium" style={{ scrollbarWidth: 'none' }}>
          {['All Branches', 'Computer Science (CSE)', 'Information Technology (IT)', 'Electronics (ECE)', 'Mechanical', 'Civil'].map((cat, i) => (
            <span
              key={cat}
              className={`whitespace-nowrap cursor-pointer transition-colors ${i === 0 ? 'text-primary font-bold' : 'text-muted-foreground hover:text-foreground'}`}
            >
              {cat}
            </span>
          ))}
        </div>
      </div>

      {/* ── Continue Learning ── */}
      <section className="mb-16">
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-xl font-bold text-primary">Continue Learning</h2>
        </div>
        {isAuthenticated ? (
          <div className="bg-surface-container-lowest border border-border rounded-xl p-10 text-center">
            <BookOpen className="w-10 h-10 text-muted-foreground mx-auto mb-3" aria-hidden="true" />
            <h3 className="font-bold text-base text-primary mb-1">Start Your Learning Journey</h3>
            <p className="text-sm text-muted-foreground mb-4">Explore B.Tech subjects and start learning.</p>
            <Link to="/courses" className="inline-flex items-center px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-accent transition-colors">
              Explore Subjects <ChevronRight className="w-4 h-4 ml-1" aria-hidden="true" />
            </Link>
          </div>
        ) : (
          <div className="bg-surface-container-lowest border border-border rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-base font-semibold text-primary mb-1">Continue where you left off</p>
              <p className="text-sm text-muted-foreground">Sign in to track your learning progress and pick up right where you stopped.</p>
            </div>
            <Link to="/login" className="shrink-0 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-accent transition-colors">
              Sign In to Continue
            </Link>
          </div>
        )}
      </section>

      {/* ── Popular Subjects ── */}
      <section className="mb-16">
        <div className="flex justify-between items-end mb-6 border-b border-border pb-4">
          <div>
            <h2 className="text-xl font-bold text-primary">Popular B.Tech Subjects</h2>
            <p className="text-sm text-muted-foreground mt-1">Most accessed courses by engineering students</p>
          </div>
          <Link to="/courses" className="text-sm font-medium hover:underline text-primary hidden sm:block">
            View all subjects
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STATIC_SUBJECTS.slice(0, 8).map(subject => (
            <SubjectCard key={subject.id} subject={subject} onClick={() => handleSubjectClick(subject)} />
          ))}
        </div>

        {!isAuthenticated && (
          <p className="mt-5 text-center text-sm text-muted-foreground">
            <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link> to access subject materials, notes, and PYQs.
          </p>
        )}
      </section>

      {/* ── Academic Resources by Modality ── */}
      <section className="mb-16">
        <div className="mb-6 border-b border-border pb-4">
          <h2 className="text-xl font-bold text-primary">Academic Resources by Modality</h2>
          <p className="text-sm text-muted-foreground mt-1">Study exactly how you prefer with multi-format learning materials</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { title: 'Chapter-wise Notes', icon: FileText, desc: 'Detailed chapter notes, cheat sheets, and short revision guides formatted for rapid reading.' },
            { title: 'Video Lectures', icon: PlaySquare, desc: 'High-quality curated video tutorials organized by university syllabus topics.' },
            { title: 'Previous Year Questions', icon: HelpCircle, desc: 'Year-wise PYQs from top engineering universities with step-by-step solutions.' },
            { title: 'Practice Sets & MCQs', icon: CheckSquare, desc: 'Interactive MCQs, programming tasks, and self-assessment quizzes to test knowledge.' },
          ].map((mode, i) => (
            <div key={i} className="bg-surface-container-lowest border border-border rounded-xl p-6 flex flex-col items-start">
              <div className="w-10 h-10 bg-surface-container rounded-lg flex items-center justify-center mb-4">
                <mode.icon className="w-5 h-5 text-primary" aria-hidden="true" />
              </div>
              <h3 className="font-bold text-base mb-2">{mode.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{mode.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Interview Prep ── */}
      <section className="mb-16">
        <div className="flex justify-between items-end mb-6 border-b border-border pb-4">
          <div>
            <h2 className="text-xl font-bold text-primary">Prepare for your Next Interview</h2>
            <p className="text-sm text-muted-foreground mt-1">Curated viva-voce questions, technical interview guides, and coding patterns</p>
          </div>
          <Link to="/interview-prep" className="text-sm font-medium hover:underline text-primary hidden sm:block">
            View Interview Dashboard
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { title: 'Technical Fundamentals', desc: 'Core CS concepts frequently asked in HR and technical rounds (DBMS, OS, CN, OOP).' },
            { title: 'Coding Patterns', desc: 'Standard data structures and algorithms commonly tested in technical assessments.' },
            { title: 'Subject-Specific Viva', desc: 'Short-answer questions to prepare for university lab vivas and academic examinations.' },
          ].map((item, i) => (
            <div
              key={i}
              onClick={() => !isAuthenticated ? navigate('/login', { state: { from: { pathname: '/interview-prep' }, message: 'Please login first to access study material.' } }) : navigate('/interview-prep')}
              className="bg-surface-container-lowest border border-border rounded-xl p-5 hover:border-primary transition-colors cursor-pointer group"
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && e.currentTarget.click()}
              aria-label={item.title}
            >
              <h3 className="font-bold text-base mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{item.desc}</p>
              <span className="text-xs font-semibold uppercase tracking-wider text-primary flex items-center">
                Start Preparation <ChevronRight className="w-3 h-3 ml-1" aria-hidden="true" />
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
