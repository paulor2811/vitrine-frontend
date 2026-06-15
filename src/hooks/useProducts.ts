import { useEffect, useState } from 'react';
import type { IProduct } from '@/types';
import { productService } from '@/services/product.service';

export function useProducts(nicheSlug: string) {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!nicheSlug) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    productService.listByNiche(nicheSlug)
      .then(res => {
        const sorted = [
          ...res.data.filter(p => p.featured),
          ...res.data.filter(p => !p.featured),
        ];
        setProducts(sorted);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [nicheSlug]);

  return { products, loading, error };
}
