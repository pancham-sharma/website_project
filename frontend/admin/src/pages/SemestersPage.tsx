import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {  Edit, Trash2 } from 'lucide-react';
import { TableToolbar, StatusBadge, RowActions, ConfirmDialog, EmptyState, Pagination } from '../components/AdminUI';

const MOCK = [
  { id: 1, course: 'B.Tech', branch: 'CSE', num: 1, name: 'Semester 1', subjects: 6, status: 'Published' },
  { id: 2, course: 'B.Tech', branch: 'CSE', num: 2, name: 'Semester 2', subjects: 6, status: 'Published' },
  { id: 3, course: 'B.Tech', branch: 'CSE', num: 3, name: 'Semester 3', subjects: 6, status: 'Published' },
  { id: 4, course: 'B.Tech', branch: 'CSE', num: 4, name: 'Semester 4', subjects: 6, status: 'Published' },
  { id: 5, course: 'B.Tech', branch: 'CSE', num: 5, name: 'Semester 5', subjects: 7, status: 'Published' },
  { id: 6, course: 'B.Tech', branch: 'CSE', num: 6, name: 'Semester 6', subjects: 7, status: 'Published' },
  { id: 7, course: 'B.Tech', branch: 'CSE', num: 7, name: 'Semester 7', subjects: 5, status: 'Published' },
  { id: 8, course: 'B.Tech', branch: 'CSE', num: 8, name: 'Semester 8', subjects: 4, status: 'Published' },
  { id: 9, course: 'B.Tech', branch: 'IT', num: 1, name: 'Semester 1', subjects: 6, status: 'Published' },
];

export const SemestersPage: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filterBranch, setFilterBranch] = useState('');
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [page, setPage] = useState(1);

  const filtered = MOCK.filter(s =>
    (s.name.toLowerCase().includes(search.toLowerCase()) || s.branch.toLowerCase().includes(search.toLowerCase())) &&
    (!filterBranch || s.branch === filterBranch)
  );

  return (
    <div>
      <TableToolbar title="Semesters" count={filtered.length} searchPlaceholder="Search semesters..." addLabel="Add Semester" addTo="/admin/semesters/new" onSearch={setSearch}>
        <select className="input" style={{ width: 140 }} value={filterBranch} onChange={e => setFilterBranch(e.target.value)}>
          <option value="">All Branches</option>
          <option>CSE</option><option>IT</option><option>ECE</option><option>AIML</option>
        </select>
      </TableToolbar>
      <div className="card">
        <table className="data-table">
          <thead><tr><th><input type="checkbox" /></th><th>Semester</th><th>Course</th><th>Branch</th><th>Subjects</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={7}><EmptyState title="No semesters found" desc="Add semesters to a branch." actionLabel="Add Semester" actionTo="/admin/semesters/new" /></td></tr>
            ) : filtered.map(s => (
              <tr key={s.id}>
                <td><input type="checkbox" /></td>
                <td><span className="td-primary">{s.name}</span></td>
                <td><span className="badge">{s.course}</span></td>
                <td><span className="badge">{s.branch}</span></td>
                <td>{s.subjects}</td>
                <td><StatusBadge status={s.status} /></td>
                <td><RowActions actions={[
                  { label: 'Edit', icon: Edit, onClick: () => navigate(`/admin/semesters/${s.id}/edit`) },
                  { label: 'Delete', icon: Trash2, onClick: () => setDeleteId(s.id), danger: true },
                ]} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination page={page} total={filtered.length} perPage={10} onChange={setPage} />
      </div>
      <ConfirmDialog open={deleteId !== null} title="Delete Semester?" message="All subjects and resources in this semester will be affected." confirmLabel="Delete" onConfirm={() => setDeleteId(null)} onCancel={() => setDeleteId(null)} />
    </div>
  );
};

export const SemesterFormPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="page-header"><h1 className="page-title">Add Semester</h1><p className="page-subtitle">Create a new semester for a branch.</p></div>
      <div className="card" style={{ maxWidth: 600 }}>
        <div className="card-body">
          <form onSubmit={e => { e.preventDefault(); navigate('/admin/semesters'); }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
              {[['Course *', 'select', ['B.Tech','BCA','MCA','B.Sc']], ['Branch *', 'select', ['CSE','IT','ECE','AIML','DS']], ['Semester Number *', 'number', []], ['Semester Name *', 'text', []]].map(([label, type, opts]) => (
                <div key={label as string} style={{ marginBottom: 16 }}>
                  <label className="input-label">{label as string}</label>
                  {type === 'select' ? (
                    <select className="input">{(opts as string[]).map(o => <option key={o}>{o}</option>)}</select>
                  ) : (
                    <input type={type as string} className="input" placeholder={label === 'Semester Number *' ? 'e.g. 1' : 'e.g. Semester 1'} required />
                  )}
                </div>
              ))}
              <div style={{ marginBottom: 16 }}>
                <label className="input-label">Status</label>
                <select className="input"><option>Draft</option><option>Published</option></select>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/admin/semesters')}>Cancel</button>
              <button type="submit" className="btn btn-primary">Save Semester</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
