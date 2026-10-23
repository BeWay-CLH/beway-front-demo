/* Logos de ejemplo como SVG en data URI. Los colores hex viven solo aquí, en los fixtures: nunca en componentes. */
export const logo = (text: string, color = '#1C2541') =>
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="48" viewBox="0 0 160 48"><rect width="160" height="48" rx="8" fill="${color}"/><text x="80" y="30" text-anchor="middle" font-family="sans-serif" font-weight="700" font-size="16" fill="#fff">${text}</text></svg>`,
  );
