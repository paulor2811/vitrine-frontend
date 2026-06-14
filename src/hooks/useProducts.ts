import { useEffect, useState } from 'react';
import type { IProduct } from '@/types';
import { products as mockProducts } from '@/data/mock';

export function useProducts(nicheId: string) {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!nicheId) { setLoading(false); return; }

    // TODO: swap for api.get<IApiResponse<IProduct[]>>(`/niches/${nicheId}/products`)
    const filtered = mockProducts.filter(p => p.niche_id === nicheId && p.active);
    setProducts([
      ...filtered.filter(p => p.featured),
      ...filtered.filter(p => !p.featured),
    ]);
    setLoading(false);
  }, [nicheId]);

  return { products, loading };
}
