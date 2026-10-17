import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { RESOURCE_CONFIG } from '../../components/dashboard/config';
import ResourceForm from '../../components/dashboard/ResourceForm';
import { create, detail, update, toFormData } from '../../api/endpoints';
import usePageTitle from '../../hooks/usePageTitle';
import { Loading, ErrorState } from '../../components/ui/States';
import { useToast } from '../../context/ToastContext';
import { apiErrorMessage } from '../../utils/validators';
export default function ResourceEditor() {
  const { resource, id } = useParams();
  const config = RESOURCE_CONFIG[resource]; const editing = Boolean(id);
  const nav = useNavigate(); const qc = useQueryClient(); const toast = useToast();
  usePageTitle(`${editing ? 'Edit' : 'New'} ${config?.noun || 'item'}`);
  const query = useQuery({ queryKey: [resource, id, 'edit'], queryFn: () => detail(resource, id), enabled: editing && Boolean(config) });
  const mutation = useMutation({ mutationFn: values => {
    const payload = { ...values };
    for (const f of config.fields) {
      if (f.type === 'image' && !(payload[f.name] instanceof File)) delete payload[f.name];
      if (f.type === 'multi' && !Array.isArray(payload[f.name])) payload[f.name] = [];
      if (f.type === 'checkbox') payload[f.name] = Boolean(payload[f.name]);
      if (f.type === 'number' && payload[f.name] !== '' && payload[f.name] !== undefined) payload[f.name] = Number(payload[f.name]);
    }
    if (resource === 'experiences' && (payload.end_date === '' || payload.is_current)) payload.end_date = null;
    if (resource === 'education' && payload.end_year === '') payload.end_year = null;
    // For editing, omit fields not changed that cannot be safely serialized (absolute media URLs).
    const hasUpload = Object.values(payload).some(v => v instanceof File);
    const data = hasUpload ? toFormData(payload) : payload;
    return editing ? update(resource, id, data) : create(resource, data);
  }, onSuccess: () => { qc.invalidateQueries({ queryKey: [resource] }); toast(`${config.noun} saved successfully.`); nav(config.path); },
    onError: e => toast(apiErrorMessage(e), 'error') });
  if (!config) return <p>Unknown resource.</p>;
  if (editing && query.isPending) return <Loading/>;
  if (editing && query.isError) return <ErrorState error={query.error} retry={query.refetch}/>;
  return <><div className="dashboard-heading"><div><p className="eyebrow">{config.title}</p><h1>{editing ? `Edit ${config.noun}` : `Add ${config.noun}`}</h1></div></div>
    <div className="admin-panel narrow-panel"><ResourceForm fields={config.fields} initial={query.data}
      onSave={values => mutation.mutate(values)} busy={mutation.isPending} error={mutation.error} onCancel={() => nav(config.path)}/></div></>;
}
