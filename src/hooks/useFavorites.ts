import { useCallback, useEffect, useState } from 'react';
import type { IProduct } from '@/types';
import { favoriteService } from '@/services/favorite.service';
import { useAuth } from './useAuth';

export function useFavorites() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
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

    // optimistic update
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
      // revert on failure
      setFavoriteIds(prev => {
        const next = new Set(prev);
        isFav ? next.add(productId) : next.delete(productId);
        return next;
      });
    }
  }, [user, favoriteIds]);

  return { favorites, loading, favoriteIds, toggle };
}
