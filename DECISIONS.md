# Decisions — lenses

## Concept
- **North star:** swap a lens → *feel* the perspective shift. Every lens = a visual change + a short
  "how the world changes" text + one reflective question (the question is where the insight lands).
- **"You" is a mustard-yellow figure** in every Lens Viewer scene. It anchors the self-centred lenses
  (only me, one-metre bubble, circle of concern) and survives the time-travel variants, so you can
  find yourself in 1925 and 2125. A "you" tag flashes on load/scene change.
- **Theme across both experiences: perception depends on knowledge of reality.** The Perspective Room
  makes this explicit with two meters per perspective — *Perceives* (raw sensing) vs *Interprets*
  (human meaning). Insight: knowing more ≠ sensing more (the dog out-senses everyone; Grandpa out-reads
  everyone; Mum's knowledge mostly adds weight).
- Not commerce, no auth, no tracking.

## Lens Viewer
- 3 scenes (town square, office, seaside promenade) × 8 lenses.
- Two kinds of lens:
  - **image lenses** (swap the picture; one at a time): Circle of concern, Time horizon, Threat, Wonder.
  - **effect lenses** (CSS overlays; stackable): Tunnel vision (follows the cursor), One-metre bubble,
    Only me, In a hurry (sideways smear + ticking clock).
- **Circle of concern** is a powers-of-ten dial: Me → My people → This place (in-scene masks) →
  Town (per-scene aerial edit) → City → Country → World → Universe (shared images), with
  zoom-out/zoom-in transitions so it feels like pulling back.
- **Time horizon**: 1925 / now / 2125 / year 12,000 — same composition via image edits.
- **Stacking**: toggle "Stack lenses". New image lens replaces the previous image lens; effect
  lenses accumulate. Card shows the latest lens with chips for the rest.
- Keyboard: 1–8, ←/→ dial, [ ] scenes, s stack, 0 clear.

## Perspective Room
- One rainy-evening living room (baby on a play mat, dog, cat on windowsill, Mum with bills,
  Grandpa's 75th birthday cake, TV news, clock) + 7 perspectives: You, baby, Mum, Grandpa, dog, cat, fly.
- Each POV is a **generated photo from that viewpoint** + an optional **eye simulation** filter
  (dichromat matrix for dog/cat — Machado 2009 deuteranopia; blur for baby; yellowed lens for Grandpa;
  compound-eye mosaic for the fly). Toggle "Simulate their eyes" to compare.
- A "What things mean to …" strip re-labels the same six things (cake, clock, news, rain, baby,
  everyone else) per perspective — the core of the knowledge theme.

## Image generation (fal.ai)
- Base scenes + shared scope images: `fal-ai/flux-pro/v1.1-ultra` (16:9).
- Same-composition variants (time, mood, aerial): `fal-ai/nano-banana/edit` — keeps layout so
  crossfades read as "the same place, changed".
- Camera-moving POVs in the room: `fal-ai/nano-banana-pro/edit` — the non-pro model refused to
  really move the camera; pro does it with "create a NEW photograph from …" phrasing.
- Room base needed 3 passes (first gen lacked baby/grandma; nano-banana edits removed extra cats
  and added one on the sill). Mum's POV needed 3 tries ("she IS the camera, must not appear").
- Everything is described in `tools/manifest.mjs`; `node tools/gen.mjs [filter] [--force]` fills in
  missing images; `node tools/optimize.mjs` normalises to 1600×900 JPEG (originals kept, git-ignored).
- Images are **committed** (~5 MB) so the demo works without regenerating.

## Tech
- Static site (vanilla ES modules + CSS, no build) served by `nginx:alpine`, routed by Traefik.
- Effects are `backdrop-filter` overlays with radial `mask-image` holes, positioned by CSS vars
  (`--x/--y/--rx/--ry` per scene, `--px/--py` pointer). Cheap, instant, stackable.

## Next ideas
- Lens ideas not yet built: scarcity vs abundance; "their screen" (what the person next to you is
  scrolling); a nature lens (the square as a habitat — pigeons, trees, insects).
- Hotspots on the room image (click the cake/clock to see all seven meanings side by side).
- Narration/audio per lens; ambient sound that changes with perspective (muffled for the baby,
  ultra-detailed for the dog).
- A guided "walk" mode that sequences lenses as a 2-minute story.
- Mobile layout polish (works, but card overlays move below the image on small screens).
