#!/usr/bin/env python3
"""tokens.json -> theme.css for Tailwind v4 (@theme inline aliases onto the CSS variables in tokens.css)."""
import json, sys
tok = json.load(open(sys.argv[1], encoding='utf-8'))
out = sys.argv[2]
names = [t['name'] for t in tok['color']['tokens']]
def key(n):
    if n.startswith('text-'): return 'fg-' + n[5:]
    if n.startswith('border-'): return 'line-' + n[7:]
    return n
L = []
L.append('/* Generated from tokens.json by mk_theme.py. Do not edit by hand.\n   Tailwind v4 theme for the BeWay design system. Every utility reads a CSS variable from\n   tokens.css, so the dark theme (data-theme="dark") switches without dark: variants.\n\n   Colour keys:  bg-surface-card  text-fg-body  border-line-control  bg-action-primary  text-status-danger-text\n   Radius keys:  rounded-control (8px)  rounded-card (16px)  rounded-panel (24px)  rounded-tiny (4px)  rounded-full (pills)\n   Shadow keys:  shadow-card  shadow-raised  shadow-overlay  shadow-accent-glow\n   Type keys:    text-display  text-h1  text-h2  text-h3  font-heading  tracking-eyebrow  */\n')
L.append('@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *));\n')
L.append('@theme {\n  --color-*: initial;\n  --radius-*: initial;\n  --shadow-*: initial;\n  --color-transparent: transparent;\n  --color-current: currentColor;\n}\n')
L.append('@theme inline {')
for n in names:
    L.append(f'  --color-{key(n)}: var(--{n});')
L.append('')
L.append('  --radius-tiny: var(--radius-sm);\n  --radius-control: var(--radius-md);\n  --radius-card: var(--radius-lg);\n  --radius-panel: var(--radius-xl);\n')
L.append('  --shadow-hairline: var(--shadow-xs);\n  --shadow-card: var(--shadow-sm);\n  --shadow-raised: var(--shadow-md);\n  --shadow-overlay: var(--shadow-lg);\n  --shadow-on-dark: var(--shadow-inverse);\n  --shadow-accent-glow: var(--shadow-glow);\n')
L.append('  --font-sans: var(--font-body);\n  --font-heading: var(--font-display);\n')
for n, src in (('display', 'logo'), ('h1', 'h1'), ('h2', 'h2'), ('h3', 'h3')):
    L.append(f'  --text-{n}: var(--text-{src}-size);\n  --text-{n}--line-height: var(--text-{src}-lh);\n  --text-{n}--font-weight: var(--text-{src}-weight);')
L.append('')
L.append('  --tracking-hero: var(--tracking-display);\n  --tracking-heading: var(--tracking-tight);\n  --tracking-label: var(--tracking-wide);\n  --tracking-eyebrow: var(--tracking-caps);\n  --tracking-wordmark-wide: var(--tracking-wordmark);\n')
L.append('  --container-site: var(--container-lg);\n  --container-narrow: var(--container-md);\n}\n')
L.append('''@utility bg-brand-gradient { background-image: var(--gradient-brand); }
@utility bg-brand-gradient-soft { background-image: var(--gradient-brand-soft); }
@utility bg-overlay-hero { background-image: var(--overlay-hero); }
@utility bg-overlay-card { background-image: var(--overlay-card); }
@utility focus-ring { box-shadow: var(--ring-focus); }
@utility transition-control { transition: var(--transition-control); }

@layer base {
  body { background-color: var(--surface-page); color: var(--text-body); font-family: var(--font-body); }
  h1, h2, h3, h4 { font-family: var(--font-display); color: var(--text-heading); letter-spacing: var(--tracking-tight); }
  :focus-visible { outline: 2px solid var(--focus-ring); outline-offset: 2px; }
}
''')
open(out, 'w', encoding='utf-8').write('\n'.join(L))
print('theme.css:', len(names), 'colour keys')
