import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import api from '../../api/axios';
import { emailValid, apiErrorMessage } from '../../utils/validators';
export default function CommentForm({ slug, parent = null, onDone }) {
  const [values, setValues] = useState({ name: '', email: '', website: '', content: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const mutation = useMutation({ mutationFn: data => api.post(`/posts/${slug}/comments/`, data) });
  const submit = async e => {
    e.preventDefault(); setError('');
    if (values.name.trim().length < 2 || !emailValid(values.email) || values.content.trim().length < 5 || values.content.length > 1000) {
      setError('Enter a name (2+ characters), valid email, and comment (5–1000 characters).'); return;
    }
    try { await mutation.mutateAsync({ ...values, ...(parent ? { parent } : {}) }); setSuccess(true); setValues({ name: '', email: '', website: '', content: '' }); onDone?.(); }
    catch (e) { setError(apiErrorMessage(e)); }
  };
  return <form className="stack-form" onSubmit={submit}>
    {success && <p className="success-message" role="status">Your comment is awaiting approval.</p>}
    {error && <p className="field-error" role="alert">{error}</p>}
    <div className="form-row"><label>Name<input value={values.name} maxLength={100} onChange={e => setValues(v => ({ ...v, name: e.target.value }))} required/></label>
      <label>Email (never displayed publicly)<input type="email" value={values.email} onChange={e => setValues(v => ({ ...v, email: e.target.value }))} required/></label></div>
    <label>Website (optional)<input type="url" value={values.website} onChange={e => setValues(v => ({ ...v, website: e.target.value }))}/></label>
    <label>Your comment<textarea value={values.content} rows={4} maxLength={1000} onChange={e => setValues(v => ({ ...v, content: e.target.value }))} required/></label>
    <button className="btn btn-primary" disabled={mutation.isPending} type="submit">{mutation.isPending ? 'Submitting…' : 'Submit comment'}</button>
  </form>;
}
