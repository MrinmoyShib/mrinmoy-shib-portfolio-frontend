import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, CalendarDays, Clock3, Eye } from 'lucide-react';
import { detail } from '../../api/endpoints';
import { formatDate } from '../../utils/formatDate';
import usePageTitle from '../../hooks/usePageTitle';
import { ErrorState, Loading } from '../../components/ui/States';
import LikeButton from '../../components/blog/LikeButton';
import ShareBar from '../../components/blog/ShareBar';
import CommentForm from '../../components/blog/CommentForm';
import CommentList from '../../components/blog/CommentList';
export default function BlogDetail() {
  const { slug } = useParams();
  const query = useQuery({ queryKey: ['post', slug], queryFn: () => detail('posts', slug), staleTime: 5 * 60_000 });
  usePageTitle(query.data?.title || 'Journal');
  if (query.isPending) return <div className="shell page-section"><Loading/></div>;
  if (query.isError) return <div className="shell page-section"><ErrorState error={query.error} retry={query.refetch}/></div>;
  const post = query.data;
  return <article className="shell page-section detail-container"><Link className="inline-link" to="/blog"><ArrowLeft size={17}/> Back to journal</Link>
    <div className="detail-intro"><p className="eyebrow">{post.category_name || 'Journal'}</p><h1>{post.title}</h1><p className="large-copy">{post.excerpt}</p>
      <div className="post-meta"><span><CalendarDays size={16}/> {formatDate(post.published_at)}</span><span><Clock3 size={16}/> {post.reading_time} min read</span><span><Eye size={16}/> {post.views_count} views</span></div></div>
    {post.cover_image && <img className="detail-cover" src={post.cover_image} alt={`Cover image for ${post.title}`}/>}
    <div className="article-column"><div className="prose"><ReactMarkdown>{post.content}</ReactMarkdown></div>
      <div className="tag-row">{(post.tag_details || []).map(t => <Link className="tag" to={`/blog?tag=${t.slug}`} key={t.id}>#{t.name}</Link>)}</div>
      <div className="post-actions"><LikeButton post={post}/><ShareBar title={post.title}/></div>
      <section className="subsection"><h2>Join the conversation</h2><p className="muted">Comments are reviewed before appearing publicly.</p>
        <CommentForm slug={post.slug}/></section>
      <section className="subsection"><h2>Comments</h2><CommentList slug={post.slug}/></section>
    </div>
    {!!post.related_posts?.length && <section className="subsection"><h2>Related reading</h2><div className="related-grid">{post.related_posts.map(p =>
      <Link className="related-link" key={p.slug} to={`/blog/${p.slug}`}>{p.cover_image && <img src={p.cover_image} alt="" loading="lazy"/>}<h3>{p.title}</h3></Link>)}</div></section>}
  </article>;
}
