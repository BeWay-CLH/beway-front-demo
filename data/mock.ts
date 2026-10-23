/* Datos de ejemplo para maquetar. Se reemplazan por la API real; las pantallas no cambian. */

const logo = (text: string, color = '#1C2541') =>
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="48" viewBox="0 0 160 48"><rect width="160" height="48" rx="8" fill="${color}"/><text x="80" y="30" text-anchor="middle" font-family="sans-serif" font-weight="700" font-size="16" fill="#fff">${text}</text></svg>`,
  );

export type Company = {
  id: string;
  name: string;
  category: string;
  categoryIcon: string;
  description: string;
  logo: string;
  cover?: string;
  stats: { icon: string; value: string | number; label: string }[];
};

export const categories = ['Todas', 'Movilidad', 'Datos e IA', 'Logística', 'Energía', 'Educación'];

const stats = (v: number, r: number, e: number, s: number) => [
  { icon: 'briefcase', value: v, label: 'Vacantes' },
  { icon: 'lightbulb', value: r, label: 'Retos' },
  { icon: 'users', value: e, label: 'Equipo' },
  { icon: 'map-pin', value: s, label: 'Sedes' },
];

export const companies: Company[] = [
  { id: 'metrovia', name: 'Metrovía', category: 'Movilidad', categoryIcon: 'bus', description: 'Operador de transporte que abre retos de movilidad urbana y busca talento junior en datos y operaciones.', logo: logo('Metrovía'), stats: stats(12, 3, 240, 4) },
  { id: 'datalia', name: 'Datalia', category: 'Datos e IA', categoryIcon: 'database', description: 'Consultora de datos con programas de mentoría para perfiles en transición hacia analítica.', logo: logo('Datalia', '#0B132B'), stats: stats(8, 2, 85, 2) },
  { id: 'cargo-norte', name: 'Cargo Norte', category: 'Logística', categoryIcon: 'truck', description: 'Red logística regional que propone retos de optimización de rutas y almacenes inteligentes.', logo: logo('Cargo Norte'), stats: stats(15, 4, 410, 7) },
  { id: 'nexora', name: 'Nexora', category: 'Energía', categoryIcon: 'zap', description: 'Empresa de energía renovable que busca ingeniería, datos y proyectos de eficiencia.', logo: logo('Nexora', '#0B132B'), stats: stats(6, 1, 120, 3) },
  { id: 'orbital', name: 'Orbital Labs', category: 'Datos e IA', categoryIcon: 'brain-circuit', description: 'Laboratorio de IA aplicada con convocatorias abiertas de prácticas y proyectos de investigación.', logo: logo('Orbital'), stats: stats(9, 5, 60, 1) },
  { id: 'kairos', name: 'Kairos Edu', category: 'Educación', categoryIcon: 'graduation-cap', description: 'Plataforma educativa que colabora con universidades en retos de aprendizaje adaptativo.', logo: logo('Kairos', '#0B132B'), stats: stats(5, 2, 45, 2) },
  { id: 'vialink', name: 'Vialink', category: 'Movilidad', categoryIcon: 'bus', description: 'Soluciones de movilidad compartida con proyectos abiertos para equipos de producto.', logo: logo('Vialink'), stats: stats(7, 2, 98, 3) },
  { id: 'sunbeam', name: 'Sunbeam', category: 'Energía', categoryIcon: 'zap', description: 'Instalaciones solares para empresas, con programa de mentoría técnica para recién graduados.', logo: logo('Sunbeam', '#0B132B'), stats: stats(10, 1, 150, 5) },
  { id: 'trazo', name: 'Trazo', category: 'Logística', categoryIcon: 'truck', description: 'Trazabilidad de carga y última milla con retos abiertos de visión por computador.', logo: logo('Trazo'), stats: stats(4, 3, 70, 2) },
];

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
