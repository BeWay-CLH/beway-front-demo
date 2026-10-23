import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { getSession } from '@/lib/session';

/* Espacio público. La cabecera cambia según haya sesión; el resto de la página es igual para todos. */
export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  return (
    <>
      <SiteHeader session={session} />
      <main>{children}</main>
      <SiteFooter />
    </>
  );
}
