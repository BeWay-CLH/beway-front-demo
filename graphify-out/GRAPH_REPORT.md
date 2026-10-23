# Graph Report - beway-front  (2026-10-23)

## Corpus Check
- Corpus is ~47,471 words - fits in a single context window. You may not need a graph.

## Summary
- 954 nodes · 2363 edges · 47 communities (45 shown, 2 thin omitted)
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 154 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Formularios de acceso y contacto
- Sesión y necesidades backend
- 404 y perfil público
- Encuestas y cursos (backlog)
- Contrato de tipos del DS
- Ficha de empresa modular
- Admin: fichas y revisiones
- Vistas de módulos de empresa
- Dashboard Talent y perfil
- Inicio público y admin
- Reglas de marca
- Páginas de empresa y seguimientos
- Roadmap por bloques A-G
- Servicios de perfil y empresas
- Encuestas: modelos y audiencia
- Bloque G y admin futuro
- Raíz y rutas admin
- Programas (legado)
- Layouts por espacio
- Cabecera y barra de demo
- Navegación por rutas
- Convenciones de arquitectura
- Ajustes y visibilidad
- Catálogo de empresas
- Textos legales y recuperación
- Layouts público y compartido
- Vista del catálogo
- Registro y edad mínima
- Flujo de registro
- Mapa de documentación
- Contacto y estructura de carpetas
- Estilo editorial-greeting
- Política del design system
- Peticiones al DS y cabecera
- Pantallas de error
- Acceso demo y sesión
- Seguimiento simulado de empresas
- Accesibilidad y peticiones DS
- Cuatro espacios y cabecera
- Controles nativos temporales
- Navegación del shell
- Onboarding
- Migración al monorepo
- Página de contacto
- Fotografía y degradado
- Shells de espacio
- Petición CompanyCard enlace

## God Nodes (most connected - your core abstractions)
1. `Bloque B · Auth, onboarding, perfil y settings` - 36 edges
2. `NavButton()` - 31 edges
3. `AGENT_BRIEF.md (brief fuente)` - 31 edges
4. `Bloque G · Oportunidades, retos, Company Portal, comunidad, mensajería` - 25 edges
5. `C-02 Ficha de empresa /companies/[slug]` - 25 edges
6. `Bloque E · Encuestas y cursos` - 23 edges
7. `D-01 Dashboard Talent /talent/dashboard` - 23 edges
8. `Bloque A · Shells, navegación y 404` - 22 edges
9. `Bloque C · Catálogo y ficha de empresa` - 22 edges
10. `requireSession()` - 21 edges

## Surprising Connections (you probably didn't know these)
- `Non-functional requirements (mobile-first, themes, AA, backend independence, privacy, traceability)` --semantically_similar_to--> `Accessibility rules: contrast, labels, focus rings`  [INFERRED] [semantically similar]
  docs/frontend/ARCHITECTURE.md → CLAUDE.md
- `DS change flow: replace design-system/ folder, then remove workarounds` --semantically_similar_to--> `design-system/ is read-only here; ask user to add to DS`  [INFERRED] [semantically similar]
  docs/frontend/DS_REQUESTS.md → CLAUDE.md
- `Pre-completion checks (typecheck, build, taste-skill lint, inspect at 3 widths, light and dark)` --semantically_similar_to--> `Before-you-finish checklist`  [INFERRED] [semantically similar]
  docs/frontend/DESIGN.md → CLAUDE.md
- `Procedure when the design system changes (replace folder, run mk_theme.py)` --semantically_similar_to--> `DS change flow: replace design-system/ folder, then remove workarounds`  [INFERRED] [semantically similar]
  README.md → docs/frontend/DS_REQUESTS.md
- `Project structure table (design-system, app, components, lib, docs, data)` --semantically_similar_to--> `Folder structure (app, components, lib, data)`  [INFERRED] [semantically similar]
  README.md → docs/frontend/ARCHITECTURE.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Brand rules that are easy to break (cyan accent, selected state, single gradient, motion, photography)** — claude_cyan_single_accent, claude_selected_state_rule, claude_single_gradient_rule, claude_motion_rules, claude_photo_wrapper_rule [EXTRACTED 1.00]
- **Talent dashboard composition (D-01, DEC-033, BE-021 composed from BE-005, BE-008, BE-025)** — docs_frontend_roadmap_d_01, docs_frontend_decisions_dec_033, docs_frontend_backend_handoff_be_021, docs_frontend_backend_handoff_be_005, docs_frontend_backend_handoff_be_008, docs_frontend_backend_handoff_be_025, docs_frontend_design_five_segment_bar [EXTRACTED 1.00]
- **Native-input control workaround for inaccessible DS Switch, Checkbox, Radio** — docs_frontend_decisions_dec_024, docs_frontend_ds_requests_point_2, docs_frontend_ds_requests_point_3, docs_frontend_ds_requests_point_4, components_forms_togglefield, components_forms_checkfield, components_forms_optionradio [EXTRACTED 1.00]
- **Escrituras simuladas que muestran Simulación y no éxito real** — docs_frontend_readme_simulation_rule, docs_frontend_decisions_dec_006, docs_frontend_frontend_models_simulated, docs_frontend_roadmap_b_01, docs_frontend_roadmap_c_05, docs_frontend_roadmap_e_03, docs_frontend_roadmap_f_04 [INFERRED 0.85]
- **Composición del dashboard Talent (D-01)** — docs_frontend_roadmap_d_01, docs_frontend_frontend_models_talentdashboardvm, docs_frontend_frontend_models_gettalentdashboard, docs_frontend_frontend_models_getprofileform, docs_frontend_frontend_models_getaccountsettings, docs_frontend_frontend_models_getfollowedcompanies, docs_frontend_frontend_models_getcompaniesbyinterests, docs_frontend_frontend_models_follow_store [EXTRACTED 1.00]
- **Preguntas abiertas de privacidad y consentimiento de encuestas** — docs_frontend_legal_requests_lq_05, docs_frontend_open_issues_oi_016, docs_frontend_legal_requests_l_30, docs_frontend_legal_requests_l_31, docs_frontend_roadmap_e_03, docs_frontend_roadmap_f_05 [INFERRED 0.75]

## Communities (47 total, 2 thin omitted)

### Community 0 - "Formularios de acceso y contacto"
Cohesion: 0.06
Nodes (56): ForgotPasswordForm(), ForgotPasswordPage(), metadata, reasons, metadata, sections, Draft, draftFrom() (+48 more)

### Community 1 - "Sesión y necesidades backend"
Cohesion: 0.05
Nodes (56): PageState shared states (not-found, forbidden, signed-out, error, private, empty), Session, roles and access (mock session, guards render state, real authz in backend), BE-001 Session, identity and roles, BE-003 Admin authorization and audit log, BE-024 Public landing figures, Perfil demo ana-ruiz, CompanyStatVM, Fixture data/fixtures/credentials.ts (+48 more)

### Community 2 - "404 y perfil público"
Cohesion: 0.09
Nodes (42): AdminNotFound(), SharedNotFound(), generateMetadata(), Params, ProfilePage(), headline(), metadata, TalentDashboard() (+34 more)

### Community 3 - "Encuestas y cursos (backlog)"
Cohesion: 0.08
Nodes (50): BE-011 Survey detail, BE-012 Save draft and submit survey answers (idempotent), BE-013 Course catalogue, BE-014 Course detail and enrolment interest, BE-015 User credentials, BE-019 Course management, CourseDetailVM, CourseFormat (+42 more)

### Community 4 - "Contrato de tipos del DS"
Cohesion: 0.04
Nodes (44): AlertProps, AvatarProps, BadgeProps, BreadcrumbsProps, ButtonProps, CardProps, CheckboxProps, CompanyCardProps (+36 more)

### Community 5 - "Ficha de empresa modular"
Cohesion: 0.13
Nodes (32): BE-009 Company profile by slug, CLH como empresa publicadora (cmp-clh), Fixture data/fixtures/companies.ts, CompanyDetailVM, CompanyModuleKind, CompanyModuleVM, CompanyRecord, getCompanyBySlug() (+24 more)

### Community 6 - "Admin: fichas y revisiones"
Cohesion: 0.10
Nodes (27): BE-016 Company profiles in backoffice, BE-017 Editorial queue: approve, request changes, publish, BE-020 Slug and username uniqueness and redirection, AdminCompanyRowVM, EditorialStatus, Helpers de formato: formatDate, formatCount, formatMonth, formatList (lib/format.ts), getProfileForViewer(), ProfileViewVM (+19 more)

### Community 7 - "Vistas de módulos de empresa"
Cohesion: 0.10
Nodes (17): CultureView(), Items(), ListView(), LocationsView(), ModuleView(), SummaryView(), TAB_LABEL, companyRecords (+9 more)

### Community 8 - "Dashboard Talent y perfil"
Cohesion: 0.17
Nodes (23): BE-005 Read profile by username respecting visibility, BE-021 Talent dashboard summary, BE-025 Follow and unfollow companies, Five-segment profile completion bar (dashboard signature element), DS request 17: Button inline margin: 0 blocks margin classes, CompletionItem, CompletionStepVM, NextStepVM (+15 more)

### Community 9 - "Inicio público y admin"
Cohesion: 0.10
Nodes (8): metadata, Home(), metadata, Page(), Block(), Styleguide(), swatches, homeStats

### Community 10 - "Reglas de marca"
Cohesion: 0.09
Nodes (12): Before-you-finish checklist, Writes always show Simulacion; no business logic in pages, Theme: data-theme dark/light, test both, Data flow rules (fixture to service to page to client components), Non-functional requirements (mobile-first, themes, AA, backend independence, privacy, traceability), Privacy by default (private profile, public screens get public View Models), Simulated writes return { simulated: true } and show Simulacion, Work-screen copy rules (consistent button names, no middle dots, errors say how to fix) (+4 more)

### Community 11 - "Páginas de empresa y seguimientos"
Cohesion: 0.16
Nodes (21): AdminDashboard(), CompanyPage(), generateMetadata(), Props, followsByUser, Simulated, CATALOG_PAGE_SIZE, getCompanies() (+13 more)

### Community 12 - "Roadmap por bloques A-G"
Cohesion: 0.08
Nodes (9): AGENT_BRIEF.md (brief fuente), Bloque A · Shells, navegación y 404, Bloque B · Signup, login, onboarding, perfil y settings, Bloque C · Catálogo público de empresas y ficha por slug, Bloque D · Dashboard Talent, Bloque E · Encuestas y cursos a nivel visual/mock, prioridad alta, Bloque F · Admin mínimo, Bloque G · Oportunidades, challenges, Company Portal y community (+1 more)

### Community 13 - "Servicios de perfil y empresas"
Cohesion: 0.13
Nodes (24): BE-006 Edit own profile, EducationVM, ExperienceVM, getAccountSettings(), getCompaniesByInterests(), getCompanyDirectory(), getFollowedCompanies(), getPreviewCard() (+16 more)

### Community 14 - "Encuestas: modelos y audiencia"
Cohesion: 0.17
Nodes (22): BE-010 Surveys available to the user, BE-018 Survey management, Eligibility, SuggestedCompanyVM, SurveyParticipation, SurveyStatus, SurveySummaryVM, LQ-09 Sugerir empresas según intereses del perfil: aviso o consentimiento (+14 more)

### Community 15 - "Bloque G y admin futuro"
Cohesion: 0.10
Nodes (22): L-04 Condiciones para empresas que publican, LQ-06 Aviso a la empresa y rectificación de fichas creadas por CLH, Bloque G · Oportunidades, retos, Company Portal, comunidad, mensajería, /admin/challenges (Retos), /admin/claims (Solicitudes de claiming), /admin/companies/[id]/audit (Auditoría privada), /admin/reports (Reportes), /admin/users (Usuarios) (+14 more)

### Community 16 - "Raíz y rutas admin"
Cohesion: 0.09
Nodes (4): metadata, metadata, sections, nextConfig

### Community 17 - "Programas (legado)"
Cohesion: 0.14
Nodes (13): metadata, ProgramasPage(), details, ProgramasView(), ProgramCard(), logo(), partnerLogos, pillars (+5 more)

### Community 18 - "Layouts por espacio"
Cohesion: 0.23
Nodes (11): AdminLayout(), AuthLayout(), TalentLayout(), AppShell(), AuthShell(), DemoAccountId, demoAccounts, Role (+3 more)

### Community 19 - "Cabecera y barra de demo"
Cohesion: 0.28
Nodes (6): AppHeader(), DemoBar(), demoBarEnabled, MobileMenu(), ThemeToggle(), Unified header AppHeader + DemoBar across spaces

### Community 20 - "Navegación por rutas"
Cohesion: 0.21
Nodes (10): config, A-03 lib/routes.ts con live/planned; menús solo con rutas vivas, adminNav, NavItem, publicNav, RouteStatus, Space, spaces (+2 more)

### Community 21 - "Convenciones de arquitectura"
Cohesion: 0.18
Nodes (10): DS components are client components; no onClick in server pages, Rendering conventions (Server Components, params as Promise, metadata noindex), Stack constraints (Next 16.4, React 19.3, Tailwind 4.3, lucide pinned, DS read-only), OI-002 ¿Adelantar el bloque E?, Orden acordado A, B, C, D, E, F, G, X-01 Configure ESLint, X-02 Smoke tests with Playwright, X-03 Fonts with next/font (+2 more)

### Community 22 - "Ajustes y visibilidad"
Cohesion: 0.22
Nodes (13): BE-007 Account and privacy settings, AccountSettingsVM, ProfileVisibility, saveAccountSettings(), saveOwnSettings(), L-13 Aviso de baja de cuenta, L-14 Cómo ejercer derechos de datos, LQ-04 Public profile data without extra consent (+5 more)

### Community 23 - "Catálogo de empresas"
Cohesion: 0.23
Nodes (14): BE-008 Published companies catalogue, CompanyCardVM, CompanyFilter, CompanyPageVM, getCompanies(), getCompanyCategories(), C-03 Companies catalogue with filters and search in URL, /companies (Catálogo de empresas) (+6 more)

### Community 24 - "Textos legales y recuperación"
Cohesion: 0.21
Nodes (14): BE-023 Password recovery, L-01 Política de privacidad, L-02 Términos y condiciones de uso, L-03 Política de cookies y banner si LQ-08 lo pide, L-11 Aviso de verificación de correo y correo de bienvenida, L-15 Aviso del formulario de contacto, L-16 Correo de recuperación de contraseña (pie legal), LQ-01 Legislación aplicable, países y alojamiento de datos (+6 more)

### Community 25 - "Layouts público y compartido"
Cohesion: 0.38
Nodes (7): NotFound(), PublicLayout(), SharedLayout(), ViewerShell(), SiteFooter(), SiteHeader(), getSession()

### Community 26 - "Vista del catálogo"
Cohesion: 0.21
Nodes (9): CompaniesView(), Query, CompaniesPage(), first(), metadata, Search, CompanyCategoryVM, CompanyPageVM (+1 more)

### Community 27 - "Registro y edad mínima"
Cohesion: 0.29
Nodes (11): BE-002 Signup, email verification, login, SignupFormVM, L-10 Casilla de aceptación de términos y privacidad en el registro, LQ-02 Edad mínima y menores con consentimiento de tutores, OI-007 Busco talento option in signup, B-01 /signup en pasos: cuenta y verificación de correo, /registro (URL del prototipo), /signup (Registrarse) (+3 more)

### Community 28 - "Flujo de registro"
Cohesion: 0.24
Nodes (8): metadata, SignupPage(), Errors, SignupFlow(), Values, CheckField(), OptionRadio(), DS request 3: Checkbox has no native input

### Community 29 - "Mapa de documentación"
Cohesion: 0.32
Nodes (8): CLAUDE.md (BeWay UI rules), Services layer returning View Models (single door to data), BACKEND_HANDOFF.md (Necesidades para backend), CHANGELOG.md, DESIGN.md (Diseno de pantallas de app), Documentación obligatoria al cerrar un bloque, Cómo trabajar un ticket, README.md (beway-front)

### Community 30 - "Contacto y estructura de carpetas"
Cohesion: 0.29
Nodes (9): Folder structure (app, components, lib, data), BE-022 Contact form, B-08 /privacy, /terms, /contact y enlaces en el pie, /contact (Contacto), Layout Public, /privacy (Privacidad), /styleguide (Guía de componentes), /terms (Términos) (+1 more)

### Community 31 - "Estilo editorial-greeting"
Cohesion: 0.21
Nodes (7): Composition: 12-column 1100px grid, thin-line section rows, 40/48px controls, Product face: Space Grotesk + Inter, surface-page/surface-card with 1px line, Question and finding per screen, taste-skill (app screens guide, design-taste-frontend), DS request 10: surface-raised token (surface-sunken equals surface-page), DS request 7: EmptyState neutral tone variant, DS request 9: Card default elevation sm gives resting shadow

### Community 32 - "Política del design system"
Cohesion: 0.22
Nodes (8): ARCHITECTURE.md (Arquitectura frontend), DECISIONS.md (Decisiones), Accessibility in work screens (native inputs, visible focus ring, one h1), DS_REQUESTS.md (Peticiones al design system), EXISTING_UI_AUDIT.md, Definition of Done, Grafo de conocimiento graphify-out, Project structure table (design-system, app, components, lib, docs, data)

### Community 33 - "Peticiones al DS y cabecera"
Cohesion: 0.18
Nodes (10): A-09 Cabecera única en todos los espacios y DemoBar, Petición DS: Button outline define border y borderColor a la vez, Petición DS: valorar si DemoBar pasa al design system, Petición DS: NavBar no es responsive ni tiene estado activo, Petición DS: Radio y RadioGroup sin input nativo ni teclado, X-04 Design system requests: responsive NavBar and StatStrip, AppHeader (components/shells/AppHeader.tsx), Button (@ds) (+2 more)

### Community 34 - "Pantallas de error"
Cohesion: 0.38
Nodes (5): Error(), Error(), Error(), Error(), RouteError()

### Community 35 - "Acceso demo y sesión"
Cohesion: 0.36
Nodes (7): LoginPage(), metadata, isDemoAccountId(), signInAs(), signOut(), DEFAULT_AFTER_LOGIN, safeNext()

### Community 36 - "Seguimiento simulado de empresas"
Cohesion: 0.24
Nodes (9): follow-store: seguimientos simulados en sessionStorage, B-03 Crear lib/models/, lib/services/ y fixtures de usuarios y perfiles, C-05 Follow/unfollow company (simulated), CompanyModules, CompanyProfile, CompanyTabs, Empresas que sigues en /u/[username] (titular), FollowButton (+1 more)

### Community 37 - "Accesibilidad y peticiones DS"
Cohesion: 0.25
Nodes (8): DS request 1: Button outline mixes border and borderColor, DS request 11: Footer renders href=# for links without href, DS request 12: Button background conflicts with backgroundOrigin/backgroundClip (local patch), DS request 13: Tabs lack aria-controls, arrow keys, mobile scroll, DS request 14: Breadcrumbs plain anchor, no aria-label or aria-current, DS request 5: Dialog lacks Escape, focus trap, aria-labelledby, DS request 6: Field lacks aria-describedby and aria-invalid, DS v1.1 resolved requests 1 to 11

### Community 38 - "Cuatro espacios y cabecera"
Cohesion: 0.39
Nodes (5): Four spaces + (shared); one header; navigation follows the viewer, Four product spaces plus Auth (route groups and guarded folders), A-10 La cabecera sigue a quien mira: grupo (shared), Layout Shared, ViewerShell (components/shells/ViewerShell.tsx)

### Community 39 - "Controles nativos temporales"
Cohesion: 0.39
Nodes (5): Local workarounds pending DS fixes (forms controls, CompanyTabs, onView router.push), DS request 2: Switch has no native input, DS request 4: Radio and RadioGroup have no native input or radiogroup role, DS change flow: replace design-system/ folder, then remove workarounds, Procedure when the design system changes (replace folder, run mk_theme.py)

### Community 40 - "Navegación del shell"
Cohesion: 0.48
Nodes (6): isActive(), matches(), NavList(), ShellNav(), styles, liveOnly()

### Community 41 - "Onboarding"
Cohesion: 0.53
Nodes (6): BE-004 Save onboarding, OnboardingVM, L-12 Explicación de privado y público al elegir visibilidad, B-04 /talent/onboarding con StepNav (4 pasos), /talent/onboarding (Primer perfil / alta), B-04 Onboarding /talent/onboarding

### Community 42 - "Migración al monorepo"
Cohesion: 0.50
Nodes (4): lib/adapters: only point that knows backend DTOs, Destination: frontend/ inside monorepo with backend, OI-014 Migration destination repo, X-07 Preparar migración a frontend/ del monorepo (MIGRACION.md, turbopack.root, BEWAY_*)

### Community 43 - "Página de contacto"
Cohesion: 0.67
Nodes (3): ContactForm(), ContactPage(), metadata

### Community 45 - "Shells de espacio"
Cohesion: 0.50
Nodes (4): A-02 TalentShell, AdminShell, AuthShell, ShellNav, MobileMenu, Layout Auth, AppShell (space talent o admin), AuthShell

## Ambiguous Edges - Review These
- `Tailwind class keys (bg-surface-card, text-fg-body, rounded-card...)` → `Composition: 12-column 1100px grid, thin-line section rows, 40/48px controls`  [AMBIGUOUS]
  docs/frontend/DESIGN.md · relation: conceptually_related_to

## Knowledge Gaps
- **67 isolated node(s):** `Bloque A · Shells, navegación y 404`, `Bloque B · Signup, login, onboarding, perfil y settings`, `Bloque C · Catálogo público de empresas y ficha por slug`, `Bloque D · Dashboard Talent`, `Bloque E · Encuestas y cursos a nivel visual/mock, prioridad alta` (+62 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 217 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Project structure table (design-system, app, components, lib, docs, data)` connect `Política del design system` to `Cuatro espacios y cabecera`, `Programas (legado)`, `Layouts por espacio`, `Navegación por rutas`, `Mapa de documentación`, `Contacto y estructura de carpetas`?**
  _High betweenness centrality (0.087) - this node is a cross-community bridge._
- **What connects `Bloque A · Shells, navegación y 404`, `Bloque B · Signup, login, onboarding, perfil y settings`, `Bloque C · Catálogo público de empresas y ficha por slug` to the rest of the system?**
  _67 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Formularios de acceso y contacto` be split into smaller, more focused modules?**
  _Cohesion score 0.05975485188968335 - nodes in this community are weakly interconnected._
- **Why does `Bloque B · Auth, onboarding, perfil y settings` connect `Textos legales y recuperación` to `Política del design system`, `Sesión y necesidades backend`, `Seguimiento simulado de empresas`, `Ficha de empresa modular`, `Admin: fichas y revisiones`, `Dashboard Talent y perfil`, `Onboarding`, `Servicios de perfil y empresas`, `Ajustes y visibilidad`, `Registro y edad mínima`, `Contacto y estructura de carpetas`?**
  _High betweenness centrality (0.086) - this node is a cross-community bridge._
- **Should `Sesión y necesidades backend` be split into smaller, more focused modules?**
  _Cohesion score 0.05357142857142857 - nodes in this community are weakly interconnected._
- **Why does `DEC-032 Catalogue resolved on server and simulated follow per session` connect `Seguimiento simulado de empresas` to `404 y perfil público`, `Ficha de empresa modular`, `Dashboard Talent y perfil`, `Reglas de marca`, `Encuestas: modelos y audiencia`, `Catálogo de empresas`?**
  _High betweenness centrality (0.061) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Tailwind class keys (bg-surface-card, text-fg-body, rounded-card...)` and `Composition: 12-column 1100px grid, thin-line section rows, 40/48px controls`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._