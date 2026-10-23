import type { CompletionStepVM } from '@/lib/models/dashboard';

/* Los cinco apartados que cuentan para el porcentaje, uno por segmento. Relleno = listo, solo borde = falta:
   la diferencia es de forma, no solo de color. Sin degradado ni animación. En móvil los nombres pasan a
   lectores de pantalla y la página los repite en texto ("Ya tienes listo: …"). */
export function CompletionRail({ steps }: { steps: CompletionStepVM[] }) {
  return (
    <ol aria-label="Apartados de tu perfil" className="grid grid-cols-5 gap-2 md:gap-4">
      {steps.map((step) => (
        <li key={step.item} className="flex flex-col gap-2">
          <span aria-hidden="true" className={step.done ? 'h-2 bg-fg-heading' : 'h-2 border border-line-control'} />
          <span className={`max-md:sr-only text-sm ${step.done ? 'text-fg-heading' : 'text-fg-muted'}`}>
            {step.label}
            <span className="sr-only">{step.done ? ', listo' : ', falta'}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}
