'use client';

/* Opción de radio con input nativo. El Radio del design system no recibe foco (DS_REQUESTS, punto 4). */
export function OptionRadio({
  id,
  name,
  value,
  checked,
  onChange,
  label,
  description,
  disabled = false,
}: {
  id: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  label: string;
  description?: string;
  disabled?: boolean;
}) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-start gap-3 has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50"
    >
      <input
        id={id}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={() => onChange(value)}
        className="mt-0.5 size-[18px] flex-none accent-action-primary"
      />
      <span className="flex flex-col gap-1">
        <span className="text-sm font-semibold text-fg-heading">{label}</span>
        {description ? <span className="text-sm text-fg-muted">{description}</span> : null}
      </span>
    </label>
  );
}
