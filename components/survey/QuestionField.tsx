'use client';

import { Checkbox, Input, RadioGroup, Textarea } from '@ds';
import type { SurveyQuestionVM } from '@/lib/models/survey';

export type AnswerValue = string | string[] | number;

/* Una pregunta de encuesta. Cada una es un `fieldset` con su `legend`: el nombre de la pregunta es el de sus controles, y el
   error está enlazado con `aria-describedby`. Tipos → controles del design system (E-03):
   single → RadioGroup · multiple → Checkbox · scale → RadioGroup en fila · short-text → Input · long-text → Textarea. */
export function QuestionField({
  question: q,
  value,
  onChange,
  error,
}: {
  question: SurveyQuestionVM;
  value: AnswerValue | undefined;
  onChange: (value: AnswerValue) => void;
  error?: string;
}) {
  const legendId = `lg-${q.id}`;
  const errorId = `er-${q.id}`;
  const describedBy = error ? errorId : undefined;

  let control;
  if (q.type === 'single') {
    control = (
      <RadioGroup
        aria-labelledby={legendId}
        aria-describedby={describedBy}
        options={q.options}
        value={typeof value === 'string' ? value : undefined}
        onChange={onChange}
      />
    );
  } else if (q.type === 'multiple') {
    const selected = Array.isArray(value) ? value : [];
    const atMax = q.max !== undefined && selected.length >= q.max;
    control = (
      <div role="group" aria-labelledby={legendId} aria-describedby={describedBy} className="flex flex-col gap-3">
        {q.options.map((o) => {
          const checked = selected.includes(o.value);
          return (
            <Checkbox
              key={o.value}
              label={o.label}
              checked={checked}
              disabled={!checked && atMax}
              onChange={(next) => onChange(next ? [...selected, o.value] : selected.filter((v) => v !== o.value))}
            />
          );
        })}
        {q.max ? <p className="text-sm text-fg-muted">{`Elige hasta ${q.max}.`}</p> : null}
      </div>
    );
  } else if (q.type === 'scale') {
    control = (
      <div className="flex flex-col gap-3">
        <div className="flex justify-between gap-4 text-sm text-fg-muted">
          <span>{`1 = ${q.minLabel}`}</span>
          <span className="text-right">{`${q.max} = ${q.maxLabel}`}</span>
        </div>
        <RadioGroup
          direction="row"
          aria-labelledby={legendId}
          aria-describedby={describedBy}
          style={{ flexWrap: 'wrap' }}
          options={Array.from({ length: q.max }, (_, i) => ({ value: String(i + 1), label: String(i + 1) }))}
          value={typeof value === 'number' ? String(value) : undefined}
          onChange={(v) => onChange(Number(v))}
        />
      </div>
    );
  } else if (q.type === 'short-text') {
    control = (
      <Input
        aria-labelledby={legendId}
        aria-describedby={describedBy}
        invalid={Boolean(error)}
        maxLength={q.maxLength}
        value={typeof value === 'string' ? value : ''}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  } else {
    const text = typeof value === 'string' ? value : '';
    control = (
      <div className="flex flex-col gap-2">
        <Textarea
          aria-labelledby={legendId}
          aria-describedby={describedBy}
          invalid={Boolean(error)}
          rows={4}
          maxLength={q.maxLength}
          value={text}
          onChange={(e) => onChange(e.target.value)}
        />
        <span className="text-sm tabular-nums text-fg-muted">{`${text.length} / ${q.maxLength}`}</span>
      </div>
    );
  }

  return (
    <fieldset id={`q-${q.id}`} className="flex flex-col gap-3">
      <legend id={legendId} className="mb-3 text-base font-semibold text-fg-heading">
        {q.prompt}
        {q.required ? null : <span className="font-normal text-fg-muted"> (opcional)</span>}
      </legend>
      {control}
      {error ? (
        <p id={errorId} className="text-sm text-status-danger-text">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}
