import type { CompanyModuleItemVM, CompanyModuleVM, CompanyRecord, CompanyStatVM, SourceVM } from '@/lib/models/company';
import { logo } from './logo';
import { brandCompanyRecords } from './brands';

/* Fichas de empresa de ejemplo (C-01). Todo el contenido, cifras incluidas, es ficticio: la demo lo rotula
   como "Datos de ejemplo". Sin URLs externas inventadas: `website` y `SourceVM.url` se omiten.
   Casos que cubre, para probar estados: una ficha desactualizada (Vialink), una sin módulos (Trazo),
   una sin Cultura (Kairos Edu) y una en borrador que el público no ve (Brisa Salud). */

const stats = (vacantes: number, retos: number, equipo: number, sedes: number): CompanyStatVM[] => [
  { icon: 'briefcase', value: vacantes, label: 'Vacantes' },
  { icon: 'lightbulb', value: retos, label: 'Retos' },
  { icon: 'users', value: equipo, label: 'Equipo' },
  { icon: 'map-pin', value: sedes, label: 'Sedes' },
];

const source = (id: string, label: string, retrievedAt: string): SourceVM => ({ id, label, retrievedAt });

const item = (label: string, value?: string, icon?: string): CompanyModuleItemVM => ({ label, value, icon });

const summary = (body: string, items: CompanyModuleItemVM[], sourceIds: string[]): CompanyModuleVM => ({
  kind: 'summary',
  title: 'Resumen',
  body,
  items,
  sourceIds,
});

const culture = (body: string, items: CompanyModuleItemVM[], sourceIds: string[]): CompanyModuleVM => ({
  kind: 'culture',
  title: 'Cultura',
  body,
  items,
  sourceIds,
});

const programs = (items: CompanyModuleItemVM[], sourceIds: string[]): CompanyModuleVM => ({
  kind: 'programs',
  title: 'Programas',
  items,
  sourceIds,
});

const openings = (items: CompanyModuleItemVM[], sourceIds: string[]): CompanyModuleVM => ({
  kind: 'openings',
  title: 'Vacantes destacadas',
  items,
  sourceIds,
});

const locations = (items: CompanyModuleItemVM[], sourceIds: string[]): CompanyModuleVM => ({
  kind: 'locations',
  title: 'Sedes',
  items,
  sourceIds,
});

const baseCompanyRecords: CompanyRecord[] = [
  {
    id: 'cmp-metrovia',
    slug: 'metrovia',
    name: 'Metrovía',
    category: 'Movilidad',
    categoryIcon: 'bus',
    description: 'Operador de transporte que abre retos de movilidad urbana y busca talento junior en datos y operaciones.',
    logo: logo('Metrovía'),
    stats: stats(12, 3, 240, 4), // ejemplo
    status: 'published',
    lastReviewedAt: '2026-09-18',
    modules: [
      summary(
        'Operador de transporte urbano e interurbano. Trabaja con ayuntamientos y universidades para probar nuevas formas de moverse por la ciudad, y abre retos para que equipos jóvenes propongan mejoras sobre datos reales de sus líneas.',
        [item('Sector', 'Transporte público'), item('Tamaño', '240 personas'), item('Sede central', 'Madrid')],
        ['met-web', 'met-informe'],
      ),
      culture(
        'Equipos pequeños que se reparten una línea o un servicio y miden su impacto cada trimestre.',
        [
          item('Datos antes que opiniones', 'Cada propuesta llega con una medición, aunque sea pequeña.', 'database'),
          item('Servicio a la ciudad', 'Las decisiones se juzgan por el tiempo que ahorran a quien viaja.', 'route'),
          item('Aprender en la operación', 'Las prácticas empiezan en el centro de control, no en una oficina aparte.', 'compass'),
        ],
        ['met-informe'],
      ),
      programs(
        [
          item('Reto de movilidad urbana', 'Propón una mejora de frecuencias con datos de ocupación. Abierto hasta el 12 de noviembre.', 'lightbulb'),
          item('Prácticas en operaciones', 'Seis meses en el centro de control con una tutora asignada.', 'graduation-cap'),
          item('Mentoría para perfiles de datos', 'Sesiones quincenales con el equipo de planificación.', 'handshake'),
        ],
        ['met-web'],
      ),
      openings(
        [
          item('Analista de datos junior', 'Madrid, híbrido', 'briefcase'),
          item('Técnico de planificación de servicio', 'Zaragoza, presencial', 'briefcase'),
          item('Ingeniero de operaciones, prácticas', 'Valencia, presencial', 'briefcase'),
        ],
        ['met-web'],
      ),
      locations(
        [item('Madrid', 'Sede central', 'map-pin'), item('Zaragoza', 'Centro de operaciones', 'map-pin'), item('Valencia', 'Centro de operaciones', 'map-pin'), item('Sevilla', 'Oficina comercial', 'map-pin')],
        ['met-web'],
      ),
    ],
    sources: [source('met-web', 'Sitio web corporativo de Metrovía', '2026-09-18'), source('met-informe', 'Informe anual 2025', '2026-09-12')],
  },
  {
    id: 'cmp-datalia',
    slug: 'datalia',
    name: 'Datalia',
    category: 'Datos e IA',
    categoryIcon: 'database',
    description: 'Consultora de datos con programas de mentoría para perfiles en transición hacia analítica.',
    logo: logo('Datalia', '#0B132B'),
    stats: stats(8, 2, 85, 2), // ejemplo
    status: 'published',
    lastReviewedAt: '2026-10-02',
    modules: [
      summary(
        'Consultora de analítica y datos para empresas medianas. Acompaña a quien da el salto a datos desde otro sector con mentoría uno a uno y un caso real desde la primera semana.',
        [item('Sector', 'Consultoría de datos'), item('Tamaño', '85 personas'), item('Sede central', 'Barcelona')],
        ['dat-web'],
      ),
      culture(
        'Un equipo que prefiere explicar bien a presumir de técnica. Se revisa el trabajo en pareja y se comparte el código.',
        [
          item('Revisión en pareja', 'Nadie entrega un análisis sin que otra persona lo haya leído.', 'users'),
          item('Explicar con claridad', 'Los informes se escriben para quien decide, no para quien programa.', 'file-text'),
          item('Formación continua', 'Una tarde por semana se reserva para aprender.', 'book-open'),
        ],
        ['dat-web', 'dat-prensa'],
      ),
      programs(
        [
          item('Mentoría en datos y analítica', 'Doce semanas con analistas senior sobre un caso real. Empieza el 12 de noviembre.', 'handshake'),
          item('Talento junior en datos', 'Convocatoria de incorporación con proceso por casos prácticos.', 'briefcase'),
        ],
        ['dat-web'],
      ),
      openings(
        [item('Analista de datos junior', 'Barcelona, híbrido', 'briefcase'), item('Ingeniera de datos', 'Madrid, en remoto', 'briefcase')],
        ['dat-web'],
      ),
      locations([item('Barcelona', 'Sede central', 'map-pin'), item('Madrid', 'Oficina', 'map-pin')], ['dat-web']),
    ],
    sources: [source('dat-web', 'Sitio web corporativo de Datalia', '2026-10-02'), source('dat-prensa', 'Nota de prensa del programa de mentoría', '2026-09-21')],
  },
  {
    id: 'cmp-cargo-norte',
    slug: 'cargo-norte',
    name: 'Cargo Norte',
    category: 'Logística',
    categoryIcon: 'truck',
    description: 'Red logística regional que propone retos de optimización de rutas y almacenes inteligentes.',
    logo: logo('Cargo Norte'),
    stats: stats(15, 4, 410, 7), // ejemplo
    status: 'published',
    lastReviewedAt: '2026-08-27',
    modules: [
      summary(
        'Red logística regional con almacenes y flota propia. Publica retos abiertos de optimización de rutas y de gestión de almacén, y lleva el mejor prototipo a una prueba piloto.',
        [item('Sector', 'Logística y transporte'), item('Tamaño', '410 personas'), item('Sede central', 'Bilbao')],
        ['car-web', 'car-informe'],
      ),
      culture(
        'Operación diaria y mejora continua: cada almacén tiene un responsable que prueba cambios pequeños cada semana.',
        [
          item('Probar en pequeño', 'Los cambios se ensayan en un almacén antes de extenderlos.', 'warehouse'),
          item('Seguridad primero', 'Ningún objetivo de plazo justifica saltarse un protocolo.', 'shield-check'),
          item('Abrir la puerta a ideas externas', 'Los retos permiten que equipos de fuera propongan soluciones.', 'lightbulb'),
        ],
        ['car-web'],
      ),
      programs(
        [
          item('Open innovation en logística', 'Startups y universidades proponen soluciones; el mejor prototipo pasa a piloto. Empieza el 30 de noviembre.', 'lightbulb'),
          item('Programa de operaciones junior', 'Rotación de seis meses entre almacén, transporte y planificación.', 'graduation-cap'),
        ],
        ['car-web'],
      ),
      openings(
        [
          item('Analista de rutas', 'Bilbao, híbrido', 'briefcase'),
          item('Responsable de almacén, prácticas', 'Vigo, presencial', 'briefcase'),
          item('Desarrollador de software de planificación', 'Bilbao, híbrido', 'briefcase'),
        ],
        ['car-web'],
      ),
      locations(
        [
          item('Bilbao', 'Sede central', 'map-pin'),
          item('Vigo', 'Plataforma logística', 'map-pin'),
          item('Santander', 'Plataforma logística', 'map-pin'),
          item('Oviedo', 'Almacén', 'map-pin'),
          item('Pamplona', 'Almacén', 'map-pin'),
          item('Zaragoza', 'Almacén', 'map-pin'),
          item('Valladolid', 'Almacén', 'map-pin'),
        ],
        ['car-web'],
      ),
    ],
    sources: [source('car-web', 'Sitio web corporativo de Cargo Norte', '2026-08-27'), source('car-informe', 'Memoria de sostenibilidad 2025', '2026-08-20')],
  },
  {
    id: 'cmp-nexora',
    slug: 'nexora',
    name: 'Nexora',
    category: 'Energía',
    categoryIcon: 'zap',
    description: 'Empresa de energía renovable que busca ingeniería, datos y proyectos de eficiencia.',
    logo: logo('Nexora', '#0B132B'),
    stats: stats(6, 1, 120, 3), // ejemplo
    status: 'published',
    lastReviewedAt: '2026-09-30',
    modules: [
      summary(
        'Desarrolla y opera parques de energía renovable. Busca ingeniería, datos y perfiles de proyecto para sus planes de eficiencia energética.',
        [item('Sector', 'Energía renovable'), item('Tamaño', '120 personas'), item('Sede central', 'Sevilla')],
        ['nex-web'],
      ),
      culture(
        'Proyectos con fecha y responsable. Se valora más cerrar bien un proyecto pequeño que abrir tres a la vez.',
        [
          item('Responsabilidad clara', 'Cada proyecto tiene una persona al frente desde el primer día.', 'target'),
          item('Medir el ahorro', 'Un proyecto de eficiencia se da por bueno cuando la factura baja.', 'gauge'),
        ],
        ['nex-web'],
      ),
      programs(
        [item('Mentoría técnica en eficiencia', 'Ocho semanas para recién graduados de ingeniería, con visitas a planta.', 'handshake')],
        ['nex-web'],
      ),
      openings(
        [item('Ingeniera de proyectos fotovoltaicos', 'Sevilla, presencial', 'briefcase'), item('Analista de eficiencia energética', 'Málaga, híbrido', 'briefcase')],
        ['nex-web'],
      ),
      locations([item('Sevilla', 'Sede central', 'map-pin'), item('Málaga', 'Oficina de proyectos', 'map-pin'), item('Almería', 'Centro de control', 'map-pin')], ['nex-web']),
    ],
    sources: [source('nex-web', 'Sitio web corporativo de Nexora', '2026-09-30')],
  },
  {
    id: 'cmp-orbital',
    slug: 'orbital',
    name: 'Orbital Labs',
    category: 'Datos e IA',
    categoryIcon: 'brain-circuit',
    description: 'Laboratorio de IA aplicada con convocatorias abiertas de prácticas y proyectos de investigación.',
    logo: logo('Orbital'),
    stats: stats(9, 5, 60, 1), // ejemplo
    status: 'published',
    lastReviewedAt: '2026-10-09',
    modules: [
      summary(
        'Laboratorio de inteligencia artificial aplicada a problemas de industria y servicios. Combina investigadores y desarrolladores en proyectos de seis a doce meses.',
        [item('Sector', 'Inteligencia artificial aplicada'), item('Tamaño', '60 personas'), item('Sede central', 'Valencia')],
        ['orb-web', 'orb-publicaciones'],
      ),
      culture(
        'Un laboratorio pequeño donde cada persona en prácticas tiene un proyecto propio y una revisión semanal.',
        [
          item('Proyecto propio', 'Desde el primer mes tienes una pregunta que responder.', 'flask-conical'),
          item('Revisión semanal', 'Una hora con tu tutor para decidir qué sigue.', 'calendar-days'),
          item('Publicar lo aprendido', 'Los resultados que se pueden compartir se publican.', 'file-text'),
        ],
        ['orb-web'],
      ),
      programs(
        [
          item('Prácticas en IA aplicada', 'Seis meses con proyecto de investigación propio. Empieza el 2 de diciembre.', 'briefcase'),
          item('Proyectos de investigación abiertos', 'Cinco retos con tutor asignado y datos preparados.', 'lightbulb'),
        ],
        ['orb-web'],
      ),
      openings(
        [
          item('Becaria de investigación en visión por computador', 'Valencia, presencial', 'briefcase'),
          item('Ingeniero de aprendizaje automático junior', 'Valencia, híbrido', 'briefcase'),
          item('Desarrolladora de herramientas internas', 'Valencia, en remoto', 'briefcase'),
        ],
        ['orb-web'],
      ),
      locations([item('Valencia', 'Laboratorio y sede central', 'map-pin')], ['orb-web']),
    ],
    sources: [source('orb-web', 'Sitio web corporativo de Orbital Labs', '2026-10-09'), source('orb-publicaciones', 'Listado de publicaciones del laboratorio', '2026-10-01')],
  },
  {
    id: 'cmp-kairos',
    slug: 'kairos',
    name: 'Kairos Edu',
    category: 'Educación',
    categoryIcon: 'graduation-cap',
    description: 'Plataforma educativa que colabora con universidades en retos de aprendizaje adaptativo.',
    logo: logo('Kairos', '#0B132B'),
    stats: stats(5, 2, 45, 2), // ejemplo
    status: 'published',
    lastReviewedAt: '2026-07-14',
    modules: [
      summary(
        'Plataforma de aprendizaje adaptativo que colabora con universidades. Propone retos a estudiantes de último curso y equipos de investigación.',
        [item('Sector', 'Tecnología educativa'), item('Tamaño', '45 personas'), item('Sede central', 'Madrid')],
        ['kai-web'],
      ),
      programs([item('Reto de aprendizaje adaptativo', 'Diseña una ruta de estudio que se ajuste al ritmo de cada estudiante.', 'lightbulb')], ['kai-web']),
      openings([item('Diseñadora instruccional', 'Madrid, híbrido', 'briefcase'), item('Desarrollador web junior', 'Salamanca, en remoto', 'briefcase')], ['kai-web']),
      locations([item('Madrid', 'Sede central', 'map-pin'), item('Salamanca', 'Oficina', 'map-pin')], ['kai-web']),
    ],
    sources: [source('kai-web', 'Sitio web corporativo de Kairos Edu', '2026-07-14')],
  },
  {
    id: 'cmp-vialink',
    slug: 'vialink',
    name: 'Vialink',
    category: 'Movilidad',
    categoryIcon: 'bus',
    description: 'Soluciones de movilidad compartida con proyectos abiertos para equipos de producto.',
    logo: logo('Vialink'),
    stats: stats(7, 2, 98, 3), // ejemplo
    status: 'published',
    /* Más de 180 días: la ficha enseña el aviso de desactualizada (DEC-020). */
    lastReviewedAt: '2026-02-12',
    modules: [
      summary(
        'Servicio de movilidad compartida con bicicletas y patinetes eléctricos. Trabaja con equipos de producto en proyectos de reparto de flota y de mantenimiento predictivo.',
        [item('Sector', 'Movilidad compartida'), item('Tamaño', '98 personas'), item('Sede central', 'Barcelona')],
        ['via-web'],
      ),
      programs([item('Proyecto de reparto de flota', 'Reduce los vehículos vacíos en horas valle con datos de uso.', 'route')], ['via-web']),
      openings([item('Product manager junior', 'Barcelona, híbrido', 'briefcase'), item('Técnico de mantenimiento', 'Barcelona, presencial', 'briefcase')], ['via-web']),
      locations([item('Barcelona', 'Sede central', 'map-pin'), item('Valencia', 'Centro de mantenimiento', 'map-pin'), item('Madrid', 'Centro de mantenimiento', 'map-pin')], ['via-web']),
    ],
    sources: [source('via-web', 'Sitio web corporativo de Vialink', '2026-02-12')],
  },
  {
    id: 'cmp-sunbeam',
    slug: 'sunbeam',
    name: 'Sunbeam',
    category: 'Energía',
    categoryIcon: 'zap',
    description: 'Instalaciones solares para empresas, con programa de mentoría técnica para recién graduados.',
    logo: logo('Sunbeam', '#0B132B'),
    stats: stats(10, 1, 150, 5), // ejemplo
    status: 'published',
    lastReviewedAt: '2026-09-05',
    modules: [
      summary(
        'Instala y mantiene plantas solares en cubiertas de empresas. Su programa de mentoría técnica incorpora a recién graduados a los equipos de obra y de diseño.',
        [item('Sector', 'Energía solar'), item('Tamaño', '150 personas'), item('Sede central', 'Málaga')],
        ['sun-web'],
      ),
      culture(
        'Trabajo en obra y en oficina en la misma semana. Quien diseña también sube a la cubierta.',
        [
          item('Del plano a la cubierta', 'El diseño se valida en obra antes de cerrarse.', 'sun'),
          item('Mentoría desde el primer día', 'Cada persona nueva tiene una referente técnica.', 'handshake'),
        ],
        ['sun-web'],
      ),
      programs([item('Mentoría técnica para recién graduados', 'Ocho semanas con visitas de obra y diseño de una instalación pequeña.', 'handshake')], ['sun-web']),
      openings([item('Técnica de diseño fotovoltaico', 'Málaga, presencial', 'briefcase'), item('Jefe de obra, prácticas', 'Granada, presencial', 'briefcase')], ['sun-web']),
      locations(
        [item('Málaga', 'Sede central', 'map-pin'), item('Granada', 'Delegación', 'map-pin'), item('Sevilla', 'Delegación', 'map-pin'), item('Córdoba', 'Delegación', 'map-pin'), item('Almería', 'Delegación', 'map-pin')],
        ['sun-web'],
      ),
    ],
    sources: [source('sun-web', 'Sitio web corporativo de Sunbeam', '2026-09-05')],
  },
  {
    /* Ficha recién creada y sin contenido: prueba el estado vacío de la ficha. */
    id: 'cmp-trazo',
    slug: 'trazo',
    name: 'Trazo',
    category: 'Logística',
    categoryIcon: 'truck',
    description: 'Trazabilidad de carga y última milla con retos abiertos de visión por computador.',
    logo: logo('Trazo'),
    stats: stats(4, 3, 70, 2), // ejemplo
    status: 'published',
    lastReviewedAt: '2026-10-12',
    modules: [],
    sources: [],
  },
  {
    /* CLH publica como una empresa más (DEC-016). Texto provisional: falta confirmar con producto (OI-019). */
    id: 'cmp-clh',
    slug: 'clh',
    name: 'CLH',
    category: 'Ecosistema',
    categoryIcon: 'network',
    description: 'Equipo que impulsa BeWay. Publica encuestas como una empresa más del ecosistema.',
    stats: [],
    status: 'published',
    lastReviewedAt: '2026-10-15',
    modules: [
      summary(
        'CLH impulsa BeWay y publica sus propias encuestas, igual que cualquier otra empresa del ecosistema. Si sigues a CLH, recibirás sus encuestas.',
        [item('Rol', 'Equipo que impulsa BeWay')],
        ['clh-beway'],
      ),
    ],
    sources: [source('clh-beway', 'Información del propio equipo de BeWay', '2026-10-15')],
  },
  {
    /* En borrador: no aparece en el catálogo y su URL da 404 en público (C-04). */
    id: 'cmp-brisa-salud',
    slug: 'brisa-salud',
    name: 'Brisa Salud',
    category: 'Salud',
    categoryIcon: 'heart-pulse',
    description: 'Red de clínicas con programas de prácticas para perfiles de salud digital.',
    logo: logo('Brisa', '#0B132B'),
    stats: stats(3, 0, 55, 2), // ejemplo
    status: 'draft',
    lastReviewedAt: '2026-10-20',
    modules: [
      summary(
        'Borrador interno. Esta ficha todavía no se ha revisado y no debe verse fuera de Admin.',
        [item('Sector', 'Salud')],
        ['bri-web'],
      ),
    ],
    sources: [source('bri-web', 'Sitio web corporativo de Brisa Salud', '2026-10-20')],
  },
];

/* Directorio completo: las fichas de ejemplo y las 17 marcas corporativas (guía, 03). */
export const companyRecords: CompanyRecord[] = [...baseCompanyRecords, ...brandCompanyRecords];
