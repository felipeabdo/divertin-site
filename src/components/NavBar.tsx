'use client';

import Link from 'next/link';
import { useState } from 'react';

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

export default function NavBar({ links = defaultLinks }: NavBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
      
      {/* CONTAINER CONTROLADOR DE BOTÕES UNIFICADO */}
      <div className="fixed top-6 right-6 min-[1301px]:hidden w-12 h-12 flex items-center justify-center z-50">
        
        {/* Botão Hambúrguer (Visível apenas se fechado) */}
        <button
          onClick={toggleMenu}
          className={`text-black focus:outline-none p-2 w-full h-full flex items-center justify-center ${isOpen ? 'hidden' : 'block'}`}
          aria-label="Abrir menu"
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
          className={`text-[#e6407d] focus:outline-none p-2 w-full h-full flex items-center justify-center ${isOpen ? 'block' : 'hidden'}`}
          aria-label="Fechar menu"
        >
          <svg className="w-8 h-8 mt-18" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
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

      {/* 2. CONTAINER EXCLUSIVO GAVETA MOBILE/TABLET (<= 1300px) */}
      <ul
        className={`
          fixed top-0 right-0 h-screen w-screen bg-white z-40
          flex flex-col items-center justify-center gap-8 
          text-black font-medium text-[24px] min-[1301px]:hidden    
          
          /* AS MUDANÇAS ESTÃO AQUI: */
          /* Deixamos as classes de transição estáticas e fixas para valerem nos dois sentidos */
          transition-transform duration-300 ease-in-out
          
          /* Alternamos estritamente o posicionamento do eixo X baseado no estado */
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Links da Gaveta */}
        {links.map((link, index) => (
          <li
            key={`mob-${index}`}
            style={{ '--hover-color': link.hoverColor } as React.CSSProperties}
            onClick={() => setIsOpen(false)}
            className="w-full text-center"
          >
            <Link
              href={link.href}              
              className="text-[var(--hover-color)] hover:opacity-80 transition-opacity duration-200 block py-3 font-bold"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
