import type { Metadata } from 'next';
import { DM_Sans, Manrope } from 'next/font/google';
import './globals.css';

/* Fuentes de la guía de correcciones (01 A1): DM Sans para interfaz y cuerpo, Manrope para titulares.
   Se cargan con next/font (sin hoja externa). Las variables alimentan --font-body y --font-display en tokens.css. */
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans', display: 'swap' });
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope', display: 'swap' });

export const metadata: Metadata = {
  title: 'BeWay · Ecosistema de Talento, Innovación y Oportunidades',
  description: 'Conectamos talento, impulsamos la innovación y generamos oportunidades.',
};

/* Aplica el tema guardado (o el del sistema) antes de pintar. */
const themeScript = `(function(){try{var t=localStorage.getItem('beway-theme');if(!t){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.setAttribute('data-theme',t)}catch(e){document.documentElement.setAttribute('data-theme','light')}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" data-theme="light" className={`${dmSans.variable} ${manrope.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      {/* Cabecera y pie viven en el layout de cada espacio: (public), (auth), talent, admin. */}
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
