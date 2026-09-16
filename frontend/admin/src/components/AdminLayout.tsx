import React, { useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, BookOpen, GitBranch, Layers, BookMarked,
  FileText, Video, HelpCircle, CheckSquare, MessageSquare, Settings,
  LogOut, Bell, Search, Menu, X, ChevronRight, Activity, FolderTree,
  Archive, User, BarChart2, Headphones, ListTodo, Database
} from 'lucide-react';

const navGroups = [
  {
    label: 'Core',
    items: [
      { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    ]
  },
  {
    label: 'Content Management',
    items: [
      { to: '/admin/courses', icon: BookOpen, label: 'Courses' },
      { to: '/admin/branches', icon: GitBranch, label: 'Branches' },
      { to: '/admin/semesters', icon: Layers, label: 'Semesters' },
      { to: '/admin/subjects', icon: BookMarked, label: 'Subjects' },
      { to: '/admin/chapters', icon: ListTodo, label: 'Chapters' },
      { to: '/admin/syllabus', icon: Archive, label: 'Syllabus' },
      { to: '/admin/notes', icon: FileText, label: 'Notes' },
      { to: '/admin/videos', icon: Video, label: 'Videos' },
      { to: '/admin/pyqs', icon: HelpCircle, label: 'PYQs' },
      { to: '/admin/practice-questions', icon: CheckSquare, label: 'Practice Questions' },
      { to: '/admin/interview-questions', icon: MessageSquare, label: 'Interview Questions' },
      { to: '/admin/study-material', icon: Database, label: 'Study Material' },
      { to: '/admin/content-tree', icon: FolderTree, label: 'Content Tree' },
    ]
  },
  {
    label: 'User Management',
    items: [
      { to: '/admin/students', icon: Users, label: 'Students' },
      { to: '/admin/admins', icon: User, label: 'Admins' },
    ]
  },
  {
    label: 'Communication',
    items: [
      { to: '/admin/notifications', icon: Bell, label: 'Notifications' },
      { to: '/admin/support', icon: Headphones, label: 'Support' },
    ]
  },
  {
    label: 'Analytics',
    items: [
      { to: '/admin/reports', icon: BarChart2, label: 'Reports' },
      { to: '/admin/activity', icon: Activity, label: 'Activity Log' },
    ]
  },
  {
    label: 'System',
    items: [
      { to: '/admin/profile', icon: User, label: 'My Profile' },
      { to: '/admin/settings', icon: Settings, label: 'Settings' },
    ]
  },
];

export const AdminLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => { navigate('/admin/login'); };

  const currentPage = navGroups
    .flatMap(g => g.items)
    .find(item => location.pathname.startsWith(item.to))?.label ?? 'Dashboard';

  return (
    <div className="admin-shell">
      {/* Sidebar */}
      <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-brand">
          <div className="sidebar-brand-icon">
            <BookOpen size={14} />
          </div>
          {!collapsed && <span className="sidebar-brand-text">EduCare</span>}
        </div>

        <nav className="flex-1 py-2">
          {navGroups.map(group => (
            <div key={group.label}>
              <div className="sidebar-section-title">{group.label}</div>
              {group.items.map(item => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  title={collapsed ? item.label : undefined}
                  className={({ isActive }) =>
                    `sidebar-item ${isActive ? 'active' : ''}`
                  }
                >
                  <item.icon className="sidebar-item-icon" />
                  <span className="sidebar-item-label">{item.label}</span>
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        <div style={{ borderTop: '1px solid var(--border)', padding: '8px' }}>
          <button
            onClick={handleLogout}
            className="sidebar-item"
            style={{ width: '100%', border: 'none', background: 'none', cursor: 'pointer' }}
          >
            <LogOut className="sidebar-item-icon" />
            <span className="sidebar-item-label">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="admin-main">
        {/* Header */}
        <header className="admin-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="btn btn-ghost btn-sm"
              style={{ padding: '6px' }}
            >
              {collapsed ? <Menu size={18} /> : <X size={18} />}
            </button>
            <div className="breadcrumb">
              <span>Admin</span>
              <span className="breadcrumb-sep"><ChevronRight size={12} /></span>
              <span className="breadcrumb-current">{currentPage}</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {showSearch ? (
              <div className="search-box">
                <Search className="search-box-icon" size={14} />
                <input
                  className="search-box-input"
                  placeholder="Search students, courses, notes..."
                  autoFocus
                  onBlur={() => setShowSearch(false)}
                />
              </div>
            ) : (
              <button className="btn btn-ghost btn-sm" onClick={() => setShowSearch(true)} style={{ padding: '6px' }}>
                <Search size={16} />
              </button>
            )}
            <button className="btn btn-ghost btn-sm" style={{ padding: '6px', position: 'relative' }}>
              <Bell size={16} />
              <span style={{
                position: 'absolute', top: 3, right: 3,
                width: 6, height: 6, background: '#111', borderRadius: '50%'
              }}></span>
            </button>
            <div
              style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
              onClick={() => navigate('/admin/profile')}
            >
              <div style={{
                width: 30, height: 30, borderRadius: '50%',
                background: '#111', color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 700
              }}>A</div>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>Admin</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
