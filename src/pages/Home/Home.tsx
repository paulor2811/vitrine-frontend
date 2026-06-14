import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useNiches } from '@/hooks/useNiches';
import ProductCardSmall from '@/components/ProductCard/ProductCardSmall';
// TODO: replace with useProducts API hook when backend is ready
import { products as allProducts } from '@/data/mock';
import type { INiche } from '@/types';

const STORE_NAMES = ['Amazon', 'Shopee', 'Mercado Livre', 'Magalu', 'KaBuM!'];
const featuredProducts = allProducts.filter(p => p.featured);

function NicheSection({ niche }: { niche: INiche }) {
  const navigate = useNavigate();
  const nicheProducts = allProducts.filter(p => p.niche_id === niche.id);
  if (nicheProducts.length === 0) return null;

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
        {nicheProducts.map(product => (
          <ProductCardSmall key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  const { niches, loading } = useNiches();
  const navigate = useNavigate();

  const nichesWithProducts = niches.filter(n =>
    allProducts.some(p => p.niche_id === n.id)
  );

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Sticky header */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-100 shadow-sm">
        <div className="flex items-center justify-between px-4 h-14 max-w-lg mx-auto">
          <div className="flex items-center gap-1.5">
            <span className="text-orange-500 font-extrabold text-xl tracking-tight">Vitrine</span>
            <span className="text-[10px] text-slate-400 font-medium">• Achados que valem</span>
          </div>
          <span className="text-xs text-slate-400 font-medium">🔒 Compra segura</span>
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

        {/* Category pills */}
        {!loading && niches.length > 0 && (
          <div className="flex gap-2 overflow-x-auto no-scrollbar px-4">
            {niches.map(niche => (
              <button
                key={niche.slug}
                onClick={() => navigate(`/${niche.slug}`)}
                className="flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold bg-white text-slate-700 border border-slate-200 shadow-sm active:bg-orange-50 active:border-orange-300 active:text-orange-600 transition-colors"
              >
                {niche.icon} {niche.name}
              </button>
            ))}
          </div>
        )}
        {loading && (
          <div className="flex gap-2 overflow-x-auto no-scrollbar px-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex-shrink-0 h-8 w-24 bg-slate-200 rounded-full animate-pulse" />
            ))}
          </div>
        )}

        {/* Achados do dia */}
        {featuredProducts.length > 0 && (
          <section>
            <div className="px-4 mb-3">
              <h2 className="text-[15px] font-extrabold text-slate-800">🔥 Achados do dia</h2>
              <p className="text-xs text-slate-400 mt-0.5">Os mais procurados agora</p>
            </div>
            <div className="flex gap-3 overflow-x-auto no-scrollbar px-4 pb-1">
              {featuredProducts.map(product => (
                <ProductCardSmall key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* Per-niche sections */}
        {loading ? (
          <div className="space-y-7">
            {Array.from({ length: 2 }).map((_, si) => (
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
            ))}
          </div>
        ) : (
          nichesWithProducts.map(niche => (
            <NicheSection key={niche.id} niche={niche} />
          ))
        )}

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
