import { NavLink } from 'react-router-dom';
/** Shared nav links: hidden by CSS at desktop, hamburger-controlled on mobile. */
export default function MobileMenu({ open, links, onClose, isOwner }) {
  return <nav className={`main-nav ${open ? 'open' : ''}`} aria-label="Main navigation">
    {links.map(([href, label]) => <NavLink key={href} to={href} end={href === '/'} onClick={onClose}>{label}</NavLink>)}
    {isOwner && <NavLink to="/dashboard" onClick={onClose}>Dashboard</NavLink>}
  </nav>;
}
