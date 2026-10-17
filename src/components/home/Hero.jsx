import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, FileDown, Github, Linkedin, Mail } from 'lucide-react';
export default function Hero({ profile }) {
  return <section className="hero-section"><div className="shell hero-grid"><div className="hero-copy">
    <p className="eyebrow"><span className="eyebrow-line"/> Welcome to my corner of the internet</p>
    <h1>{profile?.full_name || 'A place for meaningful work.'}</h1>
    <p className="hero-headline">{profile?.headline || 'Projects, experience, and ideas — together in one place.'}</p>
    <p className="hero-description">{profile?.bio ? profile.bio.split(/\n/).filter(Boolean).slice(0, 2).join(' ').slice(0, 230) : 'Explore the work, writing, and experiences shared here.'}</p>
    <div className="action-row"><Link className="btn btn-primary" to="/projects">View projects <ArrowUpRight size={17}/></Link>
      {profile?.resume ? <a className="btn btn-outline" href={profile.resume} download target="_blank" rel="noreferrer"><FileDown size={17}/> Download resume</a> : <Link className="btn btn-outline" to="/about">About me <ArrowRight size={17}/></Link>}</div>
    <div className="hero-social">{profile?.github_url && <a href={profile.github_url} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={18}/></a>}
      {profile?.linkedin_url && <a href={profile.linkedin_url} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18}/></a>}
      {profile?.email && <a href={`mailto:${profile.email}`} aria-label="Email"><Mail size={18}/></a>}</div>
    </div><div className="hero-visual"><div className="hero-frame"><div className="hero-circle">
      {profile?.avatar ? <img src={profile.avatar} alt={`Portrait of ${profile.full_name}`}/> : <div className="hero-initial" aria-label="Profile photo not yet uploaded">{profile?.full_name?.split(' ').map(s => s[0]).slice(0,2).join('') || '✳'}</div>}
    </div><div className="hero-sticker">CRAFT <span>✳</span> CURIOSITY <span>✳</span> GROWTH</div></div></div>
  </div></section>;
}
