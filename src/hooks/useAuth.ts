import { createContext, useContext, useEffect, useRef, useState, type ReactNode, createElement } from 'react';
import { api, setUnauthorizedHandler } from '@/services/api.service';
import { authService } from '@/services/auth.service';
import type { IApiResponse, IUser } from '@/types';

interface IAuthContext {
  user: IUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<IAuthContext | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser]       = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const refreshTimer          = useRef<ReturnType<typeof setTimeout> | null>(null);

  async function doRefresh(): Promise<void> {
    try {
      const res = await api.post<IApiResponse<{ expires_in: number }>>('/auth/refresh', {});
      // Cookie já foi renovado pelo servidor; agenda o próximo refresh
      // Como não temos o novo token aqui, agendamos baseado em expires_in
      if (res.success && res.data?.expires_in) {
        const msUntilRefresh = (res.data.expires_in - 60) * 1000;
        if (refreshTimer.current) clearTimeout(refreshTimer.current);
        if (msUntilRefresh > 0) {
          refreshTimer.current = setTimeout(() => void doRefresh(), msUntilRefresh);
        }
      }
    } catch {
      setUser(null);
    }
  }

  function hasSessionCookie(): boolean {
    return document.cookie.split(';').some(c => c.trim().startsWith('vitrine_session='));
  }

  async function loadUser(): Promise<void> {
    if (!hasSessionCookie()) {
      setLoading(false);
      return;
    }
    try {
      const res = await api.get<IApiResponse<IUser>>('/auth/me');
      setUser(res.data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // Remove ?token_issued=1 da URL após callback do Google OAuth
    const params = new URLSearchParams(window.location.search);
    if (params.get('token_issued')) {
      window.history.replaceState({}, '', window.location.pathname);
    }

    setUnauthorizedHandler(() => {
      setUser(null);
      if (refreshTimer.current) clearTimeout(refreshTimer.current);
    });

    void loadUser();

    return () => {
      if (refreshTimer.current) clearTimeout(refreshTimer.current);
    };
  }, []);

  // Agenda refresh proativo sempre que o user mudar (login / me)
  // O access_token está no cookie HttpOnly, então buscamos expires_in do servidor
  // e agendamos baseado nisso (900s = 15min, 60s de antecedência)
  useEffect(() => {
    if (!user) return;
    if (refreshTimer.current) clearTimeout(refreshTimer.current);
    const msUntilRefresh = (900 - 60) * 1000; // 14 min
    refreshTimer.current = setTimeout(() => void doRefresh(), msUntilRefresh);
    return () => {
      if (refreshTimer.current) clearTimeout(refreshTimer.current);
    };
  }, [user]);

  async function login(email: string, password: string): Promise<void> {
    const res = await authService.login(email, password);
    setUser(res.data.user);
  }

  async function logout(): Promise<void> {
    await authService.logout().catch(() => {});
    setUser(null);
    if (refreshTimer.current) clearTimeout(refreshTimer.current);
  }

  return createElement(AuthContext.Provider, { value: { user, loading, login, logout } }, children);
}

export function useAuth(): IAuthContext {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
