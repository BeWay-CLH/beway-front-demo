# View Models y datos simulados

Los View Models (VM) son **del frontend**: describen lo que una pantalla necesita pintar, no lo que guarda el backend.
Cuando existan DTOs, un adapter en `lib/adapters/` traduce DTO → VM (decisión del brief). El backend no tiene que adoptar estos tipos.

Estado: los tipos de esta página son **propuesta** salvo donde se indica "Implementación". Se escriben en
`lib/models/<dominio>.ts` con el primer ticket que los use. Existen `session`, `profile`, `common` y `company`.

## Convenciones

- Fechas como `string` ISO 8601 (`2026-10-22`); el formateo a "22 oct 2026" se hace en la UI con `Intl.DateTimeFormat('es-ES')`.
- Números como `number`; la UI formatea con separador de miles `.` (`1.240`).
- Enumerados como uniones de literales en inglés (`'open' | 'closed'`); las etiquetas en español viven en la UI.
- Identificadores con prefijo por dominio y estables: `usr-…`, `cmp-…`, `srv-…`, `crs-…`, `crd-…`.
- `slug` y `username`: `a-z0-9-`, 3–30 caracteres. Ambos pueden cambiar; el `id` no (DEC-011). Un username antiguo deja de existir (DEC-017).
- Iconos como nombre Lucide (`'building-2'`).
- Campos opcionales con `?`; nunca strings vacíos como "sin dato".
- Un VM público **nunca** contiene campos privados, aunque estén vacíos.

## Servicios (`lib/services/<dominio>.ts`)

```ts
// Lectura: VM o null (null → notFound()). Lanza en error.
getCompanies(filter?: CompanyFilter): Promise<CompanyCardVM[]>
getCompanyBySlug(slug: string): Promise<CompanyDetailVM | null>
getPublicProfile(username: string): Promise<PublicProfileVM | null>

// Escritura simulada: nunca persiste fuera del navegador.
type Simulated<T = void> = { simulated: true; data?: T };
saveProfile(input: ProfileFormVM): Promise<Simulated>
```

---

## Sesión y cuenta

```ts
// Existe en lib/session.ts
type Role = 'talent' | 'company' | 'admin';
type Session = { userId: string; username: string; displayName: string; roles: Role[] };

type SignupFormVM = {
  intent: 'talent';                      // 'company' llega con G; hoy la opción se ve desactivada (DEC-022)
  fullName: string;                      // 2–80
  email: string;
  password: string;                      // ≥ 8, nunca se guarda en fixtures ni storage
  acceptsTerms: boolean;                 // obligatorio
};

type AccountSettingsVM = {
  email: string;
  emailVerified: boolean;
  visibility: ProfileVisibility;
  notifications: { surveys: boolean; courses: boolean; companyNews: boolean };
};
```

## Perfil

```ts
type ProfileVisibility = 'private' | 'public';   // DEC-015: sin más niveles hasta que responda legal

type PublicProfileVM =
  | { visibility: 'private'; username: string }  // sin ningún otro dato (DEC-012)
  | {
      visibility: 'public';
      username: string;
      displayName: string;
      headline?: string;              // "Analista de datos junior"
      location?: string;
      avatarUrl?: string;
      about?: string;
      interests: string[];            // categorías del catálogo
      skills: string[];               // autodeclaradas; nunca "verificadas"
      experience: ExperienceVM[];
      education: EducationVM[];
      credentials: CredentialVM[];    // solo las emitidas (DEC-010)
      isOwner: boolean;               // muestra "Editar perfil"
    };

type ExperienceVM = { id: string; role: string; organization: string; start: string; end?: string; description?: string };
type EducationVM  = { id: string; title: string; institution: string; start: string; end?: string };

type ProfileFormVM = Omit<Extract<PublicProfileVM, { visibility: 'public' }>, 'isOwner' | 'credentials'> & {
  visibility: ProfileVisibility;
};

type OnboardingVM = {
  step: 0 | 1 | 2 | 3;     // Sobre ti · Formación y experiencia · Intereses · Privacidad
  completed: number[];
  draft: Partial<ProfileFormVM>;
};

type ProfileCompletionVM = { percent: number; missing: Array<'headline' | 'about' | 'experience' | 'education' | 'interests'> };
```

## Implementación del bloque B (código real)

Los tipos viven en `lib/models/profile.ts` y `lib/models/session.ts`; la completitud en `lib/completion.ts`.
Algunas formas cambiaron respecto a la propuesta de arriba:

- `ProfileFormVM` no lleva `visibility`: la visibilidad es un dato de cuenta (`AccountSettingsVM`).
- `ExperienceVM.start` y `EducationVM.start` son opcionales (`AAAA-MM`).
- `ProfileViewVM` es una unión por `kind`: `'private'` (solo `username`) o `'full'` (con `isOwner` y `visibility`).
- `ProfileCardVM` es el formulario más `username`: lo que ve una persona con el enlace.
- `Session` y `Role` están en `lib/models/session.ts`. `SESSION_COOKIE` es `bw_demo`.
- `Simulated = { simulated: true }` (`lib/models/common.ts`) es el resultado de cada escritura simulada.

Servicios (`lib/services/profiles.ts`): `getProfileForViewer`, `getProfileForm`, `getPreviewCard`,
`getAccountSettings`, `saveProfile`, `saveAccountSettings`. Acciones de servidor (`lib/actions/profile.ts`):
`saveOwnProfile`, `saveOwnSettings`. Ambas llaman al servicio y exigen sesión.

Fechas: "AAAA-MM" en datos y en formularios (`type="month"`). Se muestran con `formatMonth` (meses fijos, no Intl,
para que servidor y navegador pinten igual).

## Empresas

```ts
// Propuesta original. Lo que se construyó está en "Implementación del bloque C", justo debajo.
type CompanyCardVM = {
  id: string; slug: string; name: string;
  category: string; categoryIcon: string;
  description: string; logo?: string; cover?: string;
  stats: { icon: string; value: number; label: string }[];   // máx. 5 (CompanyCard)
};

type CompanyModuleKind = 'summary' | 'culture' | 'programs' | 'openings' | 'locations' | 'sources';  // DEC-020: lista abierta

type CompanyDetailVM = CompanyCardVM & {
  website?: string;                 // solo si es real; nunca inventado
  followersCount?: number;          // solo si BE-025 lo da; nunca inventado
  isFollowing: boolean;             // sesión actual (C-05)
  modules: CompanyModuleVM[];       // en orden; los vacíos no llegan
  sources: SourceVM[];
  lastReviewedAt: string;
  isStale: boolean;                 // lastReviewedAt > 180 días (DEC-020), calculado en el servicio
};

type CompanyModuleVM = { kind: CompanyModuleKind; title: string; body?: string; items?: { label: string; value?: string; icon?: string }[] };
type SourceVM = { label: string; url?: string; retrievedAt: string };

// Solo Admin
type EditorialStatus = 'draft' | 'in-review' | 'changes-requested' | 'published' | 'archived';
type AdminCompanyRowVM = { id: string; slug: string; name: string; category: string; status: EditorialStatus; lastReviewedAt: string; updatedBy: string };
type ReviewItemVM = { id: string; companyId: string; companyName: string; submittedAt: string; submittedBy: string; changedModules: CompanyModuleKind[] };
```

## Paquete de contenido de las 17 fichas (Tarea 2, DEC-046)

Tipos en `lib/models/company.ts`, sección «Colecciones del paquete». `CompanyDetailVM` incluye `CompanyPackageVM`
(`sector`, `heroActions`, `sectionHeadings`, `notices` y `collections`). En `CompanyRecord` es opcional, así que las fichas de
ejemplo no cambian. Colecciones: `LearningVM` (formación), `ChallengeVM` (retos), `MiniprojectVM`, `AmbassadorVM` (todos, con
`authorized`), `ResourceVM`, `ScholarshipVM`, `AcademicProgramVM` y `BrandVM`. `OfferOrigin` replica `contentOrigin`
del paquete. Un dato ausente no llega: el campo se omite o la lista va vacía. Los embajadores se muestran con su nombre y
la etiqueta «Pendiente de autorización» si `authorized` es false (DEC-059).

Cadena: `data/seed/companies.content.v2.json` (copia íntegra) → `lib/seed/companies-adapter.ts` (función pura) →
`lib/seed/companies.ts` (carga una vez) → `lib/services/companies.ts` (fusión sin duplicados). Validación: `npm run seed:check`.

## Implementación del bloque C (código real)

Los tipos viven en `lib/models/company.ts`; el servicio en `lib/services/companies.ts`; los fixtures en
`data/fixtures/companies.ts` y `follows.ts`. Cambios respecto a la propuesta de arriba:

- **Las fuentes no son un módulo.** `CompanyModuleKind` es `'summary' | 'culture' | 'programs' | 'openings' | 'locations'`.
  `SourceVM` lleva `id`; cada `CompanyModuleVM` cita `sourceIds?: string[]` (BE-009: "fuentes por módulo si las hay").
  La vista pinta las fuentes como una pestaña aparte (DEC-031).
- `CompanyCardVM.stats` es `CompanyStatVM[]` (`{ icon, value: number, label }`). `CompanyCardVM` no lleva `logo` obligatorio.
- `CompanyDetailVM` = `CompanyCardVM` + `website?`, `followersCount?`, `isFollowing`, `modules`, `sources`, `lastReviewedAt`, `isStale`.
- `CompanyRecord` (fixture) = `CompanyDetailVM` sin `isFollowing`, `isStale` ni `followersCount`, más `status: 'draft' | 'published'`.
  **`status` nunca sale en un VM público.** Un borrador no aparece en el catálogo, ni en categorías, ni en la ficha.
- `CompanyFilter` = `{ q?, category?, page?, pageSize? }`, con `category` = slug (`datos-e-ia`, `educacion`). `CompanyPageVM` =
  `{ items, total, page, pageCount }`. Una página fuera de rango se acota; un `category` desconocido se ignora en la página.
- `isStale` lo calcula el servicio con `STALE_AFTER_DAYS = 180` (`isStale(lastReviewedAt, now)`).
- Los módulos sin cuerpo ni elementos se quitan en el servicio: no llegan a la pantalla.

Servicios (`lib/services/companies.ts`): `getCompanyCategories`, `getCompanies`, `getCompanyBySlug`, `getFollowedCompanies`,
`getCompanyDirectory` (versión corta de todas las publicadas, para recomponer "Empresas que sigues" con los cambios simulados
de la sesión), `setCompanyFollowing` (simulado). Acción de servidor (`lib/actions/companies.ts`): `setFollowing`, exige sesión.

Seguimientos (`data/fixtures/follows.ts`): Lucía sigue a Metrovía, Datalia y CLH; Marcos a ninguna.
Los cambios simulados viven en `sessionStorage` (`beway-demo-follows:<userId>`), nunca en el fixture (`components/company/follow-store.ts`).

Fixtures de empresa: 9 del starter + `cmp-clh` + `cmp-brisa-salud` (borrador). Estados de prueba: Vialink desactualizada, Trazo sin
módulos, Kairos Edu sin Cultura. Formatos: `formatDate` ("12 feb 2026") y `formatCount` ("1.240") en `lib/format.ts`.

## Encuestas

Hecho en E-01. Los tipos viven en `lib/models/survey.ts`; el servicio en `lib/services/surveys.ts` (`getSurveys`, `getSurveyPage`,
`submitSurvey` simulado); la acción de servidor en `lib/actions/surveys.ts` (`submitSurveyAnswers`); el fixture en `data/fixtures/surveys.ts`.
Cambios respecto a la propuesta de abajo:

- `Eligibility` pierde `unknown`: `'follows' | 'interested' | 'not-eligible'`. Se calcula en el servicio con a quién sigue la persona y sus
  intereses (OI-017); no está en el fixture.
- `SurveyPublisherVM` lleva también `category` (para "Te interesa Movilidad") y `slug`; `questionCount` lo calcula el servicio con las secciones.
- La lectura de detalle es `SurveyPageVM = { kind: 'answer'; survey: SurveyDetailVM } | { kind: 'info'; survey: SurveyInfoVM; reason }`, con
  `reason: 'not-eligible' | 'upcoming' | 'closed' | 'completed'`. `SurveyInfoVM` es el resumen **sin preguntas** (BE-011). `SurveyDetailVM`
  añade `savedDraft?` (borrador del servidor, BE-012).
- `scale` ya no lleva `min` (siempre 1) y `Option` pasa a `OptionVM`.
- `SurveyRecord` (fixture) = detalle sin lo que depende de la persona, más `publisherId`, `participationByUser` y `savedDraftByUser?`.
- Estado de sesión **solo en el navegador** (`components/survey/survey-store.ts`): `beway-demo-survey-draft:<userId>:<surveyId>` (borrador y
  consentimiento) y `beway-demo-surveys-completed:<userId>` (ids enviados en la sesión). Nunca en el fixture.

```ts
type SurveyStatus = 'open' | 'upcoming' | 'closed';
type SurveyParticipation = 'not-started' | 'in-progress' | 'completed';
// Audiencia (DEC-016): quien sigue a la empresa o está interesado en ella (OI-017)
type Eligibility = 'follows' | 'interested' | 'not-eligible' | 'unknown';

type SurveySummaryVM = {
  id: string; slug: string; title: string; summary: string;
  publisher: { companyId: string; companySlug: string; name: string; logo?: string };  // CLH es cmp-clh (DEC-016)
  estimatedMinutes: number; questionCount: number;
  status: SurveyStatus; opensAt?: string; closesAt?: string;
  participation: SurveyParticipation; eligibility: Eligibility;
};

type SurveyDetailVM = SurveySummaryVM & {
  intro: string;
  consent: { text: string; required: boolean };
  privacyNote: string;              // quién verá las respuestas
  sections: SurveySectionVM[];
};

type SurveySectionVM = { id: string; title: string; description?: string; questions: SurveyQuestionVM[] };

type SurveyQuestionVM =
  | { id: string; type: 'single';    prompt: string; required: boolean; options: Option[] }
  | { id: string; type: 'multiple';  prompt: string; required: boolean; options: Option[]; max?: number }
  | { id: string; type: 'scale';     prompt: string; required: boolean; min: 1; max: 5 | 7 | 10; minLabel: string; maxLabel: string }
  | { id: string; type: 'short-text'; prompt: string; required: boolean; maxLength: number }
  | { id: string; type: 'long-text'; prompt: string; required: boolean; maxLength: number };

type Option = { value: string; label: string };

type SurveyAnswersVM = Record<string, string | string[] | number>;  // por id de pregunta; borrador en sessionStorage
```

## Cursos y credenciales

Hecho en E-04. Tipos en `lib/models/course.ts` (cursos y credenciales, solo tipos); servicios en `lib/services/courses.ts` (`getCourses`,
`getCourseBySlug`, `setCourseInterest` simulado) y `lib/services/credentials.ts` (`getCredentials`); acción `setInterest` en
`lib/actions/courses.ts`; fixtures `data/fixtures/courses.ts` (7 cursos) y `credentials.ts`. Cambios respecto a la propuesta de abajo:
`CourseFilter = { format?, status? }`; `CredentialVM` lleva `courseTitle?` (lo resuelve el servicio); `CredentialRecord` (fixture) añade
`userId`. El interés en un curso vive solo en `sessionStorage` (`beway-demo-course-interest:<userId>`).

```ts
type CourseFormat = 'online' | 'hybrid' | 'in-person';
type CourseStatus = 'open' | 'upcoming' | 'closed';

type CourseSummaryVM = {
  id: string; slug: string; title: string; summary: string;
  provider: string; format: CourseFormat; durationLabel: string;   // "8 semanas"
  level?: 'intro' | 'intermediate' | 'advanced';
  status: CourseStatus; startsAt?: string;
  topics: string[]; grantsCredential: boolean;
};

type CourseDetailVM = CourseSummaryVM & {
  description: string;
  outcomes: string[];
  requirements: string[];
  syllabus: { title: string; durationLabel?: string }[];
  enrollment: { kind: 'interest-only' } | { kind: 'external'; url: string };   // url solo si es real
};

type CredentialVM = {
  id: string; title: string;
  issuer: string; issuedAt: string;
  courseSlug?: string;               // si viene de un curso de BeWay
  evidenceUrl?: string;              // DEC-021: emisor y fecha, sin sello de "verificada"
};
```

## Landing

```ts
type PublicStatsVM = { value: number; label: string }[];   // A-08; si una cifra falta, no se pinta
```

## Dashboard Talent

Hecho en D-01 (`lib/models/dashboard.ts`, servicio `lib/services/dashboard.ts`, `getTalentDashboard(userId)`). Cambió respecto al plan:
las empresas no son `CompanyCardVM[]` completas sino `SuggestedCompanyVM[]` (lo que pinta una fila) más los ids que ya sigue, para que
el navegador aplique los seguimientos simulados de la sesión (C-05). `surveys` y `courses` se añaden en E-09, cuando existan sus modelos.

```ts
type CompletionStepVM = {
  item: CompletionItem;            // 'headline' | 'about' | 'experience' | 'education' | 'interests'
  done: boolean;
  label: string;                   // "formación": nombre corto, para la barra
  title: string;                   // "Añade tu formación": lo que falta, como acción
  description: string;
  href: string;                    // apartado del editor: /talent/profile/edit#formacion
};

type NextStepVM = { label: string; href: string };           // el único botón primary

type SuggestedCompanyVM = Pick<CompanyCardVM, 'id' | 'slug' | 'name' | 'category' | 'logo'>;

type TalentDashboardVM = {
  greetingName: string;
  username: string;
  visibility: ProfileVisibility;
  completion: ProfileCompletionVM;
  steps: CompletionStepVM[];       // los cinco, en el orden del porcentaje
  nextStep?: NextStepVM;           // sin él (perfil completo) no hay primary
  isNew: boolean;                  // ningún apartado hecho → el siguiente paso es el onboarding (OI-021)
  interests: string[];
  interestCompanies: SuggestedCompanyVM[];   // publicadas y de una categoría que le interesa; sin puntuación
  followedIds: string[];           // los que ya sigue según el servidor
  surveys: DashboardSurveyVM[];    // E-09: abiertas, para esta persona y sin completar; cierran antes primero
  courses: DashboardCourseVM[];    // E-09: abiertos; empiezan antes primero
};

/* Lo que pinta una fila del inicio: un Pick de SurveySummaryVM y de CourseSummaryVM. */
type DashboardSurveyVM = Pick<SurveySummaryVM, 'id' | 'slug' | 'title' | 'publisher' | 'estimatedMinutes' | 'closesAt' | 'participation'>;
type DashboardCourseVM = Pick<CourseSummaryVM, 'id' | 'slug' | 'title' | 'provider' | 'format' | 'durationLabel' | 'startsAt' | 'grantsCredential'>;
```

`getCompaniesByInterests(interests)` (en `lib/services/companies.ts`) devuelve las fichas publicadas cuya categoría coincide con algún
interés (los intereses son las categorías del catálogo). `formatList` (en `lib/format.ts`) escribe listas en castellano ("a, b e i").

---

## Dataset simulado

Un solo universo coherente. Los IDs y slugs no cambian entre tickets.

| Entidad | Fixture | Contenido mínimo |
|---|---|---|
| Sesión | `mockSession` (hecho) | `usr-lucia-martin`, `lucia-martin`, roles `talent` + `admin` |
| Usuarios / perfiles | `data/fixtures/profiles.ts` (B-03) | `lucia-martin` público y completo · `marcos-gil` privado · `ana-ruiz` público a medias |
| Empresas | `data/fixtures/companies.ts` (C-01, hecho) | Las 9 de `mock.ts` con `id: 'cmp-<slug>'` · `cmp-clh` (CLH como empresa) · 1 en `draft` (para el 404) · 1 con `lastReviewedAt` antiguo (desactualizada) |
| Seguimientos | `data/fixtures/follows.ts` (C-05, hecho) | `lucia-martin` sigue a 3 empresas, incluida `cmp-clh`; `marcos-gil` a ninguna |
| Encuestas | `data/fixtures/surveys.ts` (E-01, hecho) | 6: `primer-paso-profesional` (CLH, abierta, los 5 tipos de pregunta) · `herramientas-de-datos` (Datalia, en curso con borrador del servidor para Lucía) · `movilidad-en-tu-dia-a-dia` (Metrovía, cerrada y completada por Lucía) · `ia-y-empleo-joven` (Orbital, próxima) · `transporte-compartido` (Vialink, cerrada) · `autoconsumo-en-viviendas` (Nexora, abierta: no elegible para Lucía, elegible para Marcos por su interés en Energía) |
| Cifras públicas | `data/fixtures/stats.ts` (A-08) | Las 4 de la landing, marcadas como ejemplo |
| Cursos | `data/fixtures/courses.ts` (E-04, hecho) | 7 cursos: los 3 formatos, 3 abiertos / 2 próximos / 2 cerrados, con y sin credencial; todos `interest-only` |
| Credenciales | `data/fixtures/credentials.ts` (E-04, hecho) | 2 para `usr-lucia-martin` (una de un curso de BeWay, otra externa), ninguna para `usr-marcos-gil` (estado vacío) |
| Cola editorial | `data/fixtures/reviews.ts` (F-04) | 3 envíos de fichas existentes |

Reglas:
- Cifras de fixtures marcadas con un comentario `// ejemplo` y nunca presentadas como métricas reales.
- Sin datos de personas reales; nombres genéricos en español.
- Sin URLs externas inventadas: `website`, `evidenceUrl` y `enrollment.url` se omiten si no hay una real.
- Logos generados como SVG en `mock.ts` (los colores hex están **solo** en el fixture, nunca en componentes).

## Adapters (cuando exista la API)

```ts
// lib/adapters/company.ts
export function toCompanyDetailVM(dto: CompanyDTO, now = new Date()): CompanyDetailVM { … }
```

- Uno por VM. Puros, sin red, con test unitario cuando haya tests (X-02).
- Si el DTO no trae un campo obligatorio del VM, el adapter decide el fallback y lo documenta aquí.
- `isStale` y `ProfileCompletionVM.percent` se calculan en frontend salvo que el backend los entregue.
