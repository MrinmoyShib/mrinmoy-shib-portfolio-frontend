export default function FieldError({ errors, name }) {
  const message = errors?.[name];
  return message ? <p className="field-error" role="alert">{Array.isArray(message) ? message.join(' ') : String(message)}</p> : null;
}
