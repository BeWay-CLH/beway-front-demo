import type { Metadata } from 'next';
import { ForgotPasswordForm } from './ForgotPasswordForm';

export const metadata: Metadata = { title: 'Recuperar acceso · BeWay' };

export default function ForgotPasswordPage() {
  return (
    <div className="mx-auto flex w-full max-w-[28rem] flex-col gap-8 px-4 py-10 md:py-16">
      <header className="flex flex-col gap-3">
        <h1 className="text-h1 font-heading text-fg-heading">Recupera tu acceso</h1>
        <p className="text-fg-muted">Te enviaremos un enlace para crear una contraseña nueva.</p>
      </header>
      <ForgotPasswordForm />
    </div>
  );
}
