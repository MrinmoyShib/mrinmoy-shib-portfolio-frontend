import { list, detail, create, update, remove } from './endpoints';
export const getExperiences = params => list('experiences', params);
export const getExperiencesDetail = slug => detail('experiences', slug);
export const createExperiences = data => create('experiences', data);
export const updateExperiences = (slug, data) => update('experiences', slug, data);
export const deleteExperiences = slug => remove('experiences', slug);
