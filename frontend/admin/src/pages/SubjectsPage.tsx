import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { TableToolbar, StatusBadge, RowActions, ConfirmDialog, EmptyState, Pagination } from '../components/AdminUI';

const MOCK = [
  { id: 1, course: 'B.Tech', branch: 'CSE', sem: 5, name: 'Database Management Systems', code: 'CS-502', credits: 4, chapters: 12, status: 'Published' },
  { id: 2, course: 'B.Tech', branch: 'CSE', sem: 5, name: 'Operating Systems', code: 'CS-501', credits: 4, chapters: 14, status: 'Published' },
  { id: 3, course: 'B.Tech', branch: 'CSE', sem: 5, name: 'Computer Networks', code: 'CS-503', credits: 4, chapters: 10, status: 'Published' },
  { id: 4, course: 'B.Tech', branch: 'CSE', sem: 3, name: 'Data Structures & Algorithms', code: 'CS-301', credits: 5, chapters: 16, status: 'Published' },
  { id: 5, course: 'B.Tech', branch: 'CSE', sem: 3, name: 'Object Oriented Programming', code: 'CS-302', credits: 4, chapters: 10, status: 'Published' },
  { id: 6, course: 'B.Tech', branch: 'AIML', sem: 5, name: 'Machine Learning', code: 'AI-501', credits: 5, chapters: 14, status: 'Draft' },
  { id: 7, course: 'BCA', branch: 'CA', sem: 3, name: 'Web Technologies', code: 'BCA-301', credits: 3, chapters: 9, status: 'Published' },
];

export const SubjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const filtered = MOCK.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.code.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <TableToolbar title="Subjects" count={filtered.length} searchPlaceholder="Search subjects..." addLabel="Add Subject" addTo="/admin/subjects/new" onSearch={setSearch} />
      <div className="card">
        <table className="data-table">
          <thead><tr><th><input type="checkbox" /></th><th>Subject</th><th>Code</th><th>Course</th><th>Branch</th><th>Sem</th><th>Credits</th><th>Chapters</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={10}><EmptyState title="No subjects found" desc="Add subjects to semesters." actionLabel="Add Subject" actionTo="/admin/subjects/new" /></td></tr>
            ) : filtered.map(s => (
              <tr key={s.id}>
                <td><input type="checkbox" /></td>
                <td><Link to={`/admin/subjects/${s.id}`} style={{ fontWeight: 600, color: 'var(--text-primary)', textDecoration: 'none' }}>{s.name}</Link></td>
                <td><code style={{ fontSize: 12, background: 'var(--bg)', padding: '2px 6px', borderRadius: 3 }}>{s.code}</code></td>
                <td><span className="badge">{s.course}</span></td>
                <td><span className="badge">{s.branch}</span></td>
                <td>{s.sem}</td>
                <td>{s.credits}</td>
                <td>{s.chapters}</td>
                <td><StatusBadge status={s.status} /></td>
                <td><RowActions actions={[
                  { label: 'View', icon: Eye, onClick: () => navigate(`/admin/subjects/${s.id}`) },
                  { label: 'Edit', icon: Edit, onClick: () => navigate(`/admin/subjects/${s.id}/edit`) },
                  { label: 'Delete', icon: Trash2, onClick: () => setDeleteId(s.id), danger: true },
                ]} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination page={page} total={filtered.length} perPage={10} onChange={setPage} />
      </div>
      <ConfirmDialog open={deleteId !== null} title="Delete Subject?" message="All chapters, notes, videos, PYQs, and questions will be affected." confirmLabel="Delete" onConfirm={() => setDeleteId(null)} onCancel={() => setDeleteId(null)} />
    </div>
  );
};

export const SubjectFormPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="page-header"><h1 className="page-title">Add Subject</h1></div>
      <div className="card" style={{ maxWidth: 720 }}>
        <div className="card-body">
          <form onSubmit={e => { e.preventDefault(); navigate('/admin/subjects'); }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
              {[['Course *', 'select', ['B.Tech','BCA','MCA']], ['Branch *', 'select', ['CSE','IT','ECE','AIML']], ['Semester *', 'select', ['1','2','3','4','5','6','7','8']], ['Credits', 'number', []]].map(([label, type, opts]) => (
                <div key={label as string} style={{ marginBottom: 16 }}>
                  <label className="input-label">{label as string}</label>
                  {type === 'select' ? <select className="input">{(opts as string[]).map(o => <option key={o}>{o}</option>)}</select> : <input type="number" className="input" placeholder="e.g. 4" />}
                </div>
              ))}
              <div style={{ marginBottom: 16, gridColumn: '1 / -1' }}>
                <label className="input-label">Subject Name *</label>
                <input className="input" placeholder="e.g. Database Management Systems" required />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label className="input-label">Subject Code *</label>
                <input className="input" placeholder="e.g. CS-502" required />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label className="input-label">Status</label>
                <select className="input"><option>Draft</option><option>Published</option></select>
              </div>
              <div style={{ marginBottom: 16, gridColumn: '1 / -1' }}>
                <label className="input-label">Description</label>
                <textarea className="input" rows={3} style={{ resize: 'vertical' }} />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/admin/subjects')}>Cancel</button>
              <button type="submit" className="btn btn-primary">Save Subject</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export const SubjectDetailPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h1 className="page-title">Database Management Systems</h1>
          <p className="page-subtitle">B.Tech CSE • Semester 5 • Code: CS-502</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-secondary" onClick={() => navigate('/admin/subjects/1/edit')}>Edit</button>
          <Link to="/admin/chapters/new" className="btn btn-primary">Add Chapter</Link>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 14, marginBottom: 24 }}>
        {[['Chapters','12'],['Notes','48'],['Videos','36'],['PYQs','24'],['Practice Qs','280'],['Interview Qs','60']].map(([l,v]) => (
          <div key={l} className="stat-card"><div className="stat-label">{l}</div><div className="stat-value" style={{ fontSize: 22 }}>{v}</div></div>
        ))}
      </div>
      <div className="card">
        <div className="card-header"><span style={{ fontWeight: 700, fontSize: 13 }}>Chapters</span><Link to="/admin/chapters/new" className="btn btn-primary btn-sm">Add Chapter</Link></div>
        <table className="data-table">
          <thead><tr><th>#</th><th>Chapter Title</th><th>Notes</th><th>Videos</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {['Introduction to DBMS','ER Model & Conceptual Design','Relational Model','SQL – DDL and DML','Normalization','Transaction Management'].map((ch, i) => (
              <tr key={i}>
                <td style={{ color: 'var(--text-muted)', fontWeight: 700 }}>{i+1}</td>
                <td className="td-primary">{ch}</td>
                <td>{[4,6,5,8,4,3][i]}</td>
                <td>{[3,5,4,6,3,2][i]}</td>
                <td><StatusBadge status="Published" /></td>
                <td><RowActions actions={[
                  { label: 'Edit', icon: Edit, onClick: () => {} },
                  { label: 'Delete', icon: Trash2, onClick: () => {}, danger: true },
                ]} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
