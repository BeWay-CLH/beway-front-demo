# 03 · Fichas de empresa (17 variantes)

Fichas: 09 (identidad), 10 (secciones completas) y anexo 17 (variantes).

**Regla principal:** no uses una ficha genérica con logo y color cambiados. Cada empresa tiene composición, fondos, tipografía y orden de bloques propios.

Cada empresa tiene su plantilla en `/empresas/<slug>.html`, con su CSS y `embed.css` propios. Puedes integrarla con componentes de la app. No es obligatorio usar iframes. Lo que debe mantenerse es el resultado visual y la navegación.

**Estado:** ningún recurso de esta lista está en el repo. Se crean en `public/brand/` con estos nombres, como placeholders si no hay archivo oficial (ver 00). Los logos de marcas reales no se dibujan a mano.

Referencia de los archivos: https://beway-front-tecnologia.lush-plum-4141.chatgpt.site/assets/ . Los nombres de archivo son los observados. Algunos no coinciden con la marca (por ejemplo, L'Oréal usa `logo-inditex.webp`). Compruébalos antes de usarlos. Las imágenes y estilos interiores pueden venir de CDN u otros dominios: revisa el HTML y el CSS de cada plantilla. No copies cadenas base64 a documentación.

---

## Ficha 09 · Ficha de empresa: abandonar la plantilla genérica

**Ahora:** ficha tipo Metrovía (demo `/companies`).
**Debe quedar:** `#/empresa/<slug>` con la composición de la plantilla correspondiente (ver tabla del anexo).

- [ ] **1. Una identidad para cada marca.**
  - Sustituye la ficha genérica por las composiciones corporativas del anexo.
  - BME: fotografía del Palacio de la Bolsa, overlay oscuro y titular blanco.
  - Las demás marcas tienen soluciones distintas. No repitas el mismo patrón.
- [ ] **2. Cabecera exterior mínima.**
  - Shell de Beway: 58 px de alto; padding 0 24 px; gap 20 px.
  - En móvil: 54 px.
  - El contenido corporativo empieza justo debajo.
  - No añadas otra gran cabecera de la app antes del hero.
- [ ] **3. Navegación local.**
  - Pestañas o anclas de la empresa bajo el hero, con sus estados y su scroll.
  - Secciones corporativas, certificaciones, retos y módulos de oportunidades o encuestas según la ficha concreta.
- [ ] **4. Implementación desde la fuente visible.**
  - Cada empresa tiene una URL de plantilla con su CSS y assets.
  - Integra la plantilla con componentes o con la fuente que haga el mismo resultado.
  - Adapta la ruta real de cada empresa al router existente.

**Listo cuando:** la empresa seleccionada tiene su hero, colores, recursos y secciones propios. Ninguna conserva la portada degradada genérica de la demo.

---

## Ficha 10 · Dentro de la empresa: respetar las secciones completas

**Ahora:** tramo intermedio de Santander y SILBON.
**Debe quedar:** `#/empresa/santander` y `#/empresa/silbon`, con todas sus secciones.

- [ ] **1. No limitar el cambio al hero.**
  - Recorre cada ficha de arriba abajo.
  - Reproduce anchuras, alternancia de fondos, títulos, tarjetas, CTAs y ritmo vertical de la plantilla corporativa.
- [ ] **2. Mantener las variantes.**
  - Santander y Garrigues no tienen sección de miniproyectos.
  - Otras empresas tienen tres proyectos, varias certificaciones o challenges con diseño distinto.
  - No impongas una lista uniforme a las 17 marcas.
- [ ] **3. Conectar los módulos.**
  - Tarjetas y acciones llevan a la certificación, challenge, proyecto, oportunidad o encuesta correspondiente.
  - Las anclas deben quedar visibles por debajo de las barras fijas. Usa `scroll-margin-top` o `scroll-padding-top` según la altura de la cabecera.
- [ ] **4. Orden.**
  - El menú local no es el orden real de los bloques. Ver tabla.
  - Oportunidades y Encuestas pueden aparecer antes de Embajadores, aunque sus enlaces del menú vayan al final.

**Listo cuando:** cada ancla llega al bloque correcto, y las secciones bajo el primer pantallazo mantienen la composición de su marca.

---

## Anexo · Las 17 empresas y sus variantes

Notas de lectura:
- **Hero:** altura del hero en px CSS, sin contar la cabecera exterior de 58 px.
- **H1:** tamaño y interlineado en px CSS, con su peso.
- **Base / CTA:** color de fondo base y color de acción principal. No sustituyen fotos ni overlays.
- **Local:** orden del menú local. **Real:** orden de los bloques de la plantilla.
- Los nombres de personas, cifras y cursos son ejemplos.

### Plantillas 1 a 2

**1. Instituto BME** · `/empresas/instituto-bme.html`
- Composición: Palacio de la Bolsa a sangre, overlay navy, logo BME y texto blanco a la izquierda.
- Hero 592 px · H1 Manrope 68 / 72.76, peso 800 · Cuerpo DM Sans · Base #07182F · CTA #0751A0.
- Recursos: portada `beway-bme-palacio-bolsa.jpg` (cover); logo `beway-bme-instituto-bme.png` (contain).
- Contenido: curso asíncrono; tres challenges; tres miniproyectos internos; ecommerce de cuatro programas.
- Local: Sobre → Certificaciones → Challenges 03 → Miniproyectos 03 → Embajadores → Ecommerce → Oportunidades profesionales → Encuestas.
- Real: Hero → Sobre → Curso → Challenges → Miniproyectos → Oportunidades → Encuestas → Embajadores → Ecommerce.

**2. McGraw Hill** · `/empresas/mcgraw-hill.html`
- Composición: fondo negro; gran logo rojo a la derecha con sombra desplazada; título blanco a la izquierda.
- Hero 550 px · H1 Arial 64 / 68.48, peso 800 · Cuerpo Arial · Base #0D0D10 · CTA #E51620.
- Recursos: portada y logo `mcgraw-hill-logo.png` (contain).
- Contenido: tres challenges; tres miniproyectos; catálogo editorial.
- Local: Sobre → Certificaciones → Challenges 03 → Miniproyectos → Embajadores → Ecommerce → Oportunidades profesionales → Encuestas.
- Real: Hero → Sobre → Curso → Challenges → Miniproyectos → Oportunidades → Encuestas → Embajadores → Ecommerce.

### Plantillas 3 a 4

**3. Centro de Estudios Garrigues** · `/empresas/garrigues.html`
- Composición: foto del campus; franja oscura a la izquierda; logo blanco; acción principal beige.
- Hero 599.21 px · H1 Manrope 64 / 68.48, peso 800 · Cuerpo DM Sans · Base #111B22 · CTA #E8E0D3.
- Recursos: portada `beway-ceg-campus.jpg` (cover); logo `logo-garrigues-dark.svg` (contain).
- Contenido: cuatro cursos y un caso jurídico. **Sin miniproyectos.** Grados y másteres.
- Local: El Centro → Certificaciones → Challenge → Embajadores → Grados y másteres ↗ → Oportunidades profesionales → Encuestas.
- Real: Hero → Sobre → Cursos → Challenge → Oportunidades → Encuestas → Embajadores → Ecommerce.

**4. Google** · `/empresas/google.html`
- Composición: fondo negro; misión en blanco; gran G multicolor a la derecha.
- Hero 560 px · H1 Manrope 44 / 51.04, peso 800 (titular más compacto) · Cuerpo DM Sans · Base #101114 · CTA #1A73E8.
- Recursos: portada `beway-google-google-g.svg` (contain); logo `logo-google.webp` (contain).
- Contenido: Flash Challenge de 72 horas; tres miniproyectos; catálogo de herramientas.
- Local: Sobre Google → Certificaciones → Flash Challenge 72 h → Miniproyectos 03 → Embajadores → Ecommerce → Oportunidades profesionales → Encuestas.
- Real: Hero → Sobre → Curso → Challenges → Miniproyectos → Oportunidades → Encuestas → Embajadores → Herramientas.

### Plantillas 5 a 6

**5. IBM** · `/empresas/ibm.html`
- Composición: azul profundo; gran IBM semitransparente sobre un halo a la derecha; texto blanco a la izquierda.
- Hero 610.52 px · H1 Manrope 59 / 64.31, peso 800 · Cuerpo DM Sans · Base #001141 · CTA #0F62FE.
- Recursos: portada y logo `beway-ibm-logo.svg` (contain).
- Contenido: consultoría tecnológica; watsonx Hackathons; tres miniproyectos; Embajadoras; recursos IBM.
- Local: Sobre IBM → Certificaciones → Challenge → Miniproyectos 03 → Embajadoras 05 → Ecosistema IBM → Oportunidades profesionales → Encuestas.
- Real: Hero → Sobre → Curso → Challenge → Miniproyectos → Oportunidades → Encuestas → Embajadoras → Cursos → Cierre.

**6. Auren** · `/empresas/auren.html`
- Composición: fondo negro; placa blanca con el logo rojo de Auren a la derecha; sombra desplazada.
- Hero 550 px · H1 Manrope 64 / 68.48, peso 800 · Cuerpo DM Sans · Base #0D0D10 · CTA #E2231A.
- Recursos: portada `beway-auren-auren-logo.svg` (contain); logo `logo-auren-dark.svg` (contain).
- Contenido: tres challenges; tres miniproyectos; Servicios Auren.
- Real: Hero → Sobre → Curso → Challenges → Miniproyectos → Oportunidades → Encuestas → Embajadores → Servicios.

### Plantillas 7 a 8

**7. PwC** · `/empresas/pwc.html`
- Composición: fondo negro; placa blanca con el logo de PwC a la derecha; sombra naranja.
- Hero 580 px · H1 Manrope 62 / 66.34, peso 800 · Cuerpo DM Sans · Base #151515 · CTA #FD5108.
- Recursos: portada y logo `bw-pwc-pwc-logo.svg` (contain).
- Contenido: un challenge; miniproyectos; Explora PwC. Oportunidades y Encuestas se insertan tras la carga.
- Real: Hero → Sobre → Curso → Challenges → Miniproyectos → Oportunidades → Encuestas → Embajadores → Servicios.

**8. Deloitte** · `/empresas/deloitte.html`
- Composición: fondo negro verdoso; placa oscura; sombra lima; punto de marca verde.
- Hero 590.1 px · H1 Manrope 62.64 / 67.02, peso 800 · Cuerpo DM Sans · Base #101410 · CTA #86BC25.
- Recursos: portada `bw-deloitte-cover-white.svg` (cover); logo `bw-deloitte-logo-square.svg` (contain).
- Contenido: Auditoría Financiera; Financial Challenge; tres miniproyectos; servicios.
- Real: Hero → Sobre → Curso → Challenges → Miniproyectos → Oportunidades → Encuestas → Embajadores → Servicios.

### Plantillas 9 a 10

**9. Banco Santander** · `/empresas/santander.html`
- Composición: hero negro y rojo; tarjeta blanca inclinada a la derecha; **sin fotografía**.
- Reparto horizontal 57.5 / 42.5.
- Hero 557.98 px · H1 Manrope 63 / 68.67, peso 800 · Cuerpo DM Sans · Base #141519 · CTA #EC0000.
- Recursos: portada `bw-san-santander-logo.png` (contain); logo `logo-santander.webp` (contain).
- Contenido: challenge Openbank; Becas y ventajas. **Sin miniproyectos.**
- Real: Hero → Sobre → Curso → Challenge → Oportunidades → Encuestas → Embajadores → Becas → Cierre.

**10. Revolut** · `/empresas/revolut.html`
- Composición CSS: tarjeta bancaria plateada inclinada; halo; tarjeta pequeña superpuesta sobre navy. Palabra "hoy" en azul claro. Acciones redondeadas.
- Hero 605 px · H1 Manrope 67.68 / 71.74, peso 800 · Cuerpo DM Sans · Base #070B15 · CTA #1652F0.
- Recursos: portada `bw-revolut-cover.svg` (cover); logo `bw-revolut-logo-square.svg` (contain).
- Contenido: Campus Challenge; tres miniproyectos.
- Real: Hero → Sobre → Curso → Challenges → Miniproyectos → Oportunidades → Encuestas → Embajadores → Servicios.

### Plantillas 11 a 12

**11. L'Oréal** · `/empresas/loreal.html`
- Composición: fotografía de belleza; overlay negro a la izquierda; logo blanco; titular en inglés.
- Hero 600 px · H1 Manrope 64 / 69.76, peso 750 · Cuerpo DM Sans · Base #161616 · CTA #FFFFFF.
- Recursos: portada `beway-loreal-hero-beauty.jpg` (cover); logo observado `logo-inditex.webp` (contain). **Revisar: el nombre no coincide con la marca.**
- Contenido: Brandstorm; tres miniproyectos; Embajadoras; catálogo de marcas.
- Local: Sobre L'Oréal → Certificaciones → Brandstorm → Miniproyectos 03 → Embajadoras → Sus marcas → Oportunidades profesionales → Encuestas.
- Real: Hero → Sobre → Curso → brandstorm → Miniproyectos → Oportunidades → Encuestas → Embajadoras → Marcas → Cierre.

**12. McKinsey & Company** · `/empresas/mckinsey.html`
- Composición: azul petróleo con retícula; placa blanca; sombras azules a la derecha.
- Hero 623.84 px · H1 Manrope 64.8 / 69.98, peso 800 · Cuerpo DM Sans · Base #051C2C · CTA #2251FF.
- Recursos: portada y logo `logo-mckinsey.webp` (contain).
- Contenido: Consultoría Estratégica; challenge individual; tres miniproyectos; ecosistema McKinsey.
- Real: Hero → Sobre → Curso → Challenges → Miniproyectos → Oportunidades → Encuestas → Embajadores → Ecosistema.

### Plantillas 13 a 14

**13. Netflix** · `/empresas/netflix.html`
- Composición: fondo negro; gran N roja tridimensional a la derecha; logo Netflix rojo.
- Hero 565 px · H1 Manrope 61 / 65.27, peso 800 · Cuerpo DM Sans · Base #0D0D10 · CTA #E50914.
- Recursos: portada `beway-netflix-mark.svg` (contain); logo `logo-netflix.webp` (contain).
- Contenido: tres cursos; tres challenges internos; un miniproyecto; Netflix Shop.
- Local: Sobre Netflix → Certificaciones → Challenges 03 → Miniproyecto → Embajadores → Netflix Shop → Oportunidades profesionales → Encuestas.
- Real: Hero → Sobre → Cursos → Challenges → Miniproyecto → Oportunidades → Encuestas → Embajadores → Ecommerce.

**14. SILBON** · `/empresas/silbon.html`
- Composición: editorial frente al Duomo; overlay navy; logo blanco; texto a la izquierda.
- Hero 639.72 px · H1 Manrope 68 / 72.08, peso 800 · Cuerpo DM/Arial · Base #102638 · CTA #FFFFFF.
- Recursos: portada `bw-silbon-cover.webp` (cover); logo `bw-silbon-logo.svg` (contain).
- Contenido: Next Collection Challenge; tres miniproyectos; Explora la marca.
- Real: Hero → Sobre → Curso → Challenge → Miniproyectos → Oportunidades → Encuestas → Embajadores → Tienda.

### Plantillas 15 a 17

**15. Atresmedia** · `/empresas/atresmedia.html`
- Composición: azul petróleo; placa inclinada con sombra cian; palabra también en cian; franja multicolor inferior.
- Hero 585.83 px · H1 Manrope 61.92 / 65.64, peso 800 · Cuerpo DM Sans · Base #111B23 · CTA #72D9DF.
- Recursos: portada `bw-atresmedia-cover.svg` (cover); logo `bw-atresmedia-logo-square.svg` (contain).
- Contenido: dos cursos; Efecto MIL; tres miniproyectos; Explora Atresmedia.
- Real: Hero → Sobre → Cursos → Challenges → Miniproyectos → Oportunidades → Encuestas → Embajadores → Explora.

**16. HEINEKEN** · `/empresas/heineken.html`
- Composición: fábrica con overlay verde; logo blanco; estrella roja; gran cerveza en lima y tarjeta auxiliar a la derecha.
- Hero 570 px · H1 Manrope 64.8 / 69.34, peso 700 · Cuerpo DM Sans · Base #002718 · CTA #C3ED9F.
- Recursos: portada `bw-heineken-cover.webp` (cover); logo `bw-heineken-image-2.svg` (contain).
- Contenido: Brewhouse; tres miniproyectos; recursos de compañía.
- Real: Hero → Sobre → Curso → Challenges → Miniproyectos → Oportunidades → Encuestas → Embajadores → Servicios → Cierre.

**17. Mapfre** · `/empresas/mapfre.html`
- Composición: fotografía corporativa roja con overlay granate; logo blanco; gran titular a la izquierda.
- Hero 590 px · H1 Manrope 62.64 / 67.65, peso 800 · Cuerpo DM Sans · Base #211317 · CTA #FF002D.
- Recursos: portada `bw-mapfre-hero.webp` (cover); logo `bw-mapfre-logo-square.svg` (contain).
- Contenido: bugaMAP; tres miniproyectos; Explora Mapfre.
- Real: Hero → Sobre → Curso → Challenges → Miniproyectos → Oportunidades → Encuestas → Embajadores → Servicios.

---

## Resumen de recursos por empresa

| Empresa | Portada (ajuste) | Logo (ajuste) |
|---|---|---|
| Instituto BME | beway-bme-palacio-bolsa.jpg (cover) | beway-bme-instituto-bme.png (contain) |
| McGraw Hill | mcgraw-hill-logo.png (contain) | mcgraw-hill-logo.png (contain) |
| Centro de Estudios Garrigues | beway-ceg-campus.jpg (cover) | logo-garrigues-dark.svg (contain) |
| Google | beway-google-google-g.svg (contain) | logo-google.webp (contain) |
| IBM | beway-ibm-logo.svg (contain) | beway-ibm-logo.svg (contain) |
| Auren | beway-auren-auren-logo.svg (contain) | logo-auren-dark.svg (contain) |
| PwC | bw-pwc-pwc-logo.svg (contain) | bw-pwc-pwc-logo.svg (contain) |
| Deloitte | bw-deloitte-cover-white.svg (cover) | bw-deloitte-logo-square.svg (contain) |
| Banco Santander | bw-san-santander-logo.png (contain) | logo-santander.webp (contain) |
| Revolut | bw-revolut-cover.svg (cover) | bw-revolut-logo-square.svg (contain) |
| L'Oréal | beway-loreal-hero-beauty.jpg (cover) | logo-inditex.webp (contain) ⚠ revisar |
| McKinsey & Company | logo-mckinsey.webp (contain) | logo-mckinsey.webp (contain) |
| Netflix | beway-netflix-mark.svg (contain) | logo-netflix.webp (contain) |
| SILBON | bw-silbon-cover.webp (cover) | bw-silbon-logo.svg (contain) |
| Atresmedia | bw-atresmedia-cover.svg (cover) | bw-atresmedia-logo-square.svg (contain) |
| HEINEKEN | bw-heineken-cover.webp (cover) | bw-heineken-image-2.svg (contain) |
| Mapfre | bw-mapfre-hero.webp (cover) | bw-mapfre-logo-square.svg (contain) |

**Marca compartida:** logo de Beway de la cabecera: `logo-beway-pdf.webp`.
**CSS general:** `/style.css` (tokens, componentes y media queries de referencia).
**Fuentes de marca:** `beway-ceg-dm-sans-0.woff2`, `beway-ceg-manrope-0.woff2`.

**Listo cuando (anexo):** cada empresa tiene su hero, colores, recursos, orden de secciones y variante propia. Ninguna se ve como una plantilla genérica.
