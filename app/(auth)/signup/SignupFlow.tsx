'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { Alert, Button, Field, Input } from '@ds';
import { CheckField } from '@/components/forms/CheckField';
import { OptionRadio } from '@/components/forms/OptionRadio';
import { signInAs } from '@/lib/auth-actions';

/* Registro en dos pasos. El segundo es una simulación: no se crea ninguna cuenta ni se envía ningún correo (DEC-006).
   La contraseña se valida aquí y no se envía a ningún sitio. */

type Values = { name: string; email: string; password: string; terms: boolean };
type Errors = Partial<Record<keyof Values, string>>;

const EMAIL_FORMAT = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const noop = () => undefined;

export function SignupFlow() {
  const [values, setValues] = useState<Values>({ name: '', email: '', password: '', terms: false });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    setErrors((e) => ({ ...e, [key]: undefined }));
    setValues((v) => ({ ...v, [key]: value }));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next: Errors = {};
    const name = values.name.trim();
    if (name.length < 2 || name.length > 80) next.name = 'Escribe tu nombre con entre 2 y 80 caracteres.';
    if (!EMAIL_FORMAT.test(values.email.trim())) next.email = 'Escribe un correo válido, por ejemplo nombre@dominio.com.';
    if (values.password.length < 8) next.password = 'La contraseña tiene al menos 8 caracteres.';
    if (!values.terms) next.terms = 'Acepta los términos para crear tu cuenta.';
    setErrors(next);
    if (Object.keys(next).length === 0) setSent(true);
  };

  if (sent) {
    return (
      <div className="flex flex-col gap-6">
        <Alert tone="info" title="Simulación">
          No hemos creado tu cuenta ni enviado ningún correo a {values.email.trim()}. Para seguir con la demo, entra como
          Lucía Martín y completa tu perfil.
        </Alert>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
          <Button type="button" variant="ghost" icon="arrow-left" onClick={() => setSent(false)}>
            Cambiar mis datos
          </Button>
          <form action={signInAs}>
            <input type="hidden" name="account" value="lucia" />
            <input type="hidden" name="next" value="/talent/onboarding" />
            <Button type="submit" size="lg" iconAfter="arrow-right">
              Continuar con la demo
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
      <fieldset className="flex flex-col gap-3">
        <legend className="mb-3 text-sm font-semibold text-fg-heading">Tipo de cuenta</legend>
        <OptionRadio
          id="type-talent"
          name="account-type"
          value="talent"
          checked
          onChange={noop}
          label="Busco oportunidades"
          description="Crea tu perfil y descubre empresas."
        />
        <OptionRadio
          id="type-company"
          name="account-type"
          value="company"
          checked={false}
          onChange={noop}
          disabled
          label="Busco talento"
          description="Próximamente: alta de empresas."
        />
      </fieldset>

      <Field label="Nombre" htmlFor="su-name" required error={errors.name}>
        <Input
          id="su-name"
          value={values.name}
          invalid={Boolean(errors.name)}
          autoComplete="given-name"
          onChange={(e) => set('name', e.target.value)}
        />
      </Field>

      <Field label="Correo" htmlFor="su-email" required error={errors.email}>
        <Input
          id="su-email"
          type="email"
          placeholder="nombre@dominio.com"
          value={values.email}
          invalid={Boolean(errors.email)}
          autoComplete="email"
          onChange={(e) => set('email', e.target.value)}
        />
      </Field>

      <Field
        label="Contraseña"
        htmlFor="su-password"
        required
        error={errors.password}
        hint={errors.password ? undefined : 'Mínimo 8 caracteres.'}
      >
        <Input
          id="su-password"
          type="password"
          value={values.password}
          invalid={Boolean(errors.password)}
          autoComplete="new-password"
          onChange={(e) => set('password', e.target.value)}
        />
      </Field>

      <CheckField
        id="su-terms"
        checked={values.terms}
        onChange={(v) => set('terms', v)}
        error={errors.terms}
        label={
          <>
            Acepto los{' '}
            <Link href="/terms" className="font-semibold text-fg-accent underline-offset-4 hover:underline">
              términos
            </Link>{' '}
            y la{' '}
            <Link href="/privacy" className="font-semibold text-fg-accent underline-offset-4 hover:underline">
              política de privacidad
            </Link>
          </>
        }
      />

      <Button type="submit" size="lg" fullWidth>
        Crear cuenta
      </Button>
      <p className="text-sm text-fg-muted">
        ¿Ya tienes cuenta?{' '}
        <Link href="/login" className="font-semibold text-fg-accent underline-offset-4 hover:underline">
          Iniciar sesión
        </Link>
      </p>
    </form>
  );
}

