import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import { BookOpen, Mail, Lock, User, Check, ShieldCheck } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Password validation checks
  const hasLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasLength || !hasUpper || !hasNumber || !hasSpecial) {
      setError("Please ensure your password meets all requirements.");
      return;
    }
    
    setError(null);
    setIsLoading(true);
    
    try {
      await api.post('/accounts/register/', {
        username: email, // Assuming username is email
        email: email,
        password: password,
        first_name: name.split(' ')[0] || '',
        last_name: name.split(' ').slice(1).join(' ') || ''
      });
      // On success, redirect to login with email
      navigate('/login', { state: { email: email } });
    } catch (err: any) {
      if (err.response && err.response.data) {
        // Simple error extraction
        setError(JSON.stringify(err.response.data));
      } else {
        setError("An error occurred during registration. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center py-12 px-4 min-h-screen overflow-y-auto">
      <div className="w-full max-w-md bg-surface-container-lowest border border-border rounded-xl shadow-sm p-8">
        
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-primary text-primary-foreground rounded-lg flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-extrabold text-primary mb-2 tracking-tight">Create new account</h1>
          <p className="text-sm text-muted-foreground">Start your learning journey with EduCare</p>
        </div>
        
        {error && (
          <div className="mb-6 p-3 bg-error-container text-on-error-container text-sm rounded border border-[#ffb4ab] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            {error}
          </div>
        )}
        
        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-outline-variant mb-2">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-outline">
                <User className="w-4 h-4" />
              </div>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 border border-border rounded-lg bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-sm"
                placeholder="e.g. Alex Sharma"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-outline-variant mb-2">Institution Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-outline">
                <Mail className="w-4 h-4" />
              </div>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 border border-border rounded-lg bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-sm"
                placeholder="student@university.edu.in"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-outline-variant mb-2">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-outline">
                <Lock className="w-4 h-4" />
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 border border-border rounded-lg bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-sm"
                placeholder="••••••••"
                required
              />
            </div>
          </div>
          
          {/* Password Requirements */}
          <div className="bg-surface-container p-4 rounded-lg">
            <p className="text-xs font-bold text-foreground mb-2">Password must contain:</p>
            <ul className="space-y-1.5 text-xs text-muted-foreground">
              <li className="flex items-center gap-2">
                {hasLength ? <Check className="w-3.5 h-3.5 text-primary" /> : <div className="w-3.5 h-3.5 rounded-full border border-outline"></div>}
                <span className={hasLength ? 'text-foreground' : ''}>Minimum 8 characters</span>
              </li>
              <li className="flex items-center gap-2">
                {hasUpper ? <Check className="w-3.5 h-3.5 text-primary" /> : <div className="w-3.5 h-3.5 rounded-full border border-outline"></div>}
                <span className={hasUpper ? 'text-foreground' : ''}>At least one uppercase letter</span>
              </li>
              <li className="flex items-center gap-2">
                {hasNumber ? <Check className="w-3.5 h-3.5 text-primary" /> : <div className="w-3.5 h-3.5 rounded-full border border-outline"></div>}
                <span className={hasNumber ? 'text-foreground' : ''}>At least one number (0-9)</span>
              </li>
              <li className="flex items-center gap-2">
                {hasSpecial ? <Check className="w-3.5 h-3.5 text-primary" /> : <div className="w-3.5 h-3.5 rounded-full border border-outline"></div>}
                <span className={hasSpecial ? 'text-foreground' : ''}>At least one special character</span>
              </li>
            </ul>
          </div>
          
          <label className="flex items-start gap-2 cursor-pointer mt-4">
            <input type="checkbox" className="w-4 h-4 mt-0.5 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2" required />
            <span className="text-xs text-muted-foreground">
              I agree to the <a href="#" className="font-bold text-primary hover:underline">Terms of Service</a> and <a href="#" className="font-bold text-primary hover:underline">Privacy Policy</a>
            </span>
          </label>
          
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-accent transition-colors flex items-center justify-center mt-6 disabled:opacity-50"
          >
            {isLoading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
        
        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account? <Link to="/login" className="font-bold text-primary hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
