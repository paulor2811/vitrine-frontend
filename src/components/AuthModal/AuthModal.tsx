import { useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { authService } from '@/services/auth.service';

interface AuthModalProps {
  onClose: () => void;
}

export default function AuthModal({ onClose }: AuthModalProps) {
  const { login } = useAuth();
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(email, password);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'E-mail ou senha incorretos');
    } finally {
      setLoading(false);
    }
  }

  function handleGoogle() {
    window.location.href = authService.googleRedirectUrl();
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-50 p-6 pb-10 shadow-xl animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-slate-800">Entrar na Vitrine</h2>
          <button onClick={onClose} className="p-1 text-slate-400 active:text-slate-600">
            <X size={20} />
          </button>
        </div>

        <button
          onClick={handleGoogle}
          className="w-full flex items-center justify-center gap-3 bg-white border-2 border-slate-200 rounded-xl py-3.5 font-semibold text-slate-700 active:bg-slate-50 transition-colors"
        >
          <GoogleIcon />
          Entrar com Google
        </button>

        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-slate-100" />
          <span className="text-xs text-slate-400 font-medium">ou entre com e-mail</span>
          <div className="flex-1 h-px bg-slate-100" />
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full border border-slate-200 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-slate-400 transition-colors"
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full border border-slate-200 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-slate-400 transition-colors"
            required
          />

          {error && <p className="text-red-500 text-xs px-1">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-800 text-white rounded-xl py-3.5 font-semibold text-sm disabled:opacity-50 active:bg-slate-700 transition-colors mt-1"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908C16.658 14.013 17.64 11.705 17.64 9.2z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" />
      <path fill="#FBBC05" d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.167.282-1.707V4.961H.957A9.003 9.003 0 0 0 0 9c0 1.452.348 2.825.957 4.039l3.007-2.332z" />
      <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 7.293C4.672 5.166 6.656 3.58 9 3.58z" />
    </svg>
  );
}
