import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
export default function ProjectCard({ project }) {
  return <article className="content-card"><Link to={`/projects/${project.slug}`} className="card-image" aria-label={`View ${project.title}`}>
    {project.cover_image ? <img src={project.cover_image} alt={`Illustrative title graphic for ${project.title}`} loading="lazy"/> : <div className="image-fallback">Project</div>}
    </Link><div className="card-body"><div className="card-meta"><span>{project.category}</span><ArrowUpRight size={16}/></div>
    <h3><Link to={`/projects/${project.slug}`}>{project.title}</Link></h3><p>{project.summary}</p>
    <div className="tag-row">{(project.tech_stack_details || []).slice(0, 4).map(t => <span key={t.id} className="tag">{t.name}</span>)}</div></div></article>;
}
