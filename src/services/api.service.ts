import config from './config.service';

function getToken(): string | null {
  return localStorage.getItem('vitrine_token');
}

function headers(withAuth = false): HeadersInit {
  const base: HeadersInit = { Accept: 'application/json', 'Content-Type': 'application/json' };
  const token = getToken();
  if (withAuth && token) base['Authorization'] = `Bearer ${token}`;
  return base;
}

async function request<T>(method: string, endpoint: string, body?: unknown, auth = false): Promise<T> {
  const res = await fetch(`${config.apiUrl}${endpoint}`, {
    method,
    headers: headers(auth),
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: `HTTP ${res.status}` }));
    throw new Error(err.message ?? `HTTP ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export const api = {
  get:    <T>(endpoint: string, auth = false)                  => request<T>('GET',    endpoint, undefined, auth),
  post:   <T>(endpoint: string, body: unknown, auth = false)   => request<T>('POST',   endpoint, body,      auth),
  put:    <T>(endpoint: string, body: unknown, auth = false)   => request<T>('PUT',    endpoint, body,      auth),
  delete: <T>(endpoint: string, auth = false)                  => request<T>('DELETE', endpoint, undefined, auth),

  setToken: (token: string) => localStorage.setItem('vitrine_token', token),
  clearToken: ()            => localStorage.removeItem('vitrine_token'),
  hasToken: ()              => !!getToken(),
};
