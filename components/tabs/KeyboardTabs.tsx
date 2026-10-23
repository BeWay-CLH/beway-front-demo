'use client';

import type { KeyboardEvent, ReactNode } from 'react';
import { Tabs, type TabItem } from '@ds';

/* `Tabs` del DS no responde a flechas, Inicio ni Fin y no enlaza la pestaña con su panel (DS_REQUESTS, punto 13).
   Este envoltorio lo suple: mueve la selección con el teclado, hace la fila desplazable en móvil y nombra el panel.
   La pestaña activa la gobierna quien lo usa. */
export function KeyboardTabs({
  label,
  items,
  value,
  onChange,
  children,
}: {
  label: string;
  items: TabItem[];
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
}) {
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
    const buttons = Array.from(e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
    const i = buttons.indexOf(document.activeElement as HTMLButtonElement);
    if (i === -1) return;
    e.preventDefault();
    const next =
      e.key === 'Home' ? 0 : e.key === 'End' ? buttons.length - 1 : (i + (e.key === 'ArrowRight' ? 1 : -1) + buttons.length) % buttons.length;
    buttons[next].focus();
    buttons[next].click();
  };

  const active = items.find((t) => t.value === value)?.label ?? '';

  return (
    <div className="flex flex-col gap-6">
      <div className="-mx-4 overflow-x-auto px-4 md:mx-0 md:px-0" onKeyDown={onKeyDown}>
        <Tabs
          aria-label={label}
          items={items}
          value={value}
          onChange={onChange}
          style={{ width: 'max-content', minWidth: '100%', whiteSpace: 'nowrap' }}
        />
      </div>
      <div role="tabpanel" aria-label={active} tabIndex={0}>
        {children}
      </div>
    </div>
  );
}
