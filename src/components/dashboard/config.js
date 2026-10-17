const field = (name, label, type = 'text', extra = {}) => ({ name, label, type, ...extra });
const categoryOptions = [{ value: 'FRONTEND', label: 'Frontend' }, { value: 'BACKEND', label: 'Backend' }, { value: 'DATABASE', label: 'Database' }, { value: 'DEVOPS', label: 'DevOps' }, { value: 'TOOLS', label: 'Tools' }, { value: 'SOFT_SKILL', label: 'Soft skill' }];
export const RESOURCE_CONFIG = {
  posts: {
    title: 'Blog posts', noun: 'post', path: '/dashboard/posts', id: 'slug',
    columns: ['title', 'status', 'published_at', 'views_count'],
    fields: [field('title', 'Post title', 'text', { required: true, minLength: 5 }), field('excerpt', 'Excerpt', 'textarea', { maxLength: 300, required: true }),
      field('content', 'Article (Markdown)', 'textarea', { rows: 14, required: true }), field('cover_image', 'Cover image', 'image'),
      field('category', 'Blog category', 'relation', { resource: 'categories' }), field('tags', 'Tags', 'multi', { resource: 'tags' }),
      field('status', 'Status', 'select', { options: [{ value: 'DRAFT', label: 'Draft' }, { value: 'PUBLISHED', label: 'Published' }] }), field('is_featured', 'Featured', 'checkbox')],
  },
  projects: {
    title: 'Projects', noun: 'project', path: '/dashboard/projects', id: 'slug',
    columns: ['title', 'category', 'completed_date', 'is_featured'],
    fields: [field('title', 'Project title', 'text', { required: true }), field('summary', 'Summary', 'textarea', { maxLength: 200, required: true }),
      field('description', 'Description (Markdown)', 'textarea', { rows: 10, required: true }), field('cover_image', 'Cover screenshot', 'image'),
      field('category', 'Category', 'select', { options: ['WEB', 'MOBILE', 'API', 'ML', 'OTHER'].map(x => ({ value: x, label: x })) }),
      field('tech_stack', 'Technology stack', 'multi', { resource: 'skills' }),
      field('live_url', 'Live URL', 'url'), field('github_url', 'GitHub URL', 'url'),
      field('completed_date', 'Completion date (if known)', 'date'), field('display_order', 'Display order', 'number'), field('is_featured', 'Featured', 'checkbox')],
  },
  skills: {
    title: 'Skills', noun: 'skill', path: '/dashboard/skills', id: 'id', columns: ['name', 'category', 'proficiency', 'is_featured'],
    fields: [field('name', 'Skill name', 'text', { required: true }), field('category', 'Category', 'select', { options: categoryOptions }),
      field('proficiency', 'Proficiency (1–100)', 'number', { min: 1, max: 100, required: true }), field('icon', 'Icon name', 'text'),
      field('display_order', 'Display order', 'number'), field('is_featured', 'Featured', 'checkbox')],
  },
  experiences: {
    title: 'Work experience', noun: 'experience', path: '/dashboard/experience', id: 'id', columns: ['role', 'company', 'start_date', 'is_current'],
    fields: [field('company', 'Company', 'text', { required: true }), field('role', 'Role', 'text', { required: true }),
      field('employment_type', 'Employment type', 'select', { options: ['FULL_TIME', 'PART_TIME', 'INTERNSHIP', 'FREELANCE', 'CONTRACT', 'VOLUNTEER'].map(x => ({ value: x, label: x.replace('_', ' ') })) }),
      field('location', 'Location'), field('start_date', 'Start date', 'date', { required: true }), field('end_date', 'End date', 'date'),
      field('is_current', 'Current role', 'checkbox'), field('description', 'Description', 'textarea', { required: true }),
      field('company_url', 'Company URL', 'url'), field('display_order', 'Display order', 'number')],
  },
  education: {
    title: 'Education', noun: 'education entry', path: '/dashboard/experience', id: 'id', columns: ['institution', 'degree', 'start_year', 'end_year'],
    fields: [field('institution', 'Institution', 'text', { required: true }), field('degree', 'Degree', 'text', { required: true }),
      field('field_of_study', 'Field of study', 'text', { required: true }), field('start_year', 'Start year', 'number', { required: true, min: 1900 }),
      field('end_year', 'End year', 'number', { min: 1900 }), field('grade', 'Grade'), field('description', 'Description', 'textarea')],
  },
  categories: {
    title: 'Blog categories', noun: 'category', path: '/dashboard/taxonomy', id: 'id', columns: ['name', 'slug', 'posts_count'],
    fields: [field('name', 'Category name', 'text', { required: true }), field('description', 'Description', 'textarea')],
  },
  tags: { title: 'Blog tags', noun: 'tag', path: '/dashboard/taxonomy', id: 'id', columns: ['name', 'slug', 'posts_count'], fields: [field('name', 'Tag name', 'text', { required: true })] },
};
