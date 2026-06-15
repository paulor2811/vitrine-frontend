import { api } from './api.service';
import type { IApiResponse, INiche } from '@/types';

export const nicheService = {
  list: () =>
    api.get<IApiResponse<INiche[]>>('/niches'),

  getBySlug: (slug: string) =>
    api.get<IApiResponse<INiche>>(`/niches/${slug}`),
};
