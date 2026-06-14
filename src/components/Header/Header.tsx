import { ShoppingBag } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-slate-900 px-4 pt-10 pb-7">
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-orange-500 p-1.5 rounded-lg">
          <ShoppingBag size={18} className="text-white" />
        </div>
        <span className="text-white font-extrabold text-xl tracking-tight">Vitrine</span>
      </div>
      <h1 className="text-white text-2xl font-extrabold leading-tight mb-2">
        Produtos selecionados<br />para você comprar melhor
      </h1>
      <p className="text-slate-400 text-sm leading-relaxed">
        Curadoria especializada com links diretos<br />para as melhores lojas do Brasil
      </p>
    </header>
  );
}
