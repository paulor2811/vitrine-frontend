import config from './config.service';

declare global {
  interface Window {
    fbq?: any;
    _fbq?: any;
  }
}

// Mantém registro dos pixels já inicializados para evitar chamadas duplicadas de 'init'
const initializedPixels = new Set<string>();

export const metaPixelService = {
  init: (pixelId?: string) => {
    const targetPixelId = pixelId || config.metaPixelId;
    if (!targetPixelId || typeof window === 'undefined') return;

    // Se o script da Meta não foi carregado ainda, cria a base do fbq
    if (!window.fbq) {
      const fbq: any = function (...args: any[]) {
        fbq.callMethod ? fbq.callMethod.apply(fbq, args) : fbq.queue.push(args);
      };
      
      window.fbq = fbq;
      if (!window._fbq) window._fbq = fbq;
      fbq.push = fbq;
      fbq.loaded = true;
      fbq.version = '2.0';
      fbq.queue = [];

      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://connect.facebook.net/en_US/fbevents.js';
      document.head.appendChild(script);
    }

    // Inicializa o pixel específico se ainda não foi feito nesta sessão
    if (!initializedPixels.has(targetPixelId)) {
      window.fbq('init', targetPixelId);
      initializedPixels.add(targetPixelId);
    }
  },

  track: (eventName: string, data?: Record<string, any>, options?: { eventID?: string }, pixelId?: string) => {
    if (typeof window === 'undefined') return;

    const targetPixelId = pixelId || config.metaPixelId;
    if (!targetPixelId) return;

    // Garante que o pixel esteja inicializado antes de enviar o evento
    if (!initializedPixels.has(targetPixelId)) {
      metaPixelService.init(targetPixelId);
    }

    // Envia o evento usando trackSingle para evitar disparo cruzado em múltiplos pixels
    if (window.fbq) {
      window.fbq('trackSingle', targetPixelId, eventName, data, options);
    }
  }
};

