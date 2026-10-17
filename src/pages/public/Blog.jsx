import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { list, asResults } from '../../api/endpoints';
import useDebounce from '../../hooks/useDebounce';
import usePageTitle from '../../hooks/usePageTitle';
import PostCard from '../../components/blog/PostCard';
import PostFilters from '../../components/blog/PostFilters';
import Pagination from '../../components/ui/Pagination';
import { Empty, ErrorState, Loading } from '../../components/ui/States';
export default function Blog() {
  usePageTitle('Journal');
  const [params, setParams] = useSearchParams();
  const category = params.get('category') || '';
  const tag = params.get('tag') || '';
  const ordering = params.get('ordering') || '-published_at';
  const search = params.get('search') || '';
  const page = Math.max(1, Number(params.get('page')) || 1);
  const [text, setText] = useState(search);
  const debounced = useDebounce(text, 400);
  useEffect(() => { setText(search); }, [search]);
  useEffect(() => { if (debounced !== search) setParams(prev => { const copy = new URLSearchParams(prev); if (debounced) copy.set('search', debounced); else copy.delete('search'); copy.delete('page'); return copy; }, { replace: true }); }, [debounced, setParams]);
  const change = (key, value) => setParams(prev => { const copy = new URLSearchParams(prev); if (value) copy.set(key, String(value)); else copy.delete(key); if (key !== 'page') copy.delete('page'); return copy; });
  const filters = { category: category || undefined, tag: tag || undefined, search: search || undefined, ordering, page };
  const posts = useQuery({ queryKey: ['posts', filters], queryFn: () => list('posts', filters) });
  const categories = useQuery({ queryKey: ['categories'], queryFn: () => list('categories') });
  const tags = useQuery({ queryKey: ['tags'], queryFn: () => list('tags') });
  return <div className="shell page-section"><div className="page-intro"><p className="eyebrow">Notes from the process</p><h1>The journal<span className="accent">.</span></h1><p>Ideas, discoveries, and things worth sharing.</p></div>
    <PostFilters search={text} onSearch={setText} categories={asResults(categories.data)} tags={asResults(tags.data)} category={category} tag={tag} sort={ordering} onFilter={change}/>
    {posts.isPending ? <Loading/> : posts.isError ? <ErrorState error={posts.error} retry={posts.refetch}/> :
      asResults(posts.data).length ? <><div className="card-grid">{asResults(posts.data).map(post => <PostCard key={post.id} post={post}/>)}</div>
        <Pagination page={page} count={posts.data.count} pageSize={6} onChange={value => change('page', value)}/></> :
        <Empty title={search ? `No posts found for “${search}”` : 'No posts published yet'} detail="Try another search or category."/>}
  </div>;
}
