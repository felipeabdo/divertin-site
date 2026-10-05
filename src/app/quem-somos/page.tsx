import type { Metadata } from 'next';
import Botao from '@/components/Botao';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

export const metadata: Metadata = { title: 'Quem Somos | Divertin' };

/**
 * COMO TROCAR AS FOTOS
 * 1) Copie a imagem para a pasta /public do projeto (ex.: public/equipe/ana.jpg).
 * 2) Abaixo, escreva o caminho começando por "/" e SEM a palavra "public": '/equipe/ana.jpg'.
 * Campo vazio (undefined) = aparece o placeholder colorido.
 *
 * Equipe:  ana, rafaela, camila  (ordem dos cards, da esquerda para a direita)
 * Clínica: clinicaGrande = foto larga da esquerda
 *          clinica1 = topo esquerdo | clinica2 = topo direito
 *          clinica3 = baixo esquerdo | clinica4 = baixo direito
 */
const IMG: Record<string, string | undefined> = {
  ana: undefined,
  rafaela: undefined,
  camila: undefined, // sem foto = usa a ilustração
  clinicaGrande: undefined,
  clinica1: undefined,
  clinica2: undefined,
  clinica3: undefined,
  clinica4: undefined,
};

/**
 * PALETA DA LOGO: lima, rosa, laranja, verde-água e branco.
 * Cada cor tem a versão "cheia" (detalhes) e a "Soft" (fundos de divs).
 * Para mudar um tom na página inteira, basta editar aqui.
 */
const PAL = {
  lime: '#c8d93b', limeSoft: '#e6f08f',
  pink: '#d684bf', pinkSoft: '#f4cfe7',
  orange: '#f7931e', orangeSoft: '#fdd5a5',
  green: '#6fbf9f', greenSoft: '#bfe3d2',
};

/* ------------------------------ peças reutilizáveis ------------------------------ */

function Photo({
  src, alt, className = '', style, tone = PAL.orangeSoft, icon = '🧸',
}: { src?: string; alt: string; className?: string; style?: React.CSSProperties; tone?: string; icon?: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ ...style, background: `linear-gradient(135deg, ${tone}, #fff)` }}>
      {src ? (
        <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <span aria-hidden className="absolute inset-0 grid place-items-center text-6xl opacity-60">{icon}</span>
      )}
    </div>
  );
}

function Blob({ color, radius, className = '' }: { color: string; radius: string; className?: string }) {
  return <div aria-hidden className={`pointer-events-none absolute ${className}`} style={{ background: color, borderRadius: radius }} />;
}

function Dashes({ color, className = '', rotate = 0, size = 44 }: { color: string; className?: string; rotate?: number; size?: number }) {
  return (
    <svg aria-hidden viewBox="0 0 40 40" fill="none" stroke={color} strokeWidth="4.5" strokeLinecap="round"
      className={`pointer-events-none absolute ${className}`} style={{ width: size, height: size, transform: `rotate(${rotate}deg)` }}>
      <path d="M7 9l7 8" /><path d="M21 4l3 11" /><path d="M20 30l12-4" />
    </svg>
  );
}

function StarShape({ color, className = '' }: { color: string; className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill={color} stroke={color} strokeWidth="2.4" strokeLinejoin="round"
      className={`pointer-events-none absolute ${className}`}>
      <polygon points="12 2.5 14.8 8.8 21.5 9.3 16.4 13.7 18 20.3 12 16.8 6 20.3 7.6 13.7 2.5 9.3 9.2 8.8" />
    </svg>
  );
}

function Heart({ color, className = '' }: { color: string; className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinejoin="round"
      className={`pointer-events-none absolute ${className}`}>
      <path d="M12 20.5S3.5 15.2 3.5 9.3A4.6 4.6 0 0 1 12 7a4.6 4.6 0 0 1 8.5 2.3C20.5 15.2 12 20.5 12 20.5z" />
    </svg>
  );
}

/**
 * Divisor de nuvem (mesma imagem da home). Sem `color`, a nuvem é branca como na home.
 * Com `color`, a nuvem é pintada dessa cor (usa a imagem como máscara), para emendar
 * o hero direto numa seção colorida.
 */
function Cloud({ position, color }: { position: 'top' | 'bottom'; color?: string }) {
  const url = `url('/cloud (1).png')`;
  const style: React.CSSProperties = color
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

function Avatar({ tone }: { tone: string }) {
  return (
    <svg viewBox="0 0 300 200" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMax slice" aria-hidden>
      <rect width="300" height="200" fill={tone} />
      <path d="M70 30c30-30 80-26 110-4 30 20 50 60 20 90-30 30-90 20-120 0S40 50 70 30z" fill="#fff" opacity=".7" />
      <path d="M100 200c0-40 20-60 50-60s50 20 50 60z" fill="#fff" />
      <path d="M130 140l20 40 20-40z" fill={PAL.pink} />
      <path d="M108 78c0-34 18-52 42-52s42 18 42 52c0 30 6 60 12 90h-26l-6-52h-44l-6 52H96c6-30 12-60 12-90z" fill="#4a2c3d" />
      <ellipse cx="150" cy="88" rx="26" ry="32" fill="#f4d8c3" />
      <path d="M124 70c8 6 20 8 26-6 8 12 18 14 28 12-4-28-52-30-54-6z" fill="#4a2c3d" />
    </svg>
  );
}

const ARROW = <img src="/arrow_forward.svg" alt="Seta do botão" className="inline ml-2" />;
const H2 = 'text-3xl md:text-4xl font-medium leading-tight text-gray-800';

/* ------------------------------------ página ------------------------------------ */

export default function QuemSomosPage() {
  const team = [
    { name: 'Ana Luiza', src: IMG.ana, tone: PAL.pinkSoft, icon: '🦖', accent: PAL.pink },
    { name: 'Rafaela', src: IMG.rafaela, tone: PAL.greenSoft, icon: '🦖', accent: PAL.green },
    { name: 'Camila Souza', src: IMG.camila, tone: PAL.orangeSoft, icon: '', accent: PAL.orange },
  ];

  const gallery = [
    { src: IMG.clinica1, tone: PAL.orangeSoft, icon: '📚', radius: '90px 60px 110px 50px / 80px 70px 90px 60px' },
    { src: IMG.clinica2, tone: PAL.greenSoft, icon: '🧗', radius: '60px 100px 50px 90px / 60px 80px 70px 90px' },
    { src: IMG.clinica3, tone: PAL.limeSoft, icon: '✏️', radius: '110px 60px 80px 40px / 90px 60px 70px 50px' },
    { src: IMG.clinica4, tone: PAL.pinkSoft, icon: '🪴', radius: '50px 110px 60px 100px / 60px 90px 80px 70px' },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      {/* ============ HERO (mesma linguagem da home) ============ */}
      <section className="relative flex min-h-[640px] w-full flex-col lg:min-h-[740px]">
        {/* fundo: a foto da home desfocada e tingida, para a Jéssica se destacar */}
        <div aria-hidden className="absolute inset-0 overflow-hidden">
          <div className="absolute -inset-6 bg-[url(/bg-hero.png)] bg-cover bg-top bg-no-repeat blur-md" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(128,44,106,.9), rgba(214,132,191,.62) 55%, rgba(214,132,191,.35))' }} />
        </div>

        <header className="absolute inset-x-0 top-0 z-30 h-24 px-6">
          <div className="min-[1301px]:absolute min-[1301px]:left-1/2 min-[1301px]:top-8 min-[1301px]:-translate-x-1/2">
            <NavBar />
          </div>
        </header>

        <div className="relative z-[5] mx-auto grid w-full max-w-7xl flex-1 items-end gap-4 px-6 pt-10 lg:grid-cols-[1fr_auto] lg:gap-10 lg:pt-28">
          <div className="max-w-[560px] pb-6 lg:pb-28">
            <img src="/logo (1).png" alt="Logo Divertin" className="mb-6 h-auto w-44 object-contain lg:w-60" />
            <h1 className="font-avenir mb-3 text-[40px] font-black leading-tight text-white md:text-[52px] lg:text-[60px]">Quem Somos</h1>
            <p className="font-avenir mb-4 text-[20px] font-bold leading-snug text-[#F18B1F] md:text-[24px]">
              A clínica onde brincar também é cuidar.
            </p>
            <p className="font-avenir mb-6 text-[16px] font-semibold leading-relaxed text-white lg:text-lg">
              A Divertin nasceu do desejo de tornar o cuidado infantil mais acolhedor, leve e significativo.
              Somos uma clínica de fonoaudiologia que acredita que cada criança tem seu próprio jeito de se comunicar,
              aprender e se desenvolver.
            </p>
            <div className="w-full sm:w-auto">
              <Botao cor="rosinha">Quero agendar uma avaliação {ARROW}</Botao>
            </div>
          </div>

          <figure className="flex flex-col items-center pb-16 lg:flex-row lg:items-end lg:gap-8 lg:pb-0">
            {/* Mobile/tablet: retrato em quadro arredondado, como as outras fotos da página */}
            <div
              className="relative aspect-square w-full max-w-[300px] overflow-hidden shadow-xl sm:max-w-[340px] lg:hidden"
              style={{ borderRadius: '70px 120px 80px 110px / 70px 90px 100px 80px' }}
            >
              <img src="/Jessica.jpeg" alt="Jéssica Del Corso, CEO e fundadora" className="absolute inset-0 h-full w-full object-cover" />
            </div>

            <figcaption className="font-avenir mt-4 text-center text-white lg:mt-0 lg:self-center lg:text-left">
              <strong className="block whitespace-nowrap text-[22px] font-black leading-tight">Jéssica Del Corso</strong>
              <span className="text-base font-semibold text-white/90">CEO e fundadora</span>
            </figcaption>

            {/* Desktop: corpo inteiro, 800px de altura */}
            <img
              src="/jessica-full.png"
              alt="Jéssica Del Corso, CEO e fundadora"
              className="hidden h-[800px] w-auto max-w-none object-contain object-bottom drop-shadow-[0_14px_22px_rgba(0,0,0,.28)] lg:block"
            />
          </figure>
        </div>

        <Cloud position="bottom" color={PAL.orangeSoft} />
      </section>

      {/* ============ CUIDAR TAMBÉM PODE SER DIVERTIDO (faixa com nuvens) ============ */}
      <section className="relative pb-20 pt-24 md:pb-24 md:pt-28" style={{ background: PAL.orangeSoft }}>
        <Dashes color={PAL.pink} className="left-[4%] top-12 hidden md:block" size={40} rotate={-15} />
        <Dashes color={PAL.green} className="bottom-12 right-[5%] hidden md:block" size={40} rotate={170} />

        <div className="relative z-20 mx-auto grid max-w-6xl items-center gap-10 px-6 md:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className={H2}>Cuidar também pode ser divertido</h2>
            <p className="mt-5 text-base leading-relaxed text-gray-700 md:text-lg">
              Na <strong className="text-gray-800">Divertin</strong>, o brincar é uma ferramenta terapêutica de escolha.
              É brincando que a criança se envolve, experimenta, cria vínculos e encontra caminhos naturais para desenvolver
              comunicação, linguagem e autonomia. Cada atividade é pensada de forma individualizada, respeitando o tempo,
              os interesses e as necessidades de cada criança.
            </p>
          </div>

          <div className="relative mx-auto h-[240px] w-full max-w-[350px]">
            <div className="absolute inset-0 bg-white/60" style={{ borderRadius: '58% 42% 52% 48% / 55% 58% 42% 45%' }} />
            <div className="absolute left-[8%] top-[24%] h-[98px] w-[98px] rounded-full shadow-md"
              style={{ background: `conic-gradient(${PAL.lime} 0 25%, ${PAL.pink} 0 50%, ${PAL.orange} 0 75%, ${PAL.green} 0)` }} />
            <svg aria-hidden viewBox="0 0 24 24" className="absolute left-[44%] top-[44%] h-[66px] w-[66px] -rotate-6 drop-shadow">
              <polygon points="12 2.5 14.8 8.8 21.5 9.3 16.4 13.7 18 20.3 12 16.8 6 20.3 7.6 13.7 2.5 9.3 9.2 8.8"
                fill={PAL.orange} stroke={PAL.orange} strokeWidth="2" strokeLinejoin="round" />
              <circle cx="10" cy="12.5" r=".8" fill="#7a2f63" /><circle cx="14" cy="12.5" r=".8" fill="#7a2f63" />
              <path d="M10.2 14.6c1 .9 2.6.9 3.6 0" stroke="#7a2f63" strokeWidth=".7" fill="none" strokeLinecap="round" />
            </svg>
            <div className="absolute bottom-[14%] right-[5%] flex flex-col items-center gap-[3px]">
              <span className="h-[24px] w-[24px] rounded-full" style={{ background: PAL.pink }} />
              {[[PAL.green, 48], [PAL.lime, 66], [PAL.orange, 82], [PAL.pink, 98]].map(([c, w]) => (
                <span key={c as string} className="h-[22px] rounded-full" style={{ background: c as string, width: w as number }} />
              ))}
            </div>
            <Dashes color={PAL.lime} className="right-[16%] top-[2%]" size={40} rotate={20} />
          </div>
        </div>

        <Cloud position="bottom" />
      </section>

      {/* ============ NOSSA EQUIPE ============ */}
      <section className="relative mx-auto mt-24 max-w-6xl px-6">
        <Dashes color={PAL.pink} className="-left-2 -top-3 hidden md:block" size={34} rotate={-30} />
        <h2 className={`${H2} text-center md:text-left`}>Nossa equipe</h2>

        <div className="relative mt-10 grid gap-8 sm:grid-cols-3">
          <Dashes color={PAL.orange} className="-left-10 top-[40%] hidden xl:block" size={42} rotate={-15} />
          <Dashes color={PAL.orange} className="-right-10 top-[36%] hidden xl:block" size={42} rotate={165} />
          {team.map((m) => (
            <article key={m.name}>
              <div className="relative h-[210px] overflow-hidden" style={{ borderRadius: '2rem 2rem 0 0', background: `linear-gradient(135deg, ${m.tone}, #fff)` }}>
                {m.src
                  ? <img src={m.src} alt={m.name} className="absolute inset-0 h-full w-full object-cover object-top" />
                  : m.icon ? <span aria-hidden className="absolute inset-0 grid place-items-center text-6xl opacity-60">{m.icon}</span> : <Avatar tone={m.tone} />}
              </div>
              <div className="relative -mt-7 rounded-3xl px-6 pb-5 pt-4 shadow-md" style={{ background: m.tone, border: '3px solid #fff' }}>
                <span className="mb-2 block h-1.5 w-10 rounded-full" style={{ background: m.accent }} />
                <h3 className="text-xl font-bold leading-tight text-gray-800">{m.name}</h3>
                <p className="mt-1 text-base text-gray-600">Fonoaudióloga</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ============ A CLÍNICA ============ */}
      <section className="relative mx-auto mt-24 max-w-6xl px-6">
        <Blob color={PAL.lime} radius="50% 50% 45% 55% / 55% 50% 50% 45%" className="-right-4 -top-4 hidden h-[64px] w-[58px] lg:block" />
        <Blob color={PAL.greenSoft} radius="50%" className="-left-4 top-[300px] hidden h-[40px] w-[40px] lg:block" />
        <Dashes color={PAL.green} className="-right-4 bottom-8 hidden lg:block" size={34} rotate={200} />

        <div className="grid gap-8 lg:grid-cols-[1.25fr_1fr]">
          <div>
            <h2 className={H2}>A clínica</h2>
            <p className="mt-1 text-xl font-semibold text-gray-700 md:text-2xl">Um espaço pensado para acolher</p>
            <p className="mt-4 max-w-[420px] text-base leading-relaxed text-gray-600 md:text-lg">
              Cada cantinho foi pensado para que crianças e famílias se sintam seguras, confortáveis e à vontade desde o primeiro encontro.
            </p>
            <Photo src={IMG.clinicaGrande} alt="Sala de atividades da clínica" tone={PAL.pinkSoft} icon="🪑"
              className="mt-6 h-[230px] w-full shadow-md lg:h-[240px] lg:w-[108%]"
              style={{ borderRadius: '60px 130px 90px 120px / 50px 90px 110px 90px' }} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {gallery.map((g, i) => (
              <Photo key={i} src={g.src} alt={`Espaço da clínica ${i + 1}`} tone={g.tone} icon={g.icon}
                className="h-[160px] shadow-md sm:h-[180px]" style={{ borderRadius: g.radius }} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="mx-auto mt-24 max-w-6xl px-6 pb-20">
        <div className="relative px-8 py-12 text-center" style={{ background: PAL.limeSoft, borderRadius: '50px 130px 60px 120px / 50px 60px 90px 60px' }}>
          <Heart color={PAL.pink} className="left-[7%] top-[38%] hidden h-12 w-12 md:block" />
          <StarShape color={PAL.orange} className="bottom-[16%] right-[8%] hidden h-10 w-10 md:block" />
          <h2 className={H2}>Vamos conversar?</h2>
          <p className="mx-auto mb-6 mt-3 max-w-md text-base text-gray-600 md:text-lg">
            Conheça a <strong className="text-gray-800">Divertin</strong> e descubra como podemos caminhar juntos no desenvolvimento da sua criança.
          </p>
          <div className="flex w-full justify-center [&>*]:mx-0">
            <Botao cor="laranja_escuro">Agendar avaliação {ARROW}</Botao>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}