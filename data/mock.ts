/* Datos de ejemplo para maquetar. Se reemplazan por la API real; las pantallas no cambian.
   Las empresas ya no viven aquí: están en data/fixtures/companies.ts (C-01). */

import { logo } from './fixtures/logo';

export type Program = {
  id: string;
  name: string;
  category: string;
  categoryIcon: string;
  org: string;
  description: string;
  state: 'Abierto' | 'Próximamente';
  start: string;
  duration: string;
  mode: string;
  seats: string;
};

export const programCategories = ['Todos', 'Mentoría', 'Retos', 'Prácticas'];

export const programs: Program[] = [
  { id: 'mentoria-datos', name: 'Mentoría en datos y analítica', category: 'Mentoría', categoryIcon: 'handshake', org: 'Datalia', description: 'Acompañamiento 1 a 1 con analistas senior para quienes dan el salto a datos. Trabajas sobre un caso real de la empresa.', state: 'Abierto', start: '12 nov', duration: '12 semanas', mode: 'En línea', seats: '30' },
  { id: 'mentoria-energia', name: 'Mentoría técnica en energía renovable', category: 'Mentoría', categoryIcon: 'handshake', org: 'Sunbeam', description: 'Recién graduados de ingeniería se integran al equipo técnico y participan en proyectos de eficiencia energética.', state: 'Abierto', start: '24 nov', duration: '8 semanas', mode: 'Híbrido', seats: '20' },
  { id: 'reto-logistica', name: 'Open innovation en logística', category: 'Retos', categoryIcon: 'lightbulb', org: 'Cargo Norte', description: 'Startups y universidades proponen soluciones para optimizar rutas y almacenes. El mejor prototipo pasa a piloto.', state: 'Próximamente', start: '30 nov', duration: '6 semanas', mode: 'Híbrido', seats: '12 equipos' },
  { id: 'practicas-ia', name: 'Prácticas en IA aplicada', category: 'Prácticas', categoryIcon: 'briefcase', org: 'Orbital Labs', description: 'Seis meses dentro de un laboratorio de IA, con un proyecto de investigación propio y revisión semanal con tu tutor.', state: 'Abierto', start: '02 dic', duration: '6 meses', mode: 'Presencial', seats: '9' },
];

export const partnerLogos =['Metrovía', 'Cargo Norte', 'Datalia', 'Nexora', 'Orbital', 'Kairos'].map((n) => ({ src: logo(n, '#1C2541'), alt: n }));

export const homeStats = [
  { value: '1.240', label: 'Perfiles' },
  { value: '86', label: 'Empresas' },
  { value: '18', label: 'Retos abiertos' },
  { value: '42', label: 'Mentores' },
];

export const pillars = [
  { icon: 'users', title: 'Conectamos talento', description: 'Perfiles verificados listos para proyectos reales en empresas del ecosistema.' },
  { icon: 'lightbulb', title: 'Impulsamos la innovación', description: 'Retos abiertos entre empresas, startups y universidades.' },
  { icon: 'trending-up', title: 'Generamos oportunidades', description: 'Programas de mentoría y vacantes para crecer profesionalmente.' },
  { icon: 'globe', title: 'Construimos el futuro', description: 'Una red regional que convierte ideas en proyectos con impacto.' },
];

export const retos = [
  { id: 1, name: 'Reto de movilidad urbana', org: 'Metrovía', date: '12 nov', state: 'Abierto' },
  { id: 2, name: 'Open innovation en logística', org: 'Cargo Norte', date: '30 nov', state: 'Pendiente' },
  { id: 3, name: 'Talento junior en datos', org: 'Datalia', date: '02 oct', state: 'Cerrado' },
];
