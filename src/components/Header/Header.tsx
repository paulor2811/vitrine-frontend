import { useState } from 'react';
import { ShoppingBag, LogIn, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import AuthModal from '@/components/AuthModal/AuthModal';
import config from '@/services/config.service';

export default function Header() {
  const { user, logout, isAdmin } = useAuth();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <header className="bg-slate-900 px-4 pt-10 pb-7">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="bg-orange-500 p-1.5 rounded-lg">
              <ShoppingBag size={18} className="text-white" />
            </div>
            <span className="text-white font-extrabold text-xl tracking-tight">Vitrine</span>
          </div>

          {user ? (
            <div className="flex items-center gap-2">
              {user.avatar_url ? (
                <img src={user.avatar_url} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
                {isAdmin && (
                <a
                  href={`${config.apiUrl}/admin`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-400 active:text-orange-200 transition-colors p-1"
                  aria-label="Painel admin"
                >
                  <LayoutDashboard size={18} />
                </a>
              )}
              <button
                onClick={logout}
                className="text-slate-400 active:text-slate-200 transition-colors p-1"
                aria-label="Sair"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-1.5 text-sm font-semibold text-slate-300 active:text-white transition-colors"
            >
              <LogIn size={16} />
              Entrar
            </button>
          )}
        </div>

        <h1 className="text-white text-2xl font-extrabold leading-tight mb-2">
          Produtos selecionados<br />para você comprar melhor
        </h1>
        <p className="text-slate-400 text-sm leading-relaxed">
          Curadoria especializada com links diretos<br />para as melhores lojas do Brasil
        </p>
      </header>

      {showModal && <AuthModal onClose={() => setShowModal(false)} />}
    </>
  );
}
