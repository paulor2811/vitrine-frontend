import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/hooks/useAuth';
import Home from '@/pages/Home/Home';
import Niche from '@/pages/Niche/Niche';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:slug" element={<Niche />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
