import { ViewerShell } from '@/components/shells/ViewerShell';

/* Pantallas con una sola URL para visitantes y miembros: /companies, /companies/[slug], /u/[username].
   El marco depende de la sesión (ViewerShell), no de la carpeta. */
export default function SharedLayout({ children }: { children: React.ReactNode }) {
  return <ViewerShell>{children}</ViewerShell>;
}
