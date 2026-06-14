import config from './config.service';

async function get<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${config.apiUrl}${endpoint}`, {
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json() as Promise<T>;
}

export const api = { get };
