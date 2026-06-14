import Header from '@/components/Header/Header';
import NicheGrid from '@/components/NicheGrid/NicheGrid';
import { useNiches } from '@/hooks/useNiches';

const STORES = ['Amazon', 'Shopee', 'Mercado Livre', 'Magalu', 'KaBuM!'];

const HOW_IT_WORKS = [
  {
    icon: '🔍',
    title: 'Curadoria especializada',
    desc: 'Selecionamos os produtos mais bem avaliados e com melhor custo-benefício em cada categoria.',
  },
  {
    icon: '🛒',
    title: 'Um clique, direto na loja',
    desc: 'Você é redirecionado para a loja oficial com o produto já selecionado. Zero burocracia.',
  },
  {
    icon: '✅',
    title: 'Compra segura e garantida',
    desc: 'Compra direto na Amazon, Shopee, Mercado Livre e outras lojas com entrega e suporte garantidos.',
  },
];

export default function Home() {
  const { niches, loading } = useNiches();

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      {/* Trust bar */}
      <div className="bg-white border-b border-slate-100 px-4 py-3">
        <p className="text-[11px] text-slate-400 text-center mb-2 uppercase tracking-wider font-medium">
          Produtos de lojas que você já conhece e confia
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          {STORES.map(s => (
            <span key={s} className="text-xs font-bold text-slate-500">{s}</span>
          ))}
        </div>
      </div>

      <main className="px-4 py-6 space-y-8 max-w-lg mx-auto">
        {/* Categorias */}
        <section>
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="text-slate-800 font-extrabold text-lg">Escolha uma categoria</h2>
            <span className="text-xs text-slate-400">{niches.length} disponíveis</span>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-28 bg-slate-200 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : (
            <NicheGrid niches={niches} />
          )}
        </section>

        {/* Como funciona */}
        <section className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="text-slate-800 font-extrabold text-base mb-5">Como funciona?</h2>
          <div className="space-y-5">
            {HOW_IT_WORKS.map((item, i) => (
              <div key={i} className="flex gap-3.5 items-start">
                <span className="text-2xl flex-shrink-0 mt-0.5">{item.icon}</span>
                <div>
                  <p className="font-bold text-sm text-slate-800 mb-0.5">{item.title}</p>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Disclaimer */}
        <div className="bg-slate-100 rounded-xl p-3.5 text-center">
          <p className="text-xs text-slate-500 leading-relaxed">
            🔗 Este site contém <strong>links de afiliado</strong>. Ao comprar, você não paga nada a mais
            e ainda ajuda nosso trabalho de curadoria. Obrigado! 🙏
          </p>
        </div>
      </main>
    </div>
  );
}
