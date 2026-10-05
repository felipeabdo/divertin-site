import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import ClinicSection from '@/components/ClinicSection';
import CtaSection from '@/components/CtaSection';
import CuidarSection from '@/components/CuidarSection';
import HeroSection from '@/components/HeroSection';
import TeamSection from '@/components/TeamSection';

export const metadata: Metadata = { title: 'Quem Somos | Divertin' };

export default function QuemSomosPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <HeroSection />
      <CuidarSection />
      <TeamSection />
      <ClinicSection />
      <CtaSection />
      <Footer />
    </div>
  );
}