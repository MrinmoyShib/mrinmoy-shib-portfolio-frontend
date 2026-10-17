import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { MailOpen, Trash2 } from 'lucide-react';
import { list, asResults, update, remove } from '../../api/endpoints';
import Modal from '../../components/ui/Modal';
import Pagination from '../../components/ui/Pagination';
import { Loading, ErrorState, Empty } from '../../components/ui/States';
import { apiErrorMessage } from '../../utils/validators';
import { formatDate } from '../../utils/formatDate';
import usePageTitle from '../../hooks/usePageTitle';
export default function Messages() {
  usePageTitle('Contact inbox');
  const [page, setPage] = useState(1); const [unread, setUnread] = useState(false);
  const [deleting, setDeleting] = useState(null); const [error, setError] = useState('');
  const qc = useQueryClient();
  const query = useQuery({ queryKey: ['contact', page, unread], queryFn: () => list('contact', { page, is_read: unread ? 'false' : undefined }) });
  const mark = useMutation({ mutationFn: id => update('contact', id, { is_read: true }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['contact'] }); qc.invalidateQueries({ queryKey: ['dashboard-stats'] }); }, onError: e => setError(apiErrorMessage(e)) });
  const deletion = useMutation({ mutationFn: id => remove('contact', id), onSuccess: () => {
    setDeleting(null); qc.invalidateQueries({ queryKey: ['contact'] }); qc.invalidateQueries({ queryKey: ['dashboard-stats'] }); },
    onError: e => setError(apiErrorMessage(e)) });
  return <><div className="dashboard-heading"><div><p className="eyebrow">Inbox</p><h1>Contact messages</h1></div></div>
    <div className="admin-panel"><label className="checkbox-inline"><input type="checkbox" checked={unread} onChange={e => { setUnread(e.target.checked); setPage(1); }}/> Unread only</label>
      {error && <p className="field-error" role="alert">{error}</p>}
      {query.isPending ? <Loading/> : query.isError ? <ErrorState error={query.error} retry={query.refetch}/> : asResults(query.data).length ?
        <div className="moderation-list">{asResults(query.data).map(m => <article className={`moderation-item ${!m.is_read ? 'unread' : ''}`} key={m.id}>
          <div><span className="eyebrow">{!m.is_read && '● New · '}{formatDate(m.created_at)}</span><h3>{m.subject}</h3>
            <p><strong>{m.name}</strong> · <a href={`mailto:${m.email}`}>{m.email}</a></p><p className="preline">{m.message}</p></div>
          <div className="action-row">{!m.is_read && <button className="btn btn-outline" onClick={() => mark.mutate(m.id)} disabled={mark.isPending}><MailOpen size={17}/> Mark read</button>}
            <button className="icon-button danger" onClick={() => setDeleting(m)} aria-label={`Delete message from ${m.name}`}><Trash2 size={17}/></button></div>
        </article>)}</div> : <Empty title="No messages"/>}
      <Pagination page={page} count={query.data?.count || 0} pageSize={10} onChange={setPage}/></div>
    {deleting && <Modal title="Delete message?" message="This message will be permanently deleted." onCancel={() => setDeleting(null)} onConfirm={() => deletion.mutate(deleting.id)} pending={deletion.isPending}/>}
  </>;
}
