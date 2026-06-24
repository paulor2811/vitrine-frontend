import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import StoreBadge from '@/components/ui/StoreBadge';
import AuthModal from '@/components/AuthModal/AuthModal';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useAuth } from '@/hooks/useAuth';
import { useFavorites } from '@/hooks/useFavorites';
import config from '@/services/config.service';
import type { IProduct } from '@/types';

function buildRedirectUrl(productId: string, nicheSlug?: string): string {
  const params = new URLSearchParams(window.location.search);
  const utmSource = params.get('utm_source') ?? 'vitrine';
  const search = new URLSearchParams({
    utm_source: utmSource,
    ...(nicheSlug ? { utm_medium: nicheSlug } : {}),
  });
  return `${config.apiUrl}/r/${productId}?${search.toString()}`;
}

function formatPrice(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

interface ProductCardSmallProps {
  product: IProduct;
  nicheSlug?: string;
  metaPixelId?: string;
}

export default function ProductCardSmall({ product, nicheSlug, metaPixelId }: ProductCardSmallProps) {
  const { name, image_url, price, original_price, store, badge } = product;
  const discount = price && original_price && original_price > price ? Math.round((1 - price / original_price) * 100) : null;
  const { track } = useAnalytics();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { favoriteIds, toggle } = useFavorites();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const isFav = favoriteIds.has(product.id);

  function handleFavorite(e: React.MouseEvent) {
    e.stopPropagation();
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    void toggle(product.id);
  }

  const productPath = nicheSlug ? `/${nicheSlug}/${product.id}` : undefined;

  const handleClick = () => {
    track('product_click', {
      product_id: product.id,
      store_id: store.id,
      niche_id: product.niche_id,
      meta_pixel_id: metaPixelId || product.niche?.meta_pixel_id,
      metadata: {
        product_name: name,
        price: price,
        currency: 'BRL',
        store_name: store.name
      }
    });
    if (productPath) {
      navigate(productPath);
    } else {
      window.open(buildRedirectUrl(product.id, nicheSlug), '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <>
    <div
      onClick={handleClick}
      className="flex-shrink-0 w-40 bg-white rounded-2xl overflow-hidden shadow-sm flex flex-col active:scale-95 transition-transform cursor-pointer"
    >
      <div className="relative aspect-square bg-slate-50">
        {image_url && (
          <img src={image_url} alt={name} className="w-full h-full object-cover" loading="lazy" />
        )}
        {badge && (
          <div className="absolute top-1.5 left-1.5">
            <Badge type={badge} />
          </div>
        )}
        {discount !== null && (
          <div className="absolute top-1.5 right-1.5 bg-red-500 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-full">
            -{discount}%
          </div>
        )}
        <button
          onClick={handleFavorite}
          aria-label={isFav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          className="absolute bottom-1.5 right-1.5 bg-white/80 rounded-full p-1 active:scale-90 transition-transform"
        >
          <Heart
            size={13}
            className={isFav ? 'fill-red-500 text-red-500' : 'text-slate-400'}
          />
        </button>
      </div>

      <div className="p-2.5 flex flex-col flex-1 gap-1.5">
        <StoreBadge store={store} />

        <p className="text-xs font-semibold text-slate-800 leading-snug line-clamp-2">{name}</p>

        <div className="mt-auto">
          {price != null ? (
            <div className="mb-1.5">
              <span className="text-sm font-extrabold text-slate-900">{formatPrice(price)}</span>
              {original_price && (
                <span className="text-[10px] text-slate-400 line-through ml-1">
                  {formatPrice(original_price)}
                </span>
              )}
            </div>
          ) : (
            <p className="text-xs text-slate-400 mb-1.5">Ver preço</p>
          )}
          <div className="flex items-center justify-center gap-1 w-full bg-orange-500 text-white text-[11px] font-bold py-1.5 rounded-lg">
            <ShoppingCart size={11} />
            Ver oferta
          </div>
        </div>
      </div>
    </div>

    {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </>
  );
}
