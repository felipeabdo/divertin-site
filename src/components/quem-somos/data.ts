/**
 * COMO TROCAR AS FOTOS
 * 1) Copie a imagem para a pasta /public do projeto (ex.: public/equipe/ana.jpg).
 * 2) Abaixo, escreva o caminho começando por "/" e SEM a palavra "public": '/equipe/ana.jpg'.
 * Campo vazio (undefined) = aparece o placeholder colorido.
 *
 * Equipe:  fernanda, rafaela, ana  (a ordem dos cards é definida no array TEAM, mais abaixo)
 * Clínica: clinicaGrande = foto larga da esquerda
 *          clinica1 = topo esquerdo | clinica2 = topo direito
 *          clinica3 = baixo esquerdo | clinica4 = baixo direito
 *          (clicar em qualquer uma delas abre o modal com a foto completa)
 */

/**
 * true  = os PNGs card_*.png já são o card completo (foto + nome + cargo): a imagem é exibida sozinha.
 * false = os PNGs são só a foto da profissional: o nome e o cargo são escritos pela página.
 */
export const CARD_JA_TEM_NOME = false;

export const IMG: Record<string, string | undefined> = {
  ana: '/card_ana.png',
  rafaela: '/card_rafaela.png',
  fernanda: '/card_fernanda.png',
  clinicaGrande: '/img1.png',
  clinica1: '/img2.png',
  clinica2: '/img3.png',
  clinica3: '/img4.png',
  clinica4: '/img5.png',
};

/**
 * PALETA DA LOGO: lima, rosa, laranja, verde-água e branco.
 * Cada cor tem a versão "cheia" (detalhes) e a "Soft" (fundos de divs).
 * Para mudar um tom na página inteira, basta editar aqui.
 */
export const PAL = {
  lime: '#c8d93b', limeSoft: '#e6f08f',
  pink: '#d684bf', pinkSoft: '#f4cfe7',
  orange: '#f7931e', orangeSoft: '#fdd5a5',
  green: '#6fbf9f', greenSoft: '#bfe3d2',
};

/** Classe do título de seção (h2) usada em toda a página. */
export const H2 = 'text-3xl md:text-4xl font-medium leading-tight text-gray-800';

/* ------------------------------------ equipe ------------------------------------ */

export type TeamMember = {
  name: string;
  role: string;
  src?: string;
  tone: string;
  icon?: string;
};

/** Ordem dos cards, da esquerda para a direita. */
export const TEAM: TeamMember[] = [
  { name: 'Fernanda Lima', role: 'Pediatra', src: IMG.fernanda, tone: PAL.orangeSoft },
  { name: 'Rafaela', role: 'Fonoaudióloga', src: IMG.rafaela, tone: PAL.greenSoft, icon: '🦖' },
  { name: 'Ana Luiza', role: 'Fonoaudióloga', src: IMG.ana, tone: PAL.pinkSoft, icon: '🦖' },
];

/* ------------------------------------ clínica ----------------------------------- */

export type ClinicPhoto = {
  src?: string;
  alt: string;
  tone: string;
  icon: string;
  radius: string;
};

export const CLINIC_MAIN: ClinicPhoto = {
  src: IMG.clinicaGrande,
  alt: 'Sala de atividades da clínica',
  tone: PAL.pinkSoft,
  icon: '🪑',
  radius: '60px 130px 90px 120px / 50px 90px 110px 90px',
};

export const CLINIC_GALLERY: ClinicPhoto[] = [
  { src: IMG.clinica1, alt: 'Espaço da clínica 1', tone: PAL.orangeSoft, icon: '📚', radius: '90px 60px 110px 50px / 80px 70px 90px 60px' },
  { src: IMG.clinica2, alt: 'Espaço da clínica 2', tone: PAL.greenSoft, icon: '🧗', radius: '60px 100px 50px 90px / 60px 80px 70px 90px' },
  { src: IMG.clinica3, alt: 'Espaço da clínica 3', tone: PAL.limeSoft, icon: '✏️', radius: '110px 60px 80px 40px / 90px 60px 70px 50px' },
  { src: IMG.clinica4, alt: 'Espaço da clínica 4', tone: PAL.pinkSoft, icon: '🪴', radius: '50px 110px 60px 100px / 60px 90px 80px 70px' },
];
