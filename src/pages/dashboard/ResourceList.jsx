import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { RESOURCE_CONFIG } from '../../components/dashboard/config';
import { list, asResults, remove, update } from '../../api/endpoints';
import Modal from '../../components/dashboard/ConfirmModal';
import Pagination from '../../components/ui/Pagination';
import { Loading, ErrorState, Empty } from '../../components/ui/States';
import { apiErrorMessage } from '../../utils/validators';
import usePageTitle from '../../hooks/usePageTitle';
import { useToast } from '../../context/ToastContext';
export default function ResourceList({ resource }) {
  const config = RESOURCE_CONFIG[resource];
  usePageTitle(config.title);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [toDelete, setToDelete] = useState(null);
  const [error, setError] = useState('');
  const qc = useQueryClient(); const toast = useToast();
  const params = { ...(resource === 'posts' ? { status } : {}), page: ['posts', 'projects'].includes(resource) ? page : undefined,
    search: search || undefined };
  const query = useQuery({ queryKey: [resource, 'admin', params], queryFn: () => list(resource, params) });
  const deleteMutation = useMutation({ mutationFn: id => remove(resource, id),
    onSuccess: () => { setToDelete(null); setError(''); qc.invalidateQueries({ queryKey: [resource] }); toast('Item deleted.'); },
    onError: e => setError(apiErrorMessage(e)) });
  const publishMutation = useMutation({ mutationFn: ({ id, status: nextStatus }) => update(resource, id, { status: nextStatus }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: [resource] }); toast('Publication status updated.'); }, onError: e => setError(apiErrorMessage(e)) });
  const items = asResults(query.data);
  return <><div className="dashboard-heading"><div><p className="eyebrow">Manage content</p><h1>{config.title}</h1></div>
    <Link className="btn btn-primary" to={`/dashboard/manage/${resource}/new`}><Plus size={17}/> Add {config.noun}</Link></div>
    <div className="admin-panel"><div className="admin-filter-row"><input type="search" placeholder={`Search ${resource}…`} value={search}
      onChange={e => { setSearch(e.target.value); setPage(1); }}/>
      {resource === 'posts' && <select value={status} onChange={e => { setStatus(e.target.value); setPage(1); }}>
        <option value="all">All posts</option><option value="PUBLISHED">Published</option><option value="DRAFT">Drafts</option></select>}</div>
      {error && <p className="field-error" role="alert">{error}</p>}
      {query.isPending ? <Loading/> : query.isError ? <ErrorState error={query.error} retry={query.refetch}/> : items.length ?
        <div className="table-scroll"><table className="data-table"><thead><tr>{config.columns.map(c => <th key={c}>{c.replaceAll('_', ' ')}</th>)}<th>Actions</th></tr></thead>
        <tbody>{items.map(item => <tr key={item[config.id]}>{config.columns.map(col => <td key={col}>
          {typeof item[col] === 'boolean' ? (item[col] ? 'Yes' : 'No') : (item[col] ?? '—')}</td>)}
          <td><div className="table-actions"><Link className="icon-button" title="Edit" aria-label={`Edit ${item.title || item.name || item.role}`} to={`/dashboard/manage/${resource}/${item[config.id]}/edit`}><Pencil size={16}/></Link>
            {resource === 'posts' && <button className="text-button" disabled={publishMutation.isPending} onClick={() => publishMutation.mutate({ id: item.slug, status: item.status === 'DRAFT' ? 'PUBLISHED' : 'DRAFT' })}>{item.status === 'DRAFT' ? 'Publish' : 'Unpublish'}</button>}
            <button className="icon-button danger" aria-label={`Delete ${item.title || item.name || item.role}`} onClick={() => setToDelete(item)}><Trash2 size={16}/></button></div></td></tr>)}</tbody></table></div>
        : <Empty title="No matching items" detail="Create the first item or change your search."/>}
      {['posts', 'projects'].includes(resource) && <Pagination page={page} pageSize={resource === 'posts' ? 6 : 9} count={query.data?.count || 0} onChange={setPage}/>}</div>
    {toDelete && <Modal title={`Delete ${config.noun}?`} message="This action permanently deletes this item and cannot be undone."
      pending={deleteMutation.isPending} onCancel={() => { setToDelete(null); setError(''); }} onConfirm={() => deleteMutation.mutate(toDelete[config.id])}/>}
  </>;
}
