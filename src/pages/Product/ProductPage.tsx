import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Eye, ShoppingCart, ShieldCheck } from 'lucide-react';
import MediaCarousel from '@/components/MediaCarousel/MediaCarousel';
import Badge from '@/components/ui/Badge';
import Countdown from '@/components/ui/Countdown';
import StarRating from '@/components/ui/StarRating';
import StoreBadge from '@/components/ui/StoreBadge';
import { useProduct } from '@/hooks/useProduct';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useSeoMeta } from '@/hooks/useSeoMeta';
import config from '@/services/config.service';

function formatPrice(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function isVerifiedToday(updatedAt: string): boolean {
  return new Date(updatedAt).toDateString() === new Date().toDateString();
}

function daysAgo(updatedAt: string): string {
  const days = Math.floor((Date.now() - new Date(updatedAt).getTime()) / 86_400_000);
  if (days === 0) return 'hoje';
  if (days === 1) return 'há 1 dia';
  return `há ${days} dias`;
}

export default function ProductPage() {
  const { nicheSlug = '', productId = '' } = useParams<{ nicheSlug: string; productId: string }>();
  const navigate = useNavigate();
  const { product, loading, notFound } = useProduct(nicheSlug, productId);
  const { track } = useAnalytics();

  useSeoMeta({
    title:       product ? `${product.name} — ${product.store?.name ?? ''} | Vitrine` : 'Vitrine',
    description: product?.description ?? product?.name,
    ogImage:     product?.image_url ?? undefined,
    ogUrl:       product ? `${config.appUrl}/${nicheSlug}/${product.id}` : undefined,
    jsonLd:      product ? {
      '@context': 'https://schema.org',
      '@type':    'Product',
      name:        product.name,
      description: product.description ?? product.name,
      image:       product.image_url ?? undefined,
      url:         `${config.appUrl}/${nicheSlug}/${product.id}`,
      offers: {
        '@type':       'Offer',
        priceCurrency: 'BRL',
        price:          product.price?.toFixed(2),
        url:            `${config.apiUrl}/r/${product.id}`,
        availability:  'https://schema.org/InStock',
        seller: { '@type': 'Organization', name: product.store?.name },
      },
    } : undefined,
  });

  useEffect(() => {
    if (product) {
      track('product_view', {
        product_id: product.id,
        niche_id: product.niche_id,
        meta_pixel_id: product.niche?.meta_pixel_id,
        metadata: {
          product_name: product.name,
          price: product.price,
          currency: 'BRL',
          store_name: product.store?.name,
        }
      });
    }
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
  const discount = price && original_price && original_price > price
    ? Math.round((1 - price / original_price) * 100)
    : null;
  const savings = price && original_price && original_price > price
    ? original_price - price
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
            {loading ? ' ' : (product?.name ?? '')}
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
        <div className="flex-1 px-4 pt-4 pb-36">
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
              {product.rating != null && product.rating_count != null && (
                <StarRating rating={product.rating} count={product.rating_count} />
              )}

              {/* Bloco de preço */}
              {price != null ? (
                <div className="space-y-2.5">

                  {/* Preço atual + original */}
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                      {formatPrice(price)}
                    </span>
                    {original_price && (
                      <span className="text-base text-slate-400 line-through">
                        {formatPrice(original_price)}
                      </span>
                    )}
                  </div>

                  {/* Desconto + Economia */}
                  {(discount !== null || savings !== null) && (
                    <div className="flex items-center gap-2 flex-wrap">
                      {discount !== null && (
                        <span className="bg-red-500 text-white font-extrabold text-sm px-3 py-1 rounded-lg">
                          -{discount}% OFF
                        </span>
                      )}
                      {savings !== null && (
                        <span className="bg-emerald-50 text-emerald-700 font-bold text-sm px-3 py-1 rounded-lg border border-emerald-100">
                          Você economiza {formatPrice(savings)}
                        </span>
                      )}
                    </div>
                  )}

                </div>
              ) : (
                <p className="text-slate-400 text-sm">Ver preço na loja</p>
              )}

              {/* Countdown de promoção */}
              {product.promotion_ends_at && (
                <Countdown endsAt={product.promotion_ends_at} />
              )}

              {/* Social proof */}
              <div className="flex flex-wrap gap-2">
                {(product.views_today ?? 0) >= 5 && (
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 bg-slate-50 border border-slate-100 px-2.5 py-1.5 rounded-lg">
                    <Eye size={13} className="text-slate-400" />
                    {product.views_today} pessoas viram hoje
                  </span>
                )}
                {product.updated_at && (
                  <span className="text-xs font-semibold text-slate-500 bg-slate-50 border border-slate-100 px-2.5 py-1.5 rounded-lg">
                    {isVerifiedToday(product.updated_at) ? '✓ Verificado hoje' : `Verificado ${daysAgo(product.updated_at)}`}
                  </span>
                )}
              </div>

              {/* Descrição */}
              {product.description && (
                <p className="text-sm text-slate-600 leading-relaxed">{product.description}</p>
              )}

              {/* Disclaimer minimalista */}
              <p className="text-xs text-slate-400">
                🔗 Link de afiliado — preço verificado hoje. Você compra direto na loja oficial.
              </p>

            </div>
          ) : null}
        </div>

      </div>

      {/* CTA sticky */}
      {!loading && product && (
        <div className="fixed bottom-0 left-0 right-0 z-20 bg-white border-t border-slate-100 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
          <div className="max-w-lg mx-auto px-4 pt-2.5 pb-4">

            {/* Trust signal */}
            <div className="flex items-center justify-center gap-1.5 mb-2.5">
              <ShieldCheck size={13} className="text-emerald-500 flex-shrink-0" />
              <p className="text-xs text-slate-500 text-center">
                Compra 100% segura direto na{' '}
                <strong className="text-slate-700">{product.store.name}</strong>
              </p>
            </div>

            <a
              href={`${config.apiUrl}/r/${product.id}?utm_source=${new URLSearchParams(window.location.search).get('utm_source') ?? 'vitrine'}&utm_medium=${nicheSlug}`}
              target="_blank"
              rel="noopener noreferrer sponsored"
              onClick={() => track('product_click', {
                product_id: product.id,
                store_id:   product.store.id,
                niche_id:   product.niche_id,
                meta_pixel_id: product.niche?.meta_pixel_id,
                metadata: {
                  product_name: product.name,
                  price: product.price,
                  currency: 'BRL',
                  store_name: product.store.name,
                }
              })}
              className="flex items-center justify-center gap-2 w-full bg-orange-500 hover:bg-orange-400 active:scale-95 text-white font-extrabold py-4 rounded-2xl text-base transition-all shadow-md shadow-orange-200"
            >
              <ShoppingCart size={18} />
              {price ? `Pegar por ${formatPrice(price)}` : `Ver oferta na ${product.store.name}`}
              <ArrowRight size={16} />
            </a>

          </div>
        </div>
      )}
    </div>
  );
}
