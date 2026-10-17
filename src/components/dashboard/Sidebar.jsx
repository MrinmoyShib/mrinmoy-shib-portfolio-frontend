import { NavLink, Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, BriefcaseBusiness, Code2, GraduationCap, Tags, MessageSquare, Mail, UserRound, ArrowLeft, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
const nav = [
  ['/dashboard', 'Overview', LayoutDashboard], ['/dashboard/posts', 'Blog posts', FileText], ['/dashboard/projects', 'Projects', BriefcaseBusiness],
  ['/dashboard/skills', 'Skills', Code2], ['/dashboard/experience', 'Experience / Education', GraduationCap],
  ['/dashboard/taxonomy', 'Categories / Tags', Tags], ['/dashboard/comments', 'Comments', MessageSquare],
  ['/dashboard/messages', 'Messages', Mail], ['/dashboard/profile', 'Profile', UserRound],
];
export default function Sidebar() {
  const { logout } = useAuth(); const navigate = useNavigate();
  return <aside className="dashboard-sidebar"><Link className="wordmark sidebar-brand" to="/">Portfolio<span className="accent">.</span></Link><p className="eyebrow">OWNER / CMS</p>
    <nav className="sidebar-links" aria-label="Dashboard navigation">{nav.map(([href, label, Icon]) => <NavLink key={href} end={href === '/dashboard'} to={href}><Icon size={18}/>{label}</NavLink>)}</nav>
    <div className="sidebar-bottom"><Link to="/"><ArrowLeft size={17}/> View website</Link>
      <button type="button" onClick={async () => { await logout(); navigate('/'); }}><LogOut size={17}/> Sign out</button></div>
  </aside>;
}
