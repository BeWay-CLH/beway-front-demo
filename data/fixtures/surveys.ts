import type { SurveyRecord } from '@/lib/models/survey';

/* Encuestas de ejemplo (E-01). Todo el contenido es ficticio y la demo lo rotula como "Datos de ejemplo".
   Estados que cubre, para probar la pantalla:
   - primer-paso-profesional: abierta, sin empezar, publicada por CLH, con los cinco tipos de pregunta (Lucía).
   - herramientas-de-datos: abierta, en curso (Lucía tiene un borrador en el servidor).
   - movilidad-en-tu-dia-a-dia: cerrada y completada por Lucía.
   - ia-y-empleo-joven: próxima.
   - transporte-compartido: cerrada, sin responder.
   - autoconsumo-en-viviendas: abierta; Lucía no es de su audiencia, Marcos sí (interés Energía).
   La elegibilidad no está aquí: sale de a quién sigue la persona y de sus intereses (OI-017). */

const PRIVACY_NOTE =
  'BeWay y la empresa que la publica verán tus respuestas junto a tu nombre. Las demás empresas solo verán resultados agregados.';

export const surveyRecords: SurveyRecord[] = [
  {
    id: 'srv-clh-primer-paso',
    slug: 'primer-paso-profesional',
    title: 'Tu primer paso profesional',
    summary: 'Qué necesitas para empezar a trabajar en lo tuyo y qué te frena hoy.',
    intro:
      'CLH quiere saber en qué punto estás y qué apoyo te ayudaría más para dar tu primer paso. Con tus respuestas decidimos qué programas y cursos pedimos a las empresas del ecosistema.',
    publisherId: 'cmp-clh',
    estimatedMinutes: 6,
    status: 'open',
    opensAt: '2026-10-05',
    closesAt: '2026-11-20',
    consent: {
      text: 'Entiendo quién verá mis respuestas y acepto contestar esta encuesta.',
      required: true,
    },
    privacyNote: PRIVACY_NOTE,
    participationByUser: {},
    sections: [
      {
        id: 'sec-donde-estas',
        title: 'Dónde estás',
        description: 'Para situarte.',
        questions: [
          {
            id: 'q-momento',
            type: 'single',
            prompt: '¿En qué punto de tu camino estás?',
            required: true,
            options: [
              { value: 'estudiando', label: 'Estudiando' },
              { value: 'primera-experiencia', label: 'Buscando mi primera experiencia' },
              { value: 'trabajando', label: 'Trabajando o en prácticas' },
              { value: 'cambio', label: 'Cambiando de sector' },
            ],
          },
          {
            id: 'q-practicar',
            type: 'multiple',
            prompt: '¿Qué te gustaría practicar antes de tu primer empleo?',
            required: true,
            max: 3,
            options: [
              { value: 'datos', label: 'Análisis de datos' },
              { value: 'comunicacion', label: 'Comunicación' },
              { value: 'proyectos', label: 'Gestión de proyectos' },
              { value: 'idiomas', label: 'Idiomas' },
              { value: 'programacion', label: 'Programación' },
            ],
          },
        ],
      },
      {
        id: 'sec-lo-que-necesitas',
        title: 'Lo que necesitas',
        questions: [
          {
            id: 'q-experiencia',
            type: 'scale',
            prompt: '¿Cuánto te preocupa no tener experiencia previa?',
            required: true,
            max: 5,
            minLabel: 'Nada',
            maxLabel: 'Mucho',
          },
          {
            id: 'q-apoyo',
            type: 'single',
            prompt: '¿Qué te ayudaría más ahora mismo?',
            required: true,
            options: [
              { value: 'mentoria', label: 'Una mentoría' },
              { value: 'practicas', label: 'Prácticas remuneradas' },
              { value: 'cursos', label: 'Cursos cortos' },
              { value: 'contacto', label: 'Contacto directo con empresas' },
            ],
          },
        ],
      },
      {
        id: 'sec-en-tus-palabras',
        title: 'En tus palabras',
        description: 'Las dos son opcionales.',
        questions: [
          {
            id: 'q-sector',
            type: 'short-text',
            prompt: '¿En qué sector te gustaría empezar?',
            required: false,
            maxLength: 80,
          },
          {
            id: 'q-freno',
            type: 'long-text',
            prompt: '¿Qué te frena hoy para dar el primer paso?',
            required: false,
            maxLength: 500,
          },
        ],
      },
    ],
  },
  {
    id: 'srv-datalia-herramientas',
    slug: 'herramientas-de-datos',
    title: 'Herramientas de datos en tus primeras prácticas',
    summary: 'Qué programas usas y cuáles te faltan para trabajar con datos.',
    intro:
      'Datalia prepara su programa de prácticas y quiere partir de lo que ya sabes usar. Contesta con lo que haces hoy, no con lo que te gustaría saber.',
    publisherId: 'cmp-datalia',
    estimatedMinutes: 4,
    status: 'open',
    opensAt: '2026-10-12',
    closesAt: '2026-10-30',
    consent: {
      text: 'Entiendo quién verá mis respuestas y acepto contestar esta encuesta.',
      required: true,
    },
    privacyNote: PRIVACY_NOTE,
    participationByUser: { 'usr-lucia-martin': 'in-progress' },
    savedDraftByUser: {
      'usr-lucia-martin': { 'q-herramientas': ['sql', 'excel'], 'q-nivel-sql': 3 },
    },
    sections: [
      {
        id: 'sec-lo-que-usas',
        title: 'Lo que usas',
        questions: [
          {
            id: 'q-herramientas',
            type: 'multiple',
            prompt: '¿Qué herramientas has usado en el último año?',
            required: true,
            options: [
              { value: 'sql', label: 'SQL' },
              { value: 'python', label: 'Python' },
              { value: 'excel', label: 'Excel' },
              { value: 'bi', label: 'Una herramienta de paneles' },
              { value: 'ninguna', label: 'Ninguna' },
            ],
          },
          {
            id: 'q-nivel-sql',
            type: 'scale',
            prompt: '¿Cómo valoras tu nivel de SQL?',
            required: true,
            max: 5,
            minLabel: 'Empiezo',
            maxLabel: 'Con soltura',
          },
        ],
      },
      {
        id: 'sec-lo-que-falta',
        title: 'Lo que te falta',
        questions: [
          {
            id: 'q-faltan',
            type: 'single',
            prompt: '¿Qué te frena más para trabajar con datos?',
            required: true,
            options: [
              { value: 'practica', label: 'Falta de práctica con datos reales' },
              { value: 'herramientas', label: 'No conozco las herramientas' },
              { value: 'tiempo', label: 'Falta de tiempo' },
            ],
          },
          {
            id: 'q-proyecto',
            type: 'long-text',
            prompt: 'Si pudieras elegir un proyecto de datos, ¿cuál sería?',
            required: false,
            maxLength: 400,
          },
        ],
      },
    ],
  },
  {
    id: 'srv-metrovia-movilidad',
    slug: 'movilidad-en-tu-dia-a-dia',
    title: 'Movilidad en tu día a día',
    summary: 'Cómo te desplazas a estudiar o trabajar y qué cambiarías.',
    intro:
      'Metrovía recoge cómo se mueve la gente joven para decidir qué horarios y rutas revisar primero.',
    publisherId: 'cmp-metrovia',
    estimatedMinutes: 2,
    status: 'closed',
    opensAt: '2026-09-15',
    closesAt: '2026-10-12',
    consent: {
      text: 'Entiendo quién verá mis respuestas y acepto contestar esta encuesta.',
      required: true,
    },
    privacyNote: PRIVACY_NOTE,
    participationByUser: { 'usr-lucia-martin': 'completed' },
    sections: [
      {
        id: 'sec-trayectos',
        title: 'Tus trayectos',
        questions: [
          {
            id: 'q-medio',
            type: 'single',
            prompt: '¿Cómo te desplazas casi todos los días?',
            required: true,
            options: [
              { value: 'publico', label: 'Transporte público' },
              { value: 'bici', label: 'Bici o patinete' },
              { value: 'pie', label: 'A pie' },
              { value: 'coche', label: 'Coche' },
            ],
          },
          {
            id: 'q-cambio',
            type: 'single',
            prompt: '¿Qué mejorarías primero?',
            required: true,
            options: [
              { value: 'frecuencia', label: 'La frecuencia de paso' },
              { value: 'horarios', label: 'Los horarios de noche' },
              { value: 'precio', label: 'El precio' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'srv-orbital-ia-empleo',
    slug: 'ia-y-empleo-joven',
    title: 'Inteligencia artificial y empleo joven',
    summary: 'Qué esperas de la IA en tu primer trabajo y qué te preocupa.',
    intro:
      'Orbital Labs quiere conocer cómo usa la IA la gente joven en sus estudios y en su primer trabajo, y qué le preocupa.',
    publisherId: 'cmp-orbital',
    estimatedMinutes: 3,
    status: 'upcoming',
    opensAt: '2026-11-10',
    closesAt: '2026-11-24',
    consent: {
      text: 'Entiendo quién verá mis respuestas y acepto contestar esta encuesta.',
      required: true,
    },
    privacyNote: PRIVACY_NOTE,
    participationByUser: {},
    sections: [
      {
        id: 'sec-ia',
        title: 'La IA en tu trabajo',
        questions: [
          {
            id: 'q-uso-ia',
            type: 'single',
            prompt: '¿Usas herramientas de IA para estudiar o trabajar?',
            required: true,
            options: [
              { value: 'a-diario', label: 'A diario' },
              { value: 'a-veces', label: 'A veces' },
              { value: 'nunca', label: 'Nunca' },
            ],
          },
          {
            id: 'q-confianza',
            type: 'scale',
            prompt: '¿Cuánto te fías de lo que responde una herramienta de IA?',
            required: true,
            max: 5,
            minLabel: 'Nada',
            maxLabel: 'Totalmente',
          },
          {
            id: 'q-preocupacion',
            type: 'long-text',
            prompt: '¿Qué es lo que más te preocupa de la IA en el trabajo?',
            required: false,
            maxLength: 400,
          },
        ],
      },
    ],
  },
  {
    id: 'srv-vialink-transporte',
    slug: 'transporte-compartido',
    title: 'Transporte compartido entre ciudades',
    summary: 'Cuándo viajas entre ciudades y cuánto pagarías por hacerlo compartido.',
    intro: 'Vialink estudia si compensa ofrecer trayectos compartidos entre ciudades a estudiantes y jóvenes profesionales.',
    publisherId: 'cmp-vialink',
    estimatedMinutes: 3,
    status: 'closed',
    opensAt: '2026-09-21',
    closesAt: '2026-10-09',
    consent: {
      text: 'Entiendo quién verá mis respuestas y acepto contestar esta encuesta.',
      required: true,
    },
    privacyNote: PRIVACY_NOTE,
    participationByUser: {},
    sections: [
      {
        id: 'sec-viajes',
        title: 'Tus viajes',
        questions: [
          {
            id: 'q-frecuencia',
            type: 'single',
            prompt: '¿Cada cuánto viajas entre ciudades?',
            required: true,
            options: [
              { value: 'semanal', label: 'Cada semana' },
              { value: 'mensual', label: 'Cada mes' },
              { value: 'rara-vez', label: 'Rara vez' },
            ],
          },
          {
            id: 'q-precio',
            type: 'single',
            prompt: '¿Cuánto pagarías por un trayecto compartido de 150 km?',
            required: true,
            options: [
              { value: 'hasta-8', label: 'Hasta 8 €' },
              { value: '8-15', label: 'Entre 8 € y 15 €' },
              { value: 'mas-15', label: 'Más de 15 €' },
            ],
          },
          {
            id: 'q-equipaje',
            type: 'multiple',
            prompt: '¿Qué llevarías normalmente?',
            required: false,
            options: [
              { value: 'mochila', label: 'Mochila' },
              { value: 'maleta', label: 'Maleta' },
              { value: 'bici', label: 'Bici plegable' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'srv-nexora-autoconsumo',
    slug: 'autoconsumo-en-viviendas',
    title: 'Autoconsumo en viviendas',
    summary: 'Qué sabes de las placas solares en casa y qué te haría instalarlas.',
    intro:
      'Nexora diseña sus próximas ofertas de empleo en eficiencia energética. Esta encuesta es para personas que siguen a Nexora o se interesan por la energía.',
    publisherId: 'cmp-nexora',
    estimatedMinutes: 2,
    status: 'open',
    opensAt: '2026-10-19',
    closesAt: '2026-11-13',
    consent: {
      text: 'Entiendo quién verá mis respuestas y acepto contestar esta encuesta.',
      required: true,
    },
    privacyNote: PRIVACY_NOTE,
    participationByUser: {},
    sections: [
      {
        id: 'sec-autoconsumo',
        title: 'Autoconsumo',
        questions: [
          {
            id: 'q-conocimiento',
            type: 'scale',
            prompt: '¿Cuánto sabes de autoconsumo solar?',
            required: true,
            max: 5,
            minLabel: 'Nada',
            maxLabel: 'Mucho',
          },
          {
            id: 'q-motivo',
            type: 'single',
            prompt: '¿Qué te haría instalar placas en casa?',
            required: true,
            options: [
              { value: 'ahorro', label: 'Ahorrar en la factura' },
              { value: 'ayudas', label: 'Contar con ayudas' },
              { value: 'ambiental', label: 'Reducir mi impacto ambiental' },
            ],
          },
        ],
      },
    ],
  },
];
