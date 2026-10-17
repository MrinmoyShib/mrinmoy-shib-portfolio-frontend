export default function Badge({ children, className = '' }) {
  return <span className={`tag ${className}`.trim()}>{children}</span>;
}
