'use client';

import { useState, type FormEvent } from 'react';
import { Alert, Button, Field, Input } from '@ds';

/* La respuesta es la misma exista o no el correo (BE-023): nunca revela si una cuenta existe. */
export function ForgotPasswordForm() {
  const [sent, setSent] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <Field label="Correo" htmlFor="fp-email" required>
        <Input id="fp-email" type="email" autoComplete="email" placeholder="nombre@dominio.com" required />
      </Field>
      <Button type="submit" size="lg" fullWidth>
        Pedir enlace
      </Button>
      {sent ? (
        <Alert tone="info" title="Simulación">
          Si el correo está registrado, recibirás un enlace para crear una contraseña nueva. En la demo no se envía nada.
        </Alert>
      ) : null}
    </form>
  );
}
