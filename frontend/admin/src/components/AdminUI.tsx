import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, MoreHorizontal } from 'lucide-react';

// Reusable Table Toolbar
interface TableToolbarProps {
  title: string;
  count: number;
  searchPlaceholder?: string;
  addLabel?: string;
  addTo?: string;
  onSearch?: (q: string) => void;
  children?: React.ReactNode;
}

export const TableToolbar: React.FC<TableToolbarProps> = ({
  title, count, searchPlaceholder = 'Search...', addLabel, addTo, onSearch, children
}) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
    <div>
      <h1 className="page-title">{title}</h1>
      <p className="page-subtitle">{count} total records</p>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      {onSearch && (
        <div className="search-box">
          <Search className="search-box-icon" size={14} />
          <input
            className="search-box-input"
            placeholder={searchPlaceholder}
            onChange={e => onSearch(e.target.value)}
          />
        </div>
      )}
      {children}
      {addLabel && addTo && (
        <Link to={addTo} className="btn btn-primary">
          <Plus size={14} /> {addLabel}
        </Link>
      )}
    </div>
  </div>
);

// Status Badge
export const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const cls = {
    'Published': 'badge-published',
    'Draft': 'badge-draft',
    'Archived': 'badge-archived',
    'Active': 'badge-active',
    'Inactive': 'badge-inactive',
    'Open': 'badge-open',
    'In Progress': 'badge-draft',
    'Resolved': 'badge-resolved',
    'Closed': 'badge-archived',
  }[status] ?? 'badge';
  return <span className={`badge ${cls}`}>{status}</span>;
};

// Row Actions Dropdown
interface Action { label: string; icon?: React.FC<any>; onClick: () => void; danger?: boolean; }
export const RowActions: React.FC<{ actions: Action[] }> = ({ actions }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: 'relative' }}>
      <button
        className="btn btn-ghost btn-sm"
        style={{ padding: '4px 6px' }}
        onClick={() => setOpen(!open)}
      >
        <MoreHorizontal size={15} />
      </button>
      {open && (
        <>
          <div style={{ position: 'fixed', inset: 0, zIndex: 10 }} onClick={() => setOpen(false)} />
          <div style={{
            position: 'absolute', right: 0, top: 28, zIndex: 20,
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 6, boxShadow: 'var(--shadow-md)',
            minWidth: 140, overflow: 'hidden'
          }}>
            {actions.map((a, i) => (
              <button
                key={i}
                onClick={() => { a.onClick(); setOpen(false); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  width: '100%', padding: '8px 14px',
                  fontSize: 13, background: 'none', border: 'none', cursor: 'pointer',
                  color: a.danger ? '#b91c1c' : 'var(--text-secondary)',
                  textAlign: 'left'
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface-hover)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'none')}
              >
                {a.icon && <a.icon size={13} />}
                {a.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// Confirm Dialog
interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}
export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ open, title, message, confirmLabel = 'Confirm', onConfirm, onCancel }) => {
  if (!open) return null;
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">{title}</div>
        <div className="modal-body" style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.6 }}>{message}</div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
          <button className="btn btn-primary" onClick={onConfirm}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  );
};

// Empty State
export const EmptyState: React.FC<{ title: string; desc: string; actionLabel?: string; actionTo?: string }> = ({ title, desc, actionLabel, actionTo }) => (
  <div className="empty-state">
    <div className="empty-state-title">{title}</div>
    <p className="empty-state-desc">{desc}</p>
    {actionLabel && actionTo && (
      <Link to={actionTo} className="btn btn-primary"><Plus size={13} /> {actionLabel}</Link>
    )}
  </div>
);

// Pagination
interface PaginationProps { page: number; total: number; perPage: number; onChange: (p: number) => void; }
export const Pagination: React.FC<PaginationProps> = ({ page, total, perPage, onChange }) => {
  const pages = Math.ceil(total / perPage);
  if (pages <= 1) return null;
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', borderTop: '1px solid var(--border)' }}>
      <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
        Showing {Math.min((page - 1) * perPage + 1, total)}–{Math.min(page * perPage, total)} of {total}
      </span>
      <div style={{ display: 'flex', gap: 4 }}>
        <button className="btn btn-secondary btn-sm" disabled={page === 1} onClick={() => onChange(page - 1)}>Prev</button>
        {Array.from({ length: Math.min(pages, 5) }, (_, i) => i + 1).map(p => (
          <button key={p} className={`btn btn-sm ${p === page ? 'btn-primary' : 'btn-secondary'}`} onClick={() => onChange(p)}>{p}</button>
        ))}
        <button className="btn btn-secondary btn-sm" disabled={page === pages} onClick={() => onChange(page + 1)}>Next</button>
      </div>
    </div>
  );
};

// Form Field
interface FormFieldProps { label: string; required?: boolean; hint?: string; error?: string; children: React.ReactNode; }
export const FormField: React.FC<FormFieldProps> = ({ label, required, hint, error, children }) => (
  <div style={{ marginBottom: 16 }}>
    <label className="input-label">{label}{required && ' *'}</label>
    {children}
    {hint && !error && <div className="input-hint">{hint}</div>}
    {error && <div className="input-error">{error}</div>}
  </div>
);

// Form Grid
export const FormGrid: React.FC<{ cols?: number; children: React.ReactNode }> = ({ cols = 2, children }) => (
  <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: '0 20px' }}>{children}</div>
);

// Form Actions
export const FormActions: React.FC<{ onCancel: () => void; saveLabel?: string; loading?: boolean }> = ({ onCancel, saveLabel = 'Save', loading }) => (
  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
    <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
    <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Saving...' : saveLabel}</button>
  </div>
);
