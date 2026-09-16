import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Trash2 } from 'lucide-react';
import { TableToolbar, StatusBadge, RowActions, ConfirmDialog, EmptyState, Pagination } from '../components/AdminUI';

const MOCK = [
  { id: 1, num: 1, title: 'Introduction to DBMS', subject: 'Database Management Systems', branch: 'CSE', sem: 5, time: '2h 30m', status: 'Published' },
  { id: 2, num: 2, title: 'ER Model & Conceptual Design', subject: 'Database Management Systems', branch: 'CSE', sem: 5, time: '3h', status: 'Published' },
  { id: 3, num: 3, title: 'Relational Model & Algebra', subject: 'Database Management Systems', branch: 'CSE', sem: 5, time: '4h', status: 'Published' },
  { id: 4, num: 1, title: 'Process Management & Scheduling', subject: 'Operating Systems', branch: 'CSE', sem: 5, time: '3h 30m', status: 'Published' },
  { id: 5, num: 2, title: 'Memory Management & Virtual Memory', subject: 'Operating Systems', branch: 'CSE', sem: 5, time: '4h', status: 'Draft' },
];

export const ChaptersPage: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const filtered = MOCK.filter(c => c.title.toLowerCase().includes(search.toLowerCase()) || c.subject.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <TableToolbar title="Chapters" count={filtered.length} searchPlaceholder="Search chapters..." addLabel="Add Chapter" addTo="/admin/chapters/new" onSearch={setSearch} />
      <div className="card">
        <table className="data-table">
          <thead><tr><th><input type="checkbox" /></th><th>#</th><th>Chapter Title</th><th>Subject</th><th>Branch</th><th>Sem</th><th>Est. Time</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={9}><EmptyState title="No chapters found" desc="Add chapters to subjects." actionLabel="Add Chapter" actionTo="/admin/chapters/new" /></td></tr>
            ) : filtered.map(c => (
              <tr key={c.id}>
                <td><input type="checkbox" /></td>
                <td style={{ fontWeight: 700, color: 'var(--text-muted)' }}>{c.num}</td>
                <td className="td-primary">{c.title}</td>
                <td style={{ fontSize: 12 }}>{c.subject}</td>
                <td><span className="badge">{c.branch}</span></td>
                <td>{c.sem}</td>
                <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>{c.time}</td>
                <td><StatusBadge status={c.status} /></td>
                <td><RowActions actions={[
                  { label: 'Edit', icon: Edit, onClick: () => navigate(`/admin/chapters/${c.id}/edit`) },
                  { label: 'Delete', icon: Trash2, onClick: () => setDeleteId(c.id), danger: true },
                ]} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination page={page} total={filtered.length} perPage={10} onChange={setPage} />
      </div>
      <ConfirmDialog open={deleteId !== null} title="Delete Chapter?" message="All resources within this chapter will be affected." confirmLabel="Delete" onConfirm={() => setDeleteId(null)} onCancel={() => setDeleteId(null)} />
    </div>
  );
};

export const ChapterFormPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="page-header"><h1 className="page-title">Add Chapter</h1></div>
      <div className="card" style={{ maxWidth: 700 }}>
        <div className="card-body">
          <form onSubmit={e => { e.preventDefault(); navigate('/admin/chapters'); }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
              {[['Course *','select',['B.Tech','BCA','MCA']],['Branch *','select',['CSE','IT','ECE']],['Semester *','select',['1','2','3','4','5','6','7','8']],['Subject *','select',['Database Management Systems','Operating Systems','Computer Networks']]].map(([l,_t,o]) => (
                <div key={l as string} style={{ marginBottom: 16 }}>
                  <label className="input-label">{l as string}</label>
                  <select className="input">{(o as string[]).map(v => <option key={v}>{v}</option>)}</select>
                </div>
              ))}
              <div style={{ marginBottom: 16 }}>
                <label className="input-label">Chapter Number *</label>
                <input type="number" className="input" placeholder="e.g. 1" required />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label className="input-label">Estimated Study Time</label>
                <input className="input" placeholder="e.g. 3h 30m" />
              </div>
              <div style={{ marginBottom: 16, gridColumn: '1 / -1' }}>
                <label className="input-label">Chapter Title *</label>
                <input className="input" placeholder="e.g. Introduction to Relational Model" required />
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
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/admin/chapters')}>Cancel</button>
              <button type="submit" className="btn btn-primary">Save Chapter</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
