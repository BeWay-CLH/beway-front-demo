# Pendientes de las correcciones visuales

Diferencias que no se cierran en la fase en que aparecen, con su causa. Se revisan en cada puerta de fase.

## Fase 01 · Base (cerrada con estos pendientes)

| # | Pendiente | Causa | Dónde se cierra |
|---|---|---|---|
| 01-1 | Frase central del pie (ficha 40). | Falta el copy. Decisión D9. | Copy de los fundadores. |
| 01-2 | Botón "guardadas" (marcador) de la cabecera (ficha 01, fila 1). | No hay destino: las empresas seguidas se ven en el perfil, pero no hay lista de guardadas. | Fase 07 (oportunidades guardadas) o decisión de producto. |
| 01-3 | Buscador en la cabecera de talento. | `AppShell` no pasa `search` a la cabecera. La ficha 05 pide búsqueda global para miembros. | Fase 02, tarea 02.4. |
| 01-4 | Enlace "Ayuda" del menú personal (ficha 06). | Resuelto en D5: `/ayuda` existe como pantalla "En proceso". | Fase 07, tarea 07.8 (contenido real). |
| 01-5 | Fila móvil desplazable de navegación (ficha 07). Hoy, menú plegable. | `DEC-007` y `DEC-036`. | Fase 02, tarea 02.6 (cambia DEC-007). |
| 01-6 | Ejemplo de notificaciones y datos de demo sin modelo real. | Decisión D11. | Backend (BE-XXX de notificaciones). |
| 01-7 | Medidas de 1440 px no comparadas a escala real. | El panel del navegador mide ~1067 px: a 1440 la captura se corta. Se verificó en 1024 y 390 px, y el DOM a 1440. | Captura a 1440 con Playwright (decisión D8, rama aparte antes de la fase 02). |
| 01-8 | Retorno del foco al cerrar una ventana con teclado no probado en navegador real. | La prueba por JavaScript no tiene foco previo. | Prueba de teclado en la puerta de fase. |
| 01-9 | H1 móvil de 29 px. | La regla de móvil va en cada página, no en el DS. | Fases 02–07 (cada página). |
| 01-10 | Modo oscuro sin revisión visual completa. | Se revisó la paleta por contraste, no todas las pantallas. | Puerta de fase 01 (claro y oscuro). |
| 01-11 | Tarjeta del directorio con `radius-lg` (13 px). Debe ser 12 px (`radius-directory`). | `CompanyCard` del DS. | Fase 02, tarea 02.5. |

## Contraste (decisión D3, a reportar a los fundadores)

Ver `DS_CAMBIOS.md` §4. Valores de la referencia que no cumplen `CLAUDE.md`: muted, teal como texto, borde de control. Los fundadores deciden si quieren la fidelidad exacta.

## Fases siguientes (no empezadas)

Ver el plan en `PLAN.md`. Las fases 02 a 07 se ejecutan en sus ramas, en ese orden.

## Fase 02 · Bienvenida y directorio

| # | Pendiente | Causa | Dónde se cierra |
|---|---|---|---|
| 02-1 | El directorio tiene 10 empresas; la referencia muestra 19. | El catálogo de datos solo tiene 10 fichas. Las 17 marcas entran en la fase 03. | Fase 03 (registro de las 17 marcas). |
| 02-2 | Las tarjetas usan degradado de marca en la portada, no fotos por marca. | Sin archivos oficiales (D7). El placeholder es el degradado del DS. | Assets de marca (seed). |
| 02-3 | Sin insignia de coincidencia ("95 % match · ejemplo"). | No hay dato de coincidencia; no se crea ninguna fórmula (regla de la guía). | No aplica. |
| 02-4 | Etiqueta de cifras a 7 px (ficha 04). | Es la medida de la referencia. Es muy pequeña para leer en móvil. | Decisión de fundadores: 7 px o 9 px. |
| 02-5 | Portada sin estadísticas, pilares, carrusel de marcas ni bloque final de CTA. | No aparecen en la referencia (ficha 02 y 40). Se quitaron para seguir su orden. | Si los fundadores quieren conservarlos. |
| 02-6 | Cierre editorial en la portada, no debajo del directorio de `/companies`. | La referencia lo pone al final de la bienvenida (ficha 40). | No aplica. |
| 02-7 | Sin escala de la foto al pasar el ratón (ficha 04). | CLAUDE.md prohíbe escalar. Se mantiene la elevación de 4 px. | Decisión de fundadores si quieren la escala. |
| 02-8 | Los filtros solo funcionan en `/companies`, no en la portada. | La portada no tiene URL de filtros. | Fase 03 o decisión de producto. |
| 02-9 | Sectores del directorio = categorías del catálogo (ficha 05 pide adaptarlas). | El catálogo no tiene Banca, Editorial, etc. | Catálogo real. |
| 02-10 | Verificado: columnas 4/3/3/2/1 en 1700/1200/1000/800/500 px; sin desbordamiento a 390 px. | Medido con Playwright (ver `scripts/`). | Cerrado. |

## Fase 03 · Las 17 fichas corporativas

| # | Pendiente | Causa | Dónde se cierra |
|---|---|---|---|
| 03-1 | Cuatro arquetipos de hero (photo, plate, tilt, field), no siete. | Las 17 composiciones se agrupan en cuatro bloques con parámetros por marca (color, altura, titular, fuente, orden). Así no hay una ficha genérica con logo cambiado. | Si la revisión pide una composición exacta por marca, se añade un arquetipo nuevo. |
| 03-2 | Fotos de BME, Garrigues, L'Oréal, SILBON, HEINEKEN y Mapfre: placeholder de color base con degradado. | Sin archivos oficiales (D7, 00). | Assets oficiales (seed). |
| 03-3 | Logos: inicial sobre el color base. | Sin logos oficiales. No se dibujan a mano. | Assets oficiales (seed). |
| 03-4 | Titular de L'Oréal en español, no en inglés como en la referencia. | CLAUDE.md exige copy en español de España. | Decisión de fundadores. |
| 03-5 | Bloques sin contenido (Embajadores, Becas, Servicios, Ecommerce, Tienda, Cierre, Ecosistema, Marcas, Brandstorm, Herramientas) muestran "Próximamente", sin enlace. | No hay datos ni destino. Ecommerce y tiendas no tienen compra ni pago. | Fases de contenido (G) o copy aprobado. |
| 03-6 | Los destinos de Certificaciones, Challenges, Miniproyectos, Oportunidades y Encuestas enlazan a las pantallas de cada fase (en proceso o en construcción). | Se usan rutas reales para no enlazar a páginas inexistentes. | Fases 04 a 07. |
| 03-7 | Cifras de las 17 fichas a cero (retos, vacantes…). | No se inventan cifras para igualar la guía (regla de la guía). Las cinco métricas de la tarjeta muestran 0 o "—". | Datos reales (seed). |
| 03-8 | El directorio muestra las 10 fichas de ejemplo originales además de las 17 marcas (27 en total). | La referencia muestra 19. No se eliminan fichas de prueba. | Decisión de fundadores. |
| 03-9 | Fichas de empresa sin barra de navegación de la app: cabecera de 58 px. | Ficha 09: cabecera exterior mínima. El visitante vuelve con el logo. | Decisión de producto (si se quiere navegación en la ficha). |
| 03-10 | Colores de marca en `data/fixtures/brands.ts` (17 paletas). | Excepción documentada: son datos de marca, no tokens del DS (opción A de la fase 03). | Revisar con el equipo de DS. |

## Fase 04 · Certificaciones, aula y evaluación

| # | Pendiente | Causa | Dónde se cierra |
|---|---|---|---|
| 04-1 | Pestañas "Todas / En curso / Completadas" de la ficha 11 son "Todas / Abiertas / Próximas / Cerradas". | No hay progreso por usuario en el modelo. Decisión D5. | Cuando exista progreso real. |
| 04-2 | El progreso del aula se guarda en `sessionStorage` por curso (escritura simulada, solo dura la pestaña). | No hay backend de progreso (BE-XXX pendiente). | Backend (BE de inscripción y progreso). |
| 04-3 | Ficha de certificación (ficha 13) sin cambios de composición: hero, lateral de 335 px y módulos en acordeón. | Prioridad a catálogo, aula y evaluación. | Siguiente iteración de fase 04. |
| 04-4 | Evaluación sin modelo: cuando se completan los bloques, se dice que todavía no está disponible. | No hay preguntas, intentos ni nota en el dominio. | Backend de evaluación. |
| 04-5 | Ventana de acreditación solo en `/talent/credentials` (ficha 15). El dashboard la añade en la fase 06. | Orden de la fase 06. | Fase 06. |
| 04-6 | Los bloques del aula son de ejemplo (sin vídeo, sin recursos). | Sin contenido real (seed). | Seed. |
| 04-7 | `CourseRow.tsx` y `CourseFilters.tsx` ya no se usan en el catálogo. | Se sustituyen por `CourseCard`. | Limpieza al cerrar la fase 04. |

## Fase 05 · Challenges y miniproyectos

| # | Pendiente | Causa | Dónde se cierra |
|---|---|---|---|
| 05-1 | Los challenges cerrados siguen mostrando "Conocer el challenge" (sin inscripción). | Falta un estado "Cerrado" en la CTA; la ficha no lo define. | Copy de fundadores (D9). |
| 05-2 | La participación ("Unirme", borrador, entrega) es simulada: solo dura la pestaña. | No hay backend de retos (ROADMAP G). Decisión D5 y DEC-006. | Backend de participación. |
| 05-3 | "Simular entrega" no envía nada; el texto del botón y de la casilla son provisionales. | Copy pendiente (D9). | Copy de fundadores. |
| 05-4 | El documento de apoyo se elige pero no se sube. | No hay almacenamiento de archivos en la demo. | Backend de archivos. |
| 05-5 | Plazos y fechas en texto de ejemplo ("15 dic 2026"). | Sin fuente de fechas real. | Seed. |
| 05-6 | Las portadas usan el color base de la marca; sin logos oficiales. | Sin assets oficiales (D7). | Seed. |
| 05-7 | El texto "Ejemplo" de los fixtures no aparece en las tarjetas (solo en el encabezado de la página). | Se rotula la página completa. | Revisar al cerrar la fase. |
