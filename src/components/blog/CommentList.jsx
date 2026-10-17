import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../../api/axios';
import { Empty, ErrorState, Loading } from '../ui/States';
import CommentForm from './CommentForm';
import { formatDate } from '../../utils/formatDate';
function Comment({ data, slug, isReply }) {
  const [replying, setReplying] = useState(false);
  return <article className={`comment ${isReply ? 'comment-reply' : ''}`}>
    <div className="comment-heading"><strong>{data.name}</strong><small>{formatDate(data.created_at)}</small></div><p className="preline">{data.content}</p>
    {!isReply && <button className="text-button" onClick={() => setReplying(v => !v)}>{replying ? 'Cancel reply' : 'Reply'}</button>}
    {replying && <CommentForm slug={slug} parent={data.id} onDone={() => setReplying(false)}/>}
    {(data.replies || []).map(reply => <Comment key={reply.id} data={reply} slug={slug} isReply/>)}
  </article>;
}
export default function CommentList({ slug }) {
  const query = useQuery({ queryKey: ['comments', slug], queryFn: () => api.get(`/posts/${slug}/comments/`).then(r => r.data) });
  if (query.isPending) return <Loading/>;
  if (query.isError) return <ErrorState error={query.error} retry={query.refetch}/>;
  if (!query.data.length) return <Empty title="No comments yet" detail="Start the conversation below."/>;
  return <div>{query.data.map(item => <Comment key={item.id} data={item} slug={slug}/>)}</div>;
}
