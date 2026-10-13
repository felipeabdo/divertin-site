import type { Metadata } from "next";
import type { ReactNode } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

import ScreenSaver from "@/components/ScreenSaver";
import "./globals.css";

/** Metadados padrão usados nas páginas que não declaram metadados próprios. */
export const metadata: Metadata = {
  title: "Clínica Divertin | Fonoaudiologia Infantil",
  description:
    "Pacotes e condições especiais para acompanhamento terapêutico infantil com horários fixos.",
  openGraph: {
    title: "Clínica Divertin | Fonoaudiologia Infantil",
    description:
      "Acompanhamento terapêutico lúdico e especializado para crianças.",
    // Arquivo que aparece nas prévias de compartilhamento, como no WhatsApp.
    images: ["/logo-compartilhamento.png"],
  },
};

/**
 * Layout raiz do App Router.
 * Tudo o que é comum a todas as rotas — estilos globais, descanso de tela e
 * Analytics — fica aqui para não precisar ser repetido em cada página.
 */
export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className="flex min-h-full flex-col">
        {/* 0.5 minuto equivale a 30 segundos de inatividade. */}
        <ScreenSaver src="/descanso.gif" idleMinutes={0.5} width={220} />
        {children}
        <GoogleAnalytics gaId="G-14VEB6PD4R" />
      </body>
    </html>
  );
}
