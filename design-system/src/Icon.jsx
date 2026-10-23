'use client';
import React from 'react';
import { icons } from 'lucide';

/* BeWay uses Lucide 0.469.0 (thin geometric outline, 2px stroke) as its icon
   system. In this Next project the icon data is imported from the `lucide`
   package, so it renders on the server and on the client alike. */

const pascal = (n) => n.replace(/(^|[-_ ])(\w)/g, (_, __, c) => c.toUpperCase());

function nodeToReact(node, i) {
  if (!Array.isArray(node)) return null;
  const [tag, attrs, children] = node;
  const { key: _k, ...rest } = attrs || {};
  return React.createElement(tag, { key: i, ...rest }, (children || []).map(nodeToReact));
}

export function Icon({ name, size = 20, strokeWidth = 2, color = 'currentColor', style, ...rest }) {
  const entry = icons[pascal(name)];
  let children = entry ? (entry.iconNode || entry) : [];
  if (Array.isArray(children) && typeof children[0] === 'string') children = children[2] || [];
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true" style={{ display: 'block', flex: 'none', ...style }} {...rest}
    >
      {(children || []).map(nodeToReact)}
    </svg>
  );
}
