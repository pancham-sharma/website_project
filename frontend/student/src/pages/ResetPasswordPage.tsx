import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {  Lock, ShieldCheck } from 'lucide-react';

export const ResetPasswordPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === confirmPassword && password.length > 0) {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-surface-container-lowest border border-border rounded-xl shadow-sm p-8 text-center">
        
        <div className="w-12 h-12 bg-primary text-primary-foreground rounded-lg flex items-center justify-center mx-auto mb-6">
          <ShieldCheck className="w-6 h-6" />
        </div>
        
        <h1 className="text-2xl font-bold text-primary mb-3">Set new password</h1>
        <p className="text-sm text-muted-foreground mb-8">
          Your new password must be different from previous used passwords.
        </p>
        
        <form onSubmit={handleSubmit} className="text-left space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-outline-variant mb-2">New Password</label>
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

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-outline-variant mb-2">Confirm New Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-outline">
                <Lock className="w-4 h-4" />
              </div>
              <input 
                type="password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 border border-border rounded-lg bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-sm"
                placeholder="••••••••"
                required
              />
            </div>
          </div>
          
          <button 
            type="submit" 
            className="w-full py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-accent transition-colors flex items-center justify-center"
          >
            Reset Password
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
