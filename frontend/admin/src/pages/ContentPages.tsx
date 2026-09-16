import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Trash2 } from 'lucide-react';
import { TableToolbar, StatusBadge, RowActions, ConfirmDialog, EmptyState, Pagination } from '../components/AdminUI';

// ---- Interview Questions ----
const MOCK_IQ = [
  { id: 1, question: 'What is normalization? Explain BCNF with an example.', subject: 'DBMS', category: 'Technical', difficulty: 'Medium', status: 'Published' },
  { id: 2, question: 'What are ACID properties? Give a real-world example.', subject: 'DBMS', category: 'Technical', difficulty: 'Easy', status: 'Published' },
  { id: 3, question: 'Explain the difference between process and thread.', subject: 'OS', category: 'Technical', difficulty: 'Medium', status: 'Draft' },
  { id: 4, question: 'Tell me about yourself.', subject: 'General', category: 'HR', difficulty: 'Easy', status: 'Published' },
];

export const InterviewQuestionsPage: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const filtered = MOCK_IQ.filter(q => q.question.toLowerCase().includes(search.toLowerCase()) || q.subject.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <TableToolbar title="Interview Questions" count={filtered.length} searchPlaceholder="Search interview questions..." addLabel="Add Question" addTo="/admin/interview-questions/new" onSearch={setSearch} />
      <div className="card">
        <table className="data-table">
          <thead><tr><th><input type="checkbox" /></th><th>Question</th><th>Subject</th><th>Category</th><th>Difficulty</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={7}><EmptyState title="No interview questions" desc="Add interview and viva questions." actionLabel="Add Question" actionTo="/admin/interview-questions/new" /></td></tr>
            ) : filtered.map(q => (
              <tr key={q.id}>
                <td><input type="checkbox" /></td>
                <td style={{ maxWidth: 380, fontWeight: 600, fontSize: 13, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{q.question}</td>
                <td><span className="badge">{q.subject}</span></td>
                <td><span className="badge">{q.category}</span></td>
                <td><span className="badge">{q.difficulty}</span></td>
                <td><StatusBadge status={q.status} /></td>
                <td><RowActions actions={[
                  { label: 'Edit', icon: Edit, onClick: () => navigate(`/admin/interview-questions/${q.id}/edit`) },
                  { label: 'Delete', icon: Trash2, onClick: () => setDeleteId(q.id), danger: true },
                ]} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination page={page} total={filtered.length} perPage={10} onChange={setPage} />
      </div>
      <ConfirmDialog open={deleteId !== null} title="Delete Interview Question?" message="This question will no longer be visible to students." confirmLabel="Delete" onConfirm={() => setDeleteId(null)} onCancel={() => setDeleteId(null)} />
    </div>
  );
};

export const InterviewQuestionFormPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="page-header"><h1 className="page-title">Add Interview Question</h1></div>
      <div className="card" style={{ maxWidth: 720 }}>
        <div className="card-body">
          <form onSubmit={e => { e.preventDefault(); navigate('/admin/interview-questions'); }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
              {[['Course *','select',['B.Tech','BCA','MCA']],['Branch *','select',['CSE','IT','ECE']],['Subject *','select',['DBMS','OS','CN','DSA','General']]].map(([l,_t,o]) => (
                <div key={l as string} style={{ marginBottom: 16 }}>
                  <label className="input-label">{l as string}</label>
                  <select className="input">{(o as string[]).map(v => <option key={v}>{v}</option>)}</select>
                </div>
              ))}
              <div style={{ marginBottom: 16 }}>
                <label className="input-label">Category *</label>
                <select className="input"><option>Technical</option><option>Coding</option><option>Subject</option><option>HR</option><option>Behavioral</option><option>Project</option><option>Career</option></select>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label className="input-label">Difficulty</label>
                <select className="input"><option>Easy</option><option>Medium</option><option>Hard</option></select>
              </div>
              <div style={{ marginBottom: 16, gridColumn: '1 / -1' }}>
                <label className="input-label">Question *</label>
                <textarea className="input" rows={3} required style={{ resize: 'vertical' }} />
              </div>
              <div style={{ marginBottom: 16, gridColumn: '1 / -1' }}>
                <label className="input-label">Answer / Explanation *</label>
                <textarea className="input" rows={5} required style={{ resize: 'vertical' }} />
              </div>
              <div style={{ marginBottom: 16, gridColumn: '1 / -1' }}>
                <label className="input-label">Interview Tip</label>
                <textarea className="input" rows={2} style={{ resize: 'vertical' }} placeholder="Any tip for the student before answering..." />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label className="input-label">Status</label>
                <select className="input"><option>Draft</option><option>Published</option></select>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/admin/interview-questions')}>Cancel</button>
              <button type="submit" className="btn btn-primary">Save Question</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// ---- Syllabus ----
const MOCK_SYL = [
  { id: 1, title: 'AKTU B.Tech CSE Sem 5 Syllabus 2024', subject: 'All Subjects', university: 'AKTU', year: '2024-25', branch: 'CSE', sem: 5, status: 'Published' },
  { id: 2, title: 'AKTU B.Tech CSE Sem 3 Syllabus 2024', subject: 'All Subjects', university: 'AKTU', year: '2024-25', branch: 'CSE', sem: 3, status: 'Published' },
];

export const SyllabusPage: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const filtered = MOCK_SYL.filter(s => s.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <TableToolbar title="Syllabus Management" count={filtered.length} searchPlaceholder="Search syllabus..." addLabel="Add Syllabus" addTo="/admin/syllabus/new" onSearch={setSearch} />
      <div className="card">
        <table className="data-table">
          <thead><tr><th><input type="checkbox" /></th><th>Title</th><th>University</th><th>Branch</th><th>Sem</th><th>Academic Year</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {filtered.map(s => (
              <tr key={s.id}>
                <td><input type="checkbox" /></td>
                <td className="td-primary">{s.title}</td>
                <td style={{ fontSize: 12 }}>{s.university}</td>
                <td><span className="badge">{s.branch}</span></td>
                <td>{s.sem}</td>
                <td style={{ fontSize: 12 }}>{s.year}</td>
                <td><StatusBadge status={s.status} /></td>
                <td><RowActions actions={[
                  { label: 'Edit', icon: Edit, onClick: () => navigate(`/admin/syllabus/${s.id}/edit`) },
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

// ---- Study Material ----
const MOCK_SM = [
  { id: 1, title: 'DBMS Quick Reference Cheat Sheet', subject: 'DBMS', type: 'Cheat Sheet', branch: 'CSE', sem: 5, status: 'Published' },
  { id: 2, title: 'OS Concepts – Reference Book Link', subject: 'OS', type: 'Reference Link', branch: 'CSE', sem: 5, status: 'Published' },
];

export const StudyMaterialPage: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const filtered = MOCK_SM.filter(s => s.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <TableToolbar title="Study Material" count={filtered.length} searchPlaceholder="Search study material..." addLabel="Add Material" addTo="/admin/study-material/new" onSearch={setSearch} />
      <div className="card">
        <table className="data-table">
          <thead><tr><th><input type="checkbox" /></th><th>Title</th><th>Subject</th><th>Type</th><th>Branch</th><th>Sem</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {filtered.map(s => (
              <tr key={s.id}>
                <td><input type="checkbox" /></td>
                <td className="td-primary">{s.title}</td>
                <td><span className="badge">{s.subject}</span></td>
                <td><span className="badge">{s.type}</span></td>
                <td><span className="badge">{s.branch}</span></td>
                <td>{s.sem}</td>
                <td><StatusBadge status={s.status} /></td>
                <td><RowActions actions={[
                  { label: 'Edit', icon: Edit, onClick: () => navigate(`/admin/study-material/${s.id}/edit`) },
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
