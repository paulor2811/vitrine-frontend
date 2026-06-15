import { useEffect, useState } from 'react';
import type { INiche } from '@/types';
import { nicheService } from '@/services/niche.service';

export function useNiche(slug: string) {
  const [niche, setNiche] = useState<INiche | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;

    setLoading(true);
    setNotFound(false);

    nicheService.getBySlug(slug)
      .then(res => setNiche(res.data))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  return { niche, loading, notFound };
}
