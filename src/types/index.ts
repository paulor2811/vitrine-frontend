export interface IStore {
  id: number;
  slug: string;
  name: string;
  color: string;
  textColor: string;
}

export interface INiche {
  id: number;
  slug: string;
  name: string;
  description: string;
  icon: string;
  instagram_url?: string;
  tiktok_url?: string;
  product_count: number;
  bg_color: string;
}

export type TBadge = 'mais_vendido' | 'top_avaliado' | 'promocao' | 'destaque';

export interface IProduct {
  id: number;
  niche_id: number;
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
}

export interface IApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}
