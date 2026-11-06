import type { Metadata } from 'next';
import { SignupFlow } from './SignupFlow';

export const metadata: Metadata = { title: 'Crear cuenta · BeWay' };

/* Registro (guía de correcciones, ficha 35): misma composición que el acceso, dos mitades. El formulario real
   (SignupFlow) no cambia: las cuentas siguen siendo simuladas y el alta no inicia sesión sin completar el proceso. */
export default function SignupPage() {
  return (
    <div className="mx-4 my-10 grid overflow-hidden rounded-[15px] border border-line-subtle bg-surface-card md:mx-auto md:my-[50px] md:w-full md:max-w-[1000px] md:grid-cols-2">
      <aside className="hidden min-h-[500px] flex-col justify-between gap-10 bg-surface-inverse p-[50px] text-white md:flex">
        <p className="m-0 font-heading text-[36px] leading-[43.2px] font-[700]">Tu próximo paso empieza aquí.</p>
        <p className="m-0 text-sm opacity-80">Tu perfil empieza en privado: solo lo ves tú.</p>
      </aside>
      <div className="flex flex-col gap-8 p-6 md:p-[45px]">
        <header className="flex flex-col gap-3">
          <p className="eyebrow m-0 text-fg-muted uppercase">Crear cuenta</p>
          <h1 className="m-0 font-heading text-[27px] leading-[1.25] font-[700] text-fg-heading">Tu próximo paso.</h1>
          <p className="m-0 text-fg-muted">Tu perfil empieza en privado: solo lo ves tú.</p>
        </header>
        <SignupFlow />
      </div>
    </div>
  );
}
