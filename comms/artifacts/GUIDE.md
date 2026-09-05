# Artifacts guide

For the mechanics of building a good Artifact (theming, responsiveness,
self-containment, favicon), defer to the `artifact-design` skill — that's
its job. This file only adds the brand-specific inputs that skill doesn't
know about.

## Use these, not invented ones

- Colors: `../tokens.md` (`#08090b` bg, `#f2f3f5` ink, etc.) — the same
  palette as n3wth.com and garden.n3wth.com. Don't invent a new scheme for
  a one-off Artifact.
- Favicon / logo mark: use `../assets/hermes-mark.svg` or the appropriate
  sender mark when an Artifact wants one — pass it via the Artifact tool's
  `favicon` mechanism or inline it; don't use a generic emoji or unrelated
  icon.
- Optional decorative art: `../assets/generated/banner-petals-v1.png` — a
  flat geometric header/hero image in the same shape language as the marks
  (quarter-circles, half-circles, rounded rects on `#08090b`). First pass,
  not a locked asset — regenerate via Flora if a specific size/crop is
  needed.
