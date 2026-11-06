/* FICTICIO. Challenges y miniproyectos de ejemplo (guía de correcciones, 05). Empresas: slugs de las 17 marcas
   (`data/fixtures/brands.ts`). Plazos, briefings y estados son de ejemplo; la demo lo rotula. Ninguna participación
   existe en el servidor: el estado inicial es un ejemplo y los cambios solo viven en la sesión del navegador. */

export type ChallengeKind = 'challenge' | 'miniproject';
export type ChallengeStatus = 'open' | 'soon' | 'closed';
export type ParticipationState = 'none' | 'draft' | 'joined';

export type ChallengeFixture = {
  slug: string;
  kind: ChallengeKind;
  companySlug: string;
  title: string;
  sector: string;
  summary: string;
  status: ChallengeStatus;
  format: string;
  deadline: string;
  /* Estado de ejemplo para probar la CTA: "draft" muestra "Continuar borrador". */
  sampleParticipation: ParticipationState;
  start: string;
  deliverables: string[];
  review: string[];
};

export const challengeFixtures: ChallengeFixture[] = [
  {
    slug: 'openbank-finanzas-personales', kind: 'challenge', companySlug: 'santander',
    title: 'Challenge Openbank: finanzas personales para jóvenes', sector: 'Banca',
    summary: 'Diseña una herramienta que ayude a una persona joven a planificar sus primeros ingresos.',
    status: 'open', format: 'Individual · 4 semanas', deadline: '15 dic 2026', sampleParticipation: 'draft',
    start: 'Muchas personas jóvenes cobran por primera vez y no saben cómo organizar el dinero del mes.',
    deliverables: ['Un problema y su evidencia', 'Una propuesta de producto', 'Un prototipo o un recorrido de uso'],
    review: ['Claridad del problema', 'Viabilidad del producto', 'Calidad del recorrido'],
  },
  {
    slug: 'watsonx-hackathon-bibliotecas', kind: 'challenge', companySlug: 'ibm',
    title: 'Hackathon watsonx: asistente para bibliotecas', sector: 'Tecnología',
    summary: 'Un asistente de consulta para una red de bibliotecas, con datos de ejemplo.',
    status: 'open', format: 'Equipo · 72 horas', deadline: '2 dic 2026', sampleParticipation: 'none',
    start: 'Las bibliotecas reciben preguntas repetidas que consumen tiempo del equipo.',
    deliverables: ['Un prototipo funcional', 'Un informe de decisiones', 'Una demostración de cinco minutos'],
    review: ['Utilidad', 'Calidad técnica', 'Presentación'],
  },
  {
    slug: 'flash-72-horas', kind: 'challenge', companySlug: 'google',
    title: 'Flash challenge de 72 horas', sector: 'Tecnología',
    summary: 'Un reto corto para equipos que quieren aprender a crear una herramienta en tres días.',
    status: 'closed', format: 'Equipo · 72 horas', deadline: 'Cerrado', sampleParticipation: 'none',
    start: 'Un problema pequeño bien planteado se resuelve en tres días con método.',
    deliverables: ['Una herramienta sencilla', 'Un vídeo de presentación'],
    review: ['Alcance', 'Sencillez', 'Impacto'],
  },
  {
    slug: 'analisis-financiero-caso', kind: 'challenge', companySlug: 'pwc',
    title: 'Análisis financiero de un caso', sector: 'Auditoría',
    summary: 'Revisa los estados financieros de una empresa ficticia y propón tres conclusiones.',
    status: 'soon', format: 'Individual · 2 semanas', deadline: 'Próximamente', sampleParticipation: 'none',
    start: 'Un informe financiero cuenta una historia que hay que saber leer.',
    deliverables: ['Tres conclusiones con cifras', 'Una recomendación'],
    review: ['Rigor con las cifras', 'Claridad de la recomendación'],
  },
  {
    slug: 'simulacion-de-cartera', kind: 'challenge', companySlug: 'instituto-bme',
    title: 'Simulación de cartera', sector: 'Mercados financieros',
    summary: 'Construye una cartera ficticia y explica por qué cambia de valor.',
    status: 'open', format: 'Individual · 3 semanas', deadline: '20 dic 2026', sampleParticipation: 'none',
    start: 'Entender el riesgo es más útil que memorizar definiciones.',
    deliverables: ['Una cartera con sus pesos', 'Un informe de tres páginas'],
    review: ['Lógica de la cartera', 'Lectura del riesgo'],
  },
  {
    slug: 'riesgos-flota-caso', kind: 'challenge', companySlug: 'mapfre',
    title: 'Caso de riesgos en una flota', sector: 'Seguros',
    summary: 'Identifica los riesgos de una flota de reparto y propón medidas de prevención.',
    status: 'closed', format: 'Equipo · 3 semanas', deadline: 'Cerrado', sampleParticipation: 'none',
    start: 'Prevenir un siniestro cuesta menos que pagarlo.',
    deliverables: ['Un mapa de riesgos', 'Tres medidas con su coste'],
    review: ['Completitud', 'Coste de las medidas'],
  },
  {
    slug: 'curva-de-tipos', kind: 'miniproject', companySlug: 'instituto-bme',
    title: 'Lectura de una curva de tipos', sector: 'Mercados financieros',
    summary: 'Interpreta una curva de tipos real de ejemplo y escribe tu lectura en una página.',
    status: 'open', format: 'Individual · 1 semana', deadline: 'Sin fecha límite', sampleParticipation: 'none',
    start: 'La curva de tipos resume las expectativas del mercado.',
    deliverables: ['Una lectura de una página'],
    review: ['Lectura correcta de la curva', 'Claridad'],
  },
  {
    slug: 'mini-informe-herramientas', kind: 'miniproject', companySlug: 'google',
    title: 'Mini informe con herramientas de datos', sector: 'Tecnología',
    summary: 'Elige una herramienta de datos y explica qué pregunta responde mejor.',
    status: 'open', format: 'Individual · 1 semana', deadline: 'Sin fecha límite', sampleParticipation: 'none',
    start: 'Elegir la herramienta adecuada ahorra mucho trabajo.',
    deliverables: ['Un informe corto', 'Una captura del resultado'],
    review: ['Adecuación de la herramienta', 'Claridad del informe'],
  },
  {
    slug: 'flujo-de-pago', kind: 'miniproject', companySlug: 'revolut',
    title: 'Diseño de un flujo de pago', sector: 'Banca digital',
    summary: 'Diseña los pasos de un pago sencillo para una persona que no lo ha hecho nunca.',
    status: 'open', format: 'Individual · 1 semana', deadline: 'Sin fecha límite', sampleParticipation: 'none',
    start: 'Un pago bien diseñado no hace pensar al usuario.',
    deliverables: ['Tres pantallas o pasos', 'Una nota de decisiones'],
    review: ['Sencillez', 'Accesibilidad'],
  },
  {
    slug: 'coleccion-catalogo', kind: 'miniproject', companySlug: 'silbon',
    title: 'Catálogo de una colección', sector: 'Moda y retail',
    summary: 'Organiza el catálogo de una colección ficticia con sus tallas, colores y precios.',
    status: 'open', format: 'Individual · 1 semana', deadline: 'Sin fecha límite', sampleParticipation: 'none',
    start: 'Un catálogo ordenado vende mejor que uno bonito y confuso.',
    deliverables: ['Una hoja de catálogo', 'Tres criterios de orden'],
    review: ['Orden', 'Coherencia de datos'],
  },
  {
    slug: 'costes-de-linea', kind: 'miniproject', companySlug: 'heineken',
    title: 'Costes de una línea de producción', sector: 'Gran consumo',
    summary: 'Calcula el coste por unidad de una línea de producción de ejemplo.',
    status: 'open', format: 'Individual · 1 semana', deadline: 'Sin fecha límite', sampleParticipation: 'none',
    start: 'El coste por unidad dice más que el coste total.',
    deliverables: ['Un cálculo con sus supuestos', 'Una recomendación'],
    review: ['Corrección del cálculo', 'Supuestos explícitos'],
  },
];

export const challengeBySlug = (slug: string) => challengeFixtures.find((c) => c.slug === slug);
