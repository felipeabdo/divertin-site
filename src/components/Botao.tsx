// 1. Dicionário de cores das variantes do botão.
const CORES_DISPONIVEIS = {
  rosinha: "bg-divertin-rosa-escuro text-white hover:bg-divertin-rosa-escuro/90",
  rosa: "bg-divertin-rosa text-white hover:bg-divertin-rosa/90",
  azul: "bg-divertin-azul text-white hover:bg-divertin-azul/90",
  verde: "bg-divertin-verde text-white hover:bg-divertin-verde/90",
  amarelo: "bg-divertin-amarelo text-gray-800 hover:bg-divertin-amarelo/90",
  laranja_escuro: "bg-divertin-laranja-escuro text-white hover:bg-divertin-laranja-escuro/90"
};

interface BotaoProps {
  children: React.ReactNode;
  cor?: keyof typeof CORES_DISPONIVEIS;
  href?: string;
  target?: string;
  rel?: string;
}

export default function Botao({
  children,
  cor = "rosa",
  href,
  target,
  rel,
}: BotaoProps) {
  const estiloBase =
    "max-w-[300px] px-6 py-6 font-bold rounded-full active:scale-95 transition-all text-left cursor-pointer shadow-sm flex justify-between md:px-6 md:py-6";
  const estiloCor = CORES_DISPONIVEIS[cor];
  const className = `${estiloBase} ${estiloCor}`;

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={className}>
        {children}
      </a>
    );
  }

  return <button className={className}>{children}</button>;
}
