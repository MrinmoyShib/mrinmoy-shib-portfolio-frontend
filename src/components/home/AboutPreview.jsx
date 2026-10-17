import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
export default function AboutPreview({ profile }) {
  return <section className="section"><div className="shell about-preview"><div><p className="eyebrow">01 / About me</p><h2>More than a collection of projects.</h2></div>
    <div><p className="large-copy">{profile?.bio?.split('\n').filter(Boolean).slice(0, 4).join(' ') || 'This space connects professional experience, practical projects, and the ideas worth sharing.'}</p>
    <Link className="inline-link" to="/about">More about me <ArrowUpRight size={18}/></Link></div></div></section>;
}
