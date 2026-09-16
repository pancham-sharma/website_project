import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export const VerifyEmailPage: React.FC = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (/[^0-9]/.test(value)) return;
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    
    if (value !== '' && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && code[index] === '' && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = () => {
    if (code.every(c => c !== '')) {
      navigate('/reset-password');
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-surface-container-lowest border border-border rounded-xl shadow-sm p-8 text-center">
        
        <div className="w-12 h-12 bg-primary text-primary-foreground rounded-lg flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-6 h-6" />
        </div>
        
        <h1 className="text-2xl font-bold text-primary mb-3">Check your email</h1>
        <p className="text-sm text-muted-foreground mb-8">
          We sent a 6-digit verification code to <br/> <span className="font-bold text-foreground">student@university.edu.in</span>
        </p>
        
        <div className="flex justify-center gap-2 mb-8">
          {code.map((c, i) => (
            <input
              key={i}
              ref={(el) => { inputs.current[i] = el; }}
              type="text"
              maxLength={1}
              value={c}
              onChange={e => handleChange(e, i)}
              onKeyDown={e => handleKeyDown(e, i)}
              className="w-12 h-12 text-center text-xl font-bold border border-border rounded-lg bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
            />
          ))}
        </div>
        
        <button 
          onClick={handleSubmit}
          className="w-full py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-accent transition-colors flex items-center justify-center mb-6"
        >
          Verify Email
        </button>
        
        <p className="text-sm text-muted-foreground">
          Didn't receive the email? <button className="font-bold text-primary hover:underline ml-1">Click to resend</button>
        </p>
        
        <div className="mt-8 pt-6 border-t border-border text-center">
          <Link to="/login" className="text-sm font-bold text-primary hover:underline">
            Back to login
          </Link>
        </div>
        
      </div>
    </div>
  );
};
