'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { Alert, Button, Field, Input, Select, Textarea } from '@ds';
import { CheckField } from '@/components/forms/CheckField';

/* El envío es una simulación: el mensaje no sale del navegador ni se guarda (DEC-006). */

const MESSAGE_MAX = 2000;
const MESSAGE_HINT = '2.000';
const EMAIL_FORMAT = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const reasons = ['Mi cuenta', 'Mi perfil', 'Empresas y encuestas', 'Otra consulta'];

export function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState(reasons[0]);
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = 'Escribe tu nombre para poder contestarte.';
    if (!EMAIL_FORMAT.test(email.trim())) next.email = 'Escribe un correo válido, por ejemplo nombre@dominio.com.';
    if (!message.trim()) next.message = 'Escribe el mensaje antes de enviarlo.';
    if (!consent) next.consent = 'Necesitamos que aceptes la política de privacidad para tratar tu mensaje.';
    setErrors(next);
    if (Object.keys(next).length === 0) setSent(true);
  };

  if (sent) {
    return (
      <Alert tone="info" title="Simulación">
        No hemos enviado tu mensaje. En la demo no guardamos lo que escribes.
      </Alert>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
      <Field label="Nombre" htmlFor="ct-name" required error={errors.name}>
        <Input id="ct-name" value={name} invalid={Boolean(errors.name)} autoComplete="name" onChange={(e) => setName(e.target.value)} />
      </Field>
      <Field label="Correo" htmlFor="ct-email" required error={errors.email}>
        <Input
          id="ct-email"
          type="email"
          value={email}
          invalid={Boolean(errors.email)}
          autoComplete="email"
          placeholder="nombre@dominio.com"
          onChange={(e) => setEmail(e.target.value)}
        />
      </Field>
      <Field label="Motivo" htmlFor="ct-reason">
        <Select id="ct-reason" options={reasons} value={reason} onChange={(e) => setReason(e.target.value)} />
      </Field>
      <Field
        label="Mensaje"
        htmlFor="ct-message"
        required
        error={errors.message}
        hint={`${message.length} / ${MESSAGE_HINT}`}
      >
        <Textarea
          id="ct-message"
          rows={6}
          maxLength={MESSAGE_MAX}
          value={message}
          invalid={Boolean(errors.message)}
          onChange={(e) => setMessage(e.target.value)}
        />
      </Field>
      <CheckField
        id="ct-consent"
        checked={consent}
        onChange={setConsent}
        error={errors.consent}
        label={
          <>
            He leído la{' '}
            <Link href="/privacy" className="font-semibold text-fg-accent underline-offset-4 hover:underline">
              política de privacidad
            </Link>
            .
          </>
        }
      />
      <div className="flex justify-end">
        <Button type="submit" size="lg">
          Enviar mensaje
        </Button>
      </div>
    </form>
  );
}
