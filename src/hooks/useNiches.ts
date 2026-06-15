import { useEffect, useState } from 'react';
import type { INiche } from '@/types';
import { nicheService } from '@/services/niche.service';

export function useNiches() {
  const [niches, setNiches] = useState<INiche[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    nicheService.list()
      .then(res => setNiches(res.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { niches, loading, error };
}
