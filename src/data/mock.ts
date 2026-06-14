import type { INiche, IProduct, IStore } from '@/types';

export const stores: IStore[] = [
  { id: 'store-1', slug: 'amazon',        name: 'Amazon',        color: '#FF9900', text_color: '#000' },
  { id: 'store-2', slug: 'shopee',        name: 'Shopee',        color: '#EE4D2D', text_color: '#fff' },
  { id: 'store-3', slug: 'mercadolivre',  name: 'Mercado Livre', color: '#FFE600', text_color: '#333' },
  { id: 'store-4', slug: 'magalu',        name: 'Magalu',        color: '#0069D9', text_color: '#fff' },
  { id: 'store-5', slug: 'kabum',         name: 'KaBuM!',        color: '#FF6500', text_color: '#fff' },
];

export const niches: INiche[] = [
  { id: 'niche-1', slug: 'casa',        name: 'Casa',        description: 'Organização, decoração e utilidades para o seu lar',          icon: '🏠', bg_color: '#FEF3C7', active: true, instagram_url: 'https://instagram.com' },
  { id: 'niche-2', slug: 'ferramentas', name: 'Ferramentas', description: 'Ferramentas e utilidades para sua oficina em casa',            icon: '🔧', bg_color: '#DBEAFE', active: true },
  { id: 'niche-3', slug: 'higiene',     name: 'Higiene',     description: 'Cuidados pessoais e higiene do dia a dia',                    icon: '🧴', bg_color: '#FCE7F3', active: true },
  { id: 'niche-4', slug: 'cozinha',     name: 'Cozinha',     description: 'Utensílios e gadgets para cozinhar com praticidade',          icon: '🍳', bg_color: '#DCFCE7', active: true },
  { id: 'niche-5', slug: 'tecnologia',  name: 'Tecnologia',  description: 'Gadgets e eletrônicos que valem o investimento',              icon: '💻', bg_color: '#EDE9FE', active: true },
  { id: 'niche-6', slug: 'pets',        name: 'Pets',        description: 'Os melhores produtos para seu animal de estimação',           icon: '🐾', bg_color: '#FEE2E2', active: true },
];

export const products: IProduct[] = [
  // Casa
  { id: 'prod-01', niche_id: 'niche-1', store: stores[0], name: 'Organizador de Gavetas Modular 6 Peças',          image_url: 'https://picsum.photos/seed/101/400/400', price: 49.90,  original_price: 89.90,  affiliate_url: '#', featured: true,  badge: 'mais_vendido', rating: 4.8, rating_count: 3241, active: true },
  { id: 'prod-02', niche_id: 'niche-1', store: stores[1], name: 'Luminária LED Regulável de Mesa com Toque',        image_url: 'https://picsum.photos/seed/102/400/400', price: 89.90,                          affiliate_url: '#', featured: true,  badge: 'top_avaliado', rating: 4.9, rating_count: 5103, active: true },
  { id: 'prod-03', niche_id: 'niche-1', store: stores[2], name: 'Tapete Antiderrapante Premium 60×100cm',           image_url: 'https://picsum.photos/seed/103/400/400', price: 34.90,  original_price: 59.90,  affiliate_url: '#', featured: false, badge: 'promocao',     rating: 4.7, rating_count: 1823, active: true },
  { id: 'prod-04', niche_id: 'niche-1', store: stores[0], name: 'Rack Suspenso para Temperos e Condimentos',        image_url: 'https://picsum.photos/seed/104/400/400', price: 67.90,                          affiliate_url: '#', featured: false, badge: 'destaque',     rating: 4.9, rating_count: 2412, active: true },
  { id: 'prod-05', niche_id: 'niche-1', store: stores[1], name: 'Kit Panos de Prato Felpudo 6 Peças',              image_url: 'https://picsum.photos/seed/105/400/400', price: 27.90,                          affiliate_url: '#', featured: false,                       rating: 4.5, rating_count:  923, active: true },
  { id: 'prod-06', niche_id: 'niche-1', store: stores[3], name: 'Suporte Multiuso para Panelas e Tampas',          image_url: 'https://picsum.photos/seed/106/400/400', price: 44.90,                          affiliate_url: '#', featured: false,                       rating: 4.6, rating_count: 1134, active: true },
  { id: 'prod-07', niche_id: 'niche-1', store: stores[0], name: 'Kit Organizador de Armário e Closet 10 Peças',    image_url: 'https://picsum.photos/seed/107/400/400', price: 119.90, original_price: 179.90, affiliate_url: '#', featured: false, badge: 'mais_vendido', rating: 4.8, rating_count: 4721, active: true },
  { id: 'prod-08', niche_id: 'niche-1', store: stores[1], name: 'Difusor de Aromas Elétrico USB Ultrassônico',     image_url: 'https://picsum.photos/seed/108/400/400', price: 39.90,  original_price: 69.90,  affiliate_url: '#', featured: false, badge: 'promocao',     rating: 4.7, rating_count: 2891, active: true },
  // Ferramentas
  { id: 'prod-09', niche_id: 'niche-2', store: stores[0], name: 'Kit Chaves de Fenda Profissional 20 Peças',       image_url: 'https://picsum.photos/seed/201/400/400', price: 79.90,                          affiliate_url: '#', featured: true,  badge: 'mais_vendido', rating: 4.8, rating_count: 2134, active: true },
  { id: 'prod-10', niche_id: 'niche-2', store: stores[3], name: 'Parafusadeira Elétrica Bivolt com Maleta',        image_url: 'https://picsum.photos/seed/202/400/400', price: 159.90, original_price: 229.90, affiliate_url: '#', featured: false, badge: 'promocao',     rating: 4.7, rating_count:  987, active: true },
  { id: 'prod-11', niche_id: 'niche-2', store: stores[1], name: 'Trena a Laser Digital LCD 40m',                   image_url: 'https://picsum.photos/seed/203/400/400', price: 49.90,                          affiliate_url: '#', featured: false, badge: 'top_avaliado', rating: 4.9, rating_count: 3421, active: true },
  { id: 'prod-12', niche_id: 'niche-2', store: stores[0], name: 'Fita Dupla Face Industrial Transparente 50m',     image_url: 'https://picsum.photos/seed/204/400/400', price: 24.90,                          affiliate_url: '#', featured: false,                       rating: 4.8, rating_count: 5612, active: true },
  // Tecnologia
  { id: 'prod-13', niche_id: 'niche-5', store: stores[1], name: 'Cabo USB-C 240W Trançado Kevlar 2m',              image_url: 'https://picsum.photos/seed/501/400/400', price: 29.90,                          affiliate_url: '#', featured: true,  badge: 'mais_vendido', rating: 4.8, rating_count: 8923, active: true },
  { id: 'prod-14', niche_id: 'niche-5', store: stores[0], name: 'Suporte Articulado para Monitor até 32"',         image_url: 'https://picsum.photos/seed/502/400/400', price: 149.90, original_price: 199.90, affiliate_url: '#', featured: false, badge: 'destaque',     rating: 4.7, rating_count: 1234, active: true },
  { id: 'prod-15', niche_id: 'niche-5', store: stores[2], name: 'Mouse Sem Fio Ergonômico Recarregável',           image_url: 'https://picsum.photos/seed/503/400/400', price: 89.90,                          affiliate_url: '#', featured: false, badge: 'top_avaliado', rating: 4.6, rating_count: 2891, active: true },
];
