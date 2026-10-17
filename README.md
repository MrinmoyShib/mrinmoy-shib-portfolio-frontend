# DevFolio · React frontend

> A personal portfolio and original-blog interface with light/dark themes, visitor browsing, comment/like actions and a private single-owner content dashboard.

**Companion repo:** [DevFolio Django REST backend](../mrinmoy-shib-portfolio-backend/README.md) — replace with the actual GitHub backend URL when publishing. Live site: add after deployment.

## Stack and features

React 18, Vite, React Router v6, Axios (one configured instance), TanStack React Query v5, Context API (authentication and theme), plain CSS with design tokens, Lucide icons and safe Markdown rendering via `react-markdown`.

- Hero/profile, education, employment timeline and skills grouped with proficiency indicators.
- Project search, category filter, ordering, pagination, and individual project descriptions.
- Blog search (400ms debounced), filter chips, tags, ordering by newest/most liked/most viewed/A–Z, shareable URL query strings, 6/page pagination.
- Original Markdown articles with time/author metadata, optimistic like toggles and rollback, copy/share, pending comments, approved replies, related posts.
- Validated contact form with success feedback and specific throttled (`429`) error state.
- Owner-only JWT login reachable by **typing `/login`**, no public login link, no signup/registration. Protected dashboard: stats, post/project/skill/experience/education/category/tag editing, comment moderation, message inbox, profile and password.
- One Axios instance with access-token and persistent visitor-ID headers, one-time token refresh, React Query for every server read/write, skeleton/loading/error/retry/empty handling, saved light/dark theme and accessible mobile navigation.

## Quick start

Start the [Django backend](../mrinmoy-shib-portfolio-backend/README.md) on `127.0.0.1:8000` first, including `migrate`, `createsuperuser` and **`python manage.py seed_cv`** to import Mrinmoy Shib’s real CV information.

```bash
cd mrinmoy-shib-portfolio-frontend
npm install
cp .env.example .env             # Windows: copy .env.example .env
npm run dev
# open http://localhost:5173
```

Use `VITE_API_URL=http://127.0.0.1:8000/api` in `.env`; no components hardcode an API server. For a deploy, update VITE_API_URL and the backend CORS whitelist to your real frontend origin.

```bash
npm run lint:syntax   # JS/JSX parse verification
npm run build         # optimized production bundle
npm run preview       # preview the built bundle
```

**CV import:** The backend `seed_cv` command loads Mrinmoy Shib’s photo, résumé, CV-grounded bio, education, volunteering, skills, and five real CV-listed academic project titles. Project cover images are illustrations pending genuine screenshots; project-specific URLs and completion dates are still missing. Five AI-assisted articles are kept as **unpublished editorial drafts**, for the owner to rewrite before publishing. Seeded skills show `Unrated` rather than a fabricated self-assessment. Go to `http://localhost:5173/login` and sign in with the Django superuser created earlier. Note the uploaded résumé contains personal address and referee information, so review it before deploying publicly.

## Frontend routes

| Route | Access | Purpose |
| --- | --- | --- |
| `/` | Visitor | Hero → about preview → skills → experience → 3 featured projects → 3 latest articles → contact CTA → footer |
| `/about` | Visitor | Full bio, education, timeline, skills, resume download |
| `/projects` | Visitor | Project listing, search, filter, sort, pages |
| `/projects/:slug` | Visitor | Project detail and external links |
| `/blog` | Visitor | Article listing, search, categories, tags, sort and pages |
| `/blog/:slug` | Visitor | Full article, likes, sharing, comments and related posts |
| `/contact` | Visitor | Contact form and status feedback |
| `/login` | Owner-only sign-in page (not linked) | JWT login, redirect back to protected route |
| `/dashboard` | Owner | Statistics, chart and recent/top items |
| `/dashboard/posts` | Owner | Search/status filter, publish/unpublish, edit, delete |
| `/dashboard/posts/new` | Owner | New article redirect to reusable editor |
| `/dashboard/posts/:slug/edit` | Owner | Article editor redirect |
| `/dashboard/projects` | Owner | Project CRUD |
| `/dashboard/skills` | Owner | Skill CRUD |
| `/dashboard/experience` | Owner | Experience and education CRUD |
| `/dashboard/taxonomy` | Owner | Categories and tags CRUD |
| `/dashboard/comments` | Owner | Approve/unapprove/delete comments |
| `/dashboard/messages` | Owner | Unread inbox, mark read, delete |
| `/dashboard/profile` | Owner | Profile, avatar, resume and password |
| `/dashboard/manage/:resource/new` | Owner | Reusable new-item editor for dashboard resources |
| `/dashboard/manage/:resource/:id/edit` | Owner | Reusable edit form with preview, validation and save/cancel |
| `*` | Visitor | Styled 404 page |

## Folder structure

```text
src/
  api/             axios.js, endpoints.js, and per-resource API modules
  components/
    layout/        Navbar, Footer, PublicLayout
    ui/            States, Pagination, Modal, FieldError
    home/          SectionHeading, SkillGrid, ExperienceTimeline, ProjectCard
    blog/          PostCard, PostFilters, LikeButton, ShareBar, CommentForm, CommentList
    dashboard/     Sidebar, DashboardLayout, ResourceForm, resource config
  context/         AuthContext.jsx, ThemeContext.jsx
  hooks/           usePosts, useDebounce, usePageTitle, useVisitorId
  pages/
    public/        Home, About, Projects, ProjectDetail, Blog, BlogDetail, Contact, Login, NotFound
    dashboard/     Overview, ResourceList, ResourceEditor, GroupedResources, Comments, Messages, Profile
  routes/          AppRoutes.jsx, ProtectedRoute.jsx
  utils/           formatDate.js, validators.js, constants.js
  styles/          tokens.css, main.css
```

### Design and branding

**Direction A: Minimal Editorial**. Warm neutral paper, Fraunces headings, DM Sans body, terracotta accent, asymmetric arched portrait, restrained borders and no ready-made template. The implementation uses a single design-token system for color, type, spacing, shadows, radii and themes. See [full token table and design rationale](docs/DESIGN_DIRECTION.md).

The chosen pairing must be confirmed as different from classmates' choices. The provided favicon is an original **MS** monogram derived from the owner name in the supplied CV.

## Screenshots

The assignment demands genuine images of a working site **containing your own authentic data**. These were not fabricated in the code-only deliverable. Capture and add at least four images before final submission using [this checklist](docs/SCREENSHOT_AND_RECORDING_GUIDE.md).

| Required screenshot | Status |
| --- | --- |
| Home (light theme) | Capture after setup |
| Home (dark theme) | Capture after setup |
| Blog list | Capture after creating published posts |
| Blog detail | Capture after creating posts/comments |
| Owner dashboard | Capture after adding content and interactions |

## Error handling and security

The browser sends JWT bearer authentication and a persistent visitor UUID. If a protected request gets `401`, the Axios response interceptor attempts one refresh and retries; if refresh fails, it clears the tokens and redirects out of the owner dashboard. React Query owns all API reads/mutations, with invalidations after writes. The UI displays per-field DRF serializer errors, and destructive actions show a real custom confirmation modal. Images get a live preview before upload; no raw HTML is injected from user content. Backend permissions, not hidden frontend buttons, provide actual authorization.

Light/dark preference is stored in `localStorage`, with system preference on the first visit. Mobile menu is controlled with an expanded state. Layout breakpoints: ≥1280 desktop, 1024 tablet, 768 compact/tablet, ≤480 mobile; check 360px as well. Contrast samples are recorded in the design document. Image alt text and focus-visible styles are provided.

## What I would improve with more time

Broader Playwright E2E coverage, React Testing Library tests, richer ARIA/live-state audits, image compression and responsive `srcSet`, persistent cloud media and a shared production throttle cache, more robust concurrent visitor accounting and dashboard data visualizations.

## Submission to-do

Read the backend [`CONTENT_CHECKLIST.md`](../mrinmoy-shib-portfolio-backend/CONTENT_CHECKLIST.md). You still need to add personal factual content, run both servers and acceptance tests, capture real screenshots, record the required 4–6 minute demonstration, publish the two repos to GitHub and provide a demo superuser to your grader through their approved private method. This environment cannot access the package registries, so it **could not install dependencies or execute the actual React build** while preparing these source files.
