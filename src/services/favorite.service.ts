import { api } from './api.service';
import type { IApiResponse, IProduct } from '@/types';

export const favoriteService = {
  list: () =>
    api.get<IApiResponse<IProduct[]>>('/favorites'),

  add: (productId: string) =>
    api.post<IApiResponse<null>>('/favorites', { product_id: productId }),

  remove: (productId: string) =>
    api.delete<IApiResponse<null>>(`/favorites/${productId}`),
};
