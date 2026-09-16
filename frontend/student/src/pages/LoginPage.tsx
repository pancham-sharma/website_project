import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import api from '../api';
import { GraduationCap, Mail, Key, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();
  // Get email from router state if available (e.g. after registration)
  const [email, setEmail] = useState(location.state?.email || '');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  // Message shown when redirected from a protected route
  const redirectMessage: string | null = location.state?.message || null;
  const from = location.state?.from?.pathname || null;
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await api.post('/accounts/login/', { email, password });
      // Use AuthContext to store tokens and update global state
      login(response.data.access, response.data.refresh);
      
      // Fetch profile to check onboarding status
      try {
        const profileRes = await api.get('/accounts/profile/', {
          headers: { Authorization: `Bearer ${response.data.access}` }
        });
        const { course, branch, semester } = profileRes.data;
        if (!course || !branch || !semester) {
          navigate('/onboarding');
        } else {
          // Go back to where the user originally wanted to go, or dashboard
          navigate(from || '/dashboard');
        }
      } catch {
        navigate(from || '/onboarding');
      }
    } catch {
      setError('Invalid email or password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center py-12 px-4 min-h-screen overflow-y-auto">
      <div className="w-full max-w-[460px] bg-surface-container-lowest border border-border rounded-lg shadow-sm p-8 relative overflow-hidden">
        
        {/* Dot pattern background simulation (via CSS in a real app, here inline for simplicity) */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
        
        <div className="relative z-10 flex flex-col items-center mb-8">
          <div className="h-12 w-12 bg-primary text-primary-foreground rounded-lg flex items-center justify-center mb-4">
            <GraduationCap className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-extrabold text-primary tracking-tight mb-2">Sign in to your account</h1>
          <p className="text-body-sm text-muted-foreground text-center">
            Access your academic courses, notes, and curriculum workspace.
          </p>
        </div>
        
        {(redirectMessage || error) && (
          <div className="relative z-10 mb-6 p-3 bg-error-container text-on-error-container text-sm rounded border border-[#ffb4ab] flex items-center gap-2" role="alert">
            <ShieldCheck className="w-4 h-4 shrink-0" aria-hidden="true" />
            {redirectMessage || error}
          </div>
        )}

        <form onSubmit={handleLogin} className="relative z-10 space-y-5">
          <div className="space-y-1.5">
            <label className="text-label-sm font-semibold text-foreground uppercase tracking-wider">
              Academic or Institutional Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-outline">
                <Mail className="h-4 w-4" />
              </div>
              <input 
                type="email" 
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full pl-10 p-2.5 text-sm border border-input rounded bg-surface-container-lowest focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-colors placeholder:text-outline-variant"
                placeholder="student@university.edu" 
              />
            </div>
          </div>
          
          <div className="space-y-1.5">
            <label className="text-label-sm font-semibold text-foreground uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-outline">
                <Key className="h-4 w-4" />
              </div>
              <input 
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 p-2.5 text-sm border border-input rounded bg-surface-container-lowest focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-colors placeholder:text-outline-variant"
                placeholder="••••••••••••" 
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-outline hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-input text-primary focus:ring-primary accent-primary" />
              <span className="text-sm font-medium text-foreground">Remember this device</span>
            </label>
            <Link to="/forgot-password" className="text-sm font-medium text-primary hover:underline underline-offset-4">
              Forgot password?
            </Link>
          </div>
          
          <button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-accent text-primary-foreground font-medium rounded-md py-2.5 transition-colors border border-primary disabled:opacity-50">
            {isLoading ? 'Signing In...' : 'Sign In →'}
          </button>
          
          <div className="relative py-4 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border"></span>
            </div>
            <div className="relative bg-surface-container-lowest px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground rounded-full border border-border pb-[1px]">
              OR
            </div>
          </div>
          
          <button type="button" className="w-full bg-surface-container-lowest hover:bg-surface-container text-foreground font-medium rounded-md py-2.5 transition-colors border border-input flex items-center justify-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="currentColor" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="currentColor" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="currentColor" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="currentColor" />
            </svg>
            Continue with Google
          </button>
        </form>
        
        <div className="relative z-10 mt-8 text-center text-sm">
          <span className="text-muted-foreground">Don't have an academic account? </span>
          <Link to="/register" className="font-semibold text-primary hover:underline underline-offset-4">
            Register / Request Access
          </Link>
        </div>
      </div>
      
      {/* Security Notices */}
      <div className="mt-8 max-w-[460px] w-full flex flex-col gap-3">
        <div className="flex items-center justify-center gap-2 text-xs font-medium text-foreground bg-surface-container-low border border-border rounded px-4 py-2">
          <ShieldCheck className="w-4 h-4 text-primary" />
          Protected by rate limiting & account lockout
        </div>
        
        <div className="text-[11px] text-muted-foreground text-center leading-relaxed">
          Academic integrity & automated bot protection active. CAPTCHA verification may trigger upon suspicious activity or multiple failed attempts.
        </div>
        
        <div className="text-[10px] text-outline text-center uppercase tracking-widest mt-2 font-mono">
          Host: auth.educare.app • Session: AES-256 GCM • Node: SEC_IAM_01
        </div>
      </div>
    </div>
  );
};
