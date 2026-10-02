// 1. Criamos um dicionário de cores usando as variáveis do nosso globals.css
// Cada "chave" representa uma variante visual do botão
const CORES_DISPONIVEIS = {
  rosinha: "bg-divertin-rosa-escuro text-white hover:bg-divertin-rosa-escuro/90",
  rosa: "bg-divertin-rosa text-white hover:bg-divertin-rosa/90",
  azul: "bg-divertin-azul text-white hover:bg-divertin-azul/90",
  verde: "bg-divertin-verde text-white hover:bg-divertin-verde/90",
  amarelo: "bg-divertin-amarelo text-gray-800 hover:bg-divertin-amarelo/90",
  laranja_escuro: "bg-divertin-laranja-escuro text-white hover:bg-divertin-laranja-escuro/90"
};

// 2. Definimos as Props (argumentos) que o nosso botão aceita.
// Colocamos o "cor?: keyof typeof CORES_DISPONIVEIS" para o TypeScript garantir que 
// só possamos digitar uma das 4 cores cadastradas ali em cima!
interface BotaoProps {
  children: React.ReactNode;
  cor?: keyof typeof CORES_DISPONIVEIS; // O "?" significa que essa prop é opcional
}

export default function Botao({ children, cor = "rosa" }: BotaoProps) {
  // 3. A estrutura base do layout que NUNCA muda (paddings, arredondamento, sombras, clique)
  const estiloBase = "w-[300px] px-4 py-2 font-bold rounded-full active:scale-95 transition-all text-left cursor-pointer shadow-sm flex justify-between md:px-6 md:py-4   ";

  // 4. Buscamos as classes de cor específicas baseadas na Prop que foi passada.
  // Se o desenvolvedor não passar nada, o sistema usa "rosa" como padrão (default).
  const estiloCor = CORES_DISPONIVEIS[cor];

  return (
    // Combinamos a estrutura de base com a cor escolhida em uma linha só!
    <button className={`${estiloBase} ${estiloCor}`}>
      {children}
    </button>
  );
}
