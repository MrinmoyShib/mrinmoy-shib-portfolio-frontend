import { list, detail, create, update, remove } from './endpoints';
export const getCategories = params => list('categories', params);
export const getCategoriesDetail = slug => detail('categories', slug);
export const createCategories = data => create('categories', data);
export const updateCategories = (slug, data) => update('categories', slug, data);
export const deleteCategories = slug => remove('categories', slug);
