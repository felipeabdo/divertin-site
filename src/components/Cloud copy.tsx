import type { CSSProperties } from 'react';

/**
 * Divisor de nuvem (mesma imagem da home). Sem `color`, a nuvem é branca como na home.
 * Com `color`, a nuvem é pintada dessa cor (usa a imagem como máscara), para emendar
 * o hero direto numa seção colorida.
 */
export default function Cloud({ position, color }: { position: 'top' | 'bottom'; color?: string }) {
  const url = `url('/cloud (1).png')`;
  const style: CSSProperties = color
    ? {
        backgroundColor: color,
        WebkitMaskImage: url, maskImage: url,
        WebkitMaskRepeat: 'repeat-x', maskRepeat: 'repeat-x',
        WebkitMaskSize: 'contain', maskSize: 'contain',
        WebkitMaskPosition: 'bottom', maskPosition: 'bottom',
      }
    : { backgroundImage: url };
  return (
    <div
      aria-hidden
      className={`absolute left-0 z-10 h-[30px] w-full md:h-[70px] ${
        position === 'bottom' ? 'bottom-0 translate-y-[50%]' : 'top-0 -translate-y-[50%]'
      }`}
    >
      <div className={`h-full w-full ${color ? '' : 'bg-repeat-x bg-contain bg-bottom'}`} style={style} />
    </div>
  );
}
