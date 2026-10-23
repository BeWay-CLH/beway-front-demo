import { NavButton } from '@/components/NavButton';
import { PageState } from '@/components/PageState';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { getSession } from '@/lib/session';

/* 404 de URLs públicas. Talent y Admin tienen el suyo para no perder su navegación. */
export default async function NotFound() {
  const session = await getSession();
  return (
    <>
      <SiteHeader session={session} />
      <main>
        <PageState kind="not-found" action={<NavButton href="/" variant="secondary" icon="house">Ir al inicio</NavButton>} />
      </main>
      <SiteFooter />
    </>
  );
}
