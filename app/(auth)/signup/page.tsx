import type { Metadata } from 'next';
import { SignupFlow } from './SignupFlow';

export const metadata: Metadata = { title: 'Crear cuenta · BeWay' };

export default function SignupPage() {
  return (
    <div className="mx-auto flex w-full max-w-[28rem] flex-col gap-8 px-4 py-10 md:py-16">
      <header className="flex flex-col gap-3">
        <h1 className="text-h1 font-heading text-fg-heading">Crea tu cuenta</h1>
        <p className="text-fg-muted">Tu perfil empieza en privado: solo lo ves tú.</p>
      </header>
      <SignupFlow />
    </div>
  );
}
