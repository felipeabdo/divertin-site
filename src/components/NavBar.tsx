'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface NavLink {
  label: string;
  href: string;
  hoverColor: string;
}

interface NavBarProps {
  links?: NavLink[];
}

const defaultLinks: NavLink[] = [
  { label: 'HOME', href: '/', hoverColor: '#e079bc' },
  { label: 'QUEM SOMOS', href: '/quem-somos', hoverColor: '#f78c00' },
  { label: 'ESPECIALIDADES', href: '/servicos', hoverColor: '#65bf9d' },
  { label: 'CONTATO', href: '/contato', hoverColor: '#b7db00' },
];

/* -------------------------------------------------------------------------- */
/*  VISUAL DO MENU MOBILE                                                     */
/*  Todas as medidas abaixo vêm do screenshot (941 x 1672) e são convertidas  */
/*  para unidades relativas à largura dos botões (cqw), então tudo escala     */
/*  junto, sem quebrar proporção.                                             */
/* -------------------------------------------------------------------------- */

const PURPLE = '#d27fb1';
const YELLOW = '#fbc531';
const PINK_SPARK = '#ee9fcb';

/** Cor + formato (blob) de cada botão, na ordem dos links. */
const mobileStyle = [
  {
    color: '#e8499a',
    d: 'M66 2 C150 -1 260 5 360 3 C450 1 520 -2 555 8 C585 17 595 42 595 70 C595 105 580 128 540 136 C490 146 400 141 300 142 C200 143 110 144 62 137 C22 130 0 108 0 75 C0 38 24 6 66 2 Z',
  },
  {
    color: '#fb9322',
    d: 'M70 6 C160 2 240 1 330 1 C420 1 500 4 545 6 C582 8 595 34 595 66 C595 100 578 124 540 130 C480 137 380 136 290 135 C190 134 110 142 60 134 C22 128 0 105 0 70 C0 35 28 9 70 6 Z',
  },
  {
    color: '#46c395',
    d: 'M64 1 C150 -1 250 4 350 2 C440 0 520 0 555 6 C585 11 595 38 595 68 C595 102 582 124 545 130 C490 138 390 135 290 136 C190 137 110 140 62 133 C24 127 0 105 0 70 C0 34 22 4 64 1 Z',
  },
  {
    color: '#b3d60d',
    d: 'M72 3 C160 -1 240 2 330 1 C420 0 510 2 548 8 C582 14 595 40 595 72 C595 108 578 132 538 138 C480 144 390 140 300 141 C200 142 110 139 62 134 C24 129 0 108 0 74 C0 38 28 8 72 3 Z',
  },
];

/** Faíscas (traços) ao redor dos botões. Coordenadas relativas ao canto sup. esquerdo do botão. */
const sparkles: Record<number, { color: string; lines: [number, number, number, number][] }> = {
  0: { color: YELLOW, lines: [[-1, -36, 12, -10], [-43, -4, -13, 15], [-51, 46, -23, 46]] },
  2: { color: PINK_SPARK, lines: [[612, -17, 640, -35], [629, 24, 667, 14], [633, 59, 661, 66]] },
  3: { color: YELLOW, lines: [[-36, -12, -10, 10], [-61, 31, -25, 40], [-52, 89, -25, 79]] },
};

/* ------------------------------- ÍCONES ---------------------------------- */

const iconProps = {
  viewBox: '0 0 72 72',
  fill: 'none',
  stroke: '#fff',
  strokeWidth: 4.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

function IconHome() {
  return (
    <svg {...iconProps}>
      <path d="M9 35 L36 9 L63 35" />
      <path d="M16 30 V62 H56 V30" />
      <path d="M30 62 V46 H42 V62" />
    </svg>
  );
}

function IconKid() {
  return (
    <svg {...iconProps}>
      <circle cx="36" cy="38" r="24" />
      <path d="M15 30 C24 28 33 23 37 15 C41 23 50 28 57 30" />
      <path d="M12 38 C8 38 8 46 12 46" />
      <path d="M60 38 C64 38 64 46 60 46" />
      <circle cx="28" cy="39" r="1.2" fill="#fff" />
      <circle cx="44" cy="39" r="1.2" fill="#fff" />
      <path d="M28 48 Q36 55 44 48" />
    </svg>
  );
}

function IconStar() {
  return (
    <svg {...iconProps}>
      <path
        transform="rotate(-8 36 36)"
        d="M36 6 L44.5 26 L66 28 L49.5 42 L54.5 64 L36 52.5 L17.5 64 L22.5 42 L6 28 L27.5 26 Z"
      />
    </svg>
  );
}

function IconChat() {
  return (
    <svg {...iconProps}>
      <path d="M42 12 C28 12 18 20 18 30 C18 34 20 38 22 41 L16 53 L31 46 C34 47 38 48 42 48 C56 48 66 40 66 30 C66 20 56 12 42 12 Z" />
      <path d="M12 38 C8 41 8 46 12 50 L10 58 L20 54" />
    </svg>
  );
}

const icons = [IconHome, IconKid, IconStar, IconChat];

function IconArrow() {
  return (
    <svg viewBox="0 0 41 30" fill="none" stroke="#fff" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 15 H37 M25 3 L37 15 L25 27" />
    </svg>
  );
}

/* ----------------------------- COMPONENTE -------------------------------- */

export default function NavBar({ links = defaultLinks }: NavBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((v) => !v);

  // Trava o scroll da página enquanto o menu está aberto
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Fecha com ESC e ao passar para o layout desktop
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsOpen(false);
    const mq = window.matchMedia('(min-width: 1301px)');
    const onMq = () => mq.matches && setIsOpen(false);
    window.addEventListener('keydown', onKey);
    mq.addEventListener('change', onMq);
    return () => {
      window.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onMq);
    };
  }, []);

  return (
    <div className="relative">
      {/* CONTAINER CONTROLADOR DE BOTÕES UNIFICADO */}
      <div className="fixed top-6 right-6 min-[1301px]:hidden w-12 h-12 flex items-center justify-center z-50">
        {/* Botão Hambúrguer (Visível apenas se fechado) */}
        <button
          onClick={toggleMenu}
          className={`text-black focus:outline-none p-2 w-full h-full flex items-center justify-center ${isOpen ? 'hidden' : 'block'}`}
          aria-label="Abrir menu"
          aria-expanded={isOpen}
        >
          <svg className="w-8 h-8 mt-18" fill="none" strokeWidth="3" viewBox="0 0 24 24">
            <path strokeLinecap="round" d="M4 6h16" className="stroke-[#e6407d] min-[1301px]:stroke-white" />
            <path strokeLinecap="round" d="M4 12h16" className="stroke-[#e6407d] min-[1301px]:stroke-white" />
            <path strokeLinecap="round" d="M4 18h16" className="stroke-[#e6407d] min-[1301px]:stroke-white" />
          </svg>
        </button>

        {/* Botão de Fechar X (Visível apenas se aberto) */}
        <button
          onClick={toggleMenu}
          className={`text-[#ec1f7a] focus:outline-none p-2 w-full h-full flex items-center justify-center ${isOpen ? 'block' : 'hidden'}`}
          aria-label="Fechar menu"
          aria-expanded={isOpen}
        >
          {/* mesmo deslocamento (mt-18) do hambúrguer, para o X ficar exatamente no mesmo lugar */}
          <span className="relative block w-8 h-8 mt-18">
            <svg className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="3.4" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 19L19 5M5 5l14 14" />
            </svg>
            {/* faíscas amarelas ao lado do X */}
            <svg
              className="absolute right-full top-1/2 -translate-y-1/2 mr-[3px] w-[20px] overflow-visible pointer-events-none"
              viewBox="0 0 26 58"
              fill="none"
              stroke={YELLOW}
              strokeWidth="6"
              strokeLinecap="round"
              aria-hidden
            >
              <path d="M10 3 L23 13" />
              <path d="M2 28 H20" />
              <path d="M10 55 L23 47" />
            </svg>
          </span>
        </button>
      </div>

      {/* 1. CONTAINER EXCLUSIVO DESKTOP (> 1300px) */}
      <ul className="hidden min-[1301px]:flex min-[1301px]:flex-row min-[1301px]:gap-10 min-[1301px]:font-black min-[1301px]:text-[20px] text-white">
        {links.map((link, index) => (
          <li
            key={`desk-${index}`}
            style={{ '--hover-color': link.hoverColor } as React.CSSProperties}
            className="w-auto"
          >
            <Link
              href={link.href}
              className="hover:text-[var(--hover-color)] transition-colors duration-200 block py-0"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* 2. GAVETA MOBILE/TABLET (<= 1300px) */}
      <div
        aria-hidden={!isOpen}
        className={`
          fixed inset-0 z-40 overflow-hidden bg-[#fcfbf8] min-[1301px]:hidden
          transition-[transform,translate,visibility] duration-300 ease-in-out
          ${isOpen ? 'translate-x-0 visible' : 'translate-x-full invisible'}
        `}
        style={
          {
            // Altura das nuvens: proporcional à largura, mas limitada pela altura da tela
            '--cloud-top': 'min(14.9vw, 12dvh)',
            '--cloud-bot': 'min(25.7vw, 20dvh)',
          } as React.CSSProperties
        }
      >
        {/* ---------- DECORAÇÃO (não rola, não recebe clique) ---------- */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          {/* Nuvem do topo */}
          <svg
            className="absolute top-0 left-0 w-full"
            style={{ height: 'var(--cloud-top)' }}
            viewBox="0 0 941 140"
            preserveAspectRatio="xMidYMin slice"
          >
            <path
              fill={PURPLE}
              d="M0 0 H941 V112 C910 125 870 128 840 112 C800 95 770 65 755 42 C735 62 712 78 690 78 C660 78 640 65 625 52 C600 95 550 125 470 138 C400 135 340 110 313 52 C295 68 275 78 250 78 C225 78 200 65 185 42 C160 90 110 125 50 124 C30 124 15 121 0 118 Z"
            />
          </svg>

          {/* Base: sol amarelo, sol laranja e nuvem */}
          <svg
            className="absolute bottom-0 left-0 w-full"
            style={{ height: 'var(--cloud-bot)' }}
            viewBox="0 0 941 242"
            preserveAspectRatio="xMidYMax slice"
          >
            <circle cx="0" cy="270" r="265" fill="#ffc73a" />
            <circle cx="1000" cy="290" r="300" fill="#ff7a1c" />
            <path
              fill={PURPLE}
              d="M0 120 C20 100 50 98 70 98 C100 98 125 110 138 124 C150 108 170 92 190 92 C205 92 215 96 225 90 C245 76 270 73 295 73 C335 73 365 95 385 120 C400 100 420 87 445 87 C490 87 525 105 542 128 C552 118 560 118 568 118 C580 118 590 124 596 124 C620 100 650 82 690 82 C740 82 775 105 790 128 C810 112 830 120 840 120 C870 120 895 130 905 135 C915 125 930 120 941 122 V242 H0 Z"
            />
          </svg>
        </div>

        {/* ---------- CONTEÚDO (rola se a tela for muito baixa) ---------- */}
        <div className="absolute inset-0 overflow-y-auto overflow-x-hidden">
          <div
            className="min-h-full flex items-center justify-center"
            style={{ paddingTop: 'var(--cloud-top)', paddingBottom: 'var(--cloud-bot)' }}
          >
            {/*
              Este wrapper é o "container" das unidades cqw: tudo dentro (fonte, ícones,
              espaçamentos, faíscas) é medido em % da largura do botão (595 = largura de
              referência do screenshot). Largura: 63% da tela (como no print), mínimo de
              200px, máximo de 540px, e nunca maior do que a altura disponível comporta.
            */}
            <div
              style={{
                containerType: 'inline-size',
                width:
                  'min(clamp(200px, 63%, 540px), max(200px, calc((100dvh - var(--cloud-top) - var(--cloud-bot)) / 1.2)))',
              }}
            >
              <ul className="flex flex-col" style={{ gap: '5.5cqw' }}>
                {links.map((link, index) => {
                  const style = mobileStyle[index % mobileStyle.length];
                  const Icon = icons[index % icons.length];
                  const spark = sparkles[index % mobileStyle.length];

                  return (
                    <li key={`mob-${index}`} className="relative" onClick={() => setIsOpen(false)}>
                      {/* Faíscas */}
                      {spark && (
                        <svg
                          className="absolute pointer-events-none overflow-visible"
                          style={{ left: '-25cqw', top: '-10.1cqw', width: '150cqw', height: 'auto' }}
                          viewBox="-149 -60 893 260"
                          fill="none"
                          stroke={spark.color}
                          strokeWidth={9}
                          strokeLinecap="round"
                          aria-hidden
                        >
                          {spark.lines.map(([x1, y1, x2, y2], i) => (
                            <path key={i} d={`M${x1} ${y1} L${x2} ${y2}`} />
                          ))}
                        </svg>
                      )}

                      <Link
                        href={link.href}
                        className="relative block w-full text-white no-underline select-none transition-transform duration-150 active:scale-[0.97] hover:brightness-105"
                        style={{ aspectRatio: '595 / 143' }}
                      >
                        {/* Blob de fundo */}
                        <svg
                          className="absolute inset-0 w-full h-full"
                          viewBox="0 0 595 143"
                          preserveAspectRatio="none"
                          aria-hidden
                        >
                          <path d={style.d} fill={style.color} />
                        </svg>

                        {/* Ícone + texto + seta */}
                        <span
                          className="relative z-10 flex h-full items-center"
                          style={{ paddingLeft: '10cqw', paddingRight: '7.7cqw' }}
                        >
                          <span className="block shrink-0" style={{ width: '12cqw', height: '12cqw' }}>
                            <Icon />
                          </span>
                          <span
                            className="flex-1 whitespace-nowrap font-extrabold uppercase"
                            style={{
                              marginLeft: '6.9cqw',
                              fontSize: '6.4cqw',
                              lineHeight: 1,
                              letterSpacing: '0.01em',
                              fontFamily: 'var(--font-menu, inherit)',
                            }}
                          >
                            {link.label}
                          </span>
                          <span className="block shrink-0" style={{ width: '6.9cqw' }}>
                            <IconArrow />
                          </span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}