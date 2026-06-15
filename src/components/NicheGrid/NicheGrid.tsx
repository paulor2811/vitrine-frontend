import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import type { INiche } from '@/types';

interface NicheGridProps { niches: INiche[] }

export default function NicheGrid({ niches }: NicheGridProps) {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 gap-3">
      {niches.map(niche => (
        <button
          key={niche.id}
          onClick={() => navigate(`/${niche.slug}`)}
          className="relative flex flex-col items-start p-4 rounded-2xl text-left transition-transform active:scale-95 shadow-sm"
          style={{ backgroundColor: niche.bg_color }}
        >
          <span className="text-3xl mb-2 leading-none">{niche.icon}</span>
          <span className="font-bold text-slate-800 text-sm leading-tight">{niche.name}</span>
          <span className="text-xs text-slate-500 mt-1">{niche.products_count} produtos</span>
          <ChevronRight size={15} className="absolute top-3.5 right-3 text-slate-400" />
        </button>
      ))}
    </div>
  );
}
