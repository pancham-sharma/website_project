import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Edit, Trash2 } from 'lucide-react';
import { TableToolbar, StatusBadge, RowActions } from '../components/AdminUI';

// ---- Content Tree ----
export const ContentTreePage: React.FC = () => {
  const [expanded, setExpanded] = useState<string[]>(['btech', 'btech-cse', 'btech-cse-sem5']);

  const toggle = (key: string) => {
    setExpanded(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);
  };

  const tree = {
    courses: [
      {
        id: 'btech', name: 'B.Tech', status: 'Published',
        branches: [{
          id: 'btech-cse', name: 'Computer Science & Engineering', status: 'Published',
          semesters: [{
            id: 'btech-cse-sem5', name: 'Semester 5', status: 'Published',
            subjects: [
              { id: 's1', name: 'Database Management Systems', code: 'CS-502', notes: 48, videos: 36, pyqs: 24, status: 'Published' },
              { id: 's2', name: 'Operating Systems', code: 'CS-501', notes: 32, videos: 28, pyqs: 18, status: 'Published' },
              { id: 's3', name: 'Computer Networks', code: 'CS-503', notes: 28, videos: 22, pyqs: 16, status: 'Draft' },
            ]
          }, {
            id: 'btech-cse-sem3', name: 'Semester 3', status: 'Published',
            subjects: [
              { id: 's4', name: 'Data Structures & Algorithms', code: 'CS-301', notes: 60, videos: 44, pyqs: 30, status: 'Published' },
            ]
          }]
        }, {
          id: 'btech-it', name: 'Information Technology', status: 'Published',
          semesters: []
        }]
      }
    ]
  };

  const Row: React.FC<{ depth: number; icon: string; name: string; id: string; status?: string; badge?: string; hasChildren?: boolean; actions?: React.ReactNode }> = ({ depth, icon, name, id, status, badge, hasChildren, actions }) => (
    <div
      style={{ display: 'flex', alignItems: 'center', padding: '8px 16px', cursor: hasChildren ? 'pointer' : 'default', borderBottom: '1px solid var(--border)', background: depth === 0 ? 'var(--bg)' : 'var(--surface)' }}
      onClick={hasChildren ? () => toggle(id) : undefined}
    >
      <div style={{ width: depth * 24, flexShrink: 0 }} />
      <span style={{ marginRight: 8, fontSize: 16 }}>{hasChildren ? (expanded.includes(id) ? '▾' : '▸') : '·'}</span>
      <span style={{ marginRight: 6 }}>{icon}</span>
      <span style={{ fontWeight: depth === 0 ? 800 : depth === 1 ? 700 : depth === 2 ? 600 : 500, fontSize: 13, flex: 1 }}>{name}</span>
      {badge && <code style={{ fontSize: 11, background: 'var(--bg)', padding: '1px 5px', borderRadius: 3, marginRight: 8 }}>{badge}</code>}
      {status && <StatusBadge status={status} />}
      {actions && <div style={{ marginLeft: 12 }}>{actions}</div>}
    </div>
  );

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h1 className="page-title">Content Tree</h1>
          <p className="page-subtitle">Visual academic hierarchy: Course → Branch → Semester → Subject → Resources</p>
        </div>
        <Link to="/admin/courses/new" className="btn btn-primary">Add Course</Link>
      </div>

      <div className="card" style={{ overflow: 'hidden' }}>
        {tree.courses.map(course => (
          <div key={course.id}>
            <Row depth={0} icon="🎓" name={course.name} id={course.id} status={course.status} hasChildren={true}
              actions={<Link to="/admin/branches/new" className="btn btn-secondary btn-sm">+ Branch</Link>}
            />
            {expanded.includes(course.id) && course.branches.map(branch => (
              <div key={branch.id}>
                <Row depth={1} icon="📂" name={branch.name} id={branch.id} status={branch.status} hasChildren={true}
                  actions={<Link to="/admin/semesters/new" className="btn btn-secondary btn-sm">+ Semester</Link>}
                />
                {expanded.includes(branch.id) && branch.semesters.map(sem => (
                  <div key={sem.id}>
                    <Row depth={2} icon="📅" name={sem.name} id={sem.id} status={sem.status} hasChildren={true}
                      actions={<Link to="/admin/subjects/new" className="btn btn-secondary btn-sm">+ Subject</Link>}
                    />
                    {expanded.includes(sem.id) && sem.subjects.map(sub => (
                      <Row key={sub.id} depth={3} icon="📘" name={sub.name} id={sub.id} badge={sub.code} status={sub.status} hasChildren={false}
                        actions={
                          <div style={{ display: 'flex', gap: 4 }} onClick={e => e.stopPropagation()}>
                            <Link to="/admin/notes/new" className="btn btn-ghost btn-sm" title="Add Note">📄</Link>
                            <Link to="/admin/videos/new" className="btn btn-ghost btn-sm" title="Add Video">🎬</Link>
                            <Link to="/admin/pyqs/new" className="btn btn-ghost btn-sm" title="Add PYQ">📝</Link>
                          </div>
                        }
                      />
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

// ---- Notifications Page ----
const MOCK_NOTIFS = [
  { id: 1, title: 'New PYQs Available for DBMS', type: 'Content Update', target: 'CSE Students', status: 'Sent', sent: '10 Mar 2024' },
  { id: 2, title: 'Platform Maintenance – 2 AM to 4 AM', type: 'System', target: 'All Students', status: 'Scheduled', sent: '–' },
];

export const NotificationsPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <TableToolbar title="Notifications" count={MOCK_NOTIFS.length} addLabel="Create Notification" addTo="/admin/notifications/new" />
      <div className="card">
        <table className="data-table">
          <thead><tr><th>Title</th><th>Type</th><th>Target</th><th>Status</th><th>Sent</th><th>Actions</th></tr></thead>
          <tbody>
            {MOCK_NOTIFS.map(n => (
              <tr key={n.id}>
                <td className="td-primary">{n.title}</td>
                <td><span className="badge">{n.type}</span></td>
                <td style={{ fontSize: 12 }}>{n.target}</td>
                <td><StatusBadge status={n.status} /></td>
                <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>{n.sent}</td>
                <td><RowActions actions={[
                  { label: 'Edit', icon: Edit, onClick: () => navigate(`/admin/notifications/${n.id}/edit`) },
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

export const NotificationFormPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="page-header"><h1 className="page-title">Create Notification</h1></div>
      <div className="card" style={{ maxWidth: 640 }}>
        <div className="card-body">
          <form onSubmit={e => { e.preventDefault(); navigate('/admin/notifications'); }}>
            <div style={{ marginBottom: 16 }}>
              <label className="input-label">Title *</label>
              <input className="input" placeholder="Notification title" required />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label className="input-label">Message *</label>
              <textarea className="input" rows={4} style={{ resize: 'vertical' }} required />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
              <div style={{ marginBottom: 16 }}>
                <label className="input-label">Type</label>
                <select className="input"><option>Content Update</option><option>System</option><option>Announcement</option><option>Reminder</option></select>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label className="input-label">Target Audience</label>
                <select className="input"><option>All Students</option><option>Specific Course</option><option>Specific Branch</option></select>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/admin/notifications')}>Cancel</button>
              <button type="submit" className="btn btn-primary">Send Notification</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// ---- Support Tickets ----
const MOCK_TICKETS = [
  { id: 'T-1091', student: 'Rohan Mehra', email: 'rohan.m@ex.com', subject: 'Video not loading for OS lectures', status: 'Open', created: '15 Mar 2024', updated: '20 min ago' },
  { id: 'T-1090', student: 'Divya Nair', email: 'divya.n@ex.com', subject: 'PYQ PDF download broken', status: 'In Progress', created: '14 Mar 2024', updated: '2 hours ago' },
  { id: 'T-1089', student: 'Anil Kumar', email: 'anil.k@ex.com', subject: 'Semester 6 subject list wrong', status: 'Resolved', created: '12 Mar 2024', updated: 'Yesterday' },
  { id: 'T-1088', student: 'Priya Singh', email: 'priya.s@ex.com', subject: 'Account verification email not received', status: 'Closed', created: '10 Mar 2024', updated: '5 days ago' },
];

export const SupportPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <TableToolbar title="Support Tickets" count={MOCK_TICKETS.length} searchPlaceholder="Search tickets..." />
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        {['All', 'Open', 'In Progress', 'Resolved', 'Closed'].map(s => (
          <button key={s} className={`btn ${s === 'All' ? 'btn-primary' : 'btn-secondary'} btn-sm`}>{s}</button>
        ))}
      </div>
      <div className="card">
        <table className="data-table">
          <thead><tr><th>Ticket ID</th><th>Student</th><th>Subject</th><th>Status</th><th>Created</th><th>Updated</th><th>Actions</th></tr></thead>
          <tbody>
            {MOCK_TICKETS.map(t => (
              <tr key={t.id}>
                <td><code style={{ fontSize: 12, background: 'var(--bg)', padding: '2px 6px', borderRadius: 3 }}>{t.id}</code></td>
                <td>
                  <div className="td-primary">{t.student}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{t.email}</div>
                </td>
                <td style={{ fontSize: 13 }}>{t.subject}</td>
                <td><StatusBadge status={t.status} /></td>
                <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>{t.created}</td>
                <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>{t.updated}</td>
                <td>
                  <button className="btn btn-secondary btn-sm" onClick={() => navigate(`/admin/support/${t.id}`)}>Open Ticket</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const SupportTicketDetailPage: React.FC = () => {
  const [reply, setReply] = useState('');
  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, fontSize: 13, color: 'var(--text-muted)' }}>
            <Link to="/admin/support" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Support</Link>
            <ChevronRight size={12} />
            <span style={{ color: 'var(--text-primary)' }}>Ticket T-1091</span>
          </div>
          <h1 className="page-title">Video not loading for OS lectures</h1>
          <p className="page-subtitle">Rohan Mehra · rohan.m@example.com · Opened 15 Mar 2024</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <select className="input" style={{ width: 160 }}>
            <option>Open</option><option>In Progress</option><option>Resolved</option><option>Closed</option>
          </select>
          <button className="btn btn-primary">Update Status</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="card">
            <div className="card-header"><span style={{ fontWeight: 700, fontSize: 13 }}>Student Message</span></div>
            <div className="card-body" style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>
              Hello, I am unable to load the video lectures for Operating Systems. Specifically, the videos for "Process Scheduling Algorithms" are not loading and the page just shows a blank screen. I have tried refreshing and clearing my cache but the issue persists.
            </div>
          </div>

          <div className="card">
            <div className="card-header"><span style={{ fontWeight: 700, fontSize: 13 }}>Admin Reply</span></div>
            <div className="card-body">
              <textarea
                className="input"
                rows={5}
                value={reply}
                onChange={e => setReply(e.target.value)}
                placeholder="Write your response to the student..."
                style={{ resize: 'vertical', marginBottom: 12 }}
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                <button className="btn btn-secondary">Save as Draft</button>
                <button className="btn btn-primary">Send Reply</button>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="card">
            <div className="card-header"><span style={{ fontWeight: 700, fontSize: 12 }}>Ticket Info</span></div>
            <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13 }}>
              {[['Status','Open'],['Ticket ID','T-1091'],['Created','15 Mar 2024'],['Last Updated','20 min ago'],['Student','Rohan Mehra'],['Email','rohan.m@ex.com']].map(([k,v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>{k}</span>
                  <span style={{ fontWeight: 600 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ---- Reports ----
export const ReportsPage: React.FC = () => {
  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div><h1 className="page-title">Reports</h1><p className="page-subtitle">Platform usage metrics and analytics.</p></div>
        <button className="btn btn-secondary">Export CSV</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {[
          { title: 'Most Viewed Notes (Last 30 Days)', data: [['DBMS Normalization Cheat Sheet','1,204 views'],['OS Process Scheduling PDF','984 views'],['CN OSI Model Notes','876 views'],['DSA Trees & Graphs','754 views']] },
          { title: 'Most Watched Videos (Last 30 Days)', data: [['ER Model Explained – Gate Smashers','2,104 views'],['Process Scheduling – Neso Academy','1,842 views'],['Binary Trees – Abdul Bari','1,640 views'],['SQL Joins Tutorial','1,320 views']] },
          { title: 'Most Attempted Practice Questions', data: [['DBMS MCQ Bank (150 Qs)','3,240 attempts'],['OS MCQ Bank (120 Qs)','2,880 attempts'],['CN MCQs (100 Qs)','2,100 attempts'],['DSA MCQs (180 Qs)','1,980 attempts']] },
          { title: 'Student Registrations (Last 7 Days)', data: [['Monday','134 students'],['Tuesday','98 students'],['Wednesday','156 students'],['Thursday','120 students'],['Friday','88 students'],['Saturday','210 students'],['Sunday','180 students']] },
        ].map(section => (
          <div key={section.title} className="card">
            <div className="card-header"><span style={{ fontWeight: 700, fontSize: 13 }}>{section.title}</span></div>
            <table className="data-table">
              <tbody>
                {section.data.map(([label, val]) => (
                  <tr key={label}>
                    <td style={{ fontWeight: 600, fontSize: 13 }}>{label}</td>
                    <td style={{ textAlign: 'right', fontSize: 13, fontWeight: 700, color: 'var(--text-muted)' }}>{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

// ---- Activity Log ----
const ACTIVITIES = [
  { admin: 'Admin', action: 'Uploaded Note', content: 'DBMS Normalization Cheat Sheet', time: '2 hours ago' },
  { admin: 'Admin', action: 'Published Video', content: 'ER Model Explained – Neso Academy', time: '3 hours ago' },
  { admin: 'Admin', action: 'Added Practice Question', content: 'SQL – DBMS MCQs Chapter 4', time: '5 hours ago' },
  { admin: 'Admin', action: 'Added PYQ', content: 'AKTU 2024 OS End Semester Paper', time: '1 day ago' },
  { admin: 'Admin', action: 'Edited Subject', content: 'Database Management Systems – CS-502', time: '1 day ago' },
  { admin: 'Admin', action: 'Published Branch', content: 'B.Tech – AIML Branch', time: '2 days ago' },
];

export const ActivityLogPage: React.FC = () => (
  <div>
    <div className="page-header"><h1 className="page-title">Admin Activity Log</h1><p className="page-subtitle">Audit trail of all admin actions.</p></div>
    <div className="card">
      <table className="data-table">
        <thead><tr><th>Admin</th><th>Action</th><th>Content</th><th>Time</th></tr></thead>
        <tbody>
          {ACTIVITIES.map((a, i) => (
            <tr key={i}>
              <td className="td-primary">{a.admin}</td>
              <td><span className="badge">{a.action}</span></td>
              <td style={{ fontSize: 13 }}>{a.content}</td>
              <td style={{ fontSize: 12, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{a.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// ---- Profile Page ----
export const AdminProfilePage: React.FC = () => {
  const [editing, setEditing] = useState(false);
  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div><h1 className="page-title">Admin Profile</h1></div>
        <button className="btn btn-primary" onClick={() => setEditing(!editing)}>{editing ? 'Cancel' : 'Edit Profile'}</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 20 }}>
        <div>
          <div className="card">
            <div className="card-body" style={{ textAlign: 'center' }}>
              <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#111', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 26, margin: '0 auto 12px' }}>A</div>
              {editing && <button className="btn btn-secondary btn-sm" style={{ marginBottom: 8 }}>Change Photo</button>}
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 2 }}>Admin User</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>admin@unieducation.com</div>
              <div style={{ marginTop: 10 }}><span className="badge">Super Admin</span></div>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="card">
            <div className="card-header"><span style={{ fontWeight: 700, fontSize: 13 }}>Personal Information</span></div>
            <div className="card-body">
              {editing ? (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
                  <div style={{ marginBottom: 16 }}><label className="input-label">Full Name</label><input className="input" defaultValue="Admin User" /></div>
                  <div style={{ marginBottom: 16 }}><label className="input-label">Email</label><input className="input" defaultValue="admin@unieducation.com" /></div>
                  <div style={{ marginBottom: 16 }}><label className="input-label">Phone</label><input className="input" placeholder="+91 9876543210" /></div>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, fontSize: 13 }}>
                  {[['Full Name','Admin User'],['Email','admin@unieducation.com'],['Role','Super Admin'],['Joined','01 Jan 2024'],['Last Login','Today, 11:30 AM'],['Status','Active']].map(([k,v]) => (
                    <div key={k}><div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 2, textTransform: 'uppercase', fontWeight: 700 }}>{k}</div><div style={{ fontWeight: 600 }}>{v}</div></div>
                  ))}
                </div>
              )}
              {editing && (
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
                  <button className="btn btn-secondary" onClick={() => setEditing(false)}>Cancel</button>
                  <button className="btn btn-primary" onClick={() => setEditing(false)}>Save Changes</button>
                </div>
              )}
            </div>
          </div>
          <div className="card">
            <div className="card-header"><span style={{ fontWeight: 700, fontSize: 13 }}>Security</span></div>
            <div className="card-body" style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <button className="btn btn-secondary">Change Password</button>
              <button className="btn btn-secondary">View Active Sessions</button>
              <button className="btn btn-secondary">Logout from Other Devices</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ---- Settings Page ----
export const SettingsPage: React.FC = () => (
  <div>
    <div className="page-header"><h1 className="page-title">Settings</h1><p className="page-subtitle">Platform configuration and system settings.</p></div>
    <div style={{ maxWidth: 720, display: 'flex', flexDirection: 'column', gap: 20 }}>
      {[
        { title: 'General', fields: [['Platform Name','UniEducation'],['Contact Email','support@unieducation.com'],['Support Email','help@unieducation.com']] },
        { title: 'Content Defaults', fields: [['Default Content Status','Draft'],['Allow Student Downloads','Yes'],['Content Moderation','Manual Review']] },
        { title: 'File Upload Limits', fields: [['Maximum File Size','50 MB'],['Allowed File Types','PDF, DOC, DOCX'],['Image Types','JPG, PNG, WEBP']] },
      ].map(section => (
        <div key={section.title} className="card">
          <div className="card-header"><span style={{ fontWeight: 700, fontSize: 13 }}>{section.title}</span></div>
          <div className="card-body">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
              {section.fields.map(([label, val]) => (
                <div key={label} style={{ marginBottom: 16 }}>
                  <label className="input-label">{label}</label>
                  <input className="input" defaultValue={val} />
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button className="btn btn-primary">Save All Settings</button>
      </div>
    </div>
  </div>
);
