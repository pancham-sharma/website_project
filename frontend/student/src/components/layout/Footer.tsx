import { Link } from 'react-router-dom';
import { GraduationCap, ExternalLink, MessageCircle, Share2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Footer: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <footer className="border-t border-border bg-surface-container-lowest mt-auto">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-10 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                <GraduationCap className="w-5 h-5 text-primary-foreground" aria-hidden="true" />
              </div>
              <span className="font-bold text-lg text-primary">EduCare</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A centralized learning platform for B.Tech students to discover study materials, practice resources, tutorials, PYQs, and career preparation content.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-outline-variant mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              {[
                { to: '/', label: 'Home' },
                { to: '/courses', label: 'Subjects' },
                { to: '/courses', label: 'Study Material' },
                { to: '/interview-prep', label: 'Practice' },
                { to: '/interview-prep', label: 'AI Tutor' },
              ].map(link => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Student Resources */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-outline-variant mb-4">Student Resources</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Notes' },
                { label: 'PYQs' },
                { label: 'Practice Questions' },
                { label: 'Interview Preparation' },
                { label: 'Tutorials' },
              ].map(item => (
                <li key={item.label}>
                  <span className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-outline-variant mb-4">Account</h3>
            <ul className="space-y-2.5">
              {!isAuthenticated ? (
                <>
                  <li><Link to="/login" className="text-sm text-muted-foreground hover:text-primary transition-colors">Login</Link></li>
                  <li><Link to="/register" className="text-sm text-muted-foreground hover:text-primary transition-colors">Register</Link></li>
                </>
              ) : (
                <>
                  <li><Link to="/dashboard" className="text-sm text-muted-foreground hover:text-primary transition-colors">Dashboard</Link></li>
                  <li><Link to="/dashboard" className="text-sm text-muted-foreground hover:text-primary transition-colors">Profile</Link></li>
                  <li><Link to="/dashboard" className="text-sm text-muted-foreground hover:text-primary transition-colors">Settings</Link></li>
                </>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            © 2026 EduCare. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" aria-label="EduCare on GitHub" className="text-muted-foreground hover:text-primary transition-colors">
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </a>
            <a href="#" aria-label="EduCare community chat" className="text-muted-foreground hover:text-primary transition-colors">
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
            </a>
            <a href="#" aria-label="Share EduCare" className="text-muted-foreground hover:text-primary transition-colors">
              <Share2 className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
