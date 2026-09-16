import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, Edit, Trash2, ChevronRight } from 'lucide-react';
import { TableToolbar, StatusBadge, RowActions, ConfirmDialog, EmptyState, Pagination } from '../components/AdminUI';

// ---- Students Page ----
const MOCK_STUDENTS = [
  { id: 1, name: 'Arjun Sharma', email: 'arjun.s@example.com', course: 'B.Tech', branch: 'CSE', sem: 5, verified: true, status: 'Active', joined: '10 Jan 2024' },
  { id: 2, name: 'Priya Verma', email: 'priya.v@example.com', course: 'BCA', branch: 'CA', sem: 3, verified: true, status: 'Active', joined: '12 Jan 2024' },
  { id: 3, name: 'Rahul Gupta', email: 'rahul.g@example.com', course: 'B.Tech', branch: 'ECE', sem: 3, verified: false, status: 'Inactive', joined: '15 Jan 2024' },
  { id: 4, name: 'Sneha Patel', email: 'sneha.p@example.com', course: 'M.Sc', branch: 'CS', sem: 2, verified: true, status: 'Active', joined: '18 Jan 2024' },
  { id: 5, name: 'Kiran Reddy', email: 'kiran.r@example.com', course: 'MCA', branch: 'MCA', sem: 2, verified: true, status: 'Active', joined: '20 Jan 2024' },
  { id: 6, name: 'Meera Joshi', email: 'meera.j@example.com', course: 'B.Tech', branch: 'AIML', sem: 5, verified: false, status: 'Active', joined: '22 Jan 2024' },
];

export const StudentsPage: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const filtered = MOCK_STUDENTS.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <TableToolbar title="Students" count={filtered.length} searchPlaceholder="Search students..." onSearch={setSearch} />
      <div className="card">
        <table className="data-table">
          <thead><tr><th><input type="checkbox" /></th><th>Student</th><th>Course</th><th>Branch</th><th>Sem</th><th>Verification</th><th>Status</th><th>Joined</th><th>Actions</th></tr></thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={9}><EmptyState title="No students found" desc="No students match your search." /></td></tr>
            ) : filtered.map(s => (
              <tr key={s.id}>
                <td><input type="checkbox" /></td>
                <td>
                  <div className="td-primary">{s.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{s.email}</div>
                </td>
                <td><span className="badge">{s.course}</span></td>
                <td><span className="badge">{s.branch}</span></td>
                <td>{s.sem}</td>
                <td>
                  <span className={`badge ${s.verified ? 'badge-published' : 'badge-draft'}`}>
                    {s.verified ? '✓ Verified' : 'Unverified'}
                  </span>
                </td>
                <td><StatusBadge status={s.status} /></td>
                <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>{s.joined}</td>
                <td><RowActions actions={[
                  { label: 'View', icon: Eye, onClick: () => navigate(`/admin/students/${s.id}`) },
                  { label: 'Edit', icon: Edit, onClick: () => navigate(`/admin/students/${s.id}`) },
                  { label: s.status === 'Active' ? 'Deactivate' : 'Activate', icon: Eye, onClick: () => {} },
                  { label: 'Delete', icon: Trash2, onClick: () => setDeleteId(s.id), danger: true },
                ]} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination page={page} total={filtered.length} perPage={10} onChange={setPage} />
      </div>
      <ConfirmDialog open={deleteId !== null} title="Delete Student Account?" message="This will permanently delete the student's account and all associated learning data. This action cannot be undone." confirmLabel="Delete" onConfirm={() => setDeleteId(null)} onCancel={() => setDeleteId(null)} />
    </div>
  );
};

export const StudentDetailPage: React.FC = () => {

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, fontSize: 13, color: 'var(--text-muted)' }}>
            <Link to="/admin/students" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Students</Link>
            <ChevronRight size={12} />
            <span style={{ color: 'var(--text-primary)' }}>Arjun Sharma</span>
          </div>
          <h1 className="page-title">Arjun Sharma</h1>
          <p className="page-subtitle">arjun.s@example.com · B.Tech CSE · Semester 5</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-secondary">Deactivate Account</button>
          <button className="btn btn-primary">Edit Profile</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 20 }}>
        {/* Left card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="card">
            <div className="card-body" style={{ textAlign: 'center' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#111', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 22, margin: '0 auto 12px' }}>A</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Arjun Sharma</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 12 }}>arjun.s@example.com</div>
              <span className="badge badge-active">Active</span>
            </div>
          </div>
          <div className="card">
            <div className="card-header"><span style={{ fontWeight: 700, fontSize: 12 }}>Account Info</span></div>
            <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13 }}>
              {[['Course','B.Tech'],['Branch','CSE'],['Semester','5'],['Verified','Yes'],['Joined','10 Jan 2024'],['Last Active','Today']].map(([k,v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>{k}</span>
                  <span style={{ fontWeight: 600 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
            {[['Overall Progress','54%'],['Completed Subjects','3'],['Downloads','28'],['Bookmarks','14']].map(([l,v]) => (
              <div key={l} className="stat-card"><div className="stat-label">{l}</div><div className="stat-value" style={{ fontSize: 22 }}>{v}</div></div>
            ))}
          </div>
          <div className="card">
            <div className="card-header"><span style={{ fontWeight: 700, fontSize: 13 }}>Recent Activity</span></div>
            <table className="data-table">
              <thead><tr><th>Activity</th><th>Resource</th><th>Time</th></tr></thead>
              <tbody>
                {[['Viewed Note','DBMS Normalization Cheat Sheet','2 hours ago'],['Watched Video','ER Model Explained','1 day ago'],['Attempted Quiz','SQL MCQs – Chapter 4','2 days ago'],['Downloaded PDF','OS Process Scheduling','3 days ago']].map(([act, res, time]) => (
                  <tr key={res}>
                    <td style={{ fontSize: 12 }}>{act}</td>
                    <td style={{ fontWeight: 600, fontSize: 12 }}>{res}</td>
                    <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>{time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// ---- Admins Page ----
const MOCK_ADMINS = [
  { id: 1, name: 'Admin User', email: 'admin@unieducation.com', role: 'Super Admin', status: 'Active', created: '01 Jan 2024', lastLogin: 'Today' },
  { id: 2, name: 'Content Manager', email: 'content@unieducation.com', role: 'Admin', status: 'Active', created: '10 Jan 2024', lastLogin: 'Yesterday' },
];

export const AdminsPage: React.FC = () => {
  return (
    <div>
      <TableToolbar title="Admin Users" count={MOCK_ADMINS.length} searchPlaceholder="Search admins..." addLabel="Add Admin" addTo="/admin/admins/new" />
      <div className="card">
        <table className="data-table">
          <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Created</th><th>Last Login</th><th>Actions</th></tr></thead>
          <tbody>
            {MOCK_ADMINS.map(a => (
              <tr key={a.id}>
                <td className="td-primary">{a.name}</td>
                <td style={{ fontSize: 12 }}>{a.email}</td>
                <td><span className="badge">{a.role}</span></td>
                <td><StatusBadge status={a.status} /></td>
                <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>{a.created}</td>
                <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>{a.lastLogin}</td>
                <td><RowActions actions={[
                  { label: 'Edit', icon: Edit, onClick: () => {} },
                  { label: 'Deactivate', icon: Trash2, onClick: () => {}, danger: true },
                ]} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
