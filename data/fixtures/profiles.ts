import type { ProfileRecord } from '@/lib/models/profile';

/* Perfiles de ejemplo. Estado estable entre pantallas:
   - lucia-martin: público, completo al 80 % (le falta la formación). Es la cuenta que entra en la demo.
   - marcos-gil: privado. Visitantes ven "Este perfil es privado"; él ve su perfil con un aviso.
   - ana-ruiz: público a medias (20 %), para ver los apartados vacíos.
   Un nombre de usuario que ya no existe (por ejemplo "lucia-m") da 404: no hay redirección (OI-011). */

export const profileRecords: ProfileRecord[] = [
  {
    userId: 'usr-lucia-martin',
    username: 'lucia-martin',
    visibility: 'public',
    email: 'lucia.martin@beway.test',
    displayName: 'Lucía Martín',
    headline: 'Analista de datos junior',
    location: 'Valencia',
    about: 'Estudié Estadística y ahora aprendo análisis de datos con SQL y Python. Busco un primer proyecto en el que aprender con un equipo real.',
    experience: [
      { id: 'exp-lucia-1', role: 'Prácticas de análisis', organization: 'Datalia', start: '2025-09', end: '2026-06' },
    ],
    education: [],
    interests: ['Datos e IA', 'Movilidad'],
    skills: ['SQL', 'Python', 'Excel', 'Visualización de datos'],
    notifications: { surveys: true, courses: true, companyNews: false },
  },
  {
    userId: 'usr-marcos-gil',
    username: 'marcos-gil',
    visibility: 'private',
    email: 'marcos.gil@beway.test',
    displayName: 'Marcos Gil',
    headline: 'Ingeniero de energía',
    location: 'Zaragoza',
    about: 'Trabajo en eficiencia energética de edificios. Me interesa cómo los datos de consumo pueden reducir el gasto sin cambiar la obra.',
    experience: [
      { id: 'exp-marcos-1', role: 'Ingeniero junior', organization: 'Sunbeam', start: '2024-02', end: '2026-03' },
    ],
    education: [
      { id: 'edu-marcos-1', title: 'Grado en Ingeniería Eléctrica', institution: 'Universidad de ejemplo', start: '2019-09', end: '2023-06' },
    ],
    interests: ['Energía'],
    skills: ['AutoCAD', 'Eficiencia energética'],
    notifications: { surveys: false, courses: true, companyNews: true },
  },
  {
    userId: 'usr-ana-ruiz',
    username: 'ana-ruiz',
    visibility: 'public',
    email: 'ana.ruiz@beway.test',
    displayName: 'Ana Ruiz',
    interests: ['Educación'],
    skills: [],
    experience: [],
    education: [],
    notifications: { surveys: true, courses: false, companyNews: false },
  },
];

/* Intereses que se pueden elegir: las mismas categorías que el catálogo de empresas. */
export const interestOptions = ['Movilidad', 'Datos e IA', 'Logística', 'Energía', 'Educación'];
