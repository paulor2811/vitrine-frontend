import { useEffect, useState } from 'react';
import type { INiche } from '@/types';
import { niches as mockNiches } from '@/data/mock';

export function useNiches() {
  const [niches, setNiches] = useState<INiche[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: swap for api.get<IApiResponse<INiche[]>>('/niches')
    setNiches(mockNiches);
    setLoading(false);
  }, []);

  return { niches, loading };
}
