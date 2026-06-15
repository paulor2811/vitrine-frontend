import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { authService } from '@/services/auth.service';

export default function SetPasswordModal() {
  const { user, onPasswordSet } = useAuth();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm]   = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

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
      setError(err instanceof Error ? err.message : 'Erro ao salvar senha.');
    } finally {
      setLoading(false);
    }
  }

  const firstName = user?.name?.split(' ')[0] ?? 'você';

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col">
      {/* Header simples */}
      <div className="flex items-center gap-2 px-5 py-4 border-b border-slate-800">
        <span className="text-orange-500 font-bold text-lg tracking-tight">vitrine</span>
      </div>

      {/* Conteúdo central */}
      <div className="flex-1 flex flex-col items-center justify-center px-5">
        <div className="w-full max-w-sm flex flex-col gap-6">
          {/* Progresso visual: passo 2 de 2 */}
          <div className="flex items-center gap-2">
            <div className="h-1 flex-1 rounded-full bg-orange-500" />
            <div className="h-1 flex-1 rounded-full bg-orange-500" />
          </div>

          <div>
            <p className="text-slate-400 text-sm mb-1">Quase lá!</p>
            <h1 className="text-white text-2xl font-bold leading-snug">
              Crie uma senha,<br />{firstName}
            </h1>
            <p className="text-slate-400 text-sm mt-2 leading-relaxed">
              Você poderá entrar com email e senha, sem precisar do Google toda vez.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="password"
              placeholder="Senha (mín. 8 caracteres)"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              autoFocus
            />
            <input
              type="password"
              placeholder="Confirmar senha"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />

            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-400 disabled:opacity-60 text-white font-semibold py-3 rounded-xl text-sm transition-colors mt-1"
            >
              {loading ? 'Salvando...' : 'Concluir cadastro'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
