import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { list, asResults } from '../../api/endpoints';
import FieldError from '../ui/FieldError';
import { apiErrorMessage } from '../../utils/validators';

function ResourceField({ field, value, onChange, errors, original }) {
  const relation = useQuery({ queryKey: ['choices', field.resource], queryFn: () => list(field.resource), enabled: ['relation', 'multi'].includes(field.type) });
  const options = field.options || asResults(relation.data).map(item => ({ label: item.name, value: item.id }));
  const common = { id: field.name, name: field.name, disabled: relation.isPending && Boolean(field.resource) };
  let control;
  switch (field.type) {
    case 'textarea': control = <textarea {...common} rows={field.rows || 4} maxLength={field.maxLength} required={field.required}
      value={value || ''} onChange={e => onChange(field.name, e.target.value)}/>; break;
    case 'select': case 'relation': control = <select {...common} value={value ?? ''} required={field.required}
      onChange={e => onChange(field.name, e.target.value)}><option value="">Select…</option>
      {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}</select>; break;
    case 'multi': control = <select {...common} multiple size={Math.min(Math.max(options.length, 3), 7)} value={(value || []).map(String)}
      onChange={e => onChange(field.name, Array.from(e.target.selectedOptions, x => x.value))}>
      {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}</select>; break;
    case 'checkbox': control = <input {...common} type="checkbox" checked={Boolean(value)} onChange={e => onChange(field.name, e.target.checked)}/>; break;
    case 'image': control = <ImageUpload id={field.name} value={value} original={original?.[field.name]} onChange={file => onChange(field.name, file)}/>; break;
    default: control = <input {...common} type={field.type || 'text'} min={field.min} max={field.max} minLength={field.minLength}
      maxLength={field.maxLength} required={field.required} value={value ?? ''} onChange={e => onChange(field.name, e.target.value)}/>;
  }
  return <div className={`field-wrap ${field.type === 'checkbox' ? 'check-wrap' : ''}`}><label htmlFor={field.name}>{field.type === 'checkbox' ? <>{control}<span>{field.label}</span></> : <>{field.label}{control}</>}</label>
    {field.type === 'multi' && <small>Hold Ctrl / Cmd to select multiple.</small>}
    <FieldError name={field.name} errors={errors}/>
  </div>;
}
export function ImageUpload({ id, value, original, onChange, accept = 'image/jpeg,image/png,image/webp' }) {
  const [preview, setPreview] = useState(null);
  useEffect(() => {
    if (!(value instanceof File)) { setPreview(null); return; }
    const objectUrl = URL.createObjectURL(value); setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [value]);
  return <div className="upload"><input id={id} type="file" accept={accept} onChange={e => onChange(e.target.files?.[0] || '')}/>
    {(preview || original) && <img className="upload-preview" src={preview || original} alt="Selected file preview"/>}</div>;
}
export default function ResourceForm({ fields, initial, onSave, busy, onCancel, error }) {
  const [values, setValues] = useState({});
  useEffect(() => { setValues(initial || {}); }, [initial]);
  const serverErrors = error?.response?.data && typeof error.response.data === 'object' ? error.response.data : {};
  const submit = event => { event.preventDefault(); onSave(values); };
  return <form className="stack-form admin-form" onSubmit={submit}>
    {error && <p role="alert" className="field-error">{apiErrorMessage(error)}</p>}
    {fields.map(field => <ResourceField key={field.name} field={field} value={values[field.name]}
      original={initial} onChange={(name, value) => setValues(previous => ({ ...previous, [name]: value }))} errors={serverErrors}/>)}
    <div className="action-row"><button type="submit" disabled={busy} className="btn btn-primary">{busy ? 'Saving…' : 'Save changes'}</button>
      {onCancel && <button type="button" className="btn btn-outline" onClick={onCancel} disabled={busy}>Cancel</button>}</div>
  </form>;
}
