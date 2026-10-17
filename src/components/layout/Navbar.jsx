import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import MobileMenu from './MobileMenu';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
export default function Navbar({ profile }) {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { isOwner } = useAuth();
  const links = [['/', 'Home'], ['/about', 'About'], ['/projects', 'Projects'], ['/blog', 'Journal'], ['/contact', 'Contact']];
  return <header className="site-header"><div className="shell nav-inner">
    <NavLink className="wordmark" to="/" onClick={() => setOpen(false)} aria-label="Home">{profile?.full_name || 'Portfolio'}<span className="wordmark-dot">.</span></NavLink>
    <MobileMenu open={open} links={links} isOwner={isOwner} onClose={() => setOpen(false)}/>
    <div className="nav-actions"><button type="button" className="icon-button" onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}>{theme === 'light' ? <Moon size={19}/> : <Sun size={19}/>}</button>
      <button type="button" className="icon-button mobile-only" aria-expanded={open} aria-label="Toggle navigation" onClick={() => setOpen(x => !x)}>{open ? <X/> : <Menu/>}</button>
    </div>
  </div></header>;
}
