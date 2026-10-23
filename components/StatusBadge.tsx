import { Badge } from '@ds';
import type { ComponentProps } from 'react';

/* Sello de estado de una fila ("En curso", "Cerrada", "Abierto"). Es el `Badge` del design system con el texto en frase:
   el DS lo pinta en mayúsculas con tracking, y una lista de filas con tres o cuatro sellos así se lee como una franja de
   etiquetas gritando. Una sola marca por fila (guía de pantallas de trabajo). El color y el icono siguen siendo del DS. */
export function StatusBadge({ style, ...props }: ComponentProps<typeof Badge>) {
  return <Badge {...props} style={{ textTransform: 'none', letterSpacing: 'normal', ...style }} />;
}
