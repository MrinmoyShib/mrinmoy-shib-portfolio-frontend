import { list, detail, create, update, remove } from './endpoints';
export const getTags = params => list('tags', params);
export const getTagsDetail = slug => detail('tags', slug);
export const createTags = data => create('tags', data);
export const updateTags = (slug, data) => update('tags', slug, data);
export const deleteTags = slug => remove('tags', slug);
