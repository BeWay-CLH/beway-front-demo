/* View Models del dashboard Talent (D-01, E-09). Cuando exista BE-021, un adapter traduce su respuesta a estos tipos (ARCHITECTURE §4). */

import type { CompanyCardVM } from './company';
import type { CourseSummaryVM } from './course';
import type { CompletionItem, ProfileCompletionVM, ProfileVisibility } from './profile';
import type { SurveySummaryVM } from './survey';

/* Un apartado del perfil, listo o pendiente. Los cinco cuentan para el porcentaje (`completionOf`). */
export type CompletionStepVM = {
  item: CompletionItem;
  done: boolean;
  /* Nombre corto del apartado: "formación". */
  label: string;
  /* Lo que falta, como acción: "Añade tu formación". */
  title: string;
  description: string;
  /* Destino del botón de la fila. */
  href: string;
};

/* El único botón `primary` de la pantalla. Sin paso siguiente, no hay primary. */
export type NextStepVM = { label: string; href: string };

export type SuggestedCompanyVM = Pick<CompanyCardVM, 'id' | 'slug' | 'name' | 'category' | 'logo'>;

/* Lo que pinta una fila del inicio (E-09). */
export type DashboardSurveyVM = Pick<SurveySummaryVM, 'id' | 'slug' | 'title' | 'publisher' | 'estimatedMinutes' | 'closesAt' | 'participation'>;
export type DashboardCourseVM = Pick<CourseSummaryVM, 'id' | 'slug' | 'title' | 'provider' | 'format' | 'durationLabel' | 'startsAt' | 'grantsCredential'>;

export type TalentDashboardVM = {
  greetingName: string;
  username: string;
  visibility: ProfileVisibility;
  completion: ProfileCompletionVM;
  /* Los cinco apartados, en el orden del porcentaje. */
  steps: CompletionStepVM[];
  nextStep?: NextStepVM;
  /* Ningún apartado hecho: el siguiente paso es el onboarding (OI-021). */
  isNew: boolean;
  interests: string[];
  /* Empresas publicadas de las categorías que le interesan, en orden del catálogo. Sin puntuación ni orden por
     "afinidad": coincide la categoría o no (decisión 11 del brief). */
  interestCompanies: SuggestedCompanyVM[];
  /* Ids que ya sigue según el servidor; el navegador aplica encima los cambios simulados de la sesión (C-05). */
  followedIds: string[];
  /* Abiertas, para esta persona y sin completar, las que cierran antes primero. El navegador quita las enviadas en la sesión. */
  surveys: DashboardSurveyVM[];
  /* Cursos abiertos, los que empiezan antes primero. */
  courses: DashboardCourseVM[];
};
