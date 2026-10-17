import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Check, Undo2, Trash2 } from 'lucide-react';
import { list, update, remove, asResults } from '../../api/endpoints';
import Modal from '../../components/ui/Modal';
import Pagination from '../../components/ui/Pagination';
import { Loading, ErrorState, Empty } from '../../components/ui/States';
import { apiErrorMessage } from '../../utils/validators';
import usePageTitle from '../../hooks/usePageTitle';
export default function Comments() {
  usePageTitle('Comment moderation');
  const [page, setPage] = useState(1); const [filter, setFilter] = useState('all');
  const [deleting, setDeleting] = useState(null); const [error, setError] = useState('');
  const qc = useQueryClient();
  const query = useQuery({ queryKey: ['comments', 'admin', page, filter], queryFn: () => list('comments', { page, is_approved: filter === 'all' ? undefined : filter }) });
  const mutate = useMutation({ mutationFn: ({ id, approved }) => update('comments', id, { is_approved: approved }),
    onSuccess: () => { setError(''); qc.invalidateQueries({ queryKey: ['comments'] }); qc.invalidateQueries({ queryKey: ['dashboard-stats'] }); },
    onError: e => setError(apiErrorMessage(e)) });
  const deletion = useMutation({ mutationFn: id => remove('comments', id),
    onSuccess: () => { setDeleting(null); qc.invalidateQueries({ queryKey: ['comments'] }); }, onError: e => setError(apiErrorMessage(e)) });
  return <><div className="dashboard-heading"><div><p className="eyebrow">Community</p><h1>Comments</h1><p>Approve before comments become public.</p></div></div>
    <div className="admin-panel"><label>Filter<select value={filter} onChange={e => { setFilter(e.target.value); setPage(1); }}>
      <option value="all">All comments</option><option value="false">Pending</option><option value="true">Approved</option></select></label>
      {error && <p role="alert" className="field-error">{error}</p>}
      {query.isPending ? <Loading/> : query.isError ? <ErrorState error={query.error} retry={query.refetch}/> : asResults(query.data).length ?
        <div className="moderation-list">{asResults(query.data).map(c => <article className="moderation-item" key={c.id}>
          <div><strong>{c.name}</strong> <small>on {c.post_title}</small><p className="preline">{c.content}</p>
          <p className="muted">{c.email} · {c.is_approved ? 'Approved' : 'Awaiting approval'}</p></div>
          <div className="action-row"><button className="btn btn-outline" disabled={mutate.isPending} onClick={() => mutate.mutate({ id: c.id, approved: !c.is_approved })}>
            {c.is_approved ? <Undo2 size={16}/> : <Check size={16}/>} {c.is_approved ? 'Unapprove' : 'Approve'}</button>
            <button className="icon-button danger" onClick={() => setDeleting(c)} aria-label={`Delete comment by ${c.name}`}><Trash2 size={17}/></button></div>
        </article>)}</div> : <Empty title="No comments to review"/>}
      <Pagination page={page} count={query.data?.count || 0} pageSize={10} onChange={setPage}/></div>
    {deleting && <Modal title="Delete comment?" message="The comment and its replies will be permanently deleted." onCancel={() => setDeleting(null)} onConfirm={() => deletion.mutate(deleting.id)} pending={deletion.isPending}/>}
  </>;
}
