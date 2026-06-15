import config from './config.service';

let refreshPromise: Promise<void> | null = null;
let onUnauthorized: (() => void) | null  = null;

export function setUnauthorizedHandler(handler: () => void): void {
  onUnauthorized = handler;
}

async function request<T>(method: string, endpoint: string, body?: unknown): Promise<T> {
  const res = await fetch(`${config.apiUrl}${endpoint}`, {
    method,
    credentials: 'include',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (res.status === 401) {
    const retried = await tryRefresh<T>(method, endpoint, body);
    if (retried !== null) return retried;
    onUnauthorized?.();
    throw new Error('Sessão expirada.');
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: `HTTP ${res.status}` }));
    throw new Error(err.message ?? `HTTP ${res.status}`);
  }

  return res.json() as Promise<T>;
}

async function tryRefresh<T>(method: string, endpoint: string, body?: unknown): Promise<T | null> {
  try {
    if (!refreshPromise) {
      refreshPromise = fetch(`${config.apiUrl}/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
        headers: { Accept: 'application/json' },
      }).then(r => { if (!r.ok) throw new Error('refresh_failed'); });
    }

    await refreshPromise;
    refreshPromise = null;

    const res = await fetch(`${config.apiUrl}${endpoint}`, {
      method,
      credentials: 'include',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) return null;
    return res.json() as Promise<T>;
  } catch {
    refreshPromise = null;
    return null;
  }
}

export const api = {
  get:    <T>(endpoint: string)                => request<T>('GET',    endpoint),
  post:   <T>(endpoint: string, body: unknown) => request<T>('POST',   endpoint, body),
  put:    <T>(endpoint: string, body: unknown) => request<T>('PUT',    endpoint, body),
  delete: <T>(endpoint: string)                => request<T>('DELETE', endpoint),
};
