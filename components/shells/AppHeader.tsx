'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Avatar, Badge, Button, IconButton, Logo, NavBar } from '@ds';
import { NavButton } from '@/components/NavButton';
import { ThemeToggle } from '@/components/ThemeToggle';
import { signOut } from '@/lib/auth-actions';
import type { Session } from '@/lib/models/session';
import type { NavItem, Space } from '@/lib/routes';
import { DemoBar, demoBarEnabled } from './DemoBar';
import { MobileMenu } from './MobileMenu';
import { NavList, ShellNav } from './ShellNav';

/* Cabecera única de todos los espacios (DEC-013): mismo NavBar, misma altura, logo en el mismo sitio.
   Solo cambian los enlaces y la cuenta. El NavBar del DS no es responsive (DEC-007): por debajo de md se
   ocultan sus enlaces y su búsqueda (el "!" vence al estilo inline del DS) y la navegación pasa al menú. */
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

  const desktopAccount = session ? (
    <>
      {space === 'public' ? (
        <NavButton href="/talent/dashboard" variant="ghost">Mi espacio</NavButton>
      ) : null}
      <NavButton href="/talent/settings" variant="ghost" aria-label="Ajustes de cuenta">
        <Avatar name={session.displayName} size={32} />
      </NavButton>
      <form action={signOut}>
        <IconButton type="submit" icon="log-out" label="Cerrar sesión" />
      </form>
    </>
  ) : guestActions ? (
    <>
      <NavButton href="/login" variant="ghost">Iniciar sesión</NavButton>
      <NavButton href="/signup" variant="secondary">Crear cuenta</NavButton>
    </>
  ) : null;

  const mobileAccount = session ? (
    <>
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
        className="max-md:px-4! max-md:[&>form]:hidden max-md:[&>nav]:hidden!"
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
        links={items.length > 0 ? <NavList items={items} /> : undefined}
        actions={
          <>
            <ThemeToggle />
            {desktopAccount ? <div className="flex items-center gap-2 max-md:hidden">{desktopAccount}</div> : null}
            {items.length > 0 || mobileAccount ? (
              <div className="md:hidden">
                <MobileMenu label="Abrir menú">
                  <div className="flex flex-col gap-4">
                    {items.length > 0 ? <ShellNav items={items} label="Navegación" orientation="vertical" /> : null}
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
