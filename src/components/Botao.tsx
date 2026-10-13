import type { AnchorHTMLAttributes, CSSProperties, ReactNode } from "react";

/**
 * Classes Tailwind associadas às cores visuais usadas pela marca.
 * Mantê-las como strings literais permite que o Tailwind encontre as classes
 * durante a compilação e evita duplicar condicionais dentro do JSX.
 */
const CORES_DISPONIVEIS = {
  rosinha: "bg-divertin-rosa-escuro text-white hover:bg-divertin-rosa-escuro/90",
  rosa: "bg-divertin-rosa text-white hover:bg-divertin-rosa/90",
  azul: "bg-divertin-azul text-white hover:bg-divertin-azul/90",
  verde: "bg-divertin-verde text-white hover:bg-divertin-verde/90",
  amarelo: "bg-divertin-amarelo text-gray-800 hover:bg-divertin-amarelo/90",
  laranja_escuro: "bg-divertin-laranja-escuro text-white hover:bg-divertin-laranja-escuro/90",
} as const;

type ButtonType = "button" | "submit" | "reset";

interface BotaoProps {
  children: ReactNode;
  cor?: keyof typeof CORES_DISPONIVEIS;
  href?: string;
  target?: AnchorHTMLAttributes<HTMLAnchorElement>["target"];
  rel?: string;
  /** Largura CSS; por padrão, o componente ocupa 305px. */
  largura?: CSSProperties["width"];
  /** Altura CSS; por padrão, o componente ocupa 70px. */
  altura?: CSSProperties["height"];
  /** Só se aplica à versão <button>; o padrão é "button" para não enviar formulários sem querer. */
  type?: ButtonType;
}

/**
 * Botão visual compartilhado pelas páginas.
 * Quando `href` é informado, renderiza um link; caso contrário, renderiza um botão real.
 */
export default function Botao({
  children,
  cor = "rosa",
  href,
  target,
  rel,
  largura = "305px",
  altura = "70px",
  type = "button",
}: BotaoProps) {
  const estiloBase =
    "flex cursor-pointer items-center justify-start gap-2 rounded-full px-6 py-6 text-left font-bold shadow-sm transition-all active:scale-95 md:px-6 md:py-6";
  const className = `${estiloBase} ${CORES_DISPONIVEIS[cor]}`;

  const estiloDimensoes: CSSProperties = {
    width: largura,
    ...(altura ? { height: altura } : {}),
  };

  if (href) {
    // `noopener` impede que a nova aba controle a aba que abriu o link.
    // `noreferrer` também é mantido como padrão para links externos em nova aba.
    const relSeguro =
      target === "_blank"
        ? [...new Set([...(rel ?? "noreferrer").split(/\s+/), "noopener"])].join(" ")
        : rel;

    return (
      <a
        href={href}
        target={target}
        // Links em nova aba recebem proteção padrão caso o chamador não informe `rel`.
        rel={relSeguro}
        className={className}
        style={estiloDimensoes}
      >
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={className} style={estiloDimensoes}>
      {children}
    </button>
  );
}
