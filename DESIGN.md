# Thin Ice — Design direction

**Concept: “The page is the ice.”** You arrive on a white ice sheet. As you scroll, the page melts: the background goes from snow white to pale ice, then to the dark blue of open ocean at the bottom. Each section is one thing the sea ice does for the planet, and what happens when it goes.

Same editorial family as Maison Partage, Red Reserve, Cold Archive and Night Shift: Bodoni headlines, uppercase micro-labels, numbered sections, slow motion.

## Color
The background is interpolated from the scroll position.

| Moment | Background | Text |
|---|---|---|
| Top, ice sheet | #f3f8fa | #0b1f2c |
| Thin ice | #d3e6ee | #0b1f2c |
| Open water | #1b4a61 | #eef5f8 |
| Deep ocean (footer) | #08192a | #eef5f8 |

| Token | Value | Role |
|---|---|---|
| `--ice` | #2f8fb3 (light) / #8fd3ee (dark) | Ice that still exists, interactive |
| `--heat` | #d4562a (light) / #ff8a5c (dark) | Loss, warming |

Blue is ice, orange is loss. Nothing else is coloured.

## Typography
Bodoni Moda for headlines and numbers, Helvetica Neue for UI. Labels 11px uppercase +0.14em.

## Signature interactions
1. **Test the ice** — click or tap the hero: cracks spread from where you pressed.
2. **The map** — drag through 1979–2023: the Arctic ice cap shrinks to scale with the real September extent.
3. **The mirror** — slide from ice to open ocean and watch how much sunlight is reflected or absorbed.
4. **The glass** — melt floating ice (the water level stays the same), then drop in ice from land (it rises).
5. **Old ice** — how much of the Arctic ice is more than four years old, then and now.
6. **Who lives on the ice** — catalogue cards that flip.
7. **The first blue summer** — what “ice-free” means and when it could happen.

## Motion
`cubic-bezier(.16,.84,.24,1)`, slow. Respects “reduce motion”.

## Visual layer (added)
- Original SVG drawings of a polar bear, ringed seal, walrus, Arctic cod and ice algae, defined once and reused.
- Hero: a bear on a floe that bobs on the waves, falling snow; the 4th crack splits the floe.
- Map: a bear that stands on the ice until 2005 and has to swim from 2007.
- “The dangers”: an animated four-step loop (air warms → ice melts → dark water → heat absorbed) and five risk cards.
- Every section opens with an “In short” line in plain words.
