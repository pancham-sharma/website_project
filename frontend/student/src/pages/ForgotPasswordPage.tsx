import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Mail } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) navigate('/verify-email');
  };

  return (
    <div className="flex flex-col items-center py-12 px-4 min-h-screen overflow-y-auto">
      <div className="w-full max-w-md bg-surface-container-lowest border border-border rounded-xl shadow-sm p-8 text-center">
        
        <div className="w-12 h-12 bg-primary text-primary-foreground rounded-lg flex items-center justify-center mx-auto mb-6">
          <BookOpen className="w-6 h-6" />
        </div>
        
        <h1 className="text-3xl font-extrabold text-primary mb-3 tracking-tight">Forgot your password?</h1>
        <p className="text-sm text-muted-foreground mb-8">
          Enter your institution email address and we'll send you a link to reset your password.
        </p>
        
        <form onSubmit={handleSubmit} className="text-left space-y-6">
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
          
          <button 
            type="submit" 
            className="w-full py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-accent transition-colors flex items-center justify-center"
          >
            Send Reset Link
          </button>
        </form>
        
        <div className="mt-8 text-center">
          <Link to="/login" className="text-sm font-bold text-primary hover:underline">
            Back to login
          </Link>
        </div>
        
      </div>
    </div>
  );
};
