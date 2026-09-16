import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { TableToolbar, StatusBadge, RowActions, ConfirmDialog, EmptyState, Pagination } from '../components/AdminUI';

const MOCK_BRANCHES = [
  { id: 1, course: 'B.Tech', name: 'Computer Science & Engineering', code: 'CSE', semesters: 8, subjects: 42, status: 'Published', created: '15 Jan 2024' },
  { id: 2, course: 'B.Tech', name: 'Information Technology', code: 'IT', semesters: 8, subjects: 38, status: 'Published', created: '15 Jan 2024' },
  { id: 3, course: 'B.Tech', name: 'Artificial Intelligence & ML', code: 'AIML', semesters: 8, subjects: 36, status: 'Published', created: '16 Jan 2024' },
  { id: 4, course: 'B.Tech', name: 'Data Science', code: 'DS', semesters: 8, subjects: 32, status: 'Published', created: '16 Jan 2024' },
  { id: 5, course: 'B.Tech', name: 'Electronics & Communication', code: 'ECE', semesters: 8, subjects: 44, status: 'Published', created: '17 Jan 2024' },
  { id: 6, course: 'BCA', name: 'Computer Applications', code: 'CA', semesters: 6, subjects: 28, status: 'Published', created: '18 Jan 2024' },
  { id: 7, course: 'MCA', name: 'Computer Applications (PG)', code: 'MCA', semesters: 4, subjects: 22, status: 'Draft', created: '20 Jan 2024' },
];

export const BranchesPage: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const filtered = MOCK_BRANCHES.filter(b => b.name.toLowerCase().includes(search.toLowerCase()) || b.code.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <TableToolbar title="Branches" count={filtered.length} searchPlaceholder="Search branches..." addLabel="Add Branch" addTo="/admin/branches/new" onSearch={setSearch} />
      <div className="card">
        <table className="data-table">
          <thead><tr><th><input type="checkbox" /></th><th>Branch Name</th><th>Code</th><th>Course</th><th>Semesters</th><th>Subjects</th><th>Status</th><th>Created</th><th>Actions</th></tr></thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={9}><EmptyState title="No branches found" desc="Add a branch to a course." actionLabel="Add Branch" actionTo="/admin/branches/new" /></td></tr>
            ) : filtered.map(b => (
              <tr key={b.id}>
                <td><input type="checkbox" /></td>
                <td><Link to={`/admin/branches/${b.id}`} style={{ fontWeight: 600, color: 'var(--text-primary)', textDecoration: 'none' }}>{b.name}</Link></td>
                <td><code style={{ fontSize: 12, background: 'var(--bg)', padding: '2px 6px', borderRadius: 3 }}>{b.code}</code></td>
                <td><span className="badge">{b.course}</span></td>
                <td>{b.semesters}</td>
                <td>{b.subjects}</td>
                <td><StatusBadge status={b.status} /></td>
                <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>{b.created}</td>
                <td><RowActions actions={[
                  { label: 'View', icon: Eye, onClick: () => navigate(`/admin/branches/${b.id}`) },
                  { label: 'Edit', icon: Edit, onClick: () => navigate(`/admin/branches/${b.id}/edit`) },
                  { label: 'Delete', icon: Trash2, onClick: () => setDeleteId(b.id), danger: true },
                ]} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination page={page} total={filtered.length} perPage={10} onChange={setPage} />
      </div>
      <ConfirmDialog open={deleteId !== null} title="Delete Branch?" message="This will remove the branch and all associated semesters, subjects, and resources." confirmLabel="Delete" onConfirm={() => setDeleteId(null)} onCancel={() => setDeleteId(null)} />
    </div>
  );
};

export const BranchFormPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="page-header"><h1 className="page-title">Add Branch</h1><p className="page-subtitle">Add a new branch under a course.</p></div>
      <div className="card" style={{ maxWidth: 700 }}>
        <div className="card-body">
          <form onSubmit={e => { e.preventDefault(); navigate('/admin/branches'); }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
              <div style={{ marginBottom: 16 }}>
                <label className="input-label">Course *</label>
                <select className="input"><option>B.Tech</option><option>BCA</option><option>MCA</option><option>B.Sc</option></select>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label className="input-label">Branch Code *</label>
                <input className="input" placeholder="e.g. CSE" required />
              </div>
              <div style={{ marginBottom: 16, gridColumn: '1 / -1' }}>
                <label className="input-label">Branch Name *</label>
                <input className="input" placeholder="e.g. Computer Science & Engineering" required />
              </div>
              <div style={{ marginBottom: 16, gridColumn: '1 / -1' }}>
                <label className="input-label">Description</label>
                <textarea className="input" rows={3} style={{ resize: 'vertical' }} />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label className="input-label">Status</label>
                <select className="input"><option>Draft</option><option>Published</option></select>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 8, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/admin/branches')}>Cancel</button>
              <button type="submit" className="btn btn-primary">Save Branch</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
