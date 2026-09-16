import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, Edit, Trash2, Archive, Plus } from 'lucide-react';
import { TableToolbar, StatusBadge, RowActions, ConfirmDialog, EmptyState, Pagination } from '../components/AdminUI';

const MOCK_COURSES = [
  { id: 1, name: 'Bachelor of Technology', code: 'BTECH', type: 'Undergraduate', branches: 8, subjects: 286, status: 'Published', created: '12 Jan 2024' },
  { id: 2, name: 'Bachelor of Computer Applications', code: 'BCA', type: 'Undergraduate', branches: 3, subjects: 94, status: 'Published', created: '12 Jan 2024' },
  { id: 3, name: 'Master of Computer Applications', code: 'MCA', type: 'Postgraduate', branches: 2, subjects: 72, status: 'Published', created: '14 Jan 2024' },
  { id: 4, name: 'Bachelor of Science', code: 'BSC', type: 'Undergraduate', branches: 8, subjects: 180, status: 'Published', created: '14 Jan 2024' },
  { id: 5, name: 'Master of Science', code: 'MSC', type: 'Postgraduate', branches: 5, subjects: 120, status: 'Draft', created: '20 Jan 2024' },
  { id: 6, name: 'Bachelor of Business Administration', code: 'BBA', type: 'Undergraduate', branches: 3, subjects: 88, status: 'Published', created: '22 Jan 2024' },
];

export const CoursesPage: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [page, setPage] = useState(1);

  const filtered = MOCK_COURSES.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <TableToolbar
        title="Courses"
        count={filtered.length}
        searchPlaceholder="Search courses..."
        addLabel="Add Course"
        addTo="/admin/courses/new"
        onSearch={setSearch}
      />

      <div className="card">
        <table className="data-table">
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>Course Name</th>
              <th>Code</th>
              <th>Type</th>
              <th>Branches</th>
              <th>Subjects</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={9}><EmptyState title="No courses found" desc="Add your first course to get started." actionLabel="Add Course" actionTo="/admin/courses/new" /></td></tr>
            ) : filtered.map(c => (
              <tr key={c.id}>
                <td><input type="checkbox" /></td>
                <td>
                  <Link to={`/admin/courses/${c.id}`} style={{ fontWeight: 600, color: 'var(--text-primary)', textDecoration: 'none' }}>
                    {c.name}
                  </Link>
                </td>
                <td><code style={{ fontSize: 12, background: 'var(--bg)', padding: '2px 6px', borderRadius: 3 }}>{c.code}</code></td>
                <td>{c.type}</td>
                <td>{c.branches}</td>
                <td>{c.subjects}</td>
                <td><StatusBadge status={c.status} /></td>
                <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>{c.created}</td>
                <td>
                  <RowActions actions={[
                    { label: 'View', icon: Eye, onClick: () => navigate(`/admin/courses/${c.id}`) },
                    { label: 'Edit', icon: Edit, onClick: () => navigate(`/admin/courses/${c.id}/edit`) },
                    { label: 'Archive', icon: Archive, onClick: () => {} },
                    { label: 'Delete', icon: Trash2, onClick: () => setDeleteId(c.id), danger: true },
                  ]} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination page={page} total={filtered.length} perPage={10} onChange={setPage} />
      </div>

      <ConfirmDialog
        open={deleteId !== null}
        title="Delete Course?"
        message="This will remove the course and may affect all associated branches, semesters, subjects, and resources. This action cannot be undone."
        confirmLabel="Delete"
        onConfirm={() => setDeleteId(null)}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
};

export const CourseFormPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Add Course</h1>
        <p className="page-subtitle">Create a new academic course/degree program.</p>
      </div>
      <div className="card" style={{ maxWidth: 700 }}>
        <div className="card-body">
          <form onSubmit={e => { e.preventDefault(); navigate('/admin/courses'); }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
              <div style={{ marginBottom: 16, gridColumn: '1 / -1' }}>
                <label className="input-label">Course Name *</label>
                <input className="input" placeholder="e.g. Bachelor of Technology" required />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label className="input-label">Course Code *</label>
                <input className="input" placeholder="e.g. BTECH" required />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label className="input-label">Course Type *</label>
                <select className="input">
                  <option>Undergraduate</option>
                  <option>Postgraduate</option>
                  <option>Diploma</option>
                  <option>Certificate</option>
                </select>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label className="input-label">Duration</label>
                <input className="input" placeholder="e.g. 4 Years" />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label className="input-label">Status</label>
                <select className="input">
                  <option>Draft</option>
                  <option>Published</option>
                </select>
              </div>
              <div style={{ marginBottom: 16, gridColumn: '1 / -1' }}>
                <label className="input-label">Description</label>
                <textarea className="input" rows={4} placeholder="Course description..." style={{ resize: 'vertical' }} />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 8, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/admin/courses')}>Cancel</button>
              <button type="submit" className="btn btn-primary">Save Course</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export const CourseDetailPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h1 className="page-title">Bachelor of Technology (B.Tech)</h1>
          <p className="page-subtitle">Course overview and associated content</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-secondary" onClick={() => navigate('/admin/courses/1/edit')}>Edit Course</button>
          <Link to="/admin/branches/new" className="btn btn-primary"><Plus size={14} /> Add Branch</Link>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
        {[['Branches', '8'], ['Semesters', '64'], ['Subjects', '286'], ['Resources', '4,291']].map(([label, val]) => (
          <div key={label} className="stat-card"><div className="stat-label">{label}</div><div className="stat-value">{val}</div></div>
        ))}
      </div>
      <div className="card">
        <div className="card-header"><span style={{ fontSize: 13, fontWeight: 700 }}>Branches</span></div>
        <table className="data-table">
          <thead><tr><th>Branch</th><th>Code</th><th>Semesters</th><th>Subjects</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {['Computer Science & Engineering', 'Information Technology', 'Artificial Intelligence & ML', 'Data Science', 'Electronics & Communication'].map((b, i) => (
              <tr key={i}>
                <td className="td-primary">{b}</td>
                <td><code style={{ fontSize: 12, background: 'var(--bg)', padding: '2px 6px', borderRadius: 3 }}>{['CSE','IT','AIML','DS','ECE'][i]}</code></td>
                <td>8</td>
                <td>{[42, 38, 36, 32, 44][i]}</td>
                <td><StatusBadge status="Published" /></td>
                <td><RowActions actions={[
                  { label: 'View', icon: Eye, onClick: () => {} },
                  { label: 'Edit', icon: Edit, onClick: () => {} },
                ]} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
