// 1. Importamos o componente de Link do Next.js para navegação rápida
import Link from 'next/link';

// 2. Importamos a nossa base de dados local
import { SERVICOS_REAL } from '@/data/servicosData';

export default function ListaServicos() {
  // 3. Transformamos o nosso objeto em uma lista navegável para o loop
  const listaDeServicos = Object.entries(SERVICOS_REAL);

  return (
    <div className="p-6 md:p-16 max-w-5xl mx-auto">
      
      {/* Cabeçalho da Página */}
      <div className="text-center md:text-left">
        <Link href="/" className="text-sm font-semibold text-divertin-azul hover:underline">
          ← Voltar para a Home
        </Link>
        <h1 className="mt-4 text-3xl md:text-4xl font-bold text-divertin-rosa">
          Nossas Especialidades 🧠
        </h1>
        <p className="mt-2 text-gray-600">
          Oferecemos abordagens terapêuticas individualizadas e acolhedoras para o desenvolvimento do seu filho.
        </p>
      </div>

      {/* Grid de Cartões (Cards): 
          No celular fica 1 coluna (grid-cols-1). No computador vira 2 colunas (md:grid-cols-2) */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* 4. O LOOP: Para cada item da nossa lista, extraímos o [slug] e o [dados] */}
        {listaDeServicos.map(([slug, dados]) => {
          return (
            // A regra do React: todo item de uma lista gerada por loop precisa de uma 'key' única
            <div key={slug} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-all">
              
              <div>
                <span className="px-3 py-1 bg-divertin-amarelo/20 text-yellow-700 text-xs font-bold rounded-full">
                  👶 {dados.idadeAlvo}
                </span>
                <h2 className="mt-3 text-xl font-bold text-gray-800">
                  {dados.titulo}
                </h2>
                {/* Mostramos apenas um pedacinho da descrição para não sobrecarregar a tela */}
                <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                  {dados.descricao}
                </p>
              </div>

              {/* Botão de Saiba Mais direcionando dinamicamente para o link da subpágina! */}
              <div className="mt-6 pt-4 border-t border-gray-50">
                <Link 
                  href={`/servicos/${slug}`} 
                  className="inline-flex items-center text-sm font-bold text-divertin-verde hover:translate-x-1 transition-transform"
                >
                  Conhecer Tratamento →
                </Link>
              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}
