import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../api/axios';
import ResourceForm from '../../components/dashboard/ResourceForm';
import { toFormData } from '../../api/endpoints';
import { apiErrorMessage } from '../../utils/validators';
import { Loading, ErrorState } from '../../components/ui/States';
import usePageTitle from '../../hooks/usePageTitle';
const fields = [
  ['full_name', 'Real full name', 'text'], ['headline', 'Professional headline', 'text'], ['bio', 'Biography', 'textarea'],
  ['email', 'Public email', 'email'], ['phone', 'Phone', 'text'], ['location', 'Location', 'text'], ['avatar', 'Real photo', 'image'],
  ['github_url', 'GitHub URL', 'url'], ['linkedin_url', 'LinkedIn URL', 'url'], ['x_url', 'X URL', 'url'], ['website_url', 'Website URL', 'url'],
  ['years_of_experience', 'Years of experience', 'number'], ['is_available_for_hire', 'Available for hire', 'checkbox'],
].map(([name, label, type]) => ({ name, label, type, required: ['full_name', 'headline', 'email'].includes(name), rows: name === 'bio' ? 8 : undefined }));
export default function Profile() {
  usePageTitle('Edit profile'); const qc = useQueryClient();
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState({ old_password: '', new_password: '' });
  const [passwordError, setPasswordError] = useState(''); const [passwordSuccess, setPasswordSuccess] = useState('');
  const query = useQuery({ queryKey: ['profile'], queryFn: () => api.get('/profile/').then(r => r.data) });
  const save = useMutation({ mutationFn: values => {
    const payload = { ...values }; if (!(payload.avatar instanceof File)) delete payload.avatar;
    const isUpload = Object.values(payload).some(v => v instanceof File);
    return api.patch('/profile/', isUpload ? toFormData(payload) : payload);
  }, onSuccess: () => { setMessage('Profile saved.'); qc.invalidateQueries({ queryKey: ['profile'] }); } });
  const uploadResume = useMutation({ mutationFn: resume => api.patch('/profile/', toFormData({ resume })),
    onSuccess: () => { setMessage('Resume uploaded.'); setFile(null); qc.invalidateQueries({ queryKey: ['profile'] }); } });
  const changePass = useMutation({ mutationFn: data => api.post('/auth/change-password/', data), onSuccess: () => { setPassword({ old_password: '', new_password: '' }); setPasswordSuccess('Password changed.'); setPasswordError(''); },
    onError: e => setPasswordError(apiErrorMessage(e)) });
  if (query.isPending) return <Loading/>;
  if (query.isError) return <ErrorState error={query.error} retry={query.refetch}/>;
  return <><div className="dashboard-heading"><div><p className="eyebrow">Your identity</p><h1>Edit profile</h1></div></div>
    {message && <p className="success-message" role="status">{message}</p>}
    <div className="admin-panel narrow-panel"><h2>Public profile</h2>
      <ResourceForm fields={fields} initial={query.data} onSave={values => { setMessage(''); save.mutate(values); }} busy={save.isPending} error={save.error}/></div>
    <div className="admin-panel narrow-panel"><h2>Resume (PDF, max 5 MB)</h2>{query.data?.resume && <p><a href={query.data.resume} target="_blank" rel="noreferrer">View current resume</a></p>}
      <form className="stack-form" onSubmit={e => { e.preventDefault(); if (file) uploadResume.mutate(file); }}>
        <input type="file" accept="application/pdf,.pdf" onChange={e => setFile(e.target.files?.[0] || null)}/>
        {uploadResume.isError && <p className="field-error">{apiErrorMessage(uploadResume.error)}</p>}
        <button type="submit" className="btn btn-primary" disabled={!file || uploadResume.isPending}>Upload resume</button></form></div>
    <div className="admin-panel narrow-panel"><h2>Change password</h2>
      <form className="stack-form" onSubmit={e => { e.preventDefault(); changePass.mutate(password); }}>
        {passwordError && <p className="field-error" role="alert">{passwordError}</p>}
        {passwordSuccess && <p className="success-message" role="status">{passwordSuccess}</p>}
        <label>Current password<input type="password" autoComplete="current-password" required value={password.old_password} onChange={e => setPassword(p => ({ ...p, old_password: e.target.value }))}/></label>
        <label>New password<input type="password" autoComplete="new-password" minLength={8} required value={password.new_password} onChange={e => setPassword(p => ({ ...p, new_password: e.target.value }))}/></label>
        <button className="btn btn-primary" disabled={changePass.isPending} type="submit">Update password</button></form></div>
  </>;
}
