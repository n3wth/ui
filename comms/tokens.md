# Tokens for outbound communications

Literal values, not `var(--color-*)` references — email clients and static
docs can't resolve CSS custom properties, so anything outbound needs the
resolved hex. Source of truth for the live values is `../src/theme.css`;
if these ever drift, that file wins.

## Palette

| Name | Hex | Use |
|---|---|---|
| bg | `#08090b` | Artifact/dark-mode backgrounds only. **Not used in email** (see below). |
| ink | `#f2f3f5` | Primary text on dark backgrounds. |
| ink-dim | `#9aa0a8` | Secondary text on dark backgrounds. |
| accent | `#ffffff` | Dark-mode accent/highlight. |

## Email is light mode, no background fill

Emails use a white/transparent background with near-black text — not the
dark `#08090b` theme. This is a deliberate exception: it's how people
actually read email, and it avoids client rendering quirks with forced dark
fills. Only the sender mark (already a self-contained dark tile) carries
the dark palette into an email.

| Name | Hex | Use |
|---|---|---|
| email-text | `#0f1115` | Body text |
| email-text-dim | `#5b6069` | Secondary text, footer |
| email-link | `#1a56db` | Links / CTA — a normal readable blue, not the site's white-accent (invisible on white) |
| email-bg | `#ffffff` | Page background |
| email-rule | `#e5e7eb` | Hairline dividers between blocks |

## Mark fill

The 4 identity marks (`assets/*-mark.svg`) are fixed artwork, not
theme-driven — each is a flat off-white shape (`#f1f1f2`) on its own
`#08090b` rounded tile, matching `n3wth-site/public/favicon.svg`'s
convention (rect + rx + single path). Don't recolor them per-context; use
the tile as-is.
