import type { Metadata } from 'next';
import { ContactForm } from './ContactForm';

export const metadata: Metadata = { title: 'Contacto · BeWay' };

export default function ContactPage() {
  return (
    <div className="mx-auto flex w-full max-w-275 flex-col gap-8 px-4 py-8 md:px-6 md:py-10">
      <header className="flex flex-col gap-3">
        <h1 className="text-h1 font-heading text-fg-heading">Escríbenos</h1>
        <p className="text-fg-muted">Cuéntanos qué necesitas y en qué correo te respondemos.</p>
      </header>
      <div className="max-w-[40rem]">
        <ContactForm />
      </div>
    </div>
  );
}
