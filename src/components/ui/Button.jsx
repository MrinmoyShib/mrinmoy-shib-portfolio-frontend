/** Consistent semantic action button; `as` may be a router Link or an anchor. */
export default function Button({ as: Component = 'button', tone = 'primary', className = '', children, ...props }) {
  return <Component className={`btn btn-${tone} ${className}`.trim()} {...props}>{children}</Component>;
}
