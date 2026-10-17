import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { list, asResults } from '../../api/endpoints';
import { PROJECT_CATEGORIES } from '../../utils/constants';
import usePageTitle from '../../hooks/usePageTitle';
import ProjectCard from '../../components/home/ProjectCard';
import Pagination from '../../components/ui/Pagination';
import { Empty, ErrorState, Loading } from '../../components/ui/States';
export default function Projects() {
  usePageTitle('Projects');
  const [params, setParams] = useSearchParams();
  const category = params.get('category') || '';
  const search = params.get('search') || '';
  const ordering = params.get('ordering') || '-completed_date';
  const page = Math.max(1, Number(params.get('page')) || 1);
  const filters = { category: category || undefined, search: search || undefined, ordering, page };
  const query = useQuery({ queryKey: ['projects', filters], queryFn: () => list('projects', filters) });
  const set = (key, value) => setParams(prev => { const next = new URLSearchParams(prev); if (value) next.set(key, String(value)); else next.delete(key); if (key !== 'page') next.delete('page'); return next; });
  return <div className="shell page-section"><div className="page-intro"><p className="eyebrow">Ideas turned into action</p><h1>Selected work<span className="accent">.</span></h1><p>Projects built to learn, solve, and explore.</p></div>
    <div className="filters"><label className="search-label">Search projects<input type="search" value={search} onChange={e => set('search', e.target.value)} placeholder="Search projects…"/></label>
    <div className="filter-row"><label>Category<select value={category} onChange={e => set('category', e.target.value)}><option value="">All categories</option>{Object.entries(PROJECT_CATEGORIES).map(([key, value]) => <option key={key} value={key}>{value}</option>)}</select></label>
    <label>Sort<select value={ordering} onChange={e => set('ordering', e.target.value)}><option value="-completed_date">Latest</option><option value="display_order">Featured order</option><option value="title">A–Z</option></select></label></div></div>
    {query.isPending ? <Loading/> : query.isError ? <ErrorState error={query.error} retry={query.refetch}/> : asResults(query.data).length ?
      <><div className="card-grid">{asResults(query.data).map(item => <ProjectCard key={item.id} project={item}/>)}</div>
        <Pagination page={page} pageSize={9} count={query.data.count} onChange={number => set('page', number)}/></> : <Empty title={search ? `No projects found for “${search}”` : 'No projects found'} detail="Try different filters or check back later."/>}
  </div>;
}
