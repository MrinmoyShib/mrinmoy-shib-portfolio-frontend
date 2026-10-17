import FieldError from './FieldError';
export default function Input({ label, name, error, ...props }) {
  return <div className="field-wrap"><label htmlFor={name}>{label}
    <input name={name} id={name} aria-invalid={Boolean(error)} {...props}/></label>
    <FieldError name={name} errors={{ [name]: error }}/></div>;
}
