import PostCard from '../blog/PostCard';
import SectionHeading from './SectionHeading';
import { Empty, ErrorState, Loading } from '../ui/States';
import { asResults } from '../../api/endpoints';
export default function LatestPosts({ query }) {
  const items = asResults(query.data).slice(0, 3);
  return <section className="section"><div className="shell"><SectionHeading eyebrow="05 / Writing" title="From the journal" to="/blog" link="Read the blog"/>
    {query.isPending ? <Loading/> : query.isError ? <ErrorState error={query.error} retry={query.refetch}/> :
      items.length ? <div className="card-grid">{items.map(p => <PostCard key={p.id} post={p}/>)}</div> : <Empty title="Writing coming soon"/>}
  </div></section>;
}
