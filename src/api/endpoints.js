import api from './axios';
export const list = (resource, params = {}) => api.get(`/${resource}/`, { params }).then(r => r.data);
export const detail = (resource, id) => api.get(`/${resource}/${id}/`).then(r => r.data);
export const create = (resource, values) => api.post(`/${resource}/`, values).then(r => r.data);
export const update = (resource, id, values) => api.patch(`/${resource}/${id}/`, values).then(r => r.data);
export const remove = (resource, id) => api.delete(`/${resource}/${id}/`).then(r => r.data);
export const asResults = data => Array.isArray(data) ? data : (data?.results || []);
export const toFormData = values => {
  const result = new FormData();
  for (const [key, value] of Object.entries(values)) {
    if (value === '' || value === undefined || value === null) continue;
    if (Array.isArray(value)) value.forEach(v => result.append(key, v));
    else result.append(key, value);
  }
  return result;
};
