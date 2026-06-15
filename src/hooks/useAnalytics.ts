import { useCallback, useRef } from 'react';
import { analyticsService, type TEventType } from '@/services/analytics.service';

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
      metadata?: Record<string, unknown>;
    },
  ) => {
    analyticsService.record({
      session_id: sessionId.current,
      event_type: eventType,
      ...getUtmParams(),
      ...extras,
    });
  }, []);

  return { track };
}
