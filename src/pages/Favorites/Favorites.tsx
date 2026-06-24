import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart } from 'lucide-react';
import ProductCard from '@/components/ProductCard/ProductCard';
import AuthButton from '@/components/AuthButton/AuthButton';
import { useAuth } from '@/hooks/useAuth';
import { useFavorites } from '@/hooks/useFavorites';

export default function Favorites() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { favorites, loading } = useFavorites();

  useEffect(() => {
    document.title = 'Meus Favoritos — Vitrine';
    return () => { document.title = 'Vitrine'; };
  }, []);

  return (
    <div className="min-h-screen bg-slate-100">

      <header className="sticky top-0 z-30 bg-white border-b border-slate-100 shadow-sm">
        <div className="flex items-center justify-between px-4 h-14 max-w-lg mx-auto">
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(-1)}
              className="p-1.5 -ml-1 text-slate-600 rounded-lg active:bg-slate-100"
              aria-label="Voltar"
            >
              <ArrowLeft size={20} />
            </button>
            <span className="font-extrabold text-slate-800 text-base">Meus Favoritos</span>
          </div>
          <AuthButton />
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-5">

        {authLoading ? null : !user ? (
          <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
            <Heart size={48} className="text-slate-200" />
            <p className="text-slate-500 font-medium">Faça login para ver seus favoritos</p>
            <p className="text-slate-400 text-sm">Salve produtos e acesse de qualquer dispositivo</p>
          </div>
        ) : loading ? (
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm">
                <div className="aspect-square bg-slate-200 animate-pulse" />
                <div className="p-3 space-y-2">
                  <div className="h-3 bg-slate-200 rounded animate-pulse w-16" />
                  <div className="h-4 bg-slate-200 rounded animate-pulse w-full" />
                  <div className="h-4 bg-slate-200 rounded animate-pulse w-3/4" />
                  <div className="h-8 bg-slate-200 rounded-xl animate-pulse mt-3" />
                </div>
              </div>
            ))}
          </div>
        ) : favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
            <Heart size={48} className="text-slate-200" />
            <p className="text-slate-500 font-medium">Nenhum favorito ainda</p>
            <p className="text-slate-400 text-sm">Toque no coração em qualquer produto para salvar</p>
            <button
              onClick={() => navigate('/')}
              className="mt-2 bg-orange-500 text-white font-bold text-sm px-6 py-3 rounded-2xl active:bg-orange-600 transition-colors"
            >
              Explorar produtos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {favorites.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                nicheSlug={product.niche?.slug}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
