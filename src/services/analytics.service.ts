import config from './config.service';

export type TEventType = 'page_view' | 'niche_view' | 'product_impression' | 'product_click' | 'product_view';

export interface IEventPayload {
  session_id: string;
  event_type: TEventType;
  niche_id?: string;
  product_id?: string;
  store_id?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  referrer?: string;
  metadata?: Record<string, unknown>;
}

export const analyticsService = {
  record: async (payload: IEventPayload): Promise<void> => {
    try {
      await fetch(`${config.apiUrl}/events`, {
        method: 'POST',
        credentials: 'include',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...payload,
          referrer: payload.referrer ?? document.referrer ?? undefined,
          user_agent: navigator.userAgent,
        }),
      });
    } catch {
      // analytics failure is silent — never block the user
    }
  },
};
