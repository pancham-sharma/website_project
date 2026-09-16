import React from 'react';
import { Link } from 'react-router-dom';


// This file is now superseded by AdminDashboard.tsx + the new AdminLayout.
// Keeping a minimal re-export redirect so no import errors occur.
export const AdminAnalyticsDashboard: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: 16 }}>
      <div style={{ fontSize: 48 }}>📊</div>
      <div style={{ fontWeight: 700, fontSize: 18 }}>Redirecting to Dashboard...</div>
      <Link to="/admin/dashboard" style={{ fontWeight: 600, color: '#111', fontSize: 14 }}>Go to Admin Dashboard →</Link>
    </div>
  );
};
