import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Search, Menu, X, ChevronDown, User, Settings, Bell, LogOut, BookOpen, Zap, Users } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setMobileOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    navigate('/');
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/courses', label: 'Courses' },
    { to: '/courses', label: 'Study Material' },
    { to: '/interview-prep', label: 'Practice' },
    { to: '/interview-prep', label: 'AI Tutor' },
    { to: '/distance', label: 'Distance' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-10 flex h-16 items-center gap-4">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0" aria-label="EduCare Home">
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
            <GraduationCap className="w-5 h-5 text-primary-foreground" aria-hidden="true" />
          </div>
          <span className="font-bold text-lg text-primary hidden sm:block">EduCare</span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-5 text-sm font-medium ml-4" aria-label="Main navigation">
          {navLinks.map(link => (
            <Link
              key={link.label}
              to={link.to}
              className="text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Search Form (Desktop) */}
        <form onSubmit={handleSearch} className="hidden md:flex items-center relative" role="search">
          <div className="absolute left-0 inset-y-0 flex items-center pl-3 pointer-events-none text-outline">
            <Search className="w-4 h-4" aria-hidden="true" />
          </div>
          <input
            type="search"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-[260px] pl-9 pr-4 py-2 text-sm border border-input rounded-md bg-surface-container-lowest focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-colors"
            placeholder="Search subjects, notes, PYQs..."
            aria-label="Search study material"
          />
        </form>

        {/* Auth Area */}
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border hover:bg-surface-container transition-colors"
                aria-expanded={profileOpen}
                aria-haspopup="true"
                aria-label="User profile menu"
              >
                <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xs">
                  U
                </div>
                <ChevronDown className="w-3 h-3 text-muted-foreground" aria-hidden="true" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 bg-background border border-border rounded-lg shadow-lg py-1 z-50" role="menu">
                  <Link to="/dashboard" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-surface-container transition-colors" role="menuitem">
                    <User className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                    Profile
                  </Link>
                  <Link to="/dashboard" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-surface-container transition-colors" role="menuitem">
                    <Bell className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                    Notifications
                  </Link>
                  <Link to="/dashboard" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-surface-container transition-colors" role="menuitem">
                    <Settings className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                    Account Settings
                  </Link>
                  <div className="border-t border-border my-1" />
                  <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors" role="menuitem">
                    <LogOut className="w-4 h-4" aria-hidden="true" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium h-9 px-4 py-2 border border-input hover:bg-surface-container transition-colors"
            >
              Sign In
            </Link>
          )}

          {/* Hamburger (Mobile) */}
          <button
            className="lg:hidden p-2 rounded-md hover:bg-surface-container transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-background pb-4">
          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="px-4 pt-4 pb-2" role="search">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-4 h-4 text-outline" aria-hidden="true" />
              </div>
              <input
                type="search"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-input rounded-md bg-surface-container-lowest outline-none"
                placeholder="Search subjects, notes, PYQs..."
                aria-label="Search study material"
              />
            </div>
          </form>

          {/* Mobile Nav Links */}
          <nav className="px-4 py-2 flex flex-col gap-1" aria-label="Mobile navigation">
            {navLinks.map(link => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="py-2.5 px-2 text-sm font-medium text-foreground hover:text-primary hover:bg-surface-container rounded-md transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {!isAuthenticated && (
            <div className="px-4 pt-2 border-t border-border mt-2">
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center py-2.5 bg-primary text-primary-foreground rounded-md text-sm font-medium"
              >
                Sign In
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
