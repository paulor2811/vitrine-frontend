import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/hooks/useAuth';
import Home from '@/pages/Home/Home';
import Niche from '@/pages/Niche/Niche';
import ProductPage from '@/pages/Product/ProductPage';
import SetPasswordModal from '@/components/SetPasswordModal/SetPasswordModal';

function AppRoutes() {
  const { needsPasswordSetup } = useAuth();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:nicheSlug/:productId" element={<ProductPage />} />
          <Route path="/:slug" element={<Niche />} />
        </Routes>
      </BrowserRouter>
      {needsPasswordSetup && <SetPasswordModal />}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
