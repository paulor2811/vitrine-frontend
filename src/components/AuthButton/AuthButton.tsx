import { useState } from 'react';
import { LogIn, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import AuthModal from '@/components/AuthModal/AuthModal';

export default function AuthButton() {
  const { user, logout } = useAuth();
  const [showModal, setShowModal] = useState(false);

  if (user) {
    return (
      <div className="flex items-center gap-2">
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
