export function getVideoEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url);

    if (u.hostname.includes('youtube.com')) {
      const v = u.searchParams.get('v')
        ?? (u.pathname.startsWith('/shorts/') ? u.pathname.split('/shorts/')[1] : null);
      return v ? `https://www.youtube.com/embed/${v}` : null;
    }

    if (u.hostname === 'youtu.be') {
      const v = u.pathname.slice(1).split('?')[0];
      return v ? `https://www.youtube.com/embed/${v}` : null;
    }

    if (u.hostname.includes('tiktok.com')) {
      const match = u.pathname.match(/\/video\/(\d+)/);
      return match ? `https://www.tiktok.com/embed/v2/${match[1]}` : null;
    }
  } catch { /* URL inválida */ }

  return null;
}
