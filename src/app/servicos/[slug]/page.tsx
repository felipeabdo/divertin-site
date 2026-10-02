// 1. Importamos a ferramenta de Erro 404 do Next.js
import { notFound } from "next/navigation";

// 2. Importamos a nossa "tabela" de dados locais que criamos na aula passada
import { SERVICOS_REAL } from "@/data/servicosData";

export default async function DetalheServico({ params }) {
  // 3. Pegamos o 'slug' (o texto da URL) que o usuário digitou
  const { slug } = await params;

  // 4. A SEGURANÇA: Verificamos se o que o usuário digitou existe nas chaves do nosso objeto.
  // Se o usuário digitar "bananinha", SERVICOS_REAL["bananinha"] vai retornar indefinido (undefined).
  const servico = SERVICOS_REAL[slug as keyof typeof SERVICOS_REAL];

  // 5. Se não existir o serviço na nossa base de dados, barramos na hora e mandamos pro Erro 404!
  if (!servico) {
    notFound();
  }

  // 6. Se passou pela segurança, agora o site desenha a tela com os dados REAIS da clínica:
  return (
    <div className="p-6 md:p-16 max-w-3xl mx-auto">
      
      {/* Botão simples para voltar para a Home */}
      <a href="/" className="text-sm font-semibold text-divertin-azul hover:underline">
        ← Voltar para o início
      </a>

      {/* Título dinâmico vindo do nosso arquivo de dados */}
      <h1 className="mt-6 text-3xl md:text-4xl font-bold text-divertin-verde">
        {servico.titulo}
      </h1>

      {/* Caixa lúdica com detalhes técnicos formatados de forma bonita */}
      <div className="mt-4 flex flex-wrap gap-3">
        <span className="px-4 py-1.5 bg-divertin-rosa/20 text-divertin-rosa font-bold text-xs rounded-full">
          👶 {servico.idadeAlvo}
        </span>
        <span className="px-4 py-1.5 bg-divertin-azul/20 text-divertin-azul font-bold text-xs rounded-full">
          🧩 Abordagem: {servico.abordagem}
        </span>
      </div>

      {/* O texto explicativo que sua esposa escreveu sobre o tratamento */}
      <p className="mt-8 text-lg text-gray-700 leading-relaxed">
        {servico.descricao}
      </p>

      {/* Botão de conversão de agendamento (Essencial para o negócio dela!) */}
      <div className="mt-12 p-6 bg-amber-50 rounded-2xl border-2 border-dashed border-divertin-amarelo text-center">
        <p className="text-gray-700 font-medium">Ficou com alguma dúvida sobre este desenvolvimento ou quer agendar uma avaliação?</p>
        <button className="mt-4 px-6 py-3 bg-divertin-rosa text-white font-bold rounded-full hover:opacity-90 transition-all shadow-sm cursor-pointer">
          Falar com a Divertin no WhatsApp 💬
        </button>
      </div>

    </div>
  );
}
