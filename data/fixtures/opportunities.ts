/* FICTICIO. Oportunidades profesionales de ejemplo (guía de correcciones, 07; fichas 27 a 30). Las empresas son slugs de
   las 17 marcas (`brands.ts`). Puestos, requisitos y procesos son de ejemplo y se rotulan así en la interfaz. No hay
   candidaturas reales: enviar queda deshabilitado, con la palabra "Simulación". */

export type OpportunityFixture = {
  slug: string;
  title: string;
  companySlug: string;
  modality: 'Presencial' | 'Híbrida' | 'Remota';
  type: 'Prácticas' | 'Junior' | 'Proyecto';
  location: string;
  summary: string;
  role: string[];
  looking: string[];
  process: string[];
  closes: string;
};

export const opportunityFixtures: OpportunityFixture[] = [
  {
    slug: 'analista-datos-junior', title: 'Analista de datos junior', companySlug: 'santander',
    modality: 'Híbrida', type: 'Junior', location: 'Madrid',
    summary: 'Apoyo a un equipo de analítica de negocio con datos de productos financieros.',
    role: ['Preparas tablas y paneles para el equipo.', 'Revisas la calidad de los datos antes de usarlos.', 'Presentas hallazgos con claridad.'],
    looking: ['SQL básico', 'Interés por los datos y las finanzas', 'Ganas de aprender con un equipo'],
    process: ['Revisión de tu perfil', 'Una conversación de 30 minutos', 'Un caso práctico corto'],
    closes: 'Sin fecha de cierre',
  },
  {
    slug: 'practicas-comunicacion-digital', title: 'Prácticas de comunicación digital', companySlug: 'atresmedia',
    modality: 'Presencial', type: 'Prácticas', location: 'Madrid',
    summary: 'Prácticas en el equipo de contenidos digitales.',
    role: ['Escribes piezas para redes y web.', 'Mides el resultado de cada publicación.'],
    looking: ['Redacción clara en español', 'Curiosidad por el audiovisual'],
    process: ['Revisión de tu perfil', 'Una prueba de redacción'],
    closes: 'Cierra en 3 semanas',
  },
  {
    slug: 'consultor-junior-riesgos', title: 'Consultor junior de riesgos', companySlug: 'mapfre',
    modality: 'Híbrida', type: 'Junior', location: 'Madrid',
    summary: 'Apoyo en proyectos de análisis de riesgos para aseguradoras.',
    role: ['Ayudas a preparar mapas de riesgos.', 'Documentas los supuestos de cada análisis.'],
    looking: ['Pensamiento estructurado', 'Excel avanzado'],
    process: ['Revisión de tu perfil', 'Entrevista con el equipo'],
    closes: 'Sin fecha de cierre',
  },
  {
    slug: 'proyecto-retail-silbon', title: 'Proyecto de catálogo de colección', companySlug: 'silbon',
    modality: 'Remota', type: 'Proyecto', location: 'Remoto',
    summary: 'Proyecto corto para organizar el catálogo de una colección.',
    role: ['Organizas el catálogo por tallas y colores.', 'Propones tres criterios de orden.'],
    looking: ['Orden y atención al detalle'],
    process: ['Revisión de tu perfil', 'Entrega del proyecto'],
    closes: 'Cierra en 2 semanas',
  },
  {
    slug: 'especialista-pagos-digitales', title: 'Especialista de pagos digitales', companySlug: 'revolut',
    modality: 'Remota', type: 'Junior', location: 'Remoto',
    summary: 'Apoyo al equipo que diseña los flujos de pago de la app.',
    role: ['Pruebas los flujos de pago con usuarios.', 'Documentas los casos de error.'],
    looking: ['Interés por el diseño de producto', 'Atención a la accesibilidad'],
    process: ['Revisión de tu perfil', 'Una prueba de usabilidad'],
    closes: 'Sin fecha de cierre',
  },
  {
    slug: 'practicas-auditoria', title: 'Prácticas de auditoría', companySlug: 'pwc',
    modality: 'Presencial', type: 'Prácticas', location: 'Barcelona',
    summary: 'Prácticas en el equipo de auditoría financiera.',
    role: ['Preparas soportes para las revisiones.', 'Lees estados financieros con tu equipo.'],
    looking: ['Contabilidad básica', 'Rigor con las cifras'],
    process: ['Revisión de tu perfil', 'Entrevista con el equipo'],
    closes: 'Cierra en 1 mes',
  },
];

export const opportunityBySlug = (slug: string) => opportunityFixtures.find((o) => o.slug === slug);
