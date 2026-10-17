import { AlertTriangle, Inbox, LoaderCircle } from 'lucide-react';
import { apiErrorMessage } from '../../utils/validators';
export function Loading({ label = 'Loading content' }) {
  return <div className="state state-loading" role="status"><LoaderCircle className="spin" aria-hidden="true"/><span>{label}…</span></div>;
}
export function Empty({ title = 'Nothing here yet', detail = 'Content will appear here when it is added.' }) {
  return <div className="state"><Inbox aria-hidden="true"/><h3>{title}</h3><p>{detail}</p></div>;
}
export function ErrorState({ error, retry }) {
  return <div className="state" role="alert"><AlertTriangle aria-hidden="true"/><h3>Unable to load content</h3>
    <p>{apiErrorMessage(error)}</p><button type="button" className="btn btn-outline" onClick={retry}>Retry</button></div>;
}
export function QueryState({ query, children, emptyTitle }) {
  if (query.isPending) return <Loading />;
  if (query.isError) return <ErrorState error={query.error} retry={query.refetch} />;
  if (!query.data || (Array.isArray(query.data) && !query.data.length)) return <Empty title={emptyTitle} />;
  return children(query.data);
}
