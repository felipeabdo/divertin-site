'use client';

import { useEffect, useState } from 'react';
import { preload } from 'react-dom';

interface PageLoaderProps {
  /** Caminho do GIF dentro da pasta /public. Ex.: "/loading.gif" (sem escrever "public") */
  src?: string;

  /**
   * LARGURA do GIF.
   * - número  -> pixels (ex.: 180)
   * - texto   -> qualquer unidade CSS (ex.: "30vw", "12rem", "clamp(120px, 28vw, 220px)")
   */
  width?: number | string;

  /**
   * ALTURA do GIF. Deixe sem preencher (recomendado): a altura acompanha a
   * largura e o GIF nunca fica esticado. Só preencha se quiser forçar um tamanho.
   */
  height?: number | string;

  /** Largura máxima, para o GIF nunca passar da tela em celulares pequenos (270px) */
  maxWidth?: string;

  /** Texto alternativo (leitores de tela) */
  alt?: string;

  /** Cor de fundo da tela de loading */
  backgroundColor?: string;

  /** Tempo mínimo (ms) que o loading fica na tela, para não "piscar" em conexões rápidas */
  minDuration?: number;

  /** Duração (ms) do desaparecimento suave (fade) */
  fadeDuration?: number;

  /** Segurança: tempo máximo (ms) de loading, mesmo que algum recurso trave */
  maxDuration?: number;
}

export default function PageLoader({
  src = '/loading.gif',
  width = 180,
  height,
  maxWidth = '80vw',
  alt = 'Carregando...',
  backgroundColor = '#ffffff',
  minDuration = 600,
  fadeDuration = 400,
  maxDuration = 10000,
}: PageLoaderProps) {
  /** false = o loading já foi removido da tela */
  const [visible, setVisible] = useState(true);
  /** true = começou o fade de saída */
  const [fading, setFading] = useState(false);

  // Pede ao navegador para baixar o GIF com prioridade máxima (ele aparece antes do resto)
  preload(src, { as: 'image', fetchPriority: 'high' });

  // Espera a página carregar por completo (HTML + imagens + CSS + fontes)
  useEffect(() => {
    const startedAt = Date.now();
    let finished = false;
    let minTimer: ReturnType<typeof setTimeout>;
    let fadeTimer: ReturnType<typeof setTimeout>;

    const finish = () => {
      if (finished) return;
      finished = true;
      const remaining = Math.max(0, minDuration - (Date.now() - startedAt));
      minTimer = setTimeout(() => {
        setFading(true);
        fadeTimer = setTimeout(() => setVisible(false), fadeDuration);
      }, remaining);
    };

    // O evento "load" do navegador NÃO espera imagens de fundo feitas em CSS
    // (ex.: bg-[url(/bg-hero.png)]). Então procuramos todas e esperamos cada uma.
    const waitForBackgroundImages = () => {
      const urls = new Set<string>();
      document.querySelectorAll<HTMLElement>('body *').forEach((el) => {
        if (el.getClientRects().length === 0) return; // elemento escondido: não baixa nada
        const bg = getComputedStyle(el).backgroundImage;
        if (!bg || bg === 'none') return;
        for (const match of bg.matchAll(/url\((['"]?)(.*?)\1\)/g)) {
          if (!match[2].startsWith('data:')) urls.add(match[2]);
        }
      });
      return Promise.all(
        [...urls].map(
          (url) =>
            new Promise<void>((resolve) => {
              const img = new Image();
              img.onload = img.onerror = () => resolve(); // se falhar, não trava o loading
              img.src = url;
            }),
        ),
      );
    };

    const onWindowLoad = () => {
      // depois do "load", ainda espera as fontes e as imagens de fundo
      const fonts = document.fonts?.ready ?? Promise.resolve();
      Promise.all([fonts, waitForBackgroundImages()]).then(finish, finish);
    };

    if (document.readyState === 'complete') {
      onWindowLoad();
    } else {
      window.addEventListener('load', onWindowLoad, { once: true });
    }

    const safetyTimer = setTimeout(finish, maxDuration);

    return () => {
      window.removeEventListener('load', onWindowLoad);
      clearTimeout(safetyTimer);
      clearTimeout(minTimer);
      clearTimeout(fadeTimer);
    };
  }, [minDuration, fadeDuration, maxDuration]);

  // Impede a rolagem enquanto o loading está na tela.
  // IMPORTANTE: NÃO usamos "overflow: hidden" no body/html. Isso esconde a barra de
  // rolagem e, quando o loading sai, ela volta e a página inteira "se ajeita" (a largura
  // útil muda ~15px no desktop). Aqui só bloqueamos os gestos, sem mexer na barra.
  useEffect(() => {
    if (!visible) return;
    const block = (e: Event) => e.preventDefault();
    const blockKeys = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(e.key)) {
        e.preventDefault();
      }
    };
    window.addEventListener('wheel', block, { passive: false });
    window.addEventListener('touchmove', block, { passive: false });
    window.addEventListener('keydown', blockKeys);
    return () => {
      window.removeEventListener('wheel', block);
      window.removeEventListener('touchmove', block);
      window.removeEventListener('keydown', blockKeys);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <>
      {/* Sem JavaScript o loading nunca sairia da tela: nesse caso, escondemos ele */}
      <noscript>
        <style>{`#page-loader{display:none!important}`}</style>
      </noscript>

      <div
        id="page-loader"
        role="status"
        aria-live="polite"
        aria-busy={!fading}
        className="fixed inset-0 z-[9999] flex items-center justify-center"
        style={{
          backgroundColor,
          opacity: fading ? 0 : 1,
          transition: `opacity ${fadeDuration}ms ease`,
          pointerEvents: fading ? 'none' : 'auto',
        }}
      >
        {/* <img> comum (e não next/image) para o GIF continuar animado e carregar na hora */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          draggable={false}
          decoding="async"
          fetchPriority="high"
          style={{
            width: typeof width === 'number' ? `${width}px` : width,
            height: height === undefined ? 'auto' : typeof height === 'number' ? `${height}px` : height,
            maxWidth,
            objectFit: 'contain',
            userSelect: 'none',
          }}
        />
      </div>
    </>
  );
}
