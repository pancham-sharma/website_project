import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, ShieldCheck } from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/admin/dashboard');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#F7F7F7',
      padding: 20
    }}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        {/* Brand */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 10, background: '#111111',
            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px'
          }}>
            <BookOpen color="#fff" size={20} />
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#111', marginBottom: 4 }}>EduCare Admin</div>
          <div style={{ fontSize: 13, color: '#888' }}>Sign in to manage the platform</div>
        </div>

        {/* Form Card */}
        <div style={{
          background: '#fff',
          border: '1px solid #E5E5E5',
          borderRadius: 12,
          padding: '32px 28px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
        }}>
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: 18 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#444', marginBottom: 6 }}>
                Administrator Email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{
                  width: '100%', padding: '9px 12px',
                  border: '1px solid #D9D9D9', borderRadius: 6,
                  fontSize: 13, outline: 'none', boxSizing: 'border-box',
                  color: '#111'
                }}
                placeholder="admin@educare.com"
                required
              />
            </div>

            <div style={{ marginBottom: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: '#444' }}>Password</label>
                <a href="#" style={{ fontSize: 12, color: '#111', fontWeight: 600 }}>Forgot password?</a>
              </div>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{
                  width: '100%', padding: '9px 12px',
                  border: '1px solid #D9D9D9', borderRadius: 6,
                  fontSize: 13, outline: 'none', boxSizing: 'border-box',
                  color: '#111'
                }}
                placeholder="••••••••"
                required
              />
            </div>

            <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 22, cursor: 'pointer' }}>
              <input type="checkbox" />
              <span style={{ fontSize: 12, color: '#666' }}>Remember this device</span>
            </label>

            <button
              type="submit"
              style={{
                width: '100%', padding: '10px 16px',
                background: '#111111', color: '#fff',
                border: 'none', borderRadius: 8,
                fontSize: 14, fontWeight: 700,
                cursor: 'pointer', display: 'flex',
                alignItems: 'center', justifyContent: 'center', gap: 8
              }}
            >
              Sign In to Admin Panel
            </button>
          </form>
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 12, color: '#888' }}>
          <ShieldCheck size={13} />
          Secure Admin Authentication – Authorized Access Only
        </div>
      </div>
    </div>
  );
};
