import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, ArrowUpRight, Github } from 'lucide-react';
import { detail } from '../../api/endpoints';
import usePageTitle from '../../hooks/usePageTitle';
import { ErrorState, Loading } from '../../components/ui/States';
export default function ProjectDetail() {
  const { slug } = useParams();
  const query = useQuery({ queryKey: ['project', slug], queryFn: () => detail('projects', slug) });
  usePageTitle(query.data?.title || 'Project');
  if (query.isPending) return <div className="shell page-section"><Loading/></div>;
  if (query.isError) return <div className="shell page-section"><ErrorState error={query.error} retry={query.refetch}/></div>;
  const p = query.data;
  return <article className="shell page-section detail-container"><Link className="inline-link" to="/projects"><ArrowLeft size={17}/> All projects</Link>
    <div className="detail-intro"><p className="eyebrow">{p.category} / Project</p><h1>{p.title}</h1><p className="large-copy">{p.summary}</p>
      <div className="action-row">{p.live_url && <a className="btn btn-primary" href={p.live_url} target="_blank" rel="noreferrer">Live project <ArrowUpRight size={18}/></a>}
        {p.github_url && <a className="btn btn-outline" href={p.github_url} target="_blank" rel="noreferrer"><Github size={18}/> Source code</a>}</div></div>
    {p.cover_image && <img className="detail-cover" src={p.cover_image} alt={`Illustrative title graphic for ${p.title}`}/>}
    <div className="article-layout"><div className="prose"><ReactMarkdown>{p.description}</ReactMarkdown></div>
      <aside className="detail-sidebar"><h3>Project stack</h3><div className="tag-row">{(p.tech_stack_details || []).map(s => <span className="tag" key={s.id}>{s.name}</span>)}</div>
        <h3>Completion date</h3><p>{p.completed_date || 'Not recorded in CV'}</p></aside></div>
  </article>;
}
