import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, ShoppingCart } from 'lucide-react';
import MediaCarousel from '@/components/MediaCarousel/MediaCarousel';
import Badge from '@/components/ui/Badge';
import StarRating from '@/components/ui/StarRating';
import StoreBadge from '@/components/ui/StoreBadge';
import { useProduct } from '@/hooks/useProduct';
import { useAnalytics } from '@/hooks/useAnalytics';

function formatPrice(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export default function ProductPage() {
  const { nicheSlug = '', productId = '' } = useParams<{ nicheSlug: string; productId: string }>();
  const navigate = useNavigate();
  const { product, loading, notFound } = useProduct(nicheSlug, productId);
  const { track } = useAnalytics();

  useEffect(() => {
    if (product) {
      document.title = `${product.name} — Vitrine`;
      track('product_view', { product_id: product.id, niche_id: product.niche_id });
    }
    return () => { document.title = 'Vitrine'; };
  }, [product, track]);

  if (!loading && notFound) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-8 bg-slate-50">
        <span className="text-6xl">😕</span>
        <p className="text-slate-600 text-center font-medium">Produto não encontrado.</p>
        <button onClick={() => navigate(-1)} className="text-orange-500 font-bold text-sm">
          ← Voltar
        </button>
      </div>
    );
  }

  const { price, original_price } = product ?? {};
  const discount = price && original_price
    ? Math.round((1 - price / original_price) * 100)
    : null;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="max-w-lg mx-auto w-full flex flex-col flex-1">

        {/* Header */}
        <header className="sticky top-0 z-10 bg-white border-b border-slate-100 px-3 py-3 flex items-center gap-3 shadow-sm">
          <button
            onClick={() => navigate(-1)}
            className="p-1.5 -ml-1 text-slate-600 rounded-lg active:bg-slate-100 flex-shrink-0"
            aria-label="Voltar"
          >
            <ArrowLeft size={21} />
          </button>
          <p className="font-bold text-slate-800 text-sm truncate flex-1 leading-tight">
            {loading ? ' ' : (product?.name ?? '')}
          </p>
        </header>

        {/* Mídia */}
        {loading ? (
          <div className="aspect-square bg-slate-200 animate-pulse" />
        ) : (
          <MediaCarousel
            items={product?.media ?? []}
            fallbackImageUrl={product?.image_url}
          />
        )}

        {/* Informações do produto */}
        <div className="flex-1 px-4 pt-4 pb-28">
          {loading ? (
            <div className="space-y-3 mt-1">
              <div className="h-3 bg-slate-200 rounded animate-pulse w-20" />
              <div className="h-6 bg-slate-200 rounded animate-pulse w-full" />
              <div className="h-6 bg-slate-200 rounded animate-pulse w-3/4" />
              <div className="h-4 bg-slate-200 rounded animate-pulse w-32 mt-2" />
            </div>
          ) : product ? (
            <div className="space-y-4">

              {/* Loja e badge */}
              <div className="flex items-center gap-2 flex-wrap">
                <StoreBadge store={product.store} />
                {product.badge && <Badge type={product.badge} />}
              </div>

              {/* Nome */}
              <h1 className="text-xl font-extrabold text-slate-800 leading-snug">
                {product.name}
              </h1>

              {/* Avaliação */}
              {product.rating !== undefined && product.rating_count !== undefined && (
                <StarRating rating={product.rating} count={product.rating_count} />
              )}

              {/* Preço */}
              <div>
                {price !== undefined ? (
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
                      {formatPrice(price)}
                    </span>
                    {original_price && (
                      <span className="text-sm text-slate-400 line-through">
                        {formatPrice(original_price)}
                      </span>
                    )}
                    {discount !== null && (
                      <span className="text-xs bg-red-100 text-red-600 font-bold px-2 py-0.5 rounded-full">
                        -{discount}%
                      </span>
                    )}
                  </div>
                ) : (
                  <p className="text-slate-400 text-sm">Ver preço na loja</p>
                )}
              </div>

              {/* Descrição */}
              {product.description && (
                <p className="text-sm text-slate-600 leading-relaxed">{product.description}</p>
              )}

              {/* Disclaimer */}
              <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-400 leading-relaxed">
                🔗 Link de afiliado — você compra direto na {product.store.name} e{' '}
                <strong className="text-slate-500">não paga nada a mais</strong>
              </div>

            </div>
          ) : null}
        </div>

      </div>

      {/* CTA sticky */}
      {!loading && product && (
        <div className="fixed bottom-0 left-0 right-0 z-20 bg-white border-t border-slate-100 shadow-lg">
          <div className="max-w-lg mx-auto px-4 py-3">
            <a
              href={product.affiliate_url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              onClick={() => track('product_click', {
                product_id: product.id,
                store_id:   product.store.id,
                niche_id:   product.niche_id,
              })}
              className="flex items-center justify-center gap-2 w-full bg-orange-500 hover:bg-orange-400 active:scale-95 text-white font-bold py-4 rounded-2xl text-base transition-all"
            >
              <ShoppingCart size={18} />
              Ver oferta na {product.store.name}
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
