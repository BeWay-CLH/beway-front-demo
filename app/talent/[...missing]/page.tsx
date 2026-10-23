import { notFound } from 'next/navigation';

/* Cualquier URL /talent/* sin pantalla muestra el 404 dentro del espacio Talent. */
export default function TalentMissing() {
  notFound();
}
