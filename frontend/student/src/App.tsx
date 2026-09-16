import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Layout } from './components/layout/Layout';

// Lazy-loaded pages
const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const LoginPage = lazy(() => import('./pages/LoginPage').then(m => ({ default: m.LoginPage })));
const RegisterPage = lazy(() => import('./pages/RegisterPage').then(m => ({ default: m.RegisterPage })));
const ForgotPasswordPage = lazy(() => import('./pages/ForgotPasswordPage').then(m => ({ default: m.ForgotPasswordPage })));
const VerifyEmailPage = lazy(() => import('./pages/VerifyEmailPage').then(m => ({ default: m.VerifyEmailPage })));
const ResetPasswordPage = lazy(() => import('./pages/ResetPasswordPage').then(m => ({ default: m.ResetPasswordPage })));
const CoursesPage = lazy(() => import('./pages/CoursesPage').then(m => ({ default: m.CoursesPage })));
const BranchPage = lazy(() => import('./pages/BranchPage').then(m => ({ default: m.BranchPage })));
const SemestersPage = lazy(() => import('./pages/SemestersPage').then(m => ({ default: m.SemestersPage })));
const SubjectsPage = lazy(() => import('./pages/SubjectsPage').then(m => ({ default: m.SubjectsPage })));
const SubjectDashboard = lazy(() => import('./pages/SubjectDashboard').then(m => ({ default: m.SubjectDashboard })));
const NotesReader = lazy(() => import('./pages/NotesReader').then(m => ({ default: m.NotesReader })));
const VideoLectures = lazy(() => import('./pages/VideoLectures').then(m => ({ default: m.VideoLectures })));
const PYQPage = lazy(() => import('./pages/PYQPage').then(m => ({ default: m.PYQPage })));
const PracticeQuestions = lazy(() => import('./pages/PracticeQuestions').then(m => ({ default: m.PracticeQuestions })));
const StudentDashboard = lazy(() => import('./pages/StudentDashboard').then(m => ({ default: m.StudentDashboard })));
const InterviewPrepPage = lazy(() => import('./pages/InterviewPrepPage').then(m => ({ default: m.InterviewPrepPage })));
const OnboardingPage = lazy(() => import('./pages/OnboardingPage').then(m => ({ default: m.OnboardingPage })));
const SearchPage = lazy(() => import('./pages/SearchPage').then(m => ({ default: m.SearchPage })));
const DistancePage = lazy(() => import('./pages/DistancePage').then(m => ({ default: m.DistancePage })));

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="flex flex-col items-center gap-3">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      <p className="text-sm text-muted-foreground">Loading EduCare...</p>
    </div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Public auth pages */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/verify-email" element={<VerifyEmailPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />

            {/* Protected: onboarding (requires login) */}
            <Route path="/onboarding" element={<ProtectedRoute><OnboardingPage /></ProtectedRoute>} />

            {/* Main layout */}
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="search" element={<SearchPage />} />
              <Route path="distance" element={<DistancePage />} />
              <Route path="courses" element={<CoursesPage />} />
              <Route path="branch/:degreeId" element={<BranchPage />} />
              <Route path="branch/:branchId/semesters" element={<SemestersPage />} />

              {/* Protected study material routes */}
              <Route path="semester/:semesterId/subjects" element={<ProtectedRoute><SubjectsPage /></ProtectedRoute>} />
              <Route path="subject/:subjectId" element={<ProtectedRoute><SubjectDashboard /></ProtectedRoute>} />
              <Route path="subject/:subjectId/notes" element={<ProtectedRoute><NotesReader /></ProtectedRoute>} />
              <Route path="subject/:subjectId/videos" element={<ProtectedRoute><VideoLectures /></ProtectedRoute>} />
              <Route path="subject/:subjectId/pyq" element={<ProtectedRoute><PYQPage /></ProtectedRoute>} />
              <Route path="subject/:subjectId/practice" element={<ProtectedRoute><PracticeQuestions /></ProtectedRoute>} />
              <Route path="dashboard" element={<ProtectedRoute><StudentDashboard /></ProtectedRoute>} />
              <Route path="interview-prep" element={<ProtectedRoute><InterviewPrepPage /></ProtectedRoute>} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
