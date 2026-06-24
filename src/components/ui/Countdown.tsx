import { useEffect, useState } from 'react';
import { Timer } from 'lucide-react';

interface CountdownProps {
  endsAt: string;
}

function calcTimeLeft(endsAt: string): { hours: number; minutes: number; seconds: number } | null {
  const diff = new Date(endsAt).getTime() - Date.now();
  if (diff <= 0) return null;
  const totalSeconds = Math.floor(diff / 1000);
  return {
    hours:   Math.floor(totalSeconds / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

export default function Countdown({ endsAt }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState(() => calcTimeLeft(endsAt));

  useEffect(() => {
    if (!timeLeft) return;
    const id = setInterval(() => {
      const next = calcTimeLeft(endsAt);
      setTimeLeft(next);
      if (!next) clearInterval(id);
    }, 1000);
    return () => clearInterval(id);
  }, [endsAt]);

  if (!timeLeft) return null;

  const { hours, minutes, seconds } = timeLeft;

  return (
    <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-xl px-3 py-2.5">
      <Timer size={16} className="text-red-500 flex-shrink-0" />
      <div className="flex-1">
        <p className="text-[11px] text-red-500 font-semibold leading-none mb-1">
          Oferta por tempo limitado
        </p>
        <p className="text-base font-extrabold text-red-600 tracking-widest leading-none">
          {pad(hours)}:{pad(minutes)}:{pad(seconds)}
        </p>
      </div>
    </div>
  );
}
