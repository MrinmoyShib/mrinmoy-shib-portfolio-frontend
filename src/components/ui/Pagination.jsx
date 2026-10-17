export default function Pagination({ page, count, pageSize, onChange }) {
  const pages = Math.ceil(count / pageSize);
  if (pages <= 1) return null;
  return <nav className="pagination" aria-label="Pagination">
    <button disabled={page <= 1} className="btn btn-outline" onClick={() => onChange(page - 1)}>Previous</button>
    <span>Page {page} of {pages}</span>
    <button disabled={page >= pages} className="btn btn-outline" onClick={() => onChange(page + 1)}>Next</button>
  </nav>;
}
