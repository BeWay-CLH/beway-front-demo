'use client';

import { useId } from 'react';

/* Interruptor con input nativo: responde a Espacio y lo anuncia el lector de pantalla. El Switch del design
   system es un <label> sin input y no recibe foco (DS_REQUESTS, punto 2). Ver DEC-024. */
export function ToggleField({
  label,
  description,
  checked,
  onChange,
  disabled = false,
  name,
}: {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (next: boolean) => void;
  disabled?: boolean;
  name?: string;
}) {
  const descriptionId = useId();
  return (
    <label className="flex cursor-pointer items-start gap-4 has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50">
      <span className="relative mt-0.5 inline-flex h-[22px] w-10 flex-none">
        <input
          type="checkbox"
          role="switch"
          name={name}
          checked={checked}
          disabled={disabled}
          aria-describedby={description ? descriptionId : undefined}
          onChange={(e) => onChange(e.target.checked)}
          className="peer sr-only"
        />
        <span
          aria-hidden="true"
          className="transition-control absolute inset-0 rounded-full bg-line-control peer-checked:bg-action-primary peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-focus-ring"
        />
        <span
          aria-hidden="true"
          className="absolute left-[3px] top-[3px] size-4 rounded-full bg-surface-card shadow-hairline transition-transform duration-[200ms] peer-checked:translate-x-[18px] peer-checked:bg-brand-dark"
        />
      </span>
      <span className="flex flex-col gap-1">
        <span className="text-sm font-semibold text-fg-heading">{label}</span>
        {description ? (
          <span id={descriptionId} className="text-sm text-fg-muted">
            {description}
          </span>
        ) : null}
      </span>
    </label>
  );
}
