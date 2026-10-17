export default function Card({ as: Component = 'article', className = '', children, ...props }) {
  return <Component className={`content-card ${className}`.trim()} {...props}>{children}</Component>;
}
