import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import api from '../api/axios';
const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const clearTokens = useCallback(() => {
    localStorage.removeItem('devfolio_access');
    localStorage.removeItem('devfolio_refresh');
    setUser(null);
  }, []);
  useEffect(() => {
    let alive = true;
    const restore = async () => {
      try {
        if (localStorage.getItem('devfolio_access') || localStorage.getItem('devfolio_refresh')) {
          const { data } = await api.get('/auth/me/');
          if (alive) setUser(data);
        }
      } catch { if (alive) clearTokens(); }
      finally { if (alive) setLoading(false); }
    };
    restore();
    window.addEventListener('devfolio:logout', clearTokens);
    return () => { alive = false; window.removeEventListener('devfolio:logout', clearTokens); };
  }, [clearTokens]);
  const login = async (username, password) => {
    const { data } = await api.post('/auth/login/', { username, password });
    localStorage.setItem('devfolio_access', data.access);
    localStorage.setItem('devfolio_refresh', data.refresh);
    setUser(data.user);
    return data.user;
  };
  const logout = async () => {
    const refresh = localStorage.getItem('devfolio_refresh');
    try { if (refresh) await api.post('/auth/logout/', { refresh }); }
    catch { /* The local session is cleared even if the token expired. */ }
    clearTokens();
  };
  const value = useMemo(() => ({ user, isOwner: Boolean(user), login, logout, loading }), [user, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
