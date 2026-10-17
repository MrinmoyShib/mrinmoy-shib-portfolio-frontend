import { list, detail, create, update, remove } from './endpoints';
export const getProjects = params => list('projects', params);
export const getProjectsDetail = slug => detail('projects', slug);
export const createProjects = data => create('projects', data);
export const updateProjects = (slug, data) => update('projects', slug, data);
export const deleteProjects = slug => remove('projects', slug);
