import React from 'react';
import { Link } from 'react-router-dom';
import {
  Users, BookOpen, FileText, Video, HelpCircle, CheckSquare,
  MessageSquare, BookMarked, Plus, ExternalLink, Clock
} from 'lucide-react';

const statCards = [
  { label: 'Total Students', value: '24,182', sub: '+134 this week' },
  { label: 'Total Courses', value: '12' },
  { label: 'Total Subjects', value: '286' },
  { label: 'Total Notes', value: '1,402' },
  { label: 'Total Videos', value: '3,841' },
  { label: 'Total PYQs', value: '624' },
  { label: 'Practice Questions', value: '9,210' },
  { label: 'Interview Questions', value: '1,108' },
];

const recentStudents = [
  { name: 'Arjun Sharma', email: 'arjun.s@example.com', branch: 'B.Tech CSE', joined: '2 hours ago' },
  { name: 'Priya Verma', email: 'priya.v@example.com', branch: 'BCA', joined: '5 hours ago' },
  { name: 'Rahul Gupta', email: 'rahul.g@example.com', branch: 'B.Tech ECE', joined: 'Yesterday' },
  { name: 'Sneha Patel', email: 'sneha.p@example.com', branch: 'M.Sc CS', joined: 'Yesterday' },
  { name: 'Kiran Reddy', email: 'kiran.r@example.com', branch: 'MCA', joined: '2 days ago' },
];

const recentContent = [
  { type: 'Note', title: 'DBMS Normalization Cheat Sheet', subject: 'Database Management Systems', by: 'Admin', time: '1 hour ago' },
  { type: 'Video', title: 'Binary Trees Explained – Complete Guide', subject: 'Data Structures', by: 'Admin', time: '3 hours ago' },
  { type: 'PYQ', title: 'AKTU 2024 Computer Networks End Sem', subject: 'Computer Networks', by: 'Admin', time: '1 day ago' },
  { type: 'Question', title: 'Added 25 SQL Practice MCQs', subject: 'DBMS', by: 'Admin', time: '1 day ago' },
];

const recentTickets = [
  { id: 'T-1091', student: 'Rohan Mehra', subject: 'Video not loading for OS lectures', status: 'Open', updated: '20 min ago' },
  { id: 'T-1090', student: 'Divya Nair', subject: 'PYQ PDF download broken', status: 'In Progress', updated: '2 hours ago' },
  { id: 'T-1089', student: 'Anil Kumar', subject: 'Semester 6 subject list wrong', status: 'Resolved', updated: 'Yesterday' },
];

const quickActions = [
  { label: 'Add Course', to: '/admin/courses/new', icon: BookOpen },
  { label: 'Add Subject', to: '/admin/subjects/new', icon: BookMarked },
  { label: 'Upload Note', to: '/admin/notes/new', icon: FileText },
  { label: 'Add Video', to: '/admin/videos/new', icon: Video },
  { label: 'Add PYQ', to: '/admin/pyqs/new', icon: HelpCircle },
  { label: 'Add Practice Q', to: '/admin/practice-questions/new', icon: CheckSquare },
];

export const AdminDashboard: React.FC = () => {
  return (
    <div>
      {/* Page Header */}
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Manage and monitor the UniEducation platform.</p>
        </div>
        <Link to="/admin/courses/new" className="btn btn-primary">
          <Plus size={14} /> Add Course
        </Link>
      </div>

      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 14, marginBottom: 28 }}>
        {statCards.map(s => (
          <div key={s.label} className="stat-card">
            <div className="stat-label">{s.label}</div>
            <div className="stat-value">{s.value}</div>
            {s.sub && <div className="stat-sub">{s.sub}</div>}
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div className="card-header">
          <span style={{ fontSize: 13, fontWeight: 700 }}>Quick Actions</span>
        </div>
        <div className="card-body" style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {quickActions.map(a => (
            <Link key={a.label} to={a.to} className="btn btn-secondary">
              <a.icon size={14} /> {a.label}
            </Link>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Recent Students */}
        <div className="card">
          <div className="card-header">
            <span style={{ fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Users size={14} /> Recent Students
            </span>
            <Link to="/admin/students" style={{ fontSize: 12, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 3 }}>
              View all <ExternalLink size={11} />
            </Link>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Branch</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {recentStudents.map(s => (
                <tr key={s.email}>
                  <td>
                    <div className="td-primary">{s.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{s.email}</div>
                  </td>
                  <td>{s.branch}</td>
                  <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                    <Clock size={11} style={{ marginRight: 3, verticalAlign: 'middle' }} />
                    {s.joined}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent Content */}
        <div className="card">
          <div className="card-header">
            <span style={{ fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
              <FileText size={14} /> Recently Added Content
            </span>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Content</th>
                <th>Type</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {recentContent.map((c, i) => (
                <tr key={i}>
                  <td>
                    <div className="td-primary" style={{ fontSize: 12 }}>{c.title}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{c.subject}</div>
                  </td>
                  <td><span className="badge">{c.type}</span></td>
                  <td style={{ fontSize: 12, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{c.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Support Tickets */}
        <div className="card" style={{ gridColumn: '1 / -1' }}>
          <div className="card-header">
            <span style={{ fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
              <MessageSquare size={14} /> Recent Support Tickets
            </span>
            <Link to="/admin/support" style={{ fontSize: 12, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 3 }}>
              View all <ExternalLink size={11} />
            </Link>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>Student</th>
                <th>Subject</th>
                <th>Status</th>
                <th>Updated</th>
              </tr>
            </thead>
            <tbody>
              {recentTickets.map(t => (
                <tr key={t.id}>
                  <td style={{ fontFamily: 'monospace', fontSize: 12 }}>{t.id}</td>
                  <td className="td-primary">{t.student}</td>
                  <td>{t.subject}</td>
                  <td>
                    <span className={`badge ${t.status === 'Open' ? 'badge-open' : t.status === 'Resolved' ? 'badge-resolved' : 'badge-draft'}`}>
                      {t.status}
                    </span>
                  </td>
                  <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>{t.updated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
