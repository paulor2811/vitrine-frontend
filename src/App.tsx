import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/hooks/useAuth';
import { FavoritesProvider } from '@/hooks/useFavorites';
import Home from '@/pages/Home/Home';
import Niche from '@/pages/Niche/Niche';
import ProductPage from '@/pages/Product/ProductPage';
import Favorites from '@/pages/Favorites/Favorites';
import SetPasswordModal from '@/components/SetPasswordModal/SetPasswordModal';
import { metaPixelService } from '@/services/meta-pixel.service';

function AppRoutes() {
  const { needsPasswordSetup } = useAuth();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favoritos" element={<Favorites />} />
          <Route path="/:nicheSlug/:productId" element={<ProductPage />} />
          <Route path="/:slug" element={<Niche />} />
        </Routes>
      </BrowserRouter>
      {needsPasswordSetup && <SetPasswordModal />}
    </>
  );
}

export default function App() {
  useEffect(() => {
    metaPixelService.init();
  }, []);

  return (
    <AuthProvider>
      <FavoritesProvider>
        <AppRoutes />
      </FavoritesProvider>
    </AuthProvider>
  );
}
