import { useRef, useState } from 'react';
import { getVideoEmbedUrl } from '@/utils/video';
import type { IProductMedia } from '@/types';

interface MediaCarouselProps {
  items: IProductMedia[];
  fallbackImageUrl?: string | null;
}

export default function MediaCarousel({ items, fallbackImageUrl }: MediaCarouselProps) {
  const [current, setCurrent] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const allItems: IProductMedia[] = items.length > 0
    ? items
    : fallbackImageUrl
      ? [{ id: 'fallback', type: 'image', url: fallbackImageUrl }]
      : [];

  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    setCurrent(Math.round(el.scrollLeft / el.offsetWidth));
  };

  const scrollTo = (index: number) => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTo({ left: index * el.offsetWidth, behavior: 'smooth' });
  };

  if (allItems.length === 0) {
    return (
      <div className="aspect-square bg-slate-100 flex items-center justify-center">
        <span className="text-5xl">📦</span>
      </div>
    );
  }

  return (
    <div className="relative w-full bg-black">
      {/* Slides */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar"
      >
        {allItems.map((item, i) => (
          <div key={item.id} className="flex-shrink-0 w-full aspect-square snap-center bg-black">
            {item.type === 'image' ? (
              <img
                src={item.url}
                alt=""
                className="w-full h-full object-contain"
                loading={i === 0 ? 'eager' : 'lazy'}
              />
            ) : (
              (() => {
                const embedUrl = getVideoEmbedUrl(item.url);
                return embedUrl ? (
                  <iframe
                    src={embedUrl}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Vídeo do produto"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-400 text-sm">
                    Vídeo indisponível
                  </div>
                );
              })()
            )}
          </div>
        ))}
      </div>

      {/* Indicadores de posição */}
      {allItems.length > 1 && (
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
          {allItems.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              aria-label={`Ir para mídia ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-200 ${
                i === current ? 'w-4 bg-white' : 'w-1.5 bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
