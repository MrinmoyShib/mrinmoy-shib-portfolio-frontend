import { list, detail, create, update, remove } from './endpoints';
export const getSkills = params => list('skills', params);
export const getSkillsDetail = slug => detail('skills', slug);
export const createSkills = data => create('skills', data);
export const updateSkills = (slug, data) => update('skills', slug, data);
export const deleteSkills = slug => remove('skills', slug);
