import type { TBadge } from '@/types';

const CONFIG: Record<TBadge, { label: string; cls: string }> = {
  mais_vendido: { label: '🔥 Mais Vendido', cls: 'bg-orange-500 text-white' },
  top_avaliado: { label: '⭐ Top Avaliado', cls: 'bg-violet-600 text-white' },
  promocao:     { label: '🏷️ Promoção',    cls: 'bg-red-500 text-white'    },
  destaque:     { label: '✨ Destaque',     cls: 'bg-emerald-500 text-white' },
};

interface BadgeProps { type: TBadge }

export default function Badge({ type }: BadgeProps) {
  const { label, cls } = CONFIG[type];
  return (
    <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm ${cls}`}>
      {label}
    </span>
  );
}
