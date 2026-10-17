import { Link } from 'react-router-dom';
import { Github, Linkedin, Globe, ArrowUpRight } from 'lucide-react';
export default function Footer({ profile }) {
  const links = [profile?.github_url && ['GitHub', profile.github_url, Github], profile?.linkedin_url && ['LinkedIn', profile.linkedin_url, Linkedin], profile?.website_url && ['Website', profile.website_url, Globe]].filter(Boolean);
  return <footer className="site-footer"><div className="shell footer-inner">
    <div><strong>{profile?.full_name || 'Portfolio'}<span className="accent">.</span></strong><p>Projects, experience, and notes from the journey.</p><small>© {new Date().getFullYear()} All rights reserved.</small></div>
    <div className="footer-links"><Link to="/about">About</Link><Link to="/projects">Projects</Link><Link to="/blog">Journal</Link><Link to="/contact">Get in touch</Link></div>
    <div className="footer-links">{links.map(([name, href, Icon]) => <a key={name} href={href} target="_blank" rel="noreferrer"><Icon size={16}/>{name}<ArrowUpRight size={13}/></a>)}</div>
  </div></footer>;
}
