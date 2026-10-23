import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BeWay · Ecosistema de Talento, Innovación y Oportunidades',
  description: 'Conectamos talento, impulsamos la innovación y generamos oportunidades.',
};

/* Aplica el tema guardado (o el del sistema) antes de pintar. */
const themeScript = `(function(){try{var t=localStorage.getItem('beway-theme');if(!t){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.setAttribute('data-theme',t)}catch(e){document.documentElement.setAttribute('data-theme','light')}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* Con el repo real, cámbialo por next/font (Inter y Space Grotesk) y ajusta --font-display y --font-body. */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap"
        />
      </head>
      {/* Cabecera y pie viven en el layout de cada espacio: (public), (auth), talent, admin. */}
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
