export interface IUser {
  id: string;
  name: string;
  email: string;
  avatar_url?: string;
  is_admin: boolean;
  has_password: boolean;
}

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
  products_count?: number;
  meta_pixel_id?: string;
}

export type TBadge = 'mais_vendido' | 'top_avaliado' | 'promocao' | 'destaque';

export interface IProductMedia {
  id: string;
  type: 'image' | 'video';
  url: string;
}

export interface IProduct {
  id: string;
  niche_id: string;
  niche?: Pick<INiche, 'id' | 'slug' | 'name' | 'icon' | 'meta_pixel_id'>;
  store: IStore;
  name: string;
  description?: string;
  image_url: string | null;
  price?: number;
  original_price?: number;
  affiliate_url: string;
  featured: boolean;
  badge?: TBadge;
  rating?: number;
  rating_count?: number;
  active: boolean;
  media?: IProductMedia[];
  views_today?: number;
  promotion_ends_at?: string | null;
  updated_at?: string;
}

export interface IApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}
