import ResourceList from './ResourceList';
export default function GroupedResources({ first, second }) {
  return <div className="grouped-resources"><ResourceList resource={first}/><div className="admin-section-divider"/><ResourceList resource={second}/></div>;
}
