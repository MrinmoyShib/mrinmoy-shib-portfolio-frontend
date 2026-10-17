import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowUpRight, Eye, Heart, FileText, MessageSquare, Mail, BriefcaseBusiness } from 'lucide-react';
import api from '../../api/axios';
import usePageTitle from '../../hooks/usePageTitle';
import { Loading, ErrorState } from '../../components/ui/States';
import StatCard from '../../components/dashboard/StatCard';
const statFields = [['total_posts', 'Blog posts', FileText], ['total_projects', 'Projects', BriefcaseBusiness], ['total_views', 'Page views', Eye],
  ['total_likes', 'Likes', Heart], ['pending_comments', 'Pending comments', MessageSquare], ['unread_messages', 'Unread messages', Mail]];
export default function Overview() {
  usePageTitle('Dashboard');
  const query = useQuery({ queryKey: ['dashboard-stats'], queryFn: () => api.get('/dashboard/stats/').then(r => r.data) });
  if (query.isPending) return <Loading/>;
  if (query.isError) return <ErrorState error={query.error} retry={query.refetch}/>;
  const data = query.data; const max = Math.max(1, ...data.posts_per_month.map(p => p.count));
  return <><div className="dashboard-heading"><div><p className="eyebrow">Content management</p><h1>Overview</h1><p>What is happening across your portfolio.</p></div>
    <Link className="btn btn-primary" to="/dashboard/posts/new">New blog post <ArrowUpRight size={17}/></Link></div>
    <div className="stat-grid">{statFields.map(([key, label, Icon]) => <StatCard key={key} label={label} value={data[key]} icon={Icon}/>)}</div>
    <div className="dashboard-columns"><section className="admin-panel"><h2>Published posts · last 6 months</h2>
      <div className="mini-chart">{data.posts_per_month.length ? data.posts_per_month.map(p => <div className="bar-group" key={p.month}>
        <div className="bar" style={{ height: `${Math.max(5, p.count / max * 100)}%` }} title={`${p.count} posts`}/><span>{p.month.slice(5)}</span></div>) :
        <p className="muted">No published posts yet.</p>}</div></section>
      <section className="admin-panel"><h2>Top posts</h2>{data.top_posts.length ? data.top_posts.map(p => <div className="mini-list-item" key={p.slug}>
        <Link to={`/blog/${p.slug}`}>{p.title}</Link><small>{p.views} views · {p.likes} likes</small></div>) : <p className="muted">No posts to rank.</p>}</section></div>
    <section className="admin-panel"><h2>Recent comments</h2>{data.recent_comments.length ? data.recent_comments.map(c => <div className="mini-list-item" key={c.id}>
      <strong>{c.name} on {c.post}</strong><p>{c.content}</p><small>{c.is_approved ? 'Approved' : 'Awaiting approval'}</small></div>) : <p className="muted">No comments yet.</p>}</section>
  </>;
}
