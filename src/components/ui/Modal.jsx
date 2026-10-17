import { useEffect, useRef } from 'react';
/** Keyboard-accessible confirmation; Escape closes it, tabbing stays within the dialog. */
export default function Modal({ title, message, onCancel, onConfirm, pending }) {
  const dialogRef = useRef(null);
  const cancelRef = useRef(null);
  useEffect(() => {
    const previous = document.activeElement;
    cancelRef.current?.focus();
    const handleKeys = event => {
      if (event.key === 'Escape' && !pending) { event.preventDefault(); onCancel(); }
      if (event.key !== 'Tab') return;
      const focusable = Array.from(dialogRef.current?.querySelectorAll('button:not([disabled]), a[href]') || []);
      if (!focusable.length) return;
      const first = focusable[0]; const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', handleKeys);
    return () => { document.removeEventListener('keydown', handleKeys); previous?.focus?.(); };
  }, [onCancel, pending]);
  return <div className="modal-backdrop" role="presentation" onMouseDown={() => { if (!pending) onCancel(); }}>
    <div ref={dialogRef} className="modal" role="dialog" aria-modal="true" aria-label={title}
      aria-describedby="modal-message" onMouseDown={e => e.stopPropagation()}>
      <h2>{title}</h2><p id="modal-message">{message}</p><div className="action-row">
        <button ref={cancelRef} className="btn btn-outline" type="button" onClick={onCancel} disabled={pending}>Cancel</button>
        <button className="btn btn-danger" type="button" onClick={onConfirm} disabled={pending}>{pending ? 'Deleting…' : 'Delete'}</button>
      </div>
    </div>
  </div>;
}
