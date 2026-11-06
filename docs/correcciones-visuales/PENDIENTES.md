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
