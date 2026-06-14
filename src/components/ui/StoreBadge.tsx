import type { IStore } from '@/types';

interface StoreBadgeProps { store: IStore }

export default function StoreBadge({ store }: StoreBadgeProps) {
  return (
    <span
      className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full"
      style={{ backgroundColor: store.color, color: store.textColor }}
    >
      {store.name}
    </span>
  );
}
