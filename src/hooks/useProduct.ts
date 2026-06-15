import { useEffect, useState } from 'react';
import type { IProduct } from '@/types';
import { productService } from '@/services/product.service';

export function useProduct(nicheSlug: string, productId: string) {
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading]   = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!nicheSlug || !productId) return;

    setLoading(true);
    setNotFound(false);

    productService.getById(nicheSlug, productId)
      .then(res => setProduct(res.data))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [nicheSlug, productId]);

  return { product, loading, notFound };
}
