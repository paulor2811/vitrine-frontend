import { useEffect, useState } from 'react';
import type { INiche } from '@/types';
import { nicheService } from '@/services/niche.service';

export function useNiche(slug: string) {
  const [niche, setNiche] = useState<INiche | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [invalidFormat, setInvalidFormat] = useState(false);

  useEffect(() => {
    if (!slug) return;

    // Check slug format (lowercase, numbers, hyphens only, no accents/spaces)
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (!slugRegex.test(slug)) {
      setNiche(null);
      setNotFound(false);
      setInvalidFormat(true);
      setLoading(false);
      return;
    }

    setLoading(true);
    setNotFound(false);
    setInvalidFormat(false);

    nicheService.getBySlug(slug)
      .then(res => setNiche(res.data))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  return { niche, loading, notFound, invalidFormat };
}

