export const emailValid = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
export const nonEmpty = value => String(value ?? '').trim().length > 0;
export function apiErrorMessage(error) {
  const data = error?.response?.data;
  if (error?.response?.status === 429) return 'Too many attempts, please try later.';
  if (typeof data?.detail === 'string') return data.detail;
  if (data && typeof data === 'object') return Object.entries(data).map(([key, value]) =>
    `${key}: ${Array.isArray(value) ? value.join(' ') : value}`).join(' · ');
  return error?.message || 'Something went wrong. Please retry.';
}
