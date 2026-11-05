'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Badge, Button, Logo, NavBar } from '@ds';
import { NavButton } from '@/components/NavButton';
import { ThemeToggle } from '@/components/ThemeToggle';
import { signOut } from '@/lib/auth-actions';
import type { Session } from '@/lib/models/session';
import { headerItems, talentHome, type NavItem, type Space } from '@/lib/routes';
import { NotificationsButton, PersonalMenu } from './AccountMenus';
import { DemoBar, demoBarEnabled } from './DemoBar';
import { MobileMenu } from './MobileMenu';
import { NavList, ShellNav } from './ShellNav';

/* Cabecera única de todos los espacios (DEC-013; guía de correcciones 01 C): dos filas.
   Fila 1: logo, buscador y cuenta. Fila 2: navegación a la izquierda (side 'start') y a la derecha ('end').
   Solo cambian los enlaces y la cuenta. Por debajo de lg (o md con pocos enlaces) la fila 2 y el buscador se
   ocultan y la navegación pasa al menú plegable. La navegación horizontal desplazable llega en la fase 02 (ficha 07).
   Las clases responsive llevan "!" porque los estilos en línea del DS vencen a las clases normales. */
export function AppHeader({
  space,
  homeHref,
  homeLabel,
  items = [],
  badge,
  search = false,
  session = null,
  quiet = false,
}: {
  space: Space;
  homeHref: string;
  homeLabel: string;
  items?: NavItem[];
  badge?: string;
  search?: boolean;
  session?: Session | null;
  /* Acceso, registro y estados sin acceso: sin acciones de cuenta, solo el tema. */
  quiet?: boolean;
}) {
  const router = useRouter();
  const guestActions = !session && !quiet && space === 'public';
  /* "Mi espacio" solo hace falta si la cabecera no trae ya el "Mi panel" del espacio (acceso, registro). */
  const spaceLink = Boolean(session) && space === 'public' && !items.some((i) => i.href === talentHome);
  const username = session?.username;

  const visible = headerItems(items);
  const startItems = visible.filter((i) => (i.side ?? 'start') === 'start');
  const endItems = visible.filter((i) => i.side === 'end');
  /* Con más de cuatro enlaces visibles la fila no cabe a lg; con menos, a md. */
  const wide = visible.length > 4;
  /* La cuenta (campana y avatar) se ve en todos los anchos: la ficha 06 pide acceso a todo en móvil. */
  const bp = wide
    ? { bar: 'max-lg:px-4!', nav: 'max-lg:hidden!', search: 'max-lg:hidden!', account: '', menu: 'lg:hidden' }
    : { bar: 'max-md:px-4!', nav: 'max-md:hidden!', search: 'max-md:hidden!', account: '', menu: 'md:hidden' };

  /* Con sesión: campana (notificaciones) y avatar (menú personal, con Mi panel, Mi perfil y Cerrar sesión). */
  const desktopAccount = session ? (
    <>
      <NotificationsButton />
      <PersonalMenu session={session} />
    </>
  ) : guestActions ? (
    <>
      <NavButton href="/login" variant="ghost">Iniciar sesión</NavButton>
      <NavButton href="/signup" variant="secondary">Crear cuenta</NavButton>
    </>
  ) : null;

  const mobileAccount = session ? (
    <>
      {spaceLink ? <NavButton href={talentHome} variant="ghost" fullWidth icon="layout-dashboard">Mi espacio</NavButton> : null}
      <NavButton href="/talent/settings" variant="ghost" fullWidth icon="settings">Ajustes de cuenta</NavButton>
      <form action={signOut}>
        <Button type="submit" variant="ghost" fullWidth icon="log-out">Cerrar sesión</Button>
      </form>
    </>
  ) : guestActions ? (
    <>
      <NavButton href="/login" variant="secondary" fullWidth>Iniciar sesión</NavButton>
      <NavButton href="/signup" variant="secondary" fullWidth>Crear cuenta</NavButton>
    </>
  ) : null;

  return (
    <div className="sticky top-0 z-40">
      {demoBarEnabled ? <DemoBar space={space} /> : null}
      <NavBar
        barClassName={bp.bar}
        navClassName={bp.nav}
        searchClassName={bp.search}
        showSearch={search}
        onSearch={(q) => router.push('/companies' + (q ? `?q=${encodeURIComponent(q)}` : ''))}
        logo={
          <span className="flex items-center gap-3">
            <Link href={homeHref} aria-label={homeLabel} className="flex items-center">
              <Logo variant="auto" height={32} alt="" />
            </Link>
            {badge ? <Badge tone="navy">{badge}</Badge> : null}
          </span>
        }
        links={startItems.length > 0 ? <NavList items={startItems} username={username} /> : undefined}
        endLinks={endItems.length > 0 ? <NavList items={endItems} username={username} /> : undefined}
        actions={
          <>
            <ThemeToggle />
            {desktopAccount ? <div className={`flex items-center gap-2 ${bp.account}`}>{desktopAccount}</div> : null}
            {visible.length > 0 || mobileAccount ? (
              <div className={bp.menu}>
                <MobileMenu label="Abrir menú">
                  <div className="flex flex-col gap-4">
                    {visible.length > 0 ? <ShellNav items={visible} label="Navegación" orientation="vertical" username={username} /> : null}
                    {mobileAccount ? <div className="flex flex-col gap-2 border-t border-line-subtle pt-4">{mobileAccount}</div> : null}
                  </div>
                </MobileMenu>
              </div>
            ) : null}
          </>
        }
      />
    </div>
  );
}
