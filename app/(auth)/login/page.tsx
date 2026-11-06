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
    <div className="mx-4 my-10 grid overflow-hidden rounded-[15px] border border-line-subtle bg-surface-card md:mx-auto md:my-[50px] md:w-full md:max-w-[1000px] md:grid-cols-2">
      <aside className="hidden min-h-[500px] flex-col justify-between gap-10 bg-surface-inverse p-[50px] text-white md:flex">
        <p className="m-0 font-heading text-[36px] leading-[43.2px] font-[700]">Conecta tu potencial con lo que viene.</p>
        <p className="m-0 text-sm opacity-80">Beway · Ecosistema de talento, innovación y oportunidades</p>
      </aside>
      <div className="flex flex-col gap-8 p-6 md:p-[45px]">
      <header className="flex flex-col gap-3">
        <p className="eyebrow m-0 text-fg-muted uppercase">Bienvenido</p>
        <h1 className="m-0 font-heading text-[27px] leading-[1.25] font-[700] text-fg-heading">Qué bueno verte por aquí.</h1>
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
    </div>
  );
}
