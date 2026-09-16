import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { TableToolbar, StatusBadge, RowActions, ConfirmDialog, EmptyState, Pagination } from '../components/AdminUI';

const MOCK = [
  { id: 1, title: 'Introduction to DBMS – Full Lecture', channel: 'Neso Academy', subject: 'DBMS', branch: 'CSE', sem: 5, type: 'Lecture', duration: '45:22', videoId: 'T6bhbKtOIvc', status: 'Published' },
  { id: 2, title: 'ER Model Explained with Examples', channel: 'Gate Smashers', subject: 'DBMS', branch: 'CSE', sem: 5, type: 'Concept', duration: '38:10', videoId: 'Q_GUMSgRgB8', status: 'Published' },
  { id: 3, title: 'Process Scheduling Algorithms – FCFS, SJF, Round Robin', channel: 'Neso Academy', subject: 'OS', branch: 'CSE', sem: 5, type: 'Lecture', duration: '52:40', videoId: 'h0RM048yxEw', status: 'Published' },
  { id: 4, title: 'Binary Trees – BFS and DFS', channel: 'Abdul Bari', subject: 'DSA', branch: 'CSE', sem: 3, type: 'Concept', duration: '1:02:15', videoId: 'H5JubkIy8XE', status: 'Draft' },
];

function extractVideoId(url: string): string {
  const m = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return m ? m[1] : '';
}

export const VideosPage: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const filtered = MOCK.filter(v => v.title.toLowerCase().includes(search.toLowerCase()) || v.subject.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <TableToolbar title="YouTube Videos" count={filtered.length} searchPlaceholder="Search videos..." addLabel="Add Video" addTo="/admin/videos/new" onSearch={setSearch} />
      <div className="card">
        <table className="data-table">
          <thead><tr><th><input type="checkbox" /></th><th>Thumbnail</th><th>Title</th><th>Channel</th><th>Subject</th><th>Type</th><th>Duration</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={9}><EmptyState title="No videos found" desc="Add YouTube video links for subjects." actionLabel="Add Video" actionTo="/admin/videos/new" /></td></tr>
            ) : filtered.map(v => (
              <tr key={v.id}>
                <td><input type="checkbox" /></td>
                <td>
                  {/* Thumbnail only - no iframe on listing page */}
                  <img
                    src={`https://img.youtube.com/vi/${v.videoId}/mqdefault.jpg`}
                    alt=""
                    style={{ width: 80, height: 45, objectFit: 'cover', borderRadius: 4, cursor: 'pointer', border: '1px solid var(--border)' }}
                    onClick={() => setPreviewId(v.videoId)}
                  />
                </td>
                <td>
                  <div style={{ fontWeight: 600, fontSize: 13, maxWidth: 240 }}>{v.title}</div>
                </td>
                <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>{v.channel}</td>
                <td><span className="badge">{v.subject}</span></td>
                <td><span className="badge">{v.type}</span></td>
                <td style={{ fontSize: 12 }}>{v.duration}</td>
                <td><StatusBadge status={v.status} /></td>
                <td><RowActions actions={[
                  { label: 'Preview', icon: Eye, onClick: () => setPreviewId(v.videoId) },
                  { label: 'Edit', icon: Edit, onClick: () => navigate(`/admin/videos/${v.id}/edit`) },
                  { label: 'Delete', icon: Trash2, onClick: () => setDeleteId(v.id), danger: true },
                ]} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination page={page} total={filtered.length} perPage={10} onChange={setPage} />
      </div>
      <ConfirmDialog open={deleteId !== null} title="Delete Video?" message="This video will be removed from the student platform." confirmLabel="Delete" onConfirm={() => setDeleteId(null)} onCancel={() => setDeleteId(null)} />

      {/* Video Preview Modal - only loads iframe on demand */}
      {previewId && (
        <div className="modal-overlay" onClick={() => setPreviewId(null)}>
          <div style={{ background: '#000', borderRadius: 10, overflow: 'hidden', width: '100%', maxWidth: 800 }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '8px 12px', background: '#111' }}>
              <button onClick={() => setPreviewId(null)} style={{ color: '#fff', background: 'none', border: 'none', cursor: 'pointer', fontSize: 20 }}>✕</button>
            </div>
            <iframe
              src={`https://www.youtube.com/embed/${previewId}?autoplay=1`}
              style={{ width: '100%', height: 450, border: 'none' }}
              allowFullScreen
              allow="autoplay"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export const VideoFormPage: React.FC = () => {
  const navigate = useNavigate();
  const [url, setUrl] = useState('');
  const videoId = extractVideoId(url);

  return (
    <div>
      <div className="page-header"><h1 className="page-title">Add YouTube Video</h1></div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20, maxWidth: 900 }}>
        <div className="card">
          <div className="card-body">
            <form onSubmit={e => { e.preventDefault(); navigate('/admin/videos'); }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
                <div style={{ marginBottom: 16, gridColumn: '1 / -1' }}>
                  <label className="input-label">YouTube URL *</label>
                  <input className="input" placeholder="https://www.youtube.com/watch?v=..." value={url} onChange={e => setUrl(e.target.value)} required />
                  <div className="input-hint">Video ID will be automatically extracted.</div>
                </div>
                {videoId && <div style={{ marginBottom: 16, gridColumn: '1 / -1' }}>
                  <label className="input-label">Detected Video ID</label>
                  <code style={{ display: 'block', padding: '8px 12px', background: 'var(--bg)', borderRadius: 6, fontSize: 13 }}>{videoId}</code>
                </div>}
                {[['Course *','select',['B.Tech','BCA','MCA']],['Branch *','select',['CSE','IT','ECE']],['Semester *','select',['1','2','3','4','5','6','7','8']],['Subject *','select',['DBMS','OS','CN','DSA']],['Chapter *','select',['Chapter 1','Chapter 2']]].map(([l,_t,o]) => (
                  <div key={l as string} style={{ marginBottom: 16 }}>
                    <label className="input-label">{l as string}</label>
                    <select className="input">{(o as string[]).map(v => <option key={v}>{v}</option>)}</select>
                  </div>
                ))}
                <div style={{ marginBottom: 16, gridColumn: '1 / -1' }}>
                  <label className="input-label">Video Title *</label>
                  <input className="input" placeholder="e.g. Introduction to DBMS Architecture" required />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label className="input-label">Channel Name</label>
                  <input className="input" placeholder="e.g. Neso Academy" />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label className="input-label">Video Type</label>
                  <select className="input"><option>Lecture</option><option>Concept</option><option>Revision</option><option>Tutorial</option><option>Practical</option><option>Interview</option></select>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label className="input-label">Status</label>
                  <select className="input"><option>Draft</option><option>Published</option></select>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
                <button type="button" className="btn btn-secondary" onClick={() => navigate('/admin/videos')}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Video</button>
              </div>
            </form>
          </div>
        </div>

        {/* Thumbnail Preview */}
        <div>
          <div className="card">
            <div className="card-header"><span style={{ fontSize: 12, fontWeight: 700 }}>Thumbnail Preview</span></div>
            <div className="card-body" style={{ padding: 12 }}>
              {videoId ? (
                <img src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`} alt="" style={{ width: '100%', borderRadius: 6, border: '1px solid var(--border)' }} />
              ) : (
                <div style={{ aspectRatio: '16/9', background: 'var(--bg)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: 'var(--text-muted)' }}>
                  Enter a YouTube URL to preview
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
