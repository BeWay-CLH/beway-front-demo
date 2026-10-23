import type { Metadata } from 'next';
import Link from 'next/link';
import { Button, Field, Input } from '@ds';
import { signInAs } from '@/lib/auth-actions';
import { safeNext } from '@/lib/navigation';

export const metadata: Metadata = { title: 'Iniciar sesión · BeWay' };

/* Acceso de la demo. Los campos de correo y contraseña no tienen "name": no se envían, así que la demo
   no recibe ni guarda nada de lo que se escribe. Las cuentas de demostración abren el espacio sin credenciales. */
export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next } = await searchParams;
  const to = safeNext(next);

  return (
    <div className="mx-auto flex w-full max-w-[28rem] flex-col gap-8 px-4 py-10 md:py-16">
      <header className="flex flex-col gap-3">
        <h1 className="text-h1 font-heading text-fg-heading">Inicia sesión</h1>
        <p className="text-fg-muted">En la demo, cualquier correo y contraseña entran como Lucía Martín.</p>
      </header>

      <form action={signInAs} className="flex flex-col gap-5">
        <input type="hidden" name="account" value="lucia" />
        <input type="hidden" name="next" value={to} />
        <Field label="Correo" htmlFor="login-email">
          <Input id="login-email" type="email" autoComplete="email" placeholder="nombre@ejemplo.com" />
        </Field>
        <Field label="Contraseña" htmlFor="login-password">
          <Input id="login-password" type="password" autoComplete="current-password" />
        </Field>
        <div className="flex flex-col gap-3">
          <Button type="submit" size="lg" fullWidth>
            Iniciar sesión
          </Button>
          <Link href="/forgot-password" className="self-start text-sm font-semibold text-fg-accent underline-offset-4 hover:underline">
            ¿Has olvidado tu contraseña?
          </Link>
        </div>
      </form>

      <section aria-labelledby="demo-accounts" className="flex flex-col gap-4 border-t border-line-subtle pt-8">
        <h2 id="demo-accounts" className="text-h3 font-heading text-fg-heading">Prueba otras cuentas</h2>
        <p className="text-sm text-fg-muted">
          Lucía tiene el espacio Talent y Admin CLH. Marcos solo tiene Talent, y su perfil es privado.
        </p>
        <form action={signInAs} className="flex flex-col gap-3">
          <input type="hidden" name="account" value="lucia" />
          <input type="hidden" name="next" value={to} />
          <Button type="submit" variant="secondary" fullWidth>
            Entrar como Lucía Martín
          </Button>
        </form>
        <form action={signInAs} className="flex flex-col gap-3">
          <input type="hidden" name="account" value="marcos" />
          <input type="hidden" name="next" value={to} />
          <Button type="submit" variant="secondary" fullWidth>
            Entrar como Marcos Gil
          </Button>
        </form>
      </section>

      <p className="text-sm text-fg-muted">
        ¿No tienes cuenta?{' '}
        <Link href="/signup" className="font-semibold text-fg-accent underline-offset-4 hover:underline">
          Crear cuenta
        </Link>
      </p>
    </div>
  );
}
