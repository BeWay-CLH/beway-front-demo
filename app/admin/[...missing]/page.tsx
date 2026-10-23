import { notFound } from 'next/navigation';

/* Cualquier URL /admin/* sin pantalla muestra el 404 dentro del backoffice. */
export default function AdminMissing() {
  notFound();
}
