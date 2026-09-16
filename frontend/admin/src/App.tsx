import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AdminLayout } from './components/AdminLayout';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboard } from './pages/AdminDashboard';

// Content Management
import { CoursesPage, CourseFormPage, CourseDetailPage } from './pages/CoursesPage';
import { BranchesPage, BranchFormPage } from './pages/BranchesPage';
import { SemestersPage, SemesterFormPage } from './pages/SemestersPage';
import { SubjectsPage, SubjectFormPage, SubjectDetailPage } from './pages/SubjectsPage';
import { ChaptersPage, ChapterFormPage } from './pages/ChaptersPage';
import { NotesPage, NoteFormPage } from './pages/NotesPage';
import { VideosPage, VideoFormPage } from './pages/VideosPage';
import { PYQsPage, PYQFormPage, PracticeQuestionsPage, PracticeQuestionFormPage } from './pages/PYQsPage';
import {
  InterviewQuestionsPage, InterviewQuestionFormPage,
  SyllabusPage, StudyMaterialPage
} from './pages/ContentPages';

// System Pages
import {
  ContentTreePage,
  NotificationsPage, NotificationFormPage,
  SupportPage, SupportTicketDetailPage,
  ReportsPage, ActivityLogPage,
  AdminProfilePage, SettingsPage
} from './pages/SystemPages';

// Users
import { StudentsPage, StudentDetailPage, AdminsPage } from './pages/UsersPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root to admin login */}
        <Route path="/" element={<Navigate to="/admin/login" replace />} />

        {/* Auth (standalone, no layout) */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* Admin portal (with shared layout) */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />

          {/* Content Management */}
          <Route path="courses" element={<CoursesPage />} />
          <Route path="courses/new" element={<CourseFormPage />} />
          <Route path="courses/:id" element={<CourseDetailPage />} />
          <Route path="courses/:id/edit" element={<CourseFormPage />} />

          <Route path="branches" element={<BranchesPage />} />
          <Route path="branches/new" element={<BranchFormPage />} />
          <Route path="branches/:id" element={<BranchesPage />} />
          <Route path="branches/:id/edit" element={<BranchFormPage />} />

          <Route path="semesters" element={<SemestersPage />} />
          <Route path="semesters/new" element={<SemesterFormPage />} />
          <Route path="semesters/:id/edit" element={<SemesterFormPage />} />

          <Route path="subjects" element={<SubjectsPage />} />
          <Route path="subjects/new" element={<SubjectFormPage />} />
          <Route path="subjects/:id" element={<SubjectDetailPage />} />
          <Route path="subjects/:id/edit" element={<SubjectFormPage />} />

          <Route path="chapters" element={<ChaptersPage />} />
          <Route path="chapters/new" element={<ChapterFormPage />} />
          <Route path="chapters/:id/edit" element={<ChapterFormPage />} />

          <Route path="syllabus" element={<SyllabusPage />} />
          <Route path="syllabus/new" element={<SyllabusPage />} />
          <Route path="syllabus/:id/edit" element={<SyllabusPage />} />

          <Route path="notes" element={<NotesPage />} />
          <Route path="notes/new" element={<NoteFormPage />} />
          <Route path="notes/:id" element={<NotesPage />} />
          <Route path="notes/:id/edit" element={<NoteFormPage />} />

          <Route path="videos" element={<VideosPage />} />
          <Route path="videos/new" element={<VideoFormPage />} />
          <Route path="videos/:id/edit" element={<VideoFormPage />} />

          <Route path="pyqs" element={<PYQsPage />} />
          <Route path="pyqs/new" element={<PYQFormPage />} />
          <Route path="pyqs/:id/edit" element={<PYQFormPage />} />

          <Route path="practice-questions" element={<PracticeQuestionsPage />} />
          <Route path="practice-questions/new" element={<PracticeQuestionFormPage />} />
          <Route path="practice-questions/:id/edit" element={<PracticeQuestionFormPage />} />

          <Route path="interview-questions" element={<InterviewQuestionsPage />} />
          <Route path="interview-questions/new" element={<InterviewQuestionFormPage />} />
          <Route path="interview-questions/:id/edit" element={<InterviewQuestionFormPage />} />

          <Route path="study-material" element={<StudyMaterialPage />} />
          <Route path="study-material/new" element={<StudyMaterialPage />} />
          <Route path="study-material/:id/edit" element={<StudyMaterialPage />} />

          <Route path="content-tree" element={<ContentTreePage />} />

          {/* User Management */}
          <Route path="students" element={<StudentsPage />} />
          <Route path="students/:id" element={<StudentDetailPage />} />
          <Route path="admins" element={<AdminsPage />} />
          <Route path="admins/new" element={<AdminsPage />} />

          {/* Communications */}
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="notifications/new" element={<NotificationFormPage />} />
          <Route path="notifications/:id/edit" element={<NotificationFormPage />} />

          <Route path="support" element={<SupportPage />} />
          <Route path="support/:id" element={<SupportTicketDetailPage />} />

          {/* Analytics */}
          <Route path="reports" element={<ReportsPage />} />
          <Route path="activity" element={<ActivityLogPage />} />

          {/* System */}
          <Route path="profile" element={<AdminProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
