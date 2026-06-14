import { Star } from 'lucide-react';

function formatCount(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}

interface StarRatingProps {
  rating: number;
  count: number;
}

export default function StarRating({ rating, count }: StarRatingProps) {
  const full  = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.3;
  const empty = 5 - full - (hasHalf ? 1 : 0);

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: full }).map((_, i) => (
        <Star key={`f${i}`} size={11} className="fill-amber-400 text-amber-400" />
      ))}
      {hasHalf && (
        <Star size={11} className="fill-amber-200 text-amber-300" />
      )}
      {Array.from({ length: empty }).map((_, i) => (
        <Star key={`e${i}`} size={11} className="fill-slate-200 text-slate-200" />
      ))}
      <span className="text-xs font-semibold text-slate-700 ml-1">{rating}</span>
      <span className="text-xs text-slate-400">({formatCount(count)})</span>
    </div>
  );
}
