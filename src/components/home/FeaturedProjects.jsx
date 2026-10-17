import ProjectCard from './ProjectCard';
import SectionHeading from './SectionHeading';
import { Empty, ErrorState, Loading } from '../ui/States';
import { asResults } from '../../api/endpoints';
export default function FeaturedProjects({ query }) {
  const items = asResults(query.data).slice(0, 3);
  return <section className="section alternate"><div className="shell"><SectionHeading eyebrow="04 / Selected work" title="Featured projects" to="/projects" link="See all projects"/>
    {query.isPending ? <Loading/> : query.isError ? <ErrorState error={query.error} retry={query.refetch}/> :
      items.length ? <div className="card-grid">{items.map(p => <ProjectCard key={p.id} project={p}/>)}</div> : <Empty title="Projects coming soon"/>}
  </div></section>;
}
