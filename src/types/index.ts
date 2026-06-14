export interface IStore {
  id: string;
  slug: string;
  name: string;
  color: string;
  text_color: string;
}

export interface INiche {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  bg_color: string;
  instagram_url?: string;
  tiktok_url?: string;
  active: boolean;
}

export type TBadge = 'mais_vendido' | 'top_avaliado' | 'promocao' | 'destaque';

export interface IProduct {
  id: string;
  niche_id: string;
  store: IStore;
  name: string;
  description?: string;
  image_url: string;
  price?: number;
  original_price?: number;
  affiliate_url: string;
  featured: boolean;
  badge?: TBadge;
  rating?: number;
  rating_count?: number;
  active: boolean;
}

export interface IApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}
