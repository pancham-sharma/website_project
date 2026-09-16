import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { TableToolbar, StatusBadge, RowActions, ConfirmDialog, EmptyState, Pagination } from '../components/AdminUI';

const MOCK = [
  { id: 1, title: 'DBMS Notes – Chapter 1: Introduction', subject: 'DBMS', branch: 'CSE', sem: 5, size: '2.4 MB', pages: 14, tags: ['DBMS','Intro'], status: 'Published', uploaded: '10 Feb 2024' },
  { id: 2, title: 'Normalization Rules – Complete Guide', subject: 'DBMS', branch: 'CSE', sem: 5, size: '1.8 MB', pages: 10, tags: ['Normalization'], status: 'Published', uploaded: '12 Feb 2024' },
  { id: 3, title: 'OS Process Scheduling Algorithms', subject: 'OS', branch: 'CSE', sem: 5, size: '3.1 MB', pages: 18, tags: ['OS','Scheduling'], status: 'Published', uploaded: '14 Feb 2024' },
  { id: 4, title: 'Computer Networks – OSI Model Explained', subject: 'CN', branch: 'CSE', sem: 5, size: '2.7 MB', pages: 16, tags: ['CN','OSI'], status: 'Draft', uploaded: '16 Feb 2024' },
  { id: 5, title: 'Data Structures – Trees and Graphs', subject: 'DSA', branch: 'CSE', sem: 3, size: '4.2 MB', pages: 22, tags: ['DSA','Trees'], status: 'Published', uploaded: '18 Feb 2024' },
];

export const NotesPage: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const filtered = MOCK.filter(n => n.title.toLowerCase().includes(search.toLowerCase()) || n.subject.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <TableToolbar title="Notes / PDF Materials" count={filtered.length} searchPlaceholder="Search notes..." addLabel="Upload Note" addTo="/admin/notes/new" onSearch={setSearch} />
      <div className="card">
        <table className="data-table">
          <thead><tr><th><input type="checkbox" /></th><th>Title</th><th>Subject</th><th>Branch</th><th>Sem</th><th>Size</th><th>Pages</th><th>Status</th><th>Uploaded</th><th>Actions</th></tr></thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={10}><EmptyState title="No notes found" desc="Upload PDF notes for subjects." actionLabel="Upload Note" actionTo="/admin/notes/new" /></td></tr>
            ) : filtered.map(n => (
              <tr key={n.id}>
                <td><input type="checkbox" /></td>
                <td>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: 13 }}>{n.title}</div>
                  <div style={{ display: 'flex', gap: 4, marginTop: 3 }}>{n.tags.map(t => <span key={t} className="badge" style={{ fontSize: 10 }}>{t}</span>)}</div>
                </td>
                <td><span className="badge">{n.subject}</span></td>
                <td><span className="badge">{n.branch}</span></td>
                <td>{n.sem}</td>
                <td style={{ fontSize: 12 }}>{n.size}</td>
                <td>{n.pages}</td>
                <td><StatusBadge status={n.status} /></td>
                <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>{n.uploaded}</td>
                <td><RowActions actions={[
                  { label: 'Preview', icon: Eye, onClick: () => {} },
                  { label: 'Edit', icon: Edit, onClick: () => navigate(`/admin/notes/${n.id}/edit`) },
                  { label: 'Delete', icon: Trash2, onClick: () => setDeleteId(n.id), danger: true },
                ]} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination page={page} total={filtered.length} perPage={10} onChange={setPage} />
      </div>
      <ConfirmDialog open={deleteId !== null} title="Delete Note?" message="This PDF will be removed from the student platform. Students will no longer be able to access it." confirmLabel="Delete" onConfirm={() => setDeleteId(null)} onCancel={() => setDeleteId(null)} />
    </div>
  );
};

export const NoteFormPage: React.FC = () => {
  const navigate = useNavigate();
  const [fileName, setFileName] = useState('');

  return (
    <div>
      <div className="page-header"><h1 className="page-title">Upload Note</h1></div>
      <div className="card" style={{ maxWidth: 720 }}>
        <div className="card-body">
          <form onSubmit={e => { e.preventDefault(); navigate('/admin/notes'); }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
              {[['Course *','select',['B.Tech','BCA','MCA']],['Branch *','select',['CSE','IT','ECE']],['Semester *','select',['1','2','3','4','5','6','7','8']],['Subject *','select',['DBMS','OS','CN','DSA']],['Chapter *','select',['Chapter 1','Chapter 2','Chapter 3']]].map(([l,_t,o]) => (
                <div key={l as string} style={{ marginBottom: 16 }}>
                  <label className="input-label">{l as string}</label>
                  <select className="input">{(o as string[]).map(v => <option key={v}>{v}</option>)}</select>
                </div>
              ))}
              <div style={{ marginBottom: 16, gridColumn: '1 / -1' }}>
                <label className="input-label">Title *</label>
                <input className="input" placeholder="e.g. DBMS Normalization – Complete Guide" required />
              </div>
              <div style={{ marginBottom: 16, gridColumn: '1 / -1' }}>
                <label className="input-label">Description</label>
                <textarea className="input" rows={2} style={{ resize: 'vertical' }} />
              </div>
              <div style={{ marginBottom: 16, gridColumn: '1 / -1' }}>
                <label className="input-label">PDF File *</label>
                <div style={{
                  border: '2px dashed var(--border-strong)', borderRadius: 8,
                  padding: 32, textAlign: 'center', background: 'var(--bg)', cursor: 'pointer'
                }} onClick={() => document.getElementById('pdf-upload')?.click()}>
                  <input id="pdf-upload" type="file" accept=".pdf" style={{ display: 'none' }} onChange={e => setFileName(e.target.files?.[0]?.name ?? '')} />
                  {fileName ? (
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>📄 {fileName}</div>
                  ) : (
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Click to upload PDF</div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>PDF files only, max 50MB</div>
                    </div>
                  )}
                </div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label className="input-label">Status</label>
                <select className="input"><option>Draft</option><option>Published</option></select>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/admin/notes')}>Cancel</button>
              <button type="submit" className="btn btn-primary">Upload Note</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
