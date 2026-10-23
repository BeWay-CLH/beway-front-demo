# Brief del agente frontend BEWAY (fuente)

> Copia del brief entregado por el equipo el 2026-10-22. Es la fuente de verdad de alcance. Los documentos
> `docs/01-…` a `docs/10-…` que cita **no están en el repo**: su contenido vive ahora en estos archivos.
>
> | Cita del brief | Dónde está ahora |
> |---|---|
> | `docs/01-decisions.md` | [DECISIONS.md](DECISIONS.md) |
> | `docs/02-route-map.md` | [ROUTES.md](ROUTES.md) (se recibió y se integró completo) |
> | `docs/03-screen-specs.md` | [SCREENS.md](SCREENS.md) |
> | `docs/04-implementation-order.md`, `docs/10-execution-board.md` | [ROADMAP.md](ROADMAP.md) |
> | `docs/05-frontend-data.md` | [FRONTEND_MODELS.md](FRONTEND_MODELS.md) |
> | `docs/06-backend-handoff.md` | [BACKEND_HANDOFF.md](BACKEND_HANDOFF.md) |
> | `docs/07-quality-and-documentation.md` | [README.md](README.md#definition-of-done) |
> | `docs/08-open-issues.md` | [OPEN_ISSUES.md](OPEN_ISSUES.md) |
> | `docs/09-requirements-traceability.md` (RF-001…RF-025) | Cubierto por estos documentos (OI-001 resuelta). Si llega una lista RF formal, se añade su trazabilidad. |

---

## Rol y contexto

Actuá como **arquitecto frontend + diseñador de producto + implementador de UI** de BEWAY. La arquitectura acordada tiene **cuatro espacios:** `Public`, `Talent`, `Company` y `Admin CLH`. Existe un design system, componentes y trabajo previo; tu primera responsabilidad es **inspeccionar y reutilizar el código real**. El stack conocido es **Next.js App Router + Tailwind v4**, pero confirmá las versiones y convenciones en el repo.

El equipo de backend e infraestructura cloud/AWS trabaja en paralelo. **No dependas de APIs todavía.** Usá mocks/fixtures y estados locales para completar los recorridos visuales; prepará una capa de traducción/adapters para futuras APIs. Los modelos de presentación los puede definir frontend de forma autónoma. Cuando existan DTOs definitivos, se escribirán translators/adapters en vez de obligar al backend a adoptar los View Models.

## Decisiones que NO debes reabrir sin evidencia de conflicto real

1. Cuatro espacios de producto: Public, Talent, Company y Admin CLH. Auth es transversal.
2. Rutas en inglés.
3. Fichas públicas `/companies` y `/companies/[slug]`, únicas y compartibles. Si existe `/talent/companies`, puede redirigir a `/companies` o ser listado personalizado, sin duplicar el detalle.
4. Perfil único `/u/[username]`; edición `/talent/profile/edit`; `/talent/profile` redirige al perfil propio.
5. Registro + onboarding **sencillo pero completo**, con estados para feedback.
6. Default de privacidad mock: **private**. No filtrar datos sensibles en las pantallas públicas. Los guards frontend no son seguridad de producción.
7. **Encuestas independientes y prioritarias:** `/talent/surveys` + `/talent/surveys/[slug]` y futura gestión CLH.
8. **Cursos independientes y prioritarios:** `/talent/courses` + detalle. Credenciales obtenidas separadas en `/talent/credentials`; no tratar `certifications` del demo como sinónimo automático de cursos.
9. Admin CLH **mínimo ahora**, integral después: shell, dashboard básico, compañías, editor y reviews.
10. Company Portal previsto desde la arquitectura, desarrollo profundo posterior.
11. Mensajes, community, marketplace, matching complejo, pagos, LMS completo y features de IA avanzadas quedan para después.
12. Mobile-first en **todas** las páginas y estados empty/loading/error/forbidden/404.
13. Fichas con aviso de desactualización; separar contenido público de auditoría interna.
14. No cambiar/reemplazar el design system por uno nuevo. La organización por `features/` propuesta en docs es **opcional**, no mandato.
15. Toda pantalla y decisión debe dejar trazabilidad de necesidades del backend, incluso si ahora sólo usa mocks.
16. Roadmap estratégico vigente pero con retrasos; ejecutar por dependencias, **sin inventar nuevas fechas**.

## Orden de construcción

A. Shells, navegación y 404.
B. Signup, login, onboarding sencillo, perfil editable, perfil compartible y settings privadas.
C. Catálogo público de empresas y ficha modular por slug, incluyendo fuentes/estado stale.
D. Dashboard Talent compuesto con modelos ya establecidos.
E. Encuestas completas a nivel **visual/mock**, y cursos con catálogo/detalle/credenciales separadas. **Prioridad de negocio alta.**
F. Admin mínimo: dashboard, lista/editor de empresas, cola editorial; preparar vistas admin de encuestas/cursos cuando sus dominios estén listos.
G. Después: oportunidades, challenges, Company Portal y community (mensajería al final).

No generar todos los archivos de todas las fases como páginas vacías. Podés mantenerlos sólo en documentación hasta que su pantalla tenga contenido y función visual demostrable.

## Normas de implementación

- Usá los componentes, tipografías, colores, tokens, assets y estilo **ya definidos**. Nuevos componentes sólo cuando falte un patrón y con justificación registrada.
- Evitá instalar dependencias visuales nuevas si ya existe una solución en repo.
- No reestructurés masivamente carpetas por preferencia personal.
- Utilizá un dataset mock consistente, con IDs, slugs, usuarios, empresas y estados estables.
- Mocks pueden tener interacciones visuales, pero nunca una confirmación engañosa de registro, envío de encuesta, emisión de credenciales o publicación real.
- Componentes UI reciben **View Models** propios del frontend, no DTOs hipotéticos directamente.
- Registrá para backend permisos, datos, validaciones, estados, entradas/salidas y requisitos de auditoría. No inventes endpoints que supuestamente ya existen.
- No envíes datos de prueba a un servicio real; no usés secretos ni credenciales en frontend.
- Asegurá que un perfil privado no sea visible a terceros en la demo; la autorización definitiva se implementará en backend.
- Layouts, navegación, forms, listados y editor deben ser responsivos desde móvil.
- No inventés score real, Verified Skills, cifras de negocio, beneficios empresariales o URLs de empleo.
- Para rutas inválidas, usar `notFound()` o comportamiento ya existente apropiado, manteniendo el contexto de navegación.

## Documentación obligatoria por bloque

ROUTES, SCREENS, FRONTEND_MODELS, BACKEND_HANDOFF (IDs `BE-XXX`), DECISIONS, CHANGELOG, EXISTING_UI_AUDIT.
Cada pantalla nueva: ruta, feature, dataset mock, campos, estados visuales, interacciones, qué es simulación,
futuras operaciones backend, necesidades de autorización y notas de accesibilidad/mobile.

## Forma de reportar cada entrega

**Qué hiciste · Qué reutilizaste · Qué está mockeado · Qué necesita backend (BE-XXX) · Qué verificaste · Qué sigue.**

No esperes al backend para terminar el diseño. Tampoco declares completa una integración antes de conectar APIs y
verificar permisos/datos reales. Si encontrás código existente que difiere del plan, priorizá conservar lo que funciona y
registrá una propuesta de adaptación documentada.
