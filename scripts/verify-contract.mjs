/** Lightweight offline structural checks; run full npm build and real API tests separately. */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
let errors = [];
const exists = (relative) => fs.existsSync(path.join(root, relative));
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const expectedComponents = [
  'layout/Navbar.jsx', 'layout/Footer.jsx', 'layout/PageContainer.jsx', 'layout/MobileMenu.jsx',
  'ui/Button.jsx', 'ui/Card.jsx', 'ui/Badge.jsx', 'ui/Input.jsx', 'ui/Modal.jsx', 'ui/Skeleton.jsx', 'ui/EmptyState.jsx', 'ui/Pagination.jsx',
  'home/Hero.jsx', 'home/AboutPreview.jsx', 'home/SkillGrid.jsx', 'home/ExperienceTimeline.jsx', 'home/FeaturedProjects.jsx', 'home/LatestPosts.jsx',
  'blog/PostCard.jsx', 'blog/PostFilters.jsx', 'blog/LikeButton.jsx', 'blog/CommentForm.jsx', 'blog/CommentList.jsx', 'blog/ShareBar.jsx',
  'dashboard/Sidebar.jsx', 'dashboard/StatCard.jsx', 'dashboard/DataTable.jsx', 'dashboard/ConfirmModal.jsx', 'dashboard/ImageUploader.jsx',
];
for (const c of expectedComponents) if (!exists(`src/components/${c}`)) errors.push(`Missing component: ${c}`);
const routes = read('src/routes/AppRoutes.jsx');
for (const route of ['path="about"', 'path="projects"', 'path="projects/:slug"', 'path="blog"',
  'path="blog/:slug"', 'path="contact"', 'path="login"', 'path="dashboard"', 'path="posts"',
  'path="projects"', 'path="skills"', 'path="experience"', 'path="taxonomy"', 'path="comments"',
  'path="messages"', 'path="profile"']) if (!routes.includes(route)) errors.push(`Missing route: ${route}`);
const api = read('src/api/axios.js');
for (const value of ['VITE_API_URL', 'X-Visitor-Id', 'Authorization', 'auth/refresh']) if (!api.includes(value)) errors.push(`Missing axios feature: ${value}`);
const css = read('src/styles/tokens.css');
for (const name of ['--accent:', '--background:', '--surface:', '--border:', '--font-display:', '--font-ui:'])
  if (!css.includes(name)) errors.push(`Missing design token: ${name}`);
const pkg = JSON.parse(read('package.json'));
for (const dep of ['react', 'react-dom', 'react-router-dom', 'axios', '@tanstack/react-query', 'react-markdown'])
  if (!pkg.dependencies[dep]) errors.push(`Missing package: ${dep}`);
if (!exists('.env.example')) errors.push('Missing environment template');
console.log(errors.length ? errors.join('\n') : `Contract check passed: ${expectedComponents.length} required components, routes, API features and design tokens.`);
process.exitCode = errors.length ? 1 : 0;
