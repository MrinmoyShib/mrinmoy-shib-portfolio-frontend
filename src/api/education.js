import { list, detail, create, update, remove } from './endpoints';
export const getEducation = params => list('education', params);
export const getEducationDetail = slug => detail('education', slug);
export const createEducation = data => create('education', data);
export const updateEducation = (slug, data) => update('education', slug, data);
export const deleteEducation = slug => remove('education', slug);
