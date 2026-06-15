import { useEffect, useState } from 'react';
import type { IProduct } from '@/types';
import { productService } from '@/services/product.service';

export function useFeaturedProducts() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productService.featured()
      .then(res => setProducts(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { products, loading };
}
