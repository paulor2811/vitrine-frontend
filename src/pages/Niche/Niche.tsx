import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import ProductCard from '@/components/ProductCard/ProductCard';
import SkeletonCard from '@/components/ui/SkeletonCard';
import { useNiches } from '@/hooks/useNiches';
import { useProducts } from '@/hooks/useProducts';

export default function Niche() {
  const { slug } = useParams<{ slug: string }>();
  const navigate  = useNavigate();
  const { niches, loading: nichesLoading } = useNiches();
  const niche    = niches.find(n => n.slug === slug);
  const { products, loading: productsLoading } = useProducts(niche?.id ?? '');

  const loading = nichesLoading || productsLoading;

  if (!nichesLoading && !niche) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-8 bg-slate-50">
        <span className="text-6xl">😕</span>
        <p className="text-slate-600 text-center font-medium">Categoria não encontrada.</p>
        <button onClick={() => navigate('/')} className="text-orange-500 font-bold text-sm">
          ← Voltar ao início
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-10 bg-white border-b border-slate-100 px-3 py-3 flex items-center gap-2 shadow-sm">
        <button
          onClick={() => navigate('/')}
          className="p-1.5 -ml-1 text-slate-600 rounded-lg active:bg-slate-100"
          aria-label="Voltar"
        >
          <ArrowLeft size={21} />
        </button>

        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className="text-xl leading-none">{niche?.icon}</span>
          <div className="min-w-0">
            <p className="font-extrabold text-slate-800 text-sm leading-tight truncate">{niche?.name}</p>
            {!loading && (
              <p className="text-[11px] text-orange-500 font-semibold leading-tight">
                {products.length} produtos selecionados
              </p>
            )}
          </div>
        </div>

        {niche?.instagram_url && (
          <a
            href={niche.instagram_url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 text-slate-400 rounded-lg"
            aria-label="Ver no Instagram"
          >
            <ExternalLink size={19} />
          </a>
        )}
      </header>

      {niche && (
        <div className="px-4 py-3 bg-white border-b border-slate-100">
          <p className="text-xs text-slate-500 leading-relaxed">{niche.description}</p>
        </div>
      )}

      <main className="px-3 py-4 max-w-lg mx-auto">
        <div className="grid grid-cols-2 gap-3">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
            : products.map(p => <ProductCard key={p.id} product={p} />)
          }
        </div>

        {!loading && products.length > 0 && (
          <div className="mt-6 bg-white rounded-xl p-3 text-center shadow-sm">
            <p className="text-xs text-slate-400 leading-relaxed">
              🔗 Links de afiliado — você compra direto na loja oficial e <strong>não paga nada a mais</strong>
            </p>
          </div>
        )}

        {!loading && products.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-16">
            <span className="text-5xl">📦</span>
            <p className="text-slate-500 text-sm text-center">Nenhum produto disponível ainda.</p>
          </div>
        )}
      </main>
    </div>
  );
}
