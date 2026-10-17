export default function PageContainer({ as: Component = 'div', className = '', children, ...props }) {
  return <Component className={`shell ${className}`.trim()} {...props}>{children}</Component>;
}
