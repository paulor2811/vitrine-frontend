import { useEffect } from 'react';

interface SeoMeta {
  title: string;
  description?: string;
  ogImage?: string | null;
  ogUrl?: string;
  jsonLd?: Record<string, unknown>;
}

function setMeta(selector: string, attr: string, value: string): HTMLMetaElement {
  let el = document.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value.slice(0, 300));
  return el;
}

function setJsonLd(data: Record<string, unknown>): HTMLScriptElement {
  let el = document.querySelector<HTMLScriptElement>('script[data-seo-jsonld]');
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.setAttribute('data-seo-jsonld', '');
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
  return el;
}

export function useSeoMeta({ title, description, ogImage, ogUrl, jsonLd }: SeoMeta) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    const metas: HTMLMetaElement[] = [];
    const scripts: HTMLScriptElement[] = [];

    if (description) {
      metas.push(setMeta('meta[name="description"]',     'content', description));
      metas.push(setMeta('meta[property="og:description"]', 'content', description));
    }
    metas.push(setMeta('meta[property="og:title"]', 'property', 'og:title'));
    metas[metas.length - 1].setAttribute('content', title);

    metas.push(setMeta('meta[property="og:type"]', 'property', 'og:type'));
    metas[metas.length - 1].setAttribute('content', 'website');

    if (ogImage) {
      metas.push(setMeta('meta[property="og:image"]', 'property', 'og:image'));
      metas[metas.length - 1].setAttribute('content', ogImage);
    }
    if (ogUrl) {
      metas.push(setMeta('meta[property="og:url"]', 'property', 'og:url'));
      metas[metas.length - 1].setAttribute('content', ogUrl);
    }
    if (jsonLd) {
      scripts.push(setJsonLd(jsonLd));
    }

    return () => {
      document.title = prevTitle;
    };
  }, [title, description, ogImage, ogUrl, jsonLd]);
}
