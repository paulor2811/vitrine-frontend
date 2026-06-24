import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, LogIn, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useFavorites } from '@/hooks/useFavorites';
import AuthModal from '@/components/AuthModal/AuthModal';

export default function AuthButton() {
  const { user, logout } = useAuth();
  const { favoriteIds } = useFavorites();
  const [showModal, setShowModal] = useState(false);

  if (user) {
    return (
      <div className="flex items-center gap-1">
        <Link
          to="/favoritos"
          aria-label="Meus favoritos"
          className="relative p-1.5 text-slate-400 active:text-red-500 transition-colors"
        >
          <Heart size={18} />
          {favoriteIds.size > 0 && (
            <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center leading-none">
              {favoriteIds.size > 9 ? '9+' : favoriteIds.size}
            </span>
          )}
        </Link>
        {user.avatar_url ? (
          <img src={user.avatar_url} alt={user.name} className="w-7 h-7 rounded-full object-cover" />
        ) : (
          <div className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold">
            {user.name.charAt(0).toUpperCase()}
          </div>
        )}
        <button
          onClick={logout}
          className="text-slate-400 active:text-slate-600 transition-colors p-1"
          aria-label="Sair"
        >
          <LogOut size={16} />
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-1 text-xs font-semibold text-slate-500 active:text-orange-500 transition-colors"
      >
        <LogIn size={15} />
        Entrar
      </button>
      {showModal && <AuthModal onClose={() => setShowModal(false)} />}
    </>
  );
}
