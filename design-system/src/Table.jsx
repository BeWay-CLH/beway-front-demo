'use client';
import React from 'react';

/* columns: [{ key, header, align?, width?, render?(row) }]. */
export function Table({ columns = [], rows = [], rowKey = 'id', caption, dense = false, onRowClick, empty, style, ...rest }) {
  const [hover, setHover] = React.useState(-1);
  const pad = dense ? '8px var(--space-4)' : '14px var(--space-4)';
  return (
    <div style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', background: 'var(--surface-card)', overflow: 'auto', ...style }} {...rest}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-body)', fontSize: 'var(--text-small-size)', color: 'var(--text-body)' }}>
        {caption ? <caption style={{ textAlign: 'left', padding: 'var(--space-4)', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-body-size)', color: 'var(--text-heading)' }}>{caption}</caption> : null}
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key} scope="col" style={{
                textAlign: c.align || 'left', width: c.width, padding: '10px var(--space-4)', background: 'var(--surface-sunken)',
                borderBottom: '1px solid var(--border-subtle)', fontSize: 11, fontWeight: 600,
                letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', color: 'var(--text-muted)', whiteSpace: 'nowrap',
              }}>{c.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row[rowKey] != null ? row[rowKey] : i}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(-1)}
              style={{ cursor: onRowClick ? 'pointer' : 'default', background: hover === i && onRowClick ? 'var(--surface-raised)' : 'transparent', transition: 'var(--transition-control)' }}
            >
              {columns.map((c) => (
                <td key={c.key} style={{ textAlign: c.align || 'left', padding: pad, borderBottom: i === rows.length - 1 ? 'none' : '1px solid var(--border-subtle)' }}>
                  {c.render ? c.render(row) : row[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length === 0 && empty ? <div>{empty}</div> : null}
    </div>
  );
}
