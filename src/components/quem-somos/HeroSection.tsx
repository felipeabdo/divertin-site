import Botao from "@/components/Botao";
import NavBar from "@/components/NavBar";
import Arrow from "./Arrow";
import Cloud from "../Cloud";
import { PAL } from "./data";
import { CONTATO } from "@/data/contatoData";

export default function HeroSection() {
  return (
    <section className="relative min-h-[580px] w-full overflow-hidden lg:min-h-[650px]">
      {/* fundo: a foto da home desfocada e tingida, para a Jéssica se destacar */}
      <div aria-hidden className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-6 bg-[url(/bg-hero.png)] bg-cover bg-top bg-no-repeat blur-md" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(78,31,68,.94), rgba(214,132,191,.70) 56%, rgba(214,132,191,.35))",
          }}
        />
      </div>

      <header className="absolute inset-x-0 top-[25px] z-30 h-24 px-6">
        <div className="min-[1301px]:absolute min-[1301px]:left-1/2 min-[1301px]:top-8 min-[1301px]:-translate-x-1/2">
          <NavBar />
        </div>
      </header>

      <div className="relative mt-[-60] z-10 mx-auto grid min-h-[580px] w-full max-w-6xl grid-cols-1 items-end gap-4 px-6 pb-20 pt-36 lg:min-h-[650px] lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-8 lg:pb-24">
        <div className="max-w-2xl pb-2 text-white lg:pb-0">
          <img
            src="/logo (1).png"
            alt="Logo Divertin"
            className="mb-6 h-auto w-44 object-contain sm:w-52 lg:w-60"
          />
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#FDD5A5]">
            A clínica onde brincar também é cuidar
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
            Quem Somos
          </h1>
          <p className="mt-5 max-w-xl text-base font-semibold leading-relaxed text-white/90 sm:text-lg">
            A Divertin nasceu do desejo de tornar o cuidado infantil mais
            acolhedor, leve e significativo. Somos uma clínica de fonoaudiologia
            que acredita que cada criança tem seu próprio jeito de se comunicar,
            aprender e se desenvolver.
          </p>
          <div className="mt-7 w-full sm:w-auto">
            <Botao
              cor="rosinha"
              href={CONTATO.whatsappUrl}
              target="_blank"
              rel="noreferrer"              
            >
              Quero agendar uma avaliação <Arrow />
            </Botao>
          </div>
        </div>

        <figure className="relative flex items-end justify-center lg:h-[650px] lg:justify-end">
          {/* Em telas menores, mantemos o retrato compacto para não competir com o texto. */}
          <div
            className="relative mt-6 aspect-square w-full max-w-[240px] overflow-hidden shadow-xl sm:max-w-[280px] lg:hidden"
            style={{
              borderRadius: "70px 120px 80px 110px / 70px 90px 100px 80px",
            }}
          >
            <img
              src="/Jessica.jpeg"
              alt="Jéssica Del Corso, CEO e fundadora"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          <figcaption className="mt-3 text-center text-white lg:absolute lg:bottom-8 lg:left-auto lg:right-[78%] lg:mt-0 lg:translate-x-0 lg:whitespace-nowrap lg:text-left">
            <strong className="block text-xl font-black leading-tight sm:text-2xl">
              Jéssica Del Corso
            </strong>
            <span className="text-sm font-semibold text-white/90 sm:text-base">
              CEO e fundadora
            </span>
          </figcaption>

          {/* A imagem de corpo inteiro fica limitada à mesma altura da hero em desktop. */}
          <img
            src="/jessica-full.png"
            alt="Jéssica Del Corso, CEO e fundadora"
            className="hidden h-full w-auto max-w-none object-contain object-bottom drop-shadow-[0_14px_22px_rgba(0,0,0,.28)] lg:block"
          />
        </figure>
      </div>

      <Cloud position="bottom" color={PAL.orangeSoft} />
    </section>
  );
}
