import { redirect } from 'next/navigation';

/* E-08 (DEC-009, DEC-034): `/programas` era una página heredada del starter que mezclaba mentorías, retos y prácticas. No
   equivale a cursos (decisión 8 del brief) y su dominio no se migra. Sus enlaces compartidos siguen funcionando llevando al
   catálogo de empresas, que ya tiene el módulo "Programas" de cada ficha (DEC-020). */
export default function ProgramasPage() {
  redirect('/companies');
}
