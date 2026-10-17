import { Link } from 'react-router-dom';
import usePageTitle from '../../hooks/usePageTitle';
export default function NotFound() {
  usePageTitle('Not found');
  return <div className="shell not-found"><span>404</span><h1>This page got lost.</h1><p>What you're looking for might have moved or no longer exists.</p><Link className="btn btn-primary" to="/">Back home</Link></div>;
}
