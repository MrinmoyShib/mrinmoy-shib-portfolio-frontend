import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
export default function SectionHeading({ eyebrow, title, to, link }) {
  return <div className="section-heading"><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div>
    {to && <Link className="inline-link" to={to}>{link}<ArrowUpRight size={18}/></Link>}</div>;
}
