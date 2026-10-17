export default function Skeleton({ rows = 3 }) {
  return <div aria-label="Loading content" role="status" className="skeleton-grid">
    {Array.from({ length: rows }, (_, i) => <div className="skeleton-line" key={i} style={{ width: `${100 - i * 12}%` }}/>)}</div>;
}
