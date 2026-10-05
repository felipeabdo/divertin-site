import Link from 'next/link';
import Botao from '@/components/Botao';
import NavBar from '@/components/NavBar';

export default function Contato() {
  return (
    <div className="overflow-x-hidden min-h-screen bg-white flex flex-col justify-between">
      
      {/* HEADER / NAVBAR (Ajustado para mostrar a logo no Desktop e no Mobile) */}
      <header className="w-full px-6 flex justify-between items-center h-24 relative z-20 min-[1301px]:justify-center">
        
        {/* Logo Mobile / Tablet (< 1300px) */}
        <div className="min-[1301px]:hidden mt-49">
          <img src="/logo (1).png" alt="Logo Divertin" className="w-48 h-auto object-contain"/>
        </div>

        {/* Logo Desktop (>= 1301px) - Posicionada de forma absoluta à esquerda do menu */}
        <div className="hidden min-[1301px]:block absolute left-6 top-8">
          <img src="/logo (1).png" alt="Logo Divertin" className="w-48 lg:w-60 h-auto object-contain"/>
        </div>

        {/* Wrapper da NavBar */}
        <div className="min-[1301px]:absolute min-[1301px]:left-1/2 min-[1301px]:-translate-x-1/2 min-[1301px]:top-8 ">
          <NavBar />
        </div>
      </header>

      {/* CONTEÚDO DA PÁGINA (4 Seções vazias prontas para uso) */}
      <main className="w-full flex-grow">
        
        {/* SEÇÃO 1 */}
        <section className="w-full max-w-7xl mx-auto px-6 py-12">
          {/* Insira seu conteúdo aqui */}
        </section>

        {/* SEÇÃO 2 */}
        <section className="w-full max-w-7xl mx-auto px-6 py-12">
          {/* Insira seu conteúdo aqui */}
        </section>

        {/* SEÇÃO 3 */}
        <section className="w-full max-w-7xl mx-auto px-6 py-12">
          {/* Insira seu conteúdo aqui */}
        </section>

        {/* SEÇÃO 4 */}
        <section className="w-full max-w-7xl mx-auto px-6 py-12">
          {/* Insira seu conteúdo aqui */}
        </section>

      </main>

      {/* FOOTER */}
      <footer 
        className="w-full relative mt-12 bg-top bg-repeat-x flex flex-col justify-center items-center pt-[150px] md:pt-[240px] pb-20 px-6" 
        style={{ 
          backgroundImage: `url('/cloud bottom.png')`, 
          backgroundSize: 'cover' 
        }}
      >
        <div className='w-full max-w-4xl mx-auto text-center font-medium text-xs md:text-sm text-gray-700 flex flex-col gap-2 relative z-10 mb-20'>
          <p>© 2026 DIVERTIN - SRTVS Quadra 701, Centro Empresarial Multiempresarial, Bloco O, Sala 203 - Asa Sul, Brasília - DF</p>
          <p>CEP: 70340-000 - Telefone: (61) 99500-5162 - CNPJ: 35.602.615/0001-72</p>
        </div>
      </footer>

    </div>
  );
}
