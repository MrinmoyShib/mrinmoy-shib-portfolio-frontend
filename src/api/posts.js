import { list, detail, create, update, remove } from './endpoints';
export const getPosts = params => list('posts', params);
export const getPostsDetail = slug => detail('posts', slug);
export const createPosts = data => create('posts', data);
export const updatePosts = (slug, data) => update('posts', slug, data);
export const deletePosts = slug => remove('posts', slug);
