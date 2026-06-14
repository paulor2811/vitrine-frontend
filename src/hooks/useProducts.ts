import { useEffect, useState } from 'react';
import type { IProduct } from '@/types';
import { products as mockProducts, niches as mockNiches } from '@/data/mock';

export function useProducts(nicheSlug: string) {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const niche = mockNiches.find(n => n.slug === nicheSlug);
    if (!niche) { setLoading(false); return; }

    // TODO: swap for api.get<IApiResponse<IProduct[]>>(`/niches/${nicheSlug}/products`)
    const filtered = mockProducts.filter(p => p.niche_id === niche.id);
    setProducts([
      ...filtered.filter(p => p.featured),
      ...filtered.filter(p => !p.featured),
    ]);
    setLoading(false);
  }, [nicheSlug]);

  return { products, loading };
}
