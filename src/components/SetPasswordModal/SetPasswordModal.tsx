import { useState } from 'react';
import { Lock } from 'lucide-react';
import { authService } from '@/services/auth.service';
import { useAuth } from '@/hooks/useAuth';

export default function SetPasswordModal() {
  const { onPasswordSet } = useAuth();
  const [password, setPassword]   = useState('');
  const [confirm, setConfirm]     = useState('');
  const [error, setError]         = useState('');
  const [loading, setLoading]     = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (password.length < 8) {
      setError('A senha deve ter pelo menos 8 caracteres.');
      return;
    }
    if (password !== confirm) {
      setError('As senhas não coincidem.');
      return;
    }

    setLoading(true);
    try {
      await authService.setPassword({ password, password_confirmation: confirm });
      onPasswordSet();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro ao definir senha.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="bg-slate-900 rounded-2xl w-full max-w-sm p-6 shadow-2xl">
        <div className="flex flex-col items-center gap-2 mb-6">
          <div className="bg-orange-500 p-3 rounded-full">
            <Lock size={22} className="text-white" />
          </div>
          <h2 className="text-white text-xl font-bold text-center">Defina sua senha</h2>
          <p className="text-slate-400 text-sm text-center leading-relaxed">
            Para continuar, crie uma senha para sua conta.
            Você poderá usar ela para entrar mesmo sem o Google.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="Nova senha (mín. 8 caracteres)"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full bg-slate-800 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-500"
            autoFocus
          />
          <input
            type="password"
            placeholder="Confirmar senha"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            className="w-full bg-slate-800 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-500"
          />

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-400 disabled:opacity-60 text-white font-semibold py-3 rounded-xl text-sm transition-colors"
          >
            {loading ? 'Salvando...' : 'Definir senha e continuar'}
          </button>
        </form>
      </div>
    </div>
  );
}
