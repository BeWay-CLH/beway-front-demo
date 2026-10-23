'use client';

import type { ReactNode } from 'react';

/* Casilla con input nativo. El Checkbox del design system no recibe foco (DS_REQUESTS, punto 3). */
export function CheckField({
  id,
  checked,
  onChange,
  label,
  error,
}: {
  id: string;
  checked: boolean;
  onChange: (next: boolean) => void;
  label: ReactNode;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3 text-sm text-fg-body">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          aria-invalid={error ? true : undefined}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-0.5 size-[18px] flex-none accent-action-primary"
        />
        <span>{label}</span>
      </label>
      {error ? <span className="pl-[30px] text-sm text-status-danger-text">{error}</span> : null}
    </div>
  );
}
