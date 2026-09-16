# StudyHub — Complete Production Learning Platform

## Overview

Build a full-stack production-ready academic learning platform with:
- **Student Website** (React + Vite + TypeScript + Tailwind + shadcn/ui)
- **Admin Panel** (separate React app, same stack)
- **Django REST API** (Python + DRF + PostgreSQL)
- **Strict grayscale Stitch design system** (Geist font, monochrome)

Pulled from **Stitch Project 9623290736147187094** — "StudyHub Academic Learning Platform" — 13 screens, desktop-first, Monochrome Academic Precision design, plus the newly generated **Login & Security Page**.

---

## Stitch Screens Extracted

| Screen | Title |
|--------|-------|
| 7d9efbf7... | Home — Academic Learning Platform |
| e87ac00c... | Explore Courses |
| 062543d8... | B.Tech Branch Selection |
| 8f926941... | Semester Selection (B.Tech CSE) |
| 3bb5c8e4... | Semester 5 Subjects |
| fa394b13... | DBMS Subject Learning Dashboard |
| b81135e6... | DBMS Notes & PDF Reader |
| 47c74489... | DBMS Video Lectures |
| 648586938... | Previous Year Questions & Paper Viewer |
| 169d54b0... | Practice Questions |
| fb079bd7... | Interview Preparation & Viva Voce |
| 0ce47421... | Student Web Dashboard |
| ec60a5ec... | Admin Web Panel |
| 68224b8b... | Login & Security Page (Generated) |

---

## Design System (from Stitch)

- **Font:** Geist (weights 300–800) + Geist Mono
- **Icons:** Material Symbols Outlined (monochrome)
- **Colors:** Pure grayscale — `#000000` primary, `#ffffff` surface, grays from `#1b1c1c` → `#fbf9f9`
- **Border radius:** sm=2px, DEFAULT=4px, lg=8px, full=12px
- **No colors** — No blue, green, purple, red, orange

---

## Proposed Project Structure

```
project-root/
├── frontend/
│   ├── student/          # React/Vite student app (port 5173)
│   │   ├── src/
│   │   │   ├── components/  # Reusable UI
│   │   │   ├── pages/       # 29 pages
│   │   │   ├── hooks/       # Custom hooks
│   │   │   ├── services/    # API calls (axios)
│   │   │   ├── stores/      # State (zustand)
│   │   │   ├── types/       # TypeScript types
│   │   │   └── utils/
│   ├── admin/            # React/Vite admin app (port 5174)
│   │   └── src/
│   │       ├── components/
│   │       ├── pages/       # 17 admin pages
│   │       ├── services/
│   │       └── types/
│   └── shared/           # Shared types/utils between apps
│
└── backend/
    ├── manage.py
    ├── config/            # settings, urls, wsgi
    └── apps/
        ├── accounts/      # User auth, JWT, profiles, MFA, sessions
        ├── courses/       # Course, Branch, Semester
        ├── subjects/      # Subject, Chapter
        ├── resources/     # Study material (base)
        ├── notes/         # Note PDFs
        ├── videos/        # YouTube links
        ├── pyqs/          # Previous year questions
        ├── questions/     # MCQ, practice
        ├── interviews/    # Interview Q&A
        ├── progress/      # Student progress tracking
        ├── bookmarks/     # Bookmarks
        ├── downloads/     # Download tracking
        ├── notifications/ # Push/email notifications
        └── support/       # Support tickets & messages
```

---

## Exhaustive Security & Performance Requirements

> [!IMPORTANT]
> The following rules apply to EVERY page, API, and module created for StudyHub. Frontend protection is UX only; all security logic is strictly enforced on the Django backend.

### 1. Authentication & Session Security
- **Login:** Rate limiting, IP/account temporary lockout on failed attempts, CAPTCHA on suspicious activity. Generic "Invalid email or password" error. Log time/IP/device/location. Warn on new device login.
- **Signup:** Email OTP verification with expiry/resend limits. No disposable emails. No auto-admin privileges.
- **Passwords:** Argon2id/bcrypt hashing. No logging of plaintext passwords. Password reset via short-lived, single-use random tokens sent only to verified emails. Revoke all sessions on reset. Check passwords against breached lists.
- **Sessions:** HttpOnly, Secure, SameSite cookies in production. Regenerate session ID after login. Auto-expire inactive sessions. Short-lived access tokens + rotated refresh tokens. Provide "Log out from all devices".
- **MFA:** Support TOTP authenticator apps. Encrypted MFA secrets. Require password confirmation to change MFA.

### 2. Authorization & RBAC
- Roles: `Student`, `Admin`. No Teacher role.
- Principle of least privilege enforced server-side for every request.
- Object-level permissions: users can only modify their own data. Protect admin routes server-side.
- Require re-authentication for destructive admin actions.

### 3. API, Database & Network Security
- **Backend:** Validate/sanitize all inputs, bodies, query params, headers. Strict serializers. Prevent mass assignment. Parameterized ORM queries (no direct SQL).
- **Network:** Secure CORS (exact trusted origins, no wildcard with credentials). CSRF tokens for cookie auth. Rate limiting by IP/user/endpoint (429 Too Many Requests + Retry-After). HTTPS across entire site (HSTS).
- **Headers:** Implement CSP, X-Content-Type-Options, Referrer-Policy, Permissions-Policy. Hide server version headers.
- **Error Handling:** Safe generic errors for users. Never expose stack traces, DB errors, or secrets. Proper 400, 401, 403, 404, 429, 500 handling.

### 4. File Upload Security
- Allow strict file types/MIME validation (don't trust extension).
- Randomize server-side filenames. Block executables, SVGs with scripts.
- Store uploads outside executable directory. Scan for malware. Limit file size and upload frequency. Signed URLs for private files.

### 5. Logging, Monitoring & Audit
- Log logins, resets, role changes, rate limit hits, admin actions, data changes.
- Never log passwords, tokens, API secrets.
- Separate read-only Audit Log for sensitive actions (who, what, when, IP).

### 6. Secrets & Deployment
- Store secrets in environment variables/secret manager. No hardcoded secrets. Never expose private keys in frontend bundles.
- Separate dev/staging/prod environments. Restrict server ports. Use Gunicorn behind Nginx.

### 7. Performance & Optimization
- **Scrolling:** Eliminate scroll lag. Use requestAnimationFrame/passive listeners. Avoid expensive React state updates on scroll. IntersectionObserver for lazy loading.
- **Pagination:** Server-side pagination for all lists (Admin tables, PYQs, Notes, etc.). Do not load all records at once.
- **Rendering:** Lazy load, code split, skeleton loaders. Debounce search. Memoize only actual bottlenecks.
- **Media:** Optimize images (WebP). Lazy load YouTube iframes (show thumbnail first).
- **API/DB:** Fix N+1 queries, duplicate requests. Add indexes to PostgreSQL. Use React Query caching on frontend.

---

## User Review Required

> [!WARNING]
> **Scope Note:** This is a massive full-stack project with 29 student pages, 17 admin pages, 14 Django apps, 20+ database models, and full JWT auth. I will build it in phases:
> 
> **Phase 1 (this execution):** Complete working foundation with all pages scaffolded and key flows working end-to-end  
> **Phase 2:** Remaining features (quiz engine, mock interview, PDF reader, etc.)

> [!IMPORTANT]
> I have successfully generated the **Login & Security Page** in the Stitch project, adhering to the monochrome guidelines.

---

## Open Questions

1. Should the initial build use **local PostgreSQL** or **Docker Compose** for the DB?
2. Do you want a single monorepo or separate git repos for frontend/backend?
3. For the first working version, should I prioritize the student experience or admin panel?

---

## Proposed Changes

### Phase 1 Execution Order

---

### 1. Project Scaffolding & Docker Setup

#### [NEW] `docker-compose.yml` — PostgreSQL + Redis + Django + React dev environment
#### [NEW] `backend/requirements.txt` — All Python dependencies
#### [NEW] `backend/.env.example` — Environment variable template
#### [NEW] `frontend/student/package.json` + Vite config + Tailwind with Stitch design tokens
#### [NEW] `frontend/admin/package.json` + Vite config

---

### 2. Backend — Django Apps

#### [NEW] `backend/config/settings.py` — Django settings (JWT, CORS, PostgreSQL, Security Headers)
#### [NEW] `backend/config/urls.py` — Root URL config

**accounts app:**
#### [NEW] `apps/accounts/models.py` — User, StudentProfile, AuditLog
#### [NEW] `apps/accounts/serializers.py` — Register, Login, Profile, JWT
#### [NEW] `apps/accounts/views.py` — Auth endpoints with rate limiting
#### [NEW] `apps/accounts/urls.py`

**courses app:**
#### [NEW] `apps/courses/models.py` — Course, Branch, Semester
#### [NEW] `apps/courses/serializers.py` + `views.py` + `urls.py`

**subjects app:**
#### [NEW] `apps/subjects/models.py` — Subject, Chapter
#### [NEW] `apps/subjects/serializers.py` + `views.py` + `urls.py`

**notes app:**
#### [NEW] `apps/notes/models.py` — Note
#### [NEW] `apps/notes/serializers.py` + `views.py` + `urls.py`

**videos app:**
#### [NEW] `apps/videos/models.py` — Video
#### [NEW] `apps/videos/serializers.py` + `views.py` + `urls.py`

**pyqs app:**
#### [NEW] `apps/pyqs/models.py` — PYQ
#### [NEW] `apps/pyqs/serializers.py` + `views.py` + `urls.py`

**questions app:**
#### [NEW] `apps/questions/models.py` — Question, QuestionOption
#### [NEW] `apps/questions/serializers.py` + `views.py` + `urls.py`

**interviews app:**
#### [NEW] `apps/interviews/models.py` — InterviewQuestion
#### [NEW] `apps/interviews/serializers.py` + `views.py` + `urls.py`

**progress app:**
#### [NEW] `apps/progress/models.py` — Progress, WatchedVideo, AttemptedQuestion
#### [NEW] `apps/progress/views.py` + `urls.py`

**bookmarks app:**
#### [NEW] `apps/bookmarks/models.py` — Bookmark
#### [NEW] `apps/bookmarks/views.py` + `urls.py`

**support app:**
#### [NEW] `apps/support/models.py` — SupportTicket, SupportMessage
#### [NEW] `apps/support/views.py` + `urls.py`

**notifications app:**
#### [NEW] `apps/notifications/models.py` — Notification
#### [NEW] `apps/notifications/views.py` + `urls.py`

---

### 3. Student Frontend (29 Pages)

**Core layout & design system:**
#### [NEW] `frontend/student/src/index.css` — Stitch design tokens
#### [NEW] `frontend/student/tailwind.config.ts` — Full Stitch token mapping
#### [NEW] `frontend/student/src/components/layout/Header.tsx`
#### [NEW] `frontend/student/src/components/layout/MobileNav.tsx`
#### [NEW] `frontend/student/src/components/layout/Layout.tsx`
#### [NEW] `frontend/student/src/components/ui/`

**Pages (all 29):**
- `HomePage` 
- `CoursesPage`
- `BranchSelectionPage`
- `SemesterSelectionPage`
- `SubjectsPage`
- `SubjectDashboardPage`
- `NotesPage`
- `PDFReaderPage`
- `VideosPage`
- `VideoPlayerPage`
- `PYQsPage`
- `PYQViewerPage`
- `PracticePage`
- `QuizPage`
- `InterviewPage`
- `MockInterviewPage`
- `StudyMaterialPage`
- `SearchPage`
- `BookmarksPage`
- `DownloadsPage`
- `NotificationsPage`
- `DashboardPage`
- `ProfilePage`
- `AccountSettingsPage`
- `PrivacySecurityPage`
- `HelpSupportPage`
- `LoginPage`
- `RegisterPage`
- `ForgotPasswordPage`

---

### 4. Admin Frontend (17 Pages)

#### [NEW] `frontend/admin/src/components/layout/AdminSidebar.tsx`
#### [NEW] `frontend/admin/src/components/layout/AdminHeader.tsx`
#### [NEW] `frontend/admin/src/components/layout/AdminLayout.tsx`

**Admin Pages:**
- `AdminDashboardPage`
- `StudentsPage`
- `CoursesPage`
- `BranchesPage`
- `SemestersPage`
- `SubjectsPage`
- `ChaptersPage`
- `NotesPage`
- `VideosPage`
- `PYQsPage`
- `PracticeQuestionsPage`
- `InterviewQuestionsPage`
- `StudyMaterialPage`
- `NotificationsPage`
- `SupportPage`
- `ReportsPage`
- `SettingsPage`

---

### 5. API Services & Types

#### [NEW] `frontend/student/src/services/api.ts` — Axios with JWT
#### [NEW] `frontend/student/src/services/auth.service.ts`
#### [NEW] `frontend/student/src/services/courses.service.ts`
#### [NEW] `frontend/student/src/services/subjects.service.ts`
#### [NEW] `frontend/student/src/types/index.ts`

---

## Verification Plan

### Automated Tests
```bash
# Backend
cd backend && python manage.py test

# Frontend lint
cd frontend/student && npm run lint
cd frontend/admin && npm run lint
```

### Manual Verification
- Start Docker Compose, run migrations, start both dev servers
- Verify rate limiting on Login API
- Check cookies are HttpOnly
- Verify fast scrolling on large lists
- Verify YouTube thumbnails load first instead of iframes
- Register as student → verify JWT flow
- Admin login → Dashboard stats visible
