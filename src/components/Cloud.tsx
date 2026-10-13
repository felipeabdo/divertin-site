import type { CSSProperties } from 'react';

interface CloudProps {
  position: 'top' | 'bottom';
  color?: string;
  imageUrl?: string; // 👈 Nova prop opcional para trocar a imagem
}

/**
 * Divisor de nuvem. Sem `color`, a nuvem é branca.
 * Com `color`, a nuvem é pintada dessa cor (usa a imagem como máscara).
 * `imageUrl` permite customizar a imagem utilizada (padrão: '/cloud (1).png').
 */
export default function Cloud({ 
  position, 
  color, 
  imageUrl = '/cloud (1).png' // 👈 Valor padrão caso não seja enviado
}: CloudProps) {
  
  // Dynamic URL baseada na prop imageUrl
  const url = `url('${imageUrl}')`; 
  
  const style: CSSProperties = color
    ? {
        backgroundColor: color,
        WebkitMaskImage: url,
        maskImage: url,
        WebkitMaskRepeat: 'repeat-x',
        maskRepeat: 'repeat-x',
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        WebkitMaskPosition: 'bottom',
        maskPosition: 'bottom',
      }
    : { 
        backgroundImage: url 
      };

  return (
    <div
      aria-hidden
      className={`absolute left-0 z-10 h-[30px] w-full md:h-[70px] ${
        position === 'bottom' ? 'bottom-0 translate-y-[50%]' : 'top-0 -translate-y-[50%]'
      }`}
    >
      <div
        className={`h-full w-full ${color ? '' : 'bg-repeat-x bg-contain bg-bottom'}`}
        style={style}
      />
    </div>
  );
}
