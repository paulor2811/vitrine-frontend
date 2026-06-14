import type { INiche, IProduct, IStore } from '@/types';

export const stores: IStore[] = [
  { id: 1, slug: 'amazon',       name: 'Amazon',        color: '#FF9900', textColor: '#000' },
  { id: 2, slug: 'shopee',       name: 'Shopee',        color: '#EE4D2D', textColor: '#fff' },
  { id: 3, slug: 'mercadolivre', name: 'Mercado Livre', color: '#FFE600', textColor: '#333' },
  { id: 4, slug: 'magalu',       name: 'Magalu',        color: '#0069D9', textColor: '#fff' },
  { id: 5, slug: 'kabum',        name: 'KaBuM!',        color: '#FF6500', textColor: '#fff' },
];

export const niches: INiche[] = [
  { id: 1, slug: 'casa',        name: 'Casa',        description: 'Organização, decoração e utilidades para o seu lar',          icon: '🏠', product_count: 8, bg_color: '#FEF3C7', instagram_url: 'https://instagram.com' },
  { id: 2, slug: 'ferramentas', name: 'Ferramentas', description: 'Ferramentas e utilidades para sua oficina em casa',            icon: '🔧', product_count: 4, bg_color: '#DBEAFE' },
  { id: 3, slug: 'higiene',     name: 'Higiene',     description: 'Cuidados pessoais e higiene do dia a dia',                    icon: '🧴', product_count: 5, bg_color: '#FCE7F3' },
  { id: 4, slug: 'cozinha',     name: 'Cozinha',     description: 'Utensílios e gadgets para cozinhar com praticidade',          icon: '🍳', product_count: 6, bg_color: '#DCFCE7' },
  { id: 5, slug: 'tecnologia',  name: 'Tecnologia',  description: 'Gadgets e eletrônicos que valem o investimento',              icon: '💻', product_count: 3, bg_color: '#EDE9FE' },
  { id: 6, slug: 'pets',        name: 'Pets',        description: 'Os melhores produtos para seu animal de estimação',           icon: '🐾', product_count: 4, bg_color: '#FEE2E2' },
];

export const products: IProduct[] = [
  // Casa
  { id: 1, niche_id: 1, store: stores[0], name: 'Organizador de Gavetas Modular 6 Peças',          image_url: 'https://picsum.photos/seed/101/400/400', price: 49.90,  original_price: 89.90,  affiliate_url: '#', featured: true,  badge: 'mais_vendido', rating: 4.8, rating_count: 3241 },
  { id: 2, niche_id: 1, store: stores[1], name: 'Luminária LED Regulável de Mesa com Toque',        image_url: 'https://picsum.photos/seed/102/400/400', price: 89.90,                          affiliate_url: '#', featured: true,  badge: 'top_avaliado', rating: 4.9, rating_count: 5103 },
  { id: 3, niche_id: 1, store: stores[2], name: 'Tapete Antiderrapante Premium 60×100cm',           image_url: 'https://picsum.photos/seed/103/400/400', price: 34.90,  original_price: 59.90,  affiliate_url: '#', featured: false, badge: 'promocao',     rating: 4.7, rating_count: 1823 },
  { id: 4, niche_id: 1, store: stores[0], name: 'Rack Suspenso para Temperos e Condimentos',        image_url: 'https://picsum.photos/seed/104/400/400', price: 67.90,                          affiliate_url: '#', featured: false, badge: 'destaque',     rating: 4.9, rating_count: 2412 },
  { id: 5, niche_id: 1, store: stores[1], name: 'Kit Panos de Prato Felpudo 6 Peças',              image_url: 'https://picsum.photos/seed/105/400/400', price: 27.90,                          affiliate_url: '#', featured: false,                       rating: 4.5, rating_count:  923 },
  { id: 6, niche_id: 1, store: stores[3], name: 'Suporte Multiuso para Panelas e Tampas',          image_url: 'https://picsum.photos/seed/106/400/400', price: 44.90,                          affiliate_url: '#', featured: false,                       rating: 4.6, rating_count: 1134 },
  { id: 7, niche_id: 1, store: stores[0], name: 'Kit Organizador de Armário e Closet 10 Peças',    image_url: 'https://picsum.photos/seed/107/400/400', price: 119.90, original_price: 179.90, affiliate_url: '#', featured: false, badge: 'mais_vendido', rating: 4.8, rating_count: 4721 },
  { id: 8, niche_id: 1, store: stores[1], name: 'Difusor de Aromas Elétrico USB Ultrassônico',     image_url: 'https://picsum.photos/seed/108/400/400', price: 39.90,  original_price: 69.90,  affiliate_url: '#', featured: false, badge: 'promocao',     rating: 4.7, rating_count: 2891 },

  // Ferramentas
  { id: 9,  niche_id: 2, store: stores[0], name: 'Kit Chaves de Fenda Profissional 20 Peças',      image_url: 'https://picsum.photos/seed/201/400/400', price: 79.90,                          affiliate_url: '#', featured: true,  badge: 'mais_vendido', rating: 4.8, rating_count: 2134 },
  { id: 10, niche_id: 2, store: stores[3], name: 'Parafusadeira Elétrica Bivolt com Maleta',       image_url: 'https://picsum.photos/seed/202/400/400', price: 159.90, original_price: 229.90, affiliate_url: '#', featured: false, badge: 'promocao',     rating: 4.7, rating_count:  987 },
  { id: 11, niche_id: 2, store: stores[1], name: 'Trena a Laser Digital LCD 40m',                  image_url: 'https://picsum.photos/seed/203/400/400', price: 49.90,                          affiliate_url: '#', featured: false, badge: 'top_avaliado', rating: 4.9, rating_count: 3421 },
  { id: 12, niche_id: 2, store: stores[0], name: 'Fita Dupla Face Industrial Transparente 50m',    image_url: 'https://picsum.photos/seed/204/400/400', price: 24.90,                          affiliate_url: '#', featured: false,                       rating: 4.8, rating_count: 5612 },

  // Tecnologia
  { id: 13, niche_id: 5, store: stores[1], name: 'Cabo USB-C 240W Trançado Kevlar 2m',             image_url: 'https://picsum.photos/seed/501/400/400', price: 29.90,                          affiliate_url: '#', featured: true,  badge: 'mais_vendido', rating: 4.8, rating_count: 8923 },
  { id: 14, niche_id: 5, store: stores[0], name: 'Suporte Articulado para Monitor até 32"',        image_url: 'https://picsum.photos/seed/502/400/400', price: 149.90, original_price: 199.90, affiliate_url: '#', featured: false, badge: 'destaque',     rating: 4.7, rating_count: 1234 },
  { id: 15, niche_id: 5, store: stores[2], name: 'Mouse Sem Fio Ergonômico Recarregável',          image_url: 'https://picsum.photos/seed/503/400/400', price: 89.90,                          affiliate_url: '#', featured: false, badge: 'top_avaliado', rating: 4.6, rating_count: 2891 },
];
