import { api } from './api.service';
import type { IApiResponse, IProduct } from '@/types';

export const productService = {
  listByNiche: (nicheSlug: string) =>
    api.get<IApiResponse<IProduct[]>>(`/niches/${nicheSlug}/products`),

  featured: () =>
    api.get<IApiResponse<IProduct[]>>('/products/featured'),

  getById: (nicheSlug: string, productId: string) =>
    api.get<IApiResponse<IProduct>>(`/niches/${nicheSlug}/products/${productId}`),
};
