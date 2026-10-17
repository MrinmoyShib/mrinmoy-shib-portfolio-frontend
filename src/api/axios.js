import axios from 'axios';

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL, timeout: 15000 });
const key = 'devfolio_visitor_id';
export function getVisitorId() {
  let id = localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(key, id);
  }
  return id;
}

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('devfolio_access');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  config.headers['X-Visitor-Id'] = getVisitorId();
  return config;
});
let refreshPromise = null;
api.interceptors.response.use((response) => response, async (error) => {
  const original = error.config;
  const refresh = localStorage.getItem('devfolio_refresh');
  if (error.response?.status === 401 && refresh && original && !original._retry &&
      !original.url?.includes('/auth/refresh/') && !original.url?.includes('/auth/login/')) {
    original._retry = true;
    try {
      refreshPromise ||= axios.post(`${api.defaults.baseURL}/auth/refresh/`, { refresh })
        .then(({ data }) => {
          localStorage.setItem('devfolio_access', data.access);
          if (data.refresh) localStorage.setItem('devfolio_refresh', data.refresh);
          return data.access;
        })
        .finally(() => { refreshPromise = null; });
      const token = await refreshPromise;
      original.headers.Authorization = `Bearer ${token}`;
      return api(original);
    } catch {
      localStorage.removeItem('devfolio_access');
      localStorage.removeItem('devfolio_refresh');
      window.dispatchEvent(new Event('devfolio:logout'));
      if (window.location.pathname.startsWith('/dashboard')) window.location.assign('/login');
    }
  }
  return Promise.reject(error);
});
export default api;
