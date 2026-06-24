import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  createElement,
  type ReactNode,
} from 'react';
import type { IProduct } from '@/types';
import { favoriteService } from '@/services/favorite.service';
import { useAuth } from './useAuth';

interface IFavoritesContext {
  favorites: IProduct[];
  loading: boolean;
  favoriteIds: Set<string>;
  toggle: (productId: string) => Promise<void>;
}

const FavoritesContext = createContext<IFavoritesContext | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [favorites, setFavorites]     = useState<IProduct[]>([]);
  const [loading, setLoading]         = useState(false);
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!user) {
      setFavorites([]);
      setFavoriteIds(new Set());
      return;
    }

    setLoading(true);
    favoriteService.list()
      .then(res => {
        setFavorites(res.data);
        setFavoriteIds(new Set(res.data.map(p => p.id)));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user]);

  const toggle = useCallback(async (productId: string) => {
    if (!user) return;

    const isFav = favoriteIds.has(productId);

    setFavoriteIds(prev => {
      const next = new Set(prev);
      isFav ? next.delete(productId) : next.add(productId);
      return next;
    });

    try {
      if (isFav) {
        await favoriteService.remove(productId);
        setFavorites(prev => prev.filter(p => p.id !== productId));
      } else {
        await favoriteService.add(productId);
      }
    } catch {
      setFavoriteIds(prev => {
        const next = new Set(prev);
        isFav ? next.add(productId) : next.delete(productId);
        return next;
      });
    }
  }, [user, favoriteIds]);

  return createElement(
    FavoritesContext.Provider,
    { value: { favorites, loading, favoriteIds, toggle } },
    children,
  );
}

export function useFavorites(): IFavoritesContext {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider');
  return ctx;
}
