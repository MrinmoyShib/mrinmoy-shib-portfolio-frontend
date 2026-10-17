import { createContext, useContext, useState } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';
const ToastContext = createContext(null);
export function ToastProvider({ children }) {
  const [notification, setNotification] = useState(null);
  const notify = (message, type = 'success') => setNotification({ message, type, id: Date.now() });
  return <ToastContext.Provider value={notify}>{children}
    {notification && <div key={notification.id} className={`toast toast-${notification.type}`} role="status" aria-live="polite">
      {notification.type === 'success' ? <CheckCircle2 size={18}/> : <AlertCircle size={18}/>}
      <span>{notification.message}</span><button type="button" className="icon-button" aria-label="Dismiss notification" onClick={() => setNotification(null)}><X size={16}/></button>
    </div>}
  </ToastContext.Provider>;
}
export const useToast = () => useContext(ToastContext);
