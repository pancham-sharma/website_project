import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { TableToolbar, StatusBadge, RowActions, ConfirmDialog, EmptyState, Pagination } from '../components/AdminUI';

const MOCK_PYQS = [
  { id: 1, title: 'AKTU 2024 – DBMS End Semester', subject: 'DBMS', branch: 'CSE', sem: 5, university: 'AKTU', year: 2024, examType: 'End Semester', marks: 100, status: 'Published' },
  { id: 2, title: 'AKTU 2023 – OS End Semester', subject: 'OS', branch: 'CSE', sem: 5, university: 'AKTU', year: 2023, examType: 'End Semester', marks: 100, status: 'Published' },
  { id: 3, title: 'Mumbai Univ 2024 – CN Mid Sem', subject: 'CN', branch: 'CSE', sem: 5, university: 'Mumbai', year: 2024, examType: 'Mid Semester', marks: 50, status: 'Draft' },
];

export const PYQsPage: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const filtered = MOCK_PYQS.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <TableToolbar title="Previous Year Questions (PYQs)" count={filtered.length} searchPlaceholder="Search PYQs..." addLabel="Add PYQ" addTo="/admin/pyqs/new" onSearch={setSearch} />
      <div className="card">
        <table className="data-table">
          <thead><tr><th><input type="checkbox" /></th><th>Title</th><th>Subject</th><th>University</th><th>Year</th><th>Exam Type</th><th>Marks</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={9}><EmptyState title="No PYQs found" desc="Upload previous year question papers." actionLabel="Add PYQ" actionTo="/admin/pyqs/new" /></td></tr>
            ) : filtered.map(p => (
              <tr key={p.id}>
                <td><input type="checkbox" /></td>
                <td><div style={{ fontWeight: 600, fontSize: 13 }}>{p.title}</div></td>
                <td><span className="badge">{p.subject}</span></td>
                <td style={{ fontSize: 12 }}>{p.university}</td>
                <td>{p.year}</td>
                <td><span className="badge">{p.examType}</span></td>
                <td>{p.marks}</td>
                <td><StatusBadge status={p.status} /></td>
                <td><RowActions actions={[
                  { label: 'Preview', icon: Eye, onClick: () => {} },
                  { label: 'Edit', icon: Edit, onClick: () => navigate(`/admin/pyqs/${p.id}/edit`) },
                  { label: 'Delete', icon: Trash2, onClick: () => setDeleteId(p.id), danger: true },
                ]} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination page={page} total={filtered.length} perPage={10} onChange={setPage} />
      </div>
      <ConfirmDialog open={deleteId !== null} title="Delete PYQ?" message="This paper will no longer be visible to students." confirmLabel="Delete" onConfirm={() => setDeleteId(null)} onCancel={() => setDeleteId(null)} />
    </div>
  );
};

export const PYQFormPage: React.FC = () => {
  const navigate = useNavigate();
  const [fileName, setFileName] = useState('');
  return (
    <div>
      <div className="page-header"><h1 className="page-title">Add PYQ</h1></div>
      <div className="card" style={{ maxWidth: 720 }}>
        <div className="card-body">
          <form onSubmit={e => { e.preventDefault(); navigate('/admin/pyqs'); }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
              {[['Course *','select',['B.Tech','BCA','MCA']],['Branch *','select',['CSE','IT','ECE']],['Semester *','select',['1','2','3','4','5','6','7','8']],['Subject *','select',['DBMS','OS','CN','DSA']],['University *','text',[]], ['Year *','number',[]], ['Exam Type *','select',['End Semester','Mid Semester','Backlog','Internal']], ['Total Marks','number',[]]].map(([l,t,o]) => (
                <div key={l as string} style={{ marginBottom: 16 }}>
                  <label className="input-label">{l as string}</label>
                  {t === 'select' ? <select className="input">{(o as string[]).map(v => <option key={v}>{v}</option>)}</select> : <input type={t as string} className="input" placeholder={l === 'Year *' ? '2024' : l === 'Total Marks' ? '100' : ''} />}
                </div>
              ))}
              <div style={{ marginBottom: 16, gridColumn: '1 / -1' }}>
                <label className="input-label">PDF File *</label>
                <div style={{ border: '2px dashed var(--border-strong)', borderRadius: 8, padding: 24, textAlign: 'center', background: 'var(--bg)', cursor: 'pointer' }} onClick={() => document.getElementById('pyq-pdf')?.click()}>
                  <input id="pyq-pdf" type="file" accept=".pdf" style={{ display: 'none' }} onChange={e => setFileName(e.target.files?.[0]?.name ?? '')} />
                  {fileName ? <div style={{ fontWeight: 600 }}>📄 {fileName}</div> : <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Click to upload PYQ PDF (max 50MB)</div>}
                </div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label className="input-label">Status</label>
                <select className="input"><option>Draft</option><option>Published</option></select>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/admin/pyqs')}>Cancel</button>
              <button type="submit" className="btn btn-primary">Save PYQ</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// ---- Practice Questions ----
const MOCK_PQ = [
  { id: 1, question: 'Which of the following is NOT a valid normal form?', subject: 'DBMS', type: 'MCQ', difficulty: 'Medium', topic: 'Normalization', status: 'Published' },
  { id: 2, question: 'ACID stands for Atomicity, Consistency, Isolation, and ____?', subject: 'DBMS', type: 'MCQ', difficulty: 'Easy', topic: 'Transactions', status: 'Published' },
  { id: 3, question: 'Explain the Round Robin scheduling algorithm with an example.', subject: 'OS', type: 'Long Answer', difficulty: 'Hard', topic: 'Scheduling', status: 'Draft' },
];

export const PracticeQuestionsPage: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const filtered = MOCK_PQ.filter(q => q.question.toLowerCase().includes(search.toLowerCase()) || q.subject.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <TableToolbar title="Practice Questions" count={filtered.length} searchPlaceholder="Search questions..." addLabel="Add Question" addTo="/admin/practice-questions/new" onSearch={setSearch} />
      <div className="card">
        <table className="data-table">
          <thead><tr><th><input type="checkbox" /></th><th>Question</th><th>Subject</th><th>Type</th><th>Difficulty</th><th>Topic</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={8}><EmptyState title="No questions found" desc="Add practice questions to subjects." actionLabel="Add Question" actionTo="/admin/practice-questions/new" /></td></tr>
            ) : filtered.map(q => (
              <tr key={q.id}>
                <td><input type="checkbox" /></td>
                <td style={{ maxWidth: 320, fontSize: 13 }}>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{q.question}</div>
                </td>
                <td><span className="badge">{q.subject}</span></td>
                <td><span className="badge">{q.type}</span></td>
                <td><span className="badge">{q.difficulty}</span></td>
                <td style={{ fontSize: 12 }}>{q.topic}</td>
                <td><StatusBadge status={q.status} /></td>
                <td><RowActions actions={[
                  { label: 'Edit', icon: Edit, onClick: () => navigate(`/admin/practice-questions/${q.id}/edit`) },
                  { label: 'Delete', icon: Trash2, onClick: () => setDeleteId(q.id), danger: true },
                ]} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination page={page} total={filtered.length} perPage={10} onChange={setPage} />
      </div>
      <ConfirmDialog open={deleteId !== null} title="Delete Question?" message="This question will be removed from the question bank." confirmLabel="Delete" onConfirm={() => setDeleteId(null)} onCancel={() => setDeleteId(null)} />
    </div>
  );
};

export const PracticeQuestionFormPage: React.FC = () => {
  const navigate = useNavigate();
  const [type, setType] = useState('MCQ');
  return (
    <div>
      <div className="page-header"><h1 className="page-title">Add Practice Question</h1></div>
      <div className="card" style={{ maxWidth: 720 }}>
        <div className="card-body">
          <form onSubmit={e => { e.preventDefault(); navigate('/admin/practice-questions'); }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
              {[['Course *','select',['B.Tech','BCA','MCA']],['Branch *','select',['CSE','IT','ECE']],['Semester *','select',['1','2','3','4','5','6','7','8']],['Subject *','select',['DBMS','OS','CN','DSA']], ['Chapter *','select',['Chapter 1','Chapter 2']]].map(([l,_t,o]) => (
                <div key={l as string} style={{ marginBottom: 16 }}>
                  <label className="input-label">{l as string}</label>
                  <select className="input">{(o as string[]).map(v => <option key={v}>{v}</option>)}</select>
                </div>
              ))}
              <div style={{ marginBottom: 16 }}>
                <label className="input-label">Question Type *</label>
                <select className="input" value={type} onChange={e => setType(e.target.value)}><option>MCQ</option><option>True/False</option><option>Short Answer</option><option>Long Answer</option></select>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label className="input-label">Difficulty</label>
                <select className="input"><option>Easy</option><option>Medium</option><option>Hard</option></select>
              </div>
              <div style={{ marginBottom: 16, gridColumn: '1 / -1' }}>
                <label className="input-label">Question *</label>
                <textarea className="input" rows={3} required style={{ resize: 'vertical' }} />
              </div>
              {type === 'MCQ' && <>
                {['A', 'B', 'C', 'D'].map(opt => (
                  <div key={opt} style={{ marginBottom: 16 }}>
                    <label className="input-label">Option {opt} *</label>
                    <input className="input" placeholder={`Option ${opt}`} />
                  </div>
                ))}
                <div style={{ marginBottom: 16 }}>
                  <label className="input-label">Correct Answer *</label>
                  <select className="input"><option>A</option><option>B</option><option>C</option><option>D</option></select>
                </div>
              </>}
              <div style={{ marginBottom: 16, gridColumn: '1 / -1' }}>
                <label className="input-label">Explanation</label>
                <textarea className="input" rows={3} style={{ resize: 'vertical' }} />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label className="input-label">Status</label>
                <select className="input"><option>Draft</option><option>Published</option></select>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/admin/practice-questions')}>Cancel</button>
              <button type="submit" className="btn btn-primary">Save Question</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
