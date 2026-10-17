import { Outlet } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../../api/axios';
import Navbar from './Navbar';
import Footer from './Footer';
export default function PublicLayout() {
  const { data: profile } = useQuery({ queryKey: ['profile'], queryFn: () => api.get('/profile/').then(r => r.data) });
  return <><Navbar profile={profile}/><main id="main-content"><Outlet context={{ profile }}/></main><Footer profile={profile}/></>;
}
