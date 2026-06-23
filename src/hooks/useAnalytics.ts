import { useCallback, useRef } from 'react';
import { analyticsService, type TEventType } from '@/services/analytics.service';
import { metaPixelService } from '@/services/meta-pixel.service';

function getOrCreateSessionId(): string {
  const key = 'vitrine_session_id';
  let id = sessionStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(key, id);
  }
  return id;
}

function getUtmParams(): Record<string, string> {
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content']) {
    const val = params.get(key);
    if (val) utm[key] = val;
  }
  return utm;
}

export function useAnalytics() {
  const sessionId = useRef(getOrCreateSessionId());

  const track = useCallback((
    eventType: TEventType,
    extras?: {
      niche_id?: string;
      product_id?: string;
      store_id?: string;
      meta_pixel_id?: string;
      metadata?: Record<string, unknown>;
    },
  ) => {
    const eventId = crypto.randomUUID();
    const eventSourceUrl = window.location.href;

    // Mapear dados para o Meta Pixel
    let metaEventName = 'PageView';
    const metaData: Record<string, any> = {};

    if (eventType === 'niche_view') {
      metaEventName = 'ViewContent';
      metaData.content_category = 'niche';
      metaData.content_name = extras?.metadata?.niche_name || '';
    } else if (eventType === 'product_view') {
      metaEventName = 'ViewContent';
      metaData.content_type = 'product';
      metaData.content_ids = extras?.product_id ? [extras.product_id] : [];
      metaData.content_name = extras?.metadata?.product_name || '';
      if (extras?.metadata?.price) {
        metaData.value = Number(extras.metadata.price);
        metaData.currency = (extras.metadata.currency as string) || 'BRL';
      }
    } else if (eventType === 'product_click') {
      metaEventName = 'InitiateCheckout';
      metaData.content_type = 'product';
      metaData.content_ids = extras?.product_id ? [extras.product_id] : [];
      metaData.content_name = extras?.metadata?.product_name || '';
      if (extras?.metadata?.price) {
        metaData.value = Number(extras.metadata.price);
        metaData.currency = (extras.metadata.currency as string) || 'BRL';
      }
    }

    // Enviar evento ao Meta Pixel (browser) direcionando ao pixel correto
    metaPixelService.track(metaEventName, metaData, { eventID: eventId }, extras?.meta_pixel_id);

    // Enviar evento ao backend (que consequentemente enviará ao Meta CAPI)
    analyticsService.record({
      session_id: sessionId.current,
      event_type: eventType,
      event_id: eventId,
      event_source_url: eventSourceUrl,
      ...getUtmParams(),
      ...extras,
    });
  }, []);

  return { track };
}
