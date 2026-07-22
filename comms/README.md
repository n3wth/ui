# comms

Design system for outbound communications Claude Code or Hermes send to
Oliver — emails/newsletters, docs, and Artifacts. Separate concern from
the rest of this repo (which is the `@n3wth/ui` app component library);
this folder shares its canonical palette (`../src/theme.css`) but has no
runtime dependency on it — everything here is static assets and templates
consumed directly by an agent, not imported code.

## Layout

- `tokens.md` — literal hex values (email/docs can't use CSS variables)
- `assets/` — the 4 identity marks (`claude`, `hermes`, `hop`, `finance`),
  each an SVG + PNG, self-contained dark tile (own bg baked in, like an
  app icon) — no separate light variant needed
- `assets/generated/` — decorative art (e.g. banners) generated via Flora,
  first-pass quality, regenerate as needed
- `email/template.html` — light-mode, block-based HTML email skeleton
- `docs/STYLE.md` — writing/formatting conventions for docs
- `artifacts/GUIDE.md` — brand inputs for Artifacts (defers to the
  `artifact-design` skill for HTML mechanics)

## Which mark for which sender

Maps 1:1 to the AgentMail inboxes:

| Inbox | Display name | Mark |
|---|---|---|
| `claude@n3wth.com` | Claude | `claude-mark` (clover — 4 separated petals) |
| `hermes@n3wth.com` | Hermes | `hermes-mark` (pinwheel) |
| `hop@n3wth.com` | hop Finance | `hop-mark` (touching petals) |
| `finance@n3wth.com` | n3wth Finance | `finance-mark` (droplets) |

Whichever identity sends, its own mark badges the send — never substitute.

## Who uses this

- **Claude Code**: via the `n3wth-comms` skill (`~/.claude/skills/n3wth-comms/`),
  which points here and says when to reach for it.
- **Hermes** (on the mini): pulls this repo to a local path and reads the
  same files directly — see the pointer in its `MEMORY.md`.
