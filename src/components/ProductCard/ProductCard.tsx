import { ArrowRight, ShoppingCart } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import StarRating from '@/components/ui/StarRating';
import StoreBadge from '@/components/ui/StoreBadge';
import type { IProduct } from '@/types';

function formatPrice(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function calcDiscount(price: number, original: number): number {
  return Math.round((1 - price / original) * 100);
}

interface ProductCardProps { product: IProduct }

export default function ProductCard({ product }: ProductCardProps) {
  const { price, original_price, badge, rating, rating_count, name, image_url, affiliate_url, store } = product;
  const discount = price && original_price ? calcDiscount(price, original_price) : null;

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm flex flex-col">
      {/* Imagem */}
      <div className="relative aspect-square bg-slate-50">
        <img
          src={image_url}
          alt={name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {badge && (
          <div className="absolute top-2 left-2">
            <Badge type={badge} />
          </div>
        )}
        {discount !== null && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded-full">
            -{discount}%
          </div>
        )}
      </div>

      {/* Conteúdo */}
      <div className="p-3 flex flex-col flex-1 gap-2">
        <StoreBadge store={store} />

        <p className="text-sm font-semibold text-slate-800 leading-snug line-clamp-2">
          {name}
        </p>

        {rating !== undefined && rating_count !== undefined && (
          <StarRating rating={rating} count={rating_count} />
        )}

        <div className="mt-auto pt-1">
          {price !== undefined ? (
            <div className="mb-2.5">
              <span className="text-lg font-extrabold text-slate-900 tracking-tight">
                {formatPrice(price)}
              </span>
              {original_price && (
                <span className="text-xs text-slate-400 line-through ml-2">
                  {formatPrice(original_price)}
                </span>
              )}
            </div>
          ) : (
            <p className="text-sm text-slate-400 mb-2.5">Ver preço na loja</p>
          )}

          <a
            href={affiliate_url}
            target="_blank"
            rel="noopener noreferrer sponsored"
            aria-label={`Ver oferta de ${name} na ${store.name}`}
            className="flex items-center justify-center gap-1.5 w-full bg-orange-500 hover:bg-orange-600 active:scale-95 text-white text-sm font-bold py-2.5 rounded-xl transition-all"
          >
            <ShoppingCart size={14} />
            Ver na {store.name}
            <ArrowRight size={13} />
          </a>
        </div>
      </div>
    </div>
  );
}
