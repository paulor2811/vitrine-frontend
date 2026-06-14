import { createContext, useContext, useEffect, useState, type ReactNode, createElement } from 'react';
import { api } from '@/services/api.service';
import { authService } from '@/services/auth.service';
import type { IUser } from '@/types';

interface IAuthContext {
  user: IUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<IAuthContext | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      api.setToken(token);
      window.history.replaceState({}, '', window.location.pathname);
    }

    if (api.hasToken()) {
      authService.me()
        .then(res => setUser(res.data))
        .catch(() => api.clearToken())
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  async function login(email: string, password: string): Promise<void> {
    const res = await authService.login(email, password);
    api.setToken(res.data.token);
    setUser(res.data.user);
  }

  async function logout(): Promise<void> {
    await authService.logout().catch(() => {});
    api.clearToken();
    setUser(null);
  }

  return createElement(AuthContext.Provider, { value: { user, loading, login, logout } }, children);
}

export function useAuth(): IAuthContext {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
