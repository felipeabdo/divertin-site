import Botao from '@/components/Botao';
import NavBar from '@/components/NavBar';
import Arrow from './Arrow';
import Cloud from './Cloud';
import { PAL } from './data';

export default function HeroSection() {
  return (
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
            <Botao cor="rosinha">Quero agendar uma avaliação <Arrow /></Botao>
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
  );
}
