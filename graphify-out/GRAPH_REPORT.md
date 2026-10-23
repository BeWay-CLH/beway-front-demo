# Graph Report - beway-front  (2026-10-22)

## Corpus Check
- 142 files · ~58,698 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: .css 3, (none) 2, .lock 1)

## Summary
- 1026 nodes · 2442 edges · 56 communities (52 shown, 4 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 120 edges (avg confidence: 0.86)
- Token cost: 554,825 input · 0 output

## Community Hubs (Navigation)
- Acceso, registro y recuperación
- Tipos del design system
- Mapa de rutas y redirecciones
- Catálogo y panel admin
- Demo: decisiones y recorrido
- Cabecera y shells
- Roadmap y estado de bloques
- Componentes del design system
- Decisiones de arquitectura y UI
- Inicio Talent (código)
- Dependencias del proyecto
- Modelos de vista y datos
- Guía de estilo
- Privacidad del perfil y ajustes
- Brief y bloques de trabajo
- Backend, bloques futuros y cambios
- Enlaces muertos y textos legales
- Diseño de pantallas de app
- Dudas abiertas resueltas
- Encuestas y cursos (bloque E)
- Configuración TypeScript
- Arquitectura frontend
- Necesidades de backend
- Reglas de CLAUDE.md
- Cuentas y acciones de demo
- Campos y pie del design system
- Rutas de admin y layout raíz
- Páginas públicas y perfil
- Admin CLH: bloque F
- Guards de espacio
- Cursos y credenciales
- Controles accesibles y superficies
- Bloque B: acceso y perfil
- Programas (legado)
- Seguir empresas y adaptadores
- Encuestas: audiencia y dudas
- Peticiones DS: botón, radio y NavBar
- Usernames y perfil privado
- Errores por espacio
- Fixtures de empresas
- Botones y tarjetas del DS
- Backend: catálogo, encuestas y cursos
- Páginas legales y contacto
- Icono de marca y favicon
- Tarjetas y landing
- Registro y textos legales
- Verificación y calidad
- Reglas visuales de app
- Credenciales separadas de cursos
- Logo mono blanco
- Logo negativo
- Logo primario
- Logo apilado
- Reglas de Next.js del repo
- Configuración PostCSS

## God Nodes (most connected - your core abstractions)
1. `FRONTEND_MODELS.md: view models and simulated data` - 80 edges
2. `ROUTES.md · Mapa de rutas` - 69 edges
3. `ROADMAP.md · Roadmap y tablero de ejecución` - 62 edges
4. `react` - 55 edges
5. `Icon()` - 46 edges
6. `SCREENS.md · Pantallas` - 46 edges
7. `EXISTING_UI_AUDIT.md: frontend state before the 2026-10-22 changes` - 43 edges
8. `next` - 34 edges
9. `Button()` - 33 edges
10. `DESIGN.md: app screen design direction` - 32 edges

## Surprising Connections (you probably didn't know these)
- `Leer docs/frontend antes de crear o mover rutas` --references--> `BACKEND_HANDOFF.md (necesidades para backend)`  [EXTRACTED]
  CLAUDE.md → docs/frontend/BACKEND_HANDOFF.md
- `AuthLayout()` --calls--> `getSession()`  [EXTRACTED]
  app/(auth)/layout.tsx → lib/session.ts
- `LoginPage()` --calls--> `safeNext()`  [EXTRACTED]
  app/(auth)/login/page.tsx → lib/navigation.ts
- `CompaniesView()` --calls--> `Breadcrumbs()`  [EXTRACTED]
  app/(public)/companies/CompaniesView.tsx → design-system/src/Breadcrumbs.jsx
- `CompaniesView()` --calls--> `Button()`  [EXTRACTED]
  app/(public)/companies/CompaniesView.tsx → design-system/src/Button.jsx

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Sesión y acceso (demo y backend)** — docs_frontend_backend_handoff_be_001, docs_frontend_backend_handoff_be_002, docs_frontend_backend_handoff_be_003, docs_frontend_decisions_dec_005, docs_frontend_decisions_dec_018, docs_frontend_decisions_dec_023 [INFERRED 0.85]
- **Privacidad por defecto del perfil** — docs_frontend_decisions_dec_012, docs_frontend_decisions_dec_015, docs_frontend_backend_handoff_be_005, docs_frontend_agent_brief_decision_06 [INFERRED 0.85]
- **Screens answer one question with a one-line finding** — docs_frontend_design_screen_inicio_talent, docs_frontend_design_screen_onboarding, docs_frontend_design_screen_editar_perfil, docs_frontend_design_screen_ajustes, docs_frontend_design_screen_perfil_publico, docs_frontend_design_screen_acceso, docs_frontend_design_screen_registro [EXTRACTED 1.00]
- **Components lacking native inputs or keyboard support** — docs_frontend_ds_requests_req_02_switch, docs_frontend_ds_requests_req_03_checkbox, docs_frontend_ds_requests_req_04_radio_group, docs_frontend_ds_requests_req_05_dialog, docs_frontend_ds_requests_req_06_field_aria [INFERRED 0.85]
- **Preguntas previas that block several legal texts (LQ-01 to LQ-08)** — docs_frontend_legal_requests_lq_01, docs_frontend_legal_requests_lq_02, docs_frontend_legal_requests_lq_03, docs_frontend_legal_requests_lq_04, docs_frontend_legal_requests_lq_05, docs_frontend_legal_requests_lq_06, docs_frontend_legal_requests_lq_07, docs_frontend_legal_requests_lq_08 [EXTRACTED 1.00]
- **Guards de acceso y sesión demo por rol** — docs_frontend_roadmap_a_06, docs_frontend_roadmap_b_02, docs_frontend_routes_login, docs_frontend_screens_sin_acceso_admin, docs_frontend_readme_sesion_demo [INFERRED 0.75]
- **Bloque E: encuestas y cursos** — docs_frontend_roadmap_e_01, docs_frontend_roadmap_e_02, docs_frontend_roadmap_e_03, docs_frontend_roadmap_e_04, docs_frontend_roadmap_e_05, docs_frontend_roadmap_e_06, docs_frontend_roadmap_e_07, docs_frontend_roadmap_e_08, docs_frontend_roadmap_e_09 [EXTRACTED 1.00]
- **Bloque C: catálogo y ficha de empresa** — docs_frontend_roadmap_c_01, docs_frontend_roadmap_c_02, docs_frontend_roadmap_c_03, docs_frontend_roadmap_c_04, docs_frontend_roadmap_c_05, docs_frontend_screens_c_02_ficha_empresa [EXTRACTED 1.00]

## Communities (56 total, 4 thin omitted)

### Community 0 - "Acceso, registro y recuperación"
Cohesion: 0.06
Nodes (64): ForgotPasswordForm(), ForgotPasswordPage(), metadata, LoginPage(), metadata, metadata, SignupPage(), Errors (+56 more)

### Community 1 - "Tipos del design system"
Cohesion: 0.04
Nodes (44): AlertProps, AvatarProps, BadgeProps, BreadcrumbsProps, ButtonProps, CardProps, CheckboxProps, CompanyCardProps (+36 more)

### Community 2 - "Mapa de rutas y redirecciones"
Cohesion: 0.10
Nodes (32): A-04 · Redirecciones de /talent, /admin, /empresas y /registro, Bloque G · Posterior (oportunidades, retos, Company Portal, comunidad, mensajería), C-03 · /companies: CTA a la ficha y filtros en la URL, ROUTES.md · Mapa de rutas, /admin · Redirección a dashboard, /admin/challenges · Retos (LATER), /admin/claims · Solicitudes de claiming (LATER), /admin/companies/[id]/audit · Auditoría privada (LATER) (+24 more)

### Community 3 - "Catálogo y panel admin"
Cohesion: 0.10
Nodes (17): AdminDashboard(), metadata, CompaniesView(), CompaniesPage(), metadata, Block(), categories, companies (+9 more)

### Community 4 - "Demo: decisiones y recorrido"
Cohesion: 0.08
Nodes (31): OI-003 · Cifras y copy de la landing son inventadas (resuelta), OI-007 · Opción Busco talento visible pero desactivada (resuelta), OI-013 · Acceso con correo y contraseña (resuelta), Recorrido para presentar la demo, B-02 · /login y proxy.ts con redirección optimista, B-09 · /forgot-password, /forgot-password · Recuperar acceso (simulación), /login · Iniciar sesión (demo) (+23 more)

### Community 5 - "Cabecera y shells"
Cohesion: 0.13
Nodes (20): AuthLayout(), AppHeader(), config, AuthShell(), DemoBar(), demoBarEnabled, MobileMenu(), isActive() (+12 more)

### Community 6 - "Roadmap y estado de bloques"
Cohesion: 0.12
Nodes (33): Estado actual de los bloques A a G (2026-10-22), ROADMAP.md · Roadmap y tablero de ejecución, A-01 · Route groups (public) y (auth); layout raíz sin cabecera, A-02 · Shells Talent, Admin y Auth; ShellNav y MobileMenu, A-03 · lib/routes.ts con estados live y planned, A-05 · 404 global, de Talent y de Admin; error.tsx por espacio, A-06 · Sesión simulada y guards por rol (lib/session.ts), A-07 · Landing sin desbordes en móvil a 360 px (abierto) (+25 more)

### Community 7 - "Componentes del design system"
Cohesion: 0.16
Nodes (15): TONES, TONES, Dialog(), Icon(), nodeToReact(), pascal(), BOX, IconButton() (+7 more)

### Community 8 - "Decisiones de arquitectura y UI"
Cohesion: 0.11
Nodes (27): A-07 (ROADMAP ticket): home overflows on mobile, DEC-001: each space mounts its own shell, DEC-003: 307 redirects for shared /empresas and /registro links, DEC-007: workaround for the non-responsive NavBar, Typography: Space Grotesk for headings and figures, Inter for text, EXISTING_UI_AUDIT.md: frontend state before the 2026-10-22 changes, CompaniesView: filter Tags, search, EmptyState and Pagination on /empresas, Fonts: Inter and Space Grotesk via Google Fonts link; next/font pending (+19 more)

### Community 9 - "Inicio Talent (código)"
Cohesion: 0.14
Nodes (22): doneLabel, joinEs(), metadata, nextStep, TalentDashboard(), metadata, OnboardingPage(), EditProfilePage() (+14 more)

### Community 10 - "Dependencias del proyecto"
Cohesion: 0.07
Nodes (28): dependencies, lucide, next, react, react-dom, devDependencies, tailwindcss, @tailwindcss/postcss (+20 more)

### Community 11 - "Modelos de vista y datos"
Cohesion: 0.13
Nodes (27): A-08 (ticket): landing public stats, DEC-011: id never changes; slug and username may change, DEC-016: survey audience is followers or interested people, DEC-017: an old username stops existing, FRONTEND_MODELS.md: view models and simulated data, AdminCompanyRowVM: admin table row for a company, Modelling conventions: ISO dates, number formatting, literal unions, optional fields, Lucide icon names, EditorialStatus: draft, in-review, changes-requested, published, archived (+19 more)

### Community 12 - "Guía de estilo"
Cohesion: 0.10
Nodes (12): metadata, Page(), Styleguide(), swatches, Avatar(), initialsOf(), Checkbox(), Skeleton() (+4 more)

### Community 13 - "Privacidad del perfil y ajustes"
Cohesion: 0.13
Nodes (22): DEC-010: only issued credentials appear on the public profile, DEC-012: private profile exposes nothing beyond the username, DEC-015: only private and public visibility until legal answers, Settings screen (Ajustes), Onboarding screen, Visibility preview: how someone with the link sees the profile, AccountSettingsVM: email, verification, visibility, notification toggles, Server actions saveOwnProfile and saveOwnSettings in lib/actions/profile.ts (+14 more)

### Community 14 - "Brief y bloques de trabajo"
Cohesion: 0.08
Nodes (8): AGENT_BRIEF.md (brief fuente), Bloque A · Shells, navegación y 404, Bloque B · Signup, login, onboarding, perfil y settings, Bloque C · Catálogo público de empresas y ficha por slug, Bloque D · Dashboard Talent, Bloque E · Encuestas y cursos a nivel visual/mock, prioridad alta, Bloque F · Admin mínimo, ARCHITECTURE §3 Estructura de carpetas

### Community 15 - "Backend, bloques futuros y cambios"
Cohesion: 0.10
Nodes (8): Bloque G · Oportunidades, challenges, Company Portal y community, ARCHITECTURE §10 Destino: monorepo con el backend, BE-009 Ficha de empresa por slug, BE-020 Unicidad y redirección de slugs y usernames, BE-024 Cifras públicas de la landing, 2026-10-22 · Bloque A: arquitectura, shells y documentación, 2026-10-22 (2) · Navegación unificada, barra de demo y respuestas de producto, DECISIONS.md (registro de decisiones)

### Community 16 - "Enlaces muertos y textos legales"
Cohesion: 0.13
Nodes (23): DS request 11 (medium): Footer renders href='#' for links without href, Dead links: CompanyCard CTA, 'Ver programa', header login to /registro, footer legal links, Route /programas: works, no links; mixes mentorships, challenges and practices, SurveyDetailVM: intro, consent, privacy note, sections, LEGAL_REQUESTS.md: texts and decisions needed from the legal team, Delivery format: final Spanish text, version, date, explicit checkbox or inform-only, Placeholder 'Borrador pendiente de revisión legal' shown until legal text arrives, L-01: privacy policy at /privacy, footer, signup, surveys (block B) (+15 more)

### Community 17 - "Diseño de pantallas de app"
Cohesion: 0.14
Nodes (17): DESIGN.md: app screen design direction, Control heights: 40 px controls, 48 px primary button, Copy rules: Spain Spanish, tuteo, verbs first, sentence case, Skill frontend-design, 12-column grid: 77 px columns, 16 px gutter, 1100 px container, Number format: thousands separator and space before percent, Sign-in screen (Acceso), Edit profile screen (+9 more)

### Community 18 - "Dudas abiertas resueltas"
Cohesion: 0.14
Nodes (17): OPEN_ISSUES.md · Dudas abiertas, OI-001 · Documentos 01–10 y requisitos RF (resuelta), OI-002 · ¿Adelantar el bloque E? No: orden A a F (resuelta), OI-004 · Umbral de ficha desactualizada: 180 días (resuelta), OI-014 · Repo nuevo con carpeta frontend/ (resuelta), OI-015 · Módulos de la ficha de empresa (resuelta), README.md · Documentación de trabajo del frontend, Comandos de desarrollo y modos de demo (+9 more)

### Community 19 - "Encuestas y cursos (bloque E)"
Cohesion: 0.16
Nodes (19): OI-006 · /talent/certifications equivale a /talent/credentials (resuelta), OI-009 · Credenciales con emisor y fecha, sin sello (resuelta), OI-010 · Mentoría y curso son dominios distintos (resuelta), Bloque E · Encuestas y cursos (prioridad de negocio alta), E-04 · Modelos y fixtures de cursos y credenciales, E-05 · /talent/courses con filtros por formato y estado, E-06 · /talent/courses/[slug]: temario, requisitos e interés simulado, E-07 · /talent/credentials: logros obtenidos, sin emisión desde la UI (+11 more)

### Community 20 - "Configuración TypeScript"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 21 - "Arquitectura frontend"
Cohesion: 0.13
Nodes (14): ARCHITECTURE.md (arquitectura frontend), AppHeader (cabecera única sobre NavBar del DS), PageState (components/PageState.tsx, estados de página), proxy.ts (redirección optimista a /login en Next 16), ARCHITECTURE §1 Requisitos (funcionales, no funcionales, restricciones), ARCHITECTURE §2 Vista general, ARCHITECTURE §4 Flujo de datos (fixture, service, page), ARCHITECTURE §5 Sesión, roles y acceso (+6 more)

### Community 22 - "Necesidades de backend"
Cohesion: 0.19
Nodes (18): BACKEND_HANDOFF.md (necesidades para backend), BE-001 Sesión, identidad y roles, BE-002 Alta, verificación y acceso, BE-003 Autorización Admin y auditoría, BE-004 Guardar onboarding, BE-005 Leer perfil por username con visibilidad, BE-006 Editar perfil propio, BE-007 Cuenta y privacidad (+10 more)

### Community 23 - "Reglas de CLAUDE.md"
Cohesion: 0.15
Nodes (5): CLAUDE.md (instrucciones del proyecto), Navigable-Figma prototype purpose, lucide@0.469.0 pinned icon dependency, theme.css Tailwind token class mapping, Theme regeneration with mk_theme.py

### Community 24 - "Cuentas y acciones de demo"
Cohesion: 0.20
Nodes (11): DemoAccountId, demoAccounts, isDemoAccountId(), signInAs(), signOut(), Role, Session, SESSION_COOKIE (+3 more)

### Community 25 - "Campos y pie del design system"
Cohesion: 0.20
Nodes (9): link, Logo(), SRC, LogoMarquee(), NavBar(), Radio(), RadioGroup(), Stat() (+1 more)

### Community 26 - "Rutas de admin y layout raíz"
Cohesion: 0.12
Nodes (3): metadata, nextConfig, next

### Community 27 - "Páginas públicas y perfil"
Cohesion: 0.24
Nodes (11): NotFound(), PublicLayout(), generateMetadata(), Params, ProfilePage(), SiteFooter(), SiteHeader(), Footer() (+3 more)

### Community 28 - "Admin CLH: bloque F"
Cohesion: 0.18
Nodes (16): Bloque F · Admin CLH mínimo, F-02 · /admin/companies: Table con estado editorial, búsqueda y filtros, F-03 · /admin/companies/[id]/edit: editor por módulos, borrador y revisión simulada, F-04 · /admin/reviews: cola con aprobar o pedir cambios (simulado), F-05 · /admin/surveys: listado y editor de encuesta, F-06 · /admin/courses: listado y editor de curso, /admin/companies · Listado editorial de fichas (NOW mínimo), /admin/companies/[id]/edit · Editor modular de ficha (NOW mínimo) (+8 more)

### Community 29 - "Guards de espacio"
Cohesion: 0.27
Nodes (10): AdminLayout(), AdminNotFound(), TalentLayout(), TalentNotFound(), NavButton(), PageState(), PageStateKind, presets (+2 more)

### Community 30 - "Cursos y credenciales"
Cohesion: 0.16
Nodes (15): B-03 (ticket): profile fixtures, DEC-021: credentials show issuer and date, no verified seal, CourseDetailVM: description, outcomes, syllabus, enrollment (interest-only or external url), CourseFormat: online, hybrid, in-person, CourseStatus: open, upcoming, closed, CourseSummaryVM: course card with format, duration, topics, credential flag, CredentialVM: issuer, issue date, optional evidence link, no verified seal, Simulated dataset: one coherent universe with stable IDs and slugs (+7 more)

### Community 31 - "Controles accesibles y superficies"
Cohesion: 0.22
Nodes (15): DEC-024: local form controls replace DS controls without native inputs, Accessibility rules for app screens, Field error state, Surfaces: surface-page, surface-card and border-subtle, DS_REQUESTS.md: requests to the design-system team, Alert is correct: role alert for warning and danger, role status otherwise, Avatar and IconButton are correct: alt text and required aria-label, Delivery of design-system changes via the source and /design-sync (+7 more)

### Community 32 - "Bloque B: acceso y perfil"
Cohesion: 0.19
Nodes (16): OI-005 · Niveles de visibilidad del perfil (abierta, legal pendiente), OI-018 · Edad mínima y menores de edad (abierta), B-01 · /signup en pasos con verificación de correo (estado), B-03 · lib/models, lib/services y fixtures de usuarios y perfiles, B-04 · /talent/onboarding con StepNav de 4 pasos, B-05 · /talent/profile/edit, B-07 · /talent/settings: cuenta, privacidad y cerrar sesión, Bloque B · Auth, onboarding, perfil y settings (+8 more)

### Community 33 - "Programas (legado)"
Cohesion: 0.22
Nodes (10): metadata, ProgramasPage(), details, ProgramasView(), ProgramCard(), Program, programCategories, programs (+2 more)

### Community 34 - "Seguir empresas y adaptadores"
Cohesion: 0.21
Nodes (12): BE-025: backend follower count, needed before followersCount is shown, C-05 (ticket): follows and isFollowing, DEC-020: company modules are an open list; stale after 180 days, Adapter toCompanyDetailVM: pure DTO to VM mapping, CompanyDetailVM: website, followers, isFollowing, modules, sources, staleness, CompanyModuleKind: open list of six module kinds, CompanyModuleVM: kind, title, body, items, Fixture follows (C-05): lucia-martin follows three companies including cmp-clh (+4 more)

### Community 35 - "Encuestas: audiencia y dudas"
Cohesion: 0.25
Nodes (11): OI-008 · Quién publica encuestas: empresas y CLH (resuelta), OI-016 · Encuestas: anonimato, visibilidad y edición (abierta), OI-017 · Qué es un joven interesado en una empresa (abierta), E-01 · Modelos y fixtures de encuestas publicadas por empresas y CLH (cmp-clh), E-02 · /talent/surveys con pestañas Disponibles y Completadas, E-03 · /talent/surveys/[slug]: consentimiento, secciones, borrador y envío simulado, Radio y RadioGroup sin input nativo ni role radio, /talent/surveys · Listado de encuestas (+3 more)

### Community 36 - "Peticiones DS: botón, radio y NavBar"
Cohesion: 0.24
Nodes (9): NavBar responsiveness and active link: already covered by X-04, DS request 1 (high): Button outline border vs borderColor conflict, StatStrip overflow at 390 px: already covered by X-04, DS defect: Button outline border vs borderColor (X-04), DS defect: Radio and RadioGroup have no native input or ARIA roles (X-04), Missing DS variant: side navigation or AppShell for Admin and Company (X-04), Missing DS variant: current state for navigation links (X-04), Missing DS variant: StatStrip stacks on mobile (X-04) (+1 more)

### Community 37 - "Usernames y perfil privado"
Cohesion: 0.31
Nodes (7): OI-011 · Usernames cambiables; el anterior da 404 (resuelta), B-06 · /u/[username] público, privado e inexistente, /talent/profile · Redirección a /u/[username] propio, /u/[username] · Perfil compartible, B-06 · Perfil (especificación) · /u/[username], Perfil privado para visitante · /u/[username], Perfil propio o ajeno · /u/[username]

### Community 38 - "Errores por espacio"
Cohesion: 0.46
Nodes (4): Error(), Error(), Error(), RouteError()

### Community 39 - "Fixtures de empresas"
Cohesion: 0.32
Nodes (8): C-01 (ticket): companies fixtures and rename of Company to CompanyCardVM, Talent home screen (Inicio Talent), CompanyCardVM: id, slug, name, category, description, logo, cover, up to 5 stats, Fixture companies (C-01): nine mock companies, cmp-clh, one draft for the 404, one stale, ProfileCompletionVM: percent and missing sections, Company read services: getCompanies and getCompanyBySlug, TalentDashboardVM: greeting, completion, next step, surveys, courses, companies, E-09 (ticket): surveys and courses on the talent dashboard

### Community 40 - "Botones y tarjetas del DS"
Cohesion: 0.32
Nodes (5): HOVER, SIZES, VARIANTS, CompanyCard(), Photo()

### Community 41 - "Backend: catálogo, encuestas y cursos"
Cohesion: 0.38
Nodes (5): BE-008 Catálogo de empresas publicadas, BE-010 Encuestas disponibles, BE-013 Catálogo de cursos, BE-021 Resumen del dashboard Talent, BE-025 Seguir y dejar de seguir empresas

### Community 42 - "Páginas legales y contacto"
Cohesion: 0.52
Nodes (7): OI-012 · Textos legales de privacidad, términos y cookies (abierta), B-08 · /privacy, /terms, /contact y enlaces en el pie, /contact · Contacto (simulación), /privacy · Privacidad (borrador pendiente de legal), /terms · Términos (borrador pendiente de legal), B-08 · Legales y contacto (especificación) · /privacy, /terms, /contact, Privacidad y términos · /privacy y /terms (borrador legal)

### Community 43 - "Icono de marca y favicon"
Cohesion: 0.40
Nodes (5): BeWay Logo Icon copy (app/icon.png): faceted hex B monogram, navy and cyan, Favicon (browser tab icon served from app/icon.png), BeWay Logo Icon (transparent PNG), Hexagonal B Monogram Mark (icon-only, no wordmark), Navy + Cyan Brand Colours (navy left half, cyan/teal right half)

### Community 44 - "Tarjetas y landing"
Cohesion: 0.53
Nodes (4): Home(), Card(), SURFACES, FeatureCard()

### Community 45 - "Registro y textos legales"
Cohesion: 0.53
Nodes (6): DEC-022: company signup option disabled until block G, Sign-up screen (Registro), Route /registro: misleading 'Perfil creado' confirmation; no validation; mixes Talent and Company signup, SignupFormVM: fullName 2 to 80, email, password of 8 or more, acceptsTerms required, L-10: terms and privacy acceptance checkbox at signup, with accepted version (block B), LQ-02: minimum age and guardian consent (block B)

### Community 46 - "Verificación y calidad"
Cohesion: 0.40
Nodes (6): Inspect private pages with the demo cookie, Pre-completion checklist for app screens, Migration risk: no lint or tests, so regressions are found by hand, Scripts: dev, build, start, typecheck; no lint and no tests, X-01 (ROADMAP ticket): lint, to catch regressions, X-02 (ROADMAP ticket): tests, including unit tests for adapters

### Community 47 - "Reglas visuales de app"
Cohesion: 0.40
Nodes (4): Mobile layout: 16 px margins, stacked sections, navigation in dropdown, Sections as rows with 1 px top rule and 32 px spacing, DS request 8 (medium): StepNav current step uses gradient and glow, fixed 300 px width, DS request 9 (medium): Card default elevation sm casts a resting shadow

### Community 50 - "Logo mono blanco"
Cohesion: 0.50
Nodes (3): BeWay hexagonal B monogram mark, BeWay mono white logo lockup (transparent PNG), BEWAY uppercase geometric wordmark

### Community 51 - "Logo negativo"
Cohesion: 0.50
Nodes (4): Negative Logo Variant for Dark Surfaces, BeWay Hexagonal B Isotype (cyan gradient), BeWay Logo - Negative Inline (Transparent), Logo design-system component

### Community 52 - "Logo primario"
Cohesion: 0.67
Nodes (4): Hexagonal B Monogram (navy + cyan), BeWay Primary Logo (horizontal lockup, light surface), BeWay Navy + Cyan Brand Palette, Tagline: Ecosistema de talento, innovacion y oportunidades

### Community 53 - "Logo apilado"
Cohesion: 0.50
Nodes (3): BeWay Stacked Logo (Negative, Transparent PNG), BeWay B Monogram (cyan-to-blue gradient mark), Tagline: Ecosistema de talento, innovacion y oportunidades

## Ambiguous Edges - Review These
- `App header is the design-system NavBar, not a sidebar` → `Missing DS variant: side navigation or AppShell for Admin and Company (X-04)`  [AMBIGUOUS]
  docs/frontend/EXISTING_UI_AUDIT.md · relation: conceptually_related_to
- `Pre-completion checklist for app screens` → `X-01 (ROADMAP ticket): lint, to catch regressions`  [AMBIGUOUS]
  docs/frontend/DESIGN.md · relation: conceptually_related_to

## Knowledge Gaps
- **51 isolated node(s):** `react-dom`, `@tailwindcss/postcss`, `@types/node`, `@types/react`, `@types/react-dom` (+46 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 243 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `Componentes del design system` to `Acceso, registro y recuperación`, `Programas (legado)`, `Tipos del design system`, `Catálogo y panel admin`, `Cabecera y shells`, `Botones y tarjetas del DS`, `Dependencias del proyecto`, `Guía de estilo`, `Tarjetas y landing`, `Campos y pie del design system`, `Guards de espacio`?**
  _High betweenness centrality (0.078) - this node is a cross-community bridge._
- **What connects `react-dom`, `@tailwindcss/postcss`, `@types/node` to the rest of the system?**
  _51 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Acceso, registro y recuperación` be split into smaller, more focused modules?**
  _Cohesion score 0.05833848690991548 - nodes in this community are weakly interconnected._
- **Why does `next` connect `Rutas de admin y layout raíz` to `Acceso, registro y recuperación`, `Programas (legado)`, `Catálogo y panel admin`, `Cabecera y shells`, `Inicio Talent (código)`, `Dependencias del proyecto`, `Cuentas y acciones de demo`, `Páginas públicas y perfil`, `Guards de espacio`?**
  _High betweenness centrality (0.041) - this node is a cross-community bridge._
- **Should `Tipos del design system` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `App header is the design-system NavBar, not a sidebar` and `Missing DS variant: side navigation or AppShell for Admin and Company (X-04)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Pre-completion checklist for app screens` and `X-01 (ROADMAP ticket): lint, to catch regressions`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._