import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { LockKeyhole } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { apiErrorMessage } from '../../utils/validators';
import usePageTitle from '../../hooks/usePageTitle';
import { Loading } from '../../components/ui/States';
export default function Login() {
  usePageTitle('Owner sign in');
  const [username, setUsername] = useState(''); const [password, setPassword] = useState('');
  const [error, setError] = useState(''); const [busy, setBusy] = useState(false);
  const { isOwner, login, loading } = useAuth(); const navigate = useNavigate(); const location = useLocation();
  const destination = location.state?.from || '/dashboard';
  if (loading) return <div className="shell"><Loading/></div>;
  if (isOwner) return <Navigate to={destination} replace/>;
  const submit = async event => { event.preventDefault(); setBusy(true); setError(''); try { await login(username, password); navigate(destination, { replace: true }); } catch (e) { setError(apiErrorMessage(e)); } finally { setBusy(false); } };
  return <main className="login-page"><form className="login-card stack-form" onSubmit={submit}>
    <LockKeyhole size={28} className="accent"/><p className="eyebrow">Private access</p><h1>Owner login</h1><p className="muted">Only the site owner can sign in. Visitors do not need an account.</p>
    {error && <p className="field-error" role="alert">{error}</p>}
    <label>Username<input autoComplete="username" value={username} onChange={e => setUsername(e.target.value)} required/></label>
    <label>Password<input autoComplete="current-password" type="password" value={password} onChange={e => setPassword(e.target.value)} required/></label>
    <button className="btn btn-primary" type="submit" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button>
  </form></main>;
}
