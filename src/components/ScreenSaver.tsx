'use client';

import { useEffect, useRef, useState } from 'react';

interface ScreenSaverProps {
  /** Caminho do GIF dentro da pasta /public. Ex.: "/descanso.gif" (sem escrever "public") */
  src?: string;

  /**
   * ⏱️ TEMPO DE INATIVIDADE, em MINUTOS, até o descanso de tela aparecer.
   * Aceita decimais: 5 = 5 min · 10 = 10 min · 0.5 = 30 s · 0.1 = 6 s (bom para testar).
   */
  idleMinutes?: number;

  /**
   * LARGURA do GIF.
   * - número  -> pixels (ex.: 220)
   * - texto   -> qualquer unidade CSS (ex.: "30vw", "12rem", "clamp(140px, 30vw, 260px)")
   */
  width?: number | string;

  /** ALTURA do GIF. Sem preencher (recomendado), acompanha a largura e não estica o GIF. */
  height?: number | string;

  /** Largura máxima, para o GIF nunca passar da tela em celulares pequenos (270px) */
  maxWidth?: string;

  /** Texto alternativo (leitores de tela) */
  alt?: string;

  /** Cor de fundo do descanso de tela */
  backgroundColor?: string;

  /** Duração (ms) do aparecer/desaparecer suave (fade) */
  fadeDuration?: number;
}

type Phase = 'idle' | 'entering' | 'visible' | 'leaving';

/** Qualquer um desses eventos conta como "a pessoa está usando o site" */
const ACTIVITY_EVENTS = [
  'mousemove',
  'mousedown',
  'pointerdown',
  'keydown',
  'touchstart',
  'wheel',
  'scroll',
] as const;

/** Eventos que acordam (fecham) o descanso de tela */
const WAKE_EVENTS = [
  'mousemove',
  'mousedown',
  'pointerdown',
  'keydown',
  'touchstart',
  'touchmove',
  'wheel',
] as const;

/**
 * Logo que o descanso de tela aparece, o navegador pode disparar um "mousemove"
 * falso (porque algo novo surgiu embaixo do cursor parado). Ignoramos os eventos
 * desse período para ele não fechar sozinho.
 */
const WAKE_GRACE_MS = 700;

export default function ScreenSaver({
  src = '/descanso.gif',
  idleMinutes = 5,
  width = 220,
  height,
  maxWidth = '80vw',
  alt = 'Descanso de tela',
  backgroundColor = '#ffffff',
  fadeDuration = 600,
}: ScreenSaverProps) {
  const [phase, setPhase] = useState<Phase>('idle');
  /** Momento (ms) da última atividade da pessoa no site */
  const lastActivity = useRef(0);

  const idleMs = Math.max(1000, idleMinutes * 60 * 1000);
  const isActive = phase === 'entering' || phase === 'visible';

  // 1) Registra a atividade da pessoa (só grava um número: não causa re-render)
  useEffect(() => {
    lastActivity.current = Date.now();
    const markActive = () => {
      lastActivity.current = Date.now();
    };
    ACTIVITY_EVENTS.forEach((e) =>
      window.addEventListener(e, markActive, { passive: true, capture: true }),
    );
    // Voltar para a aba também conta como atividade (evita aparecer assim que a pessoa volta)
    document.addEventListener('visibilitychange', markActive);
    return () => {
      ACTIVITY_EVENTS.forEach((e) => window.removeEventListener(e, markActive, { capture: true }));
      document.removeEventListener('visibilitychange', markActive);
    };
  }, []);

  // 2) Enquanto está tudo parado, confere a cada segundo se já passou o tempo
  useEffect(() => {
    if (phase !== 'idle') return;
    const timer = setInterval(() => {
      if (document.visibilityState === 'visible' && Date.now() - lastActivity.current >= idleMs) {
        setPhase('entering');
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [phase, idleMs]);

  // 3) Sequência de aparecer (fade-in) e sair (fade-out)
  useEffect(() => {
    if (phase === 'entering') {
      // espera 2 frames para o navegador pintar a tela transparente e então animar até 100%
      let raf2 = 0;
      const raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => setPhase('visible'));
      });
      return () => {
        cancelAnimationFrame(raf1);
        cancelAnimationFrame(raf2);
      };
    }
    if (phase === 'leaving') {
      const timer = setTimeout(() => setPhase('idle'), fadeDuration + 50);
      return () => clearTimeout(timer);
    }
  }, [phase, fadeDuration]);

  // 4) Com o descanso de tela na tela: qualquer movimento/tecla/toque fecha ele
  useEffect(() => {
    if (!isActive) return;
    const shownAt = Date.now();

    const wake = (e: Event) => {
      // Não deixa a página rolar, digitar nem clicar "por baixo" do descanso de tela
      if (e.cancelable) {
        if (e.type === 'keydown') {
          const k = e as KeyboardEvent;
          // atalhos do navegador (Ctrl+R, F5...) continuam funcionando
          if (!k.ctrlKey && !k.metaKey && !k.altKey && !/^F\d+$/.test(k.key)) e.preventDefault();
        } else if (e.type !== 'mousemove' && e.type !== 'pointerdown') {
          e.preventDefault();
        }
      }
      if (Date.now() - shownAt < WAKE_GRACE_MS) return;
      setPhase('leaving');
    };

    WAKE_EVENTS.forEach((e) =>
      window.addEventListener(e, wake, { passive: false, capture: true }),
    );
    return () => {
      WAKE_EVENTS.forEach((e) => window.removeEventListener(e, wake, { capture: true }));
    };
  }, [isActive]);

  // 5) Baixa o GIF em segundo plano, sem atrapalhar o carregamento do site,
  //    para ele já estar pronto quando o descanso de tela precisar aparecer
  useEffect(() => {
    let cancelled = false;
    const prefetch = () => {
      if (cancelled) return;
      const img = new Image();
      img.fetchPriority = 'low';
      img.src = src;
    };
    const schedule = () => setTimeout(prefetch, 2000);
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (document.readyState === 'complete') {
      timer = schedule();
    } else {
      window.addEventListener('load', () => (timer = schedule()), { once: true });
    }
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [src]);

  if (phase === 'idle') return null;

  return (
    <div
      id="screen-saver"
      role="status"
      aria-label={alt}
      className="fixed inset-0 z-[9990] flex items-center justify-center"
      style={{
        backgroundColor,
        opacity: phase === 'visible' ? 1 : 0,
        transition: `opacity ${fadeDuration}ms ease`,
      }}
    >
      {/* <img> comum (e não next/image) para o GIF continuar animado */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        draggable={false}
        decoding="async"
        style={{
          width: typeof width === 'number' ? `${width}px` : width,
          height: height === undefined ? 'auto' : typeof height === 'number' ? `${height}px` : height,
          maxWidth,
          objectFit: 'contain',
          userSelect: 'none',
        }}
      />
    </div>
  );
}
