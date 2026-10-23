'use client';
import React from 'react';
import { RadioGroup } from './Radio.jsx';

/* Label + hint/error wrapper shared by every BeWay form control.
   It wires the accessibility for you: the control gets an id (htmlFor, its own id, or a generated one),
   aria-describedby pointing at the hint or error, and aria-invalid when there is an error.
   For a RadioGroup the label becomes its accessible name (aria-labelledby). */
export function Field({ label, hint, error, required = false, htmlFor, children, style, ...rest }) {
  const auto = React.useId();
  const only = React.Children.count(children) === 1 && React.isValidElement(children) ? children : null;
  const isGroup = Boolean(only && only.type === RadioGroup);
  const id = htmlFor || (only && only.props.id) || 'bw-field-' + auto;
  const labelId = id + '-label';
  const noteId = error ? id + '-error' : hint ? id + '-hint' : undefined;

  let control = children;
  if (only) {
    const describedBy = [only.props['aria-describedby'], noteId].filter(Boolean).join(' ') || undefined;
    const wired = { 'aria-describedby': describedBy };
    if (error) wired['aria-invalid'] = true;
    if (isGroup) { if (label && !only.props['aria-label']) wired['aria-labelledby'] = labelId; wired.id = id; } else wired.id = id;
    control = React.cloneElement(only, wired);
  }

  const labelStyle = {
    fontFamily: 'var(--font-body)', fontSize: 'var(--text-small-size)', fontWeight: 600,
    color: 'var(--text-body)', display: 'flex', gap: 4,
  };
  const star = required ? <span aria-hidden="true" style={{ color: 'var(--text-accent)' }}>*</span> : null;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', ...style }} {...rest}>
      {label ? (isGroup
        ? <span id={labelId} style={labelStyle}>{label}{star}</span>
        : <label id={labelId} htmlFor={id} style={labelStyle}>{label}{star}</label>) : null}
      {control}
      {error ? (
        <span id={id + '-error'} style={{ fontSize: 'var(--text-small-size)', color: 'var(--status-danger-text)' }}>{error}</span>
      ) : hint ? (
        <span id={id + '-hint'} style={{ fontSize: 'var(--text-small-size)', color: 'var(--text-muted)' }}>{hint}</span>
      ) : null}
    </div>
  );
}
