import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loading } from '../components/ui/States';
export default function ProtectedRoute() {
  const { isOwner, loading } = useAuth();
  const location = useLocation();
  if (loading) return <main className="shell"><Loading label="Restoring your session"/></main>;
  return isOwner ? <Outlet/> : <Navigate to="/login" replace state={{ from: location.pathname + location.search }}/>;
}
