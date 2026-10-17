import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock3 } from 'lucide-react';
import { formatDate } from '../../utils/formatDate';
export default function PostCard({ post }) {
  return <article className="content-card"><Link to={`/blog/${post.slug}`} className="card-image" aria-label={`Read ${post.title}`}>
    {post.cover_image ? <img src={post.cover_image} alt={`Cover image for ${post.title}`} loading="lazy"/> : <div className="image-fallback">Journal</div>}
  </Link><div className="card-body"><div className="card-meta"><span>{post.category_name || 'Journal'} · {formatDate(post.published_at)}</span><ArrowUpRight size={16}/></div>
    <h3><Link to={`/blog/${post.slug}`}>{post.title}</Link></h3><p>{post.excerpt}</p>
    <span className="muted card-read"><Clock3 size={14}/> {post.reading_time} min read</span></div></article>;
}
