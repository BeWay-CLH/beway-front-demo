/* Empresas que sigue cada cuenta de demostración (C-05), por id de empresa.
   Lucía sigue a tres, CLH incluida; Marcos a ninguna, para probar el estado vacío. */
export const followsByUser: Record<string, string[]> = {
  'usr-lucia-martin': ['cmp-metrovia', 'cmp-datalia', 'cmp-clh'],
  'usr-marcos-gil': [],
};
