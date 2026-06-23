import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useNiches } from '@/hooks/useNiches';
import { useProducts } from '@/hooks/useProducts';
import { useFeaturedProducts } from '@/hooks/useFeaturedProducts';
import { useAnalytics } from '@/hooks/useAnalytics';
import ProductCardSmall from '@/components/ProductCard/ProductCardSmall';
import AuthButton from '@/components/AuthButton/AuthButton';
import type { INiche } from '@/types';

const STORE_NAMES = ['Amazon', 'Shopee', 'Mercado Livre', 'Magalu', 'KaBuM!'];

function NicheSection({ niche }: { niche: INiche }) {
  const navigate = useNavigate();
  const { products, loading } = useProducts(niche.slug);

  if (!loading && products.length === 0) return null;

  return (
    <section>
      <div className="flex items-center justify-between px-4 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">{niche.icon}</span>
          <h2 className="text-[15px] font-extrabold text-slate-800">{niche.name}</h2>
        </div>
        <button
          onClick={() => navigate(`/${niche.slug}`)}
          className="flex items-center gap-0.5 text-orange-500 text-xs font-bold active:opacity-70"
        >
          Ver todos <ChevronRight size={14} />
        </button>
      </div>
      <div className="flex gap-3 overflow-x-auto no-scrollbar px-4 pb-1">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex-shrink-0 w-40 h-64 bg-slate-200 rounded-2xl animate-pulse" />
            ))
          : products.map(product => (
              <ProductCardSmall key={product.id} product={product} nicheSlug={niche.slug} metaPixelId={niche.meta_pixel_id} />
            ))
        }
      </div>
    </section>
  );
}

export default function Home() {
  const { niches, loading: nichesLoading } = useNiches();
  const { products: featuredProducts, loading: featuredLoading } = useFeaturedProducts();
  const { track } = useAnalytics();
  const navigate = useNavigate();
  const pillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    track('page_view');
  }, [track]);

  function scrollPills(dir: 'left' | 'right') {
    pillsRef.current?.scrollBy({ left: dir === 'right' ? 200 : -200, behavior: 'smooth' });
  }

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Sticky header */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-100 shadow-sm">
        <div className="flex items-center justify-between px-4 h-14 max-w-lg mx-auto">
          <div className="flex items-center gap-1.5">
            <span className="text-orange-500 font-extrabold text-xl tracking-tight">Vitrine</span>
            <span className="text-[10px] text-slate-400 font-medium">• Achados que valem</span>
          </div>
          <AuthButton />
        </div>
      </header>

      {/* Hero */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-400 px-4 py-5">
        <div className="max-w-lg mx-auto">
          <p className="text-white font-extrabold text-lg leading-snug">
            Achados selecionados com cuidado 🔥
          </p>
          <p className="text-orange-50 text-[13px] mt-1">
            Melhores produtos das maiores lojas, sem perder tempo procurando
          </p>
        </div>
      </div>

      {/* Store trust bar */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-lg mx-auto px-4 py-2">
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {STORE_NAMES.map(s => (
              <span key={s} className="text-[11px] font-bold text-slate-400">{s}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto py-5 space-y-7">

        {/* Category pills carousel */}
        <div className="relative">
          {/* Left arrow — desktop only */}
          <button
            onClick={() => scrollPills('left')}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-8 h-8 bg-white shadow-md rounded-full border border-slate-100 text-slate-500 hover:text-orange-500 transition-colors"
            aria-label="Rolar para esquerda"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Fade hint — right edge */}
          <div className="pointer-events-none absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-slate-100 to-transparent z-10" />

          {/* Scrollable pills */}
          <div ref={pillsRef} className="flex gap-2 overflow-x-auto no-scrollbar px-4 md:px-10">
            {nichesLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex-shrink-0 h-8 w-24 bg-slate-200 rounded-full animate-pulse" />
                ))
              : niches.map(niche => (
                  <button
                    key={niche.slug}
                    onClick={() => navigate(`/${niche.slug}`)}
                    className="flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold bg-white text-slate-700 border border-slate-200 shadow-sm active:bg-orange-50 active:border-orange-300 active:text-orange-600 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-600 transition-colors"
                  >
                    {niche.icon} {niche.name}
                  </button>
                ))
            }
          </div>

          {/* Right arrow — desktop only */}
          <button
            onClick={() => scrollPills('right')}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 items-center justify-center w-8 h-8 bg-white shadow-md rounded-full border border-slate-100 text-slate-500 hover:text-orange-500 transition-colors"
            aria-label="Rolar para direita"
          >
            <ChevronRight size={18} />
          </button>
        </div>


        {/* Achados do dia */}
        {(featuredLoading || featuredProducts.length > 0) && (
          <section>
            <div className="px-4 mb-3">
              <h2 className="text-[15px] font-extrabold text-slate-800">🔥 Achados do dia</h2>
              <p className="text-xs text-slate-400 mt-0.5">Os mais procurados agora</p>
            </div>
            <div className="flex gap-3 overflow-x-auto no-scrollbar px-4 pb-1">
              {featuredLoading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex-shrink-0 w-40 h-64 bg-slate-200 rounded-2xl animate-pulse" />
                  ))
                : featuredProducts.map(product => (
                    <ProductCardSmall
                      key={product.id}
                      product={product}
                      nicheSlug={product.niche?.slug}
                      metaPixelId={product.niche?.meta_pixel_id}
                    />
                  ))
              }
            </div>
          </section>
        )}

        {/* Per-niche sections */}
        {nichesLoading
          ? Array.from({ length: 2 }).map((_, si) => (
              <div key={si}>
                <div className="flex items-center gap-2 px-4 mb-3">
                  <div className="w-32 h-4 bg-slate-200 rounded animate-pulse" />
                </div>
                <div className="flex gap-3 overflow-x-auto no-scrollbar px-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex-shrink-0 w-40 h-64 bg-slate-200 rounded-2xl animate-pulse" />
                  ))}
                </div>
              </div>
            ))
          : niches.map(niche => (
              <NicheSection key={niche.id} niche={niche} />
            ))
        }

        {/* Disclaimer */}
        <div className="mx-4 bg-white rounded-xl p-4 text-center border border-slate-100">
          <p className="text-xs text-slate-400 leading-relaxed">
            🔗 Este site contém <strong className="text-slate-500">links de afiliado</strong>.
            Ao comprar, você não paga nada a mais e ainda apoia nosso trabalho de curadoria. Obrigado! 🙏
          </p>
        </div>
      </div>
    </div>
  );
}
