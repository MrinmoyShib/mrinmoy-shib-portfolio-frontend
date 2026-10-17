import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { AtSign, MapPin, ArrowUpRight } from 'lucide-react';
import api from '../../api/axios';
import { emailValid, apiErrorMessage } from '../../utils/validators';
import usePageTitle from '../../hooks/usePageTitle';
export default function Contact() {
  usePageTitle('Contact'); const { profile } = useOutletContext();
  const [values, setValues] = useState({ name: '', email: '', subject: '', message: '' });
  const [error, setError] = useState(''); const [success, setSuccess] = useState(false);
  const mutation = useMutation({ mutationFn: data => api.post('/contact/', data) });
  const submit = async event => {
    event.preventDefault(); setError('');
    if (!emailValid(values.email) || values.message.trim().length < 10 || values.message.length > 2000 || !values.name.trim() || !values.subject.trim()) {
      setError('Please fill every field, provide a valid email, and write a message of 10–2000 characters.'); return;
    }
    try { await mutation.mutateAsync(values); setSuccess(true); setValues({ name: '', email: '', subject: '', message: '' }); }
    catch (e) { setError(apiErrorMessage(e)); }
  };
  return <div className="shell page-section"><div className="page-intro"><p className="eyebrow">Let's connect</p><h1>Get in touch<span className="accent">.</span></h1><p>Questions, collaborations, or just a hello — my inbox is open.</p></div>
    <div className="contact-grid"><aside><h2>Let's start a conversation.</h2><p className="muted">Use the form and I'll read your message when I can.</p>
      {profile?.email && <a className="contact-detail" href={`mailto:${profile.email}`}><AtSign size={20}/>{profile.email}<ArrowUpRight size={15}/></a>}
      {profile?.location && <p className="contact-detail"><MapPin size={20}/>{profile.location}</p>}</aside>
      <form className="stack-form contact-form" onSubmit={submit}>
        {success && <p className="success-message" role="status">Your message has been sent. Thank you for reaching out!</p>}
        {error && <p className="field-error" role="alert">{error}</p>}
        <div className="form-row"><label>Name<input value={values.name} maxLength={100} required onChange={e => setValues(v => ({ ...v, name: e.target.value }))}/></label>
          <label>Email<input type="email" value={values.email} required onChange={e => setValues(v => ({ ...v, email: e.target.value }))}/></label></div>
        <label>Subject<input value={values.subject} required maxLength={200} onChange={e => setValues(v => ({ ...v, subject: e.target.value }))}/></label>
        <label>Message<textarea value={values.message} required rows={7} maxLength={2000} onChange={e => setValues(v => ({ ...v, message: e.target.value }))}/></label>
        <button className="btn btn-primary" type="submit" disabled={mutation.isPending}>{mutation.isPending ? 'Sending…' : 'Send message'} <ArrowUpRight size={18}/></button>
      </form></div></div>;
}
