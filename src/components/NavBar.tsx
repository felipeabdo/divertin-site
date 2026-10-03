'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type IconName = 'home' | 'face' | 'star' | 'chat';

interface NavLink {
  label: string;
  href: string;
  hoverColor: string;
  /** Ícone exibido no menu mobile */
  icon?: IconName;
  /** Cor de fundo da "pílula" no menu mobile */
  bg?: string;
  /** Cor do círculo do ícone e da seta no menu mobile */
  accent?: string;
}

interface NavBarProps {
  links?: NavLink[];
}

const defaultLinks: NavLink[] = [
  { label: 'HOME', href: '/', hoverColor: '#e079bc', icon: 'home', bg: '#fbdcea', accent: '#e8408a' },
  { label: 'QUEM SOMOS', href: '/quem-somos', hoverColor: '#f78c00', icon: 'face', bg: '#fde6c2', accent: '#fba10f' },
  { label: 'ESPECIALIDADES', href: '/servicos', hoverColor: '#65bf9d', icon: 'star', bg: '#cbebdd', accent: '#3dbd8a' },
  { label: 'CONTATO', href: '/contato', hoverColor: '#b7db00', icon: 'chat', bg: '#ebdcf4', accent: '#9b63b8' },
];

/* ------------------------------------------------------------------ */
/* Ícones (SVG em código)                                              */
/* ------------------------------------------------------------------ */

function MenuIcon({ name }: { name: IconName }) {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: '#fff',
    strokeWidth: 1.9,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className: 'w-full h-full',
    'aria-hidden': true,
  };

  switch (name) {
    case 'home':
      return (
        <svg {...common}>
          <path d="M3 11.5 12 4l9 7.5" />
          <path d="M5.5 10v9.5h13V10" />
          <path d="M10 19.5v-4.5h4v4.5" />
        </svg>
      );
    case 'face':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M7 9c2.6 0 4.6-1.1 5.6-2.8C13.4 7.9 15 9 17 9" />
          <path d="M8.6 14.2c.9 1.4 2 2.1 3.4 2.1s2.5-.7 3.4-2.1" />
          <circle cx="9.3" cy="11.6" r=".5" fill="#fff" />
          <circle cx="14.7" cy="11.6" r=".5" fill="#fff" />
        </svg>
      );
    case 'star':
      return (
        <svg {...common}>
          <polygon points="12 3.2 14.7 8.9 20.9 9.6 16.3 13.8 17.6 19.9 12 16.8 6.4 19.9 7.7 13.8 3.1 9.6 9.3 8.9" />
        </svg>
      );
    case 'chat':
      return (
        <svg {...common}>
          <path d="M6 4.5h12a2.5 2.5 0 0 1 2.5 2.5v7a2.5 2.5 0 0 1-2.5 2.5h-6.2L8 19.8v-3.8H6A2.5 2.5 0 0 1 3.5 13.5V7A2.5 2.5 0 0 1 6 4.5z" />
        </svg>
      );
  }
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-full h-full"
      aria-hidden
    >
      <path d="M4 12h16M13.5 5.5 20 12l-6.5 6.5" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Decorações de fundo (SVG em código)                                 */
/* Cada uma é ancorada num canto e escala proporcionalmente à largura. */
/* ------------------------------------------------------------------ */

function DrawerDecorations() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* Topo esquerdo: blob rosa + 3 traços amarelos */}
      <svg
        viewBox="0 0 380 270"
        className="absolute top-0 left-0 block"
        style={{ width: 'clamp(110px, 39vw, 400px)', height: 'auto' }}
      >
        <path
          d="M0 0H370C352 62 298 98 225 98C152 98 120 140 86 180C62 206 32 220 0 220Z"
          fill="#d684bf"
        />
        <g stroke="#ffc34d" strokeWidth="17" strokeLinecap="round" fill="none">
          <path d="M146 146 163 180" />
          <path d="M100 190 130 208" />
          <path d="M96 252 124 245" />
        </g>
      </svg>

      {/* Direita, meio: 3 traços amarelos */}
      <svg
        viewBox="0 0 80 150"
        className="absolute right-0 block"
        style={{ top: '45%', width: 'clamp(28px, 8.5vw, 84px)', height: 'auto' }}
      >
        <g stroke="#ffc34d" strokeWidth="17" strokeLinecap="round" fill="none">
          <path d="M44 14 20 36" />
          <path d="M36 76 68 70" />
          <path d="M30 118 56 134" />
        </g>
      </svg>

      {/* Base esquerda: blob amarelo */}
      <svg
        viewBox="0 0 430 232"
        className="absolute bottom-0 left-0 block"
        style={{ width: 'clamp(120px, 46vw, 480px)', height: 'auto' }}
      >
        <path
          d="M0 8C90 -10 170 20 210 80C240 130 290 150 340 148C380 148 410 170 430 232H0Z"
          fill="#ffc455"
        />
      </svg>

      {/* Base direita: blob rosa + 3 traços verdes */}
      <svg
        viewBox="0 -80 551 322"
        className="absolute bottom-0 right-0 block"
        style={{ width: 'clamp(150px, 58vw, 600px)', height: 'auto' }}
      >
        <path
          d="M0 242C40 200 110 175 180 170C190 100 280 55 340 78C378 92 398 108 406 120C430 60 490 20 551 0V242Z"
          fill="#e286bb"
        />
        <g stroke="#3dbd8a" strokeWidth="17" strokeLinecap="round" fill="none">
          <path d="M455 -62 468 -20" />
          <path d="M397 -18 430 10" />
          <path d="M384 48 416 48" />
        </g>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* NavBar                                                              */
/* ------------------------------------------------------------------ */

export default function NavBar({ links = defaultLinks }: NavBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  // Trava o scroll do body e permite fechar com ESC
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen]);

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
          className={`text-[#e6007e] focus:outline-none p-2 w-full h-full flex items-center justify-center ${isOpen ? 'block' : 'hidden'}`}
          aria-label="Fechar menu"
        >
          {/* sem mt-18: o X fica no topo direito, como no design */}
          <svg className="w-8 h-8 mt-18 -translate-x-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
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
      <nav
        aria-hidden={!isOpen}
        className={`
          fixed inset-0 z-40 min-[1301px]:hidden
          overflow-y-auto overflow-x-hidden
          transition-[translate, transform,visibility] duration-300 ease-in-out
          ${isOpen ? 'translate-x-0 visible' : 'translate-x-full invisible'}
        `}
        style={{
          backgroundColor: '#faf8f4',
          // Altura da pílula: acompanha largura E altura da tela
          // (≈15.7vw no design; limitada por 11.5vh para caber em telas baixas)
          ['--pill-h' as string]: 'clamp(52px, min(15.7vw, 11.5vh), 112px)',
        }}
      >
        <DrawerDecorations />

        {/* Área de conteúdo: centraliza na vertical; se faltar altura, rola */}
        <div className="relative z-10 min-h-full flex flex-col items-center py-6">
          <ul
            className="m-auto flex flex-col items-stretch list-none p-0"
            style={{
              width: 'min(92%, max(68%, 250px), 560px)',
              gap: 'clamp(12px, 2.7vh, 34px)',
            }}
          >
            {links.map((link, index) => {
              const accent = link.accent ?? link.hoverColor;
              const bg = link.bg ?? '#f3f3f3';
              return (
                <li key={`mob-${index}`} onClick={() => setIsOpen(false)}>
                  <Link
                    href={link.href}
                    className="flex items-center rounded-full transition-transform duration-150 active:scale-[0.98] hover:brightness-[0.98]"
                    style={{
                      height: 'var(--pill-h)',
                      backgroundColor: bg,
                      paddingLeft: 'calc(var(--pill-h) * 0.22)',
                      paddingRight: 'calc(var(--pill-h) * 0.3)',
                      gap: 'calc(var(--pill-h) * 0.26)',
                      color: '#1f2a37',
                    }}
                  >
                    {/* Círculo com ícone */}
                    <span
                      className="shrink-0 rounded-full flex items-center justify-center"
                      style={{
                        width: 'calc(var(--pill-h) * 0.68)',
                        height: 'calc(var(--pill-h) * 0.68)',
                        backgroundColor: accent,
                        padding: 'calc(var(--pill-h) * 0.15)',
                      }}
                    >
                      {link.icon && <MenuIcon name={link.icon} />}
                    </span>

                    {/* Texto: só a primeira letra maiúscula, como no design */}
                    <span
                      className="flex-1 min-w-0 truncate"
                      style={{
                        fontFamily: "'Quicksand', 'Nunito', ui-rounded, system-ui, sans-serif",
                        fontWeight: 500,
                        fontSize: 'max(15px, calc(var(--pill-h) * 0.3))',
                        lineHeight: 1.1,
                        textTransform: 'lowercase',
                      }}
                    >
                      <span style={{ display: 'inline-block', textTransform: 'capitalize' }}>
                        {link.label.toLowerCase()}
                      </span>
                    </span>

                    {/* Seta */}
                    <span
                      className="shrink-0"
                      style={{
                        width: 'calc(var(--pill-h) * 0.26)',
                        height: 'calc(var(--pill-h) * 0.26)',
                        color: accent,
                      }}
                    >
                      <ArrowIcon />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </div>
  );
}