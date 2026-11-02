# lenses — Context & Build Brief

An interactive web experience whose **essence** is: *a digital environment that inspires the user
to change perspective* — mentally and physically. You "swap lenses" and the world you see (and how
it's explained) changes. This is **not commerce** — you can't order or pay for anything. The lenses
are **psychological / perceptual**.

Everything below is **inspiration, not a spec**. If you find a better way to achieve the essence,
do that. The goal is to make people *experience* and *reflect on* other ways of seeing the world.

---

## The two experiences to prototype

### A) The Lens Viewer (primary)
- A large visual fills most of the page (~70%), showing a scene/"the world."
- A **lens selector** lets the user switch lenses; each lens **changes the visual** (and/or the
  framing) and shows a short **explanatory text** (e.g. top-left) describing *how the world changes*
  when you look through this lens.
- Optionally **stack lenses** to combine effects.
- Let the user switch between **different scenes/images** to see how each lens re-colours different
  situations.

**Lens ideas (the perceptual filters):**
- **Scope of concern / zoom of care:** egocentric (only yourself) → you + family + colleagues →
  your street → town → city → country → world → the planet → the universe / other worlds. The same
  scene "means" something different at each scope.
- **Tunnel vision:** you fixate on one thing and literally stop seeing the trees / the surroundings.
- **One-metre bubble:** you only perceive what's within a metre of you.
- **Self-only:** you only see yourself / your own benefit.
- Invent more — anything where *just changing the lens* reveals something different (time horizon:
  this-moment vs this-year vs this-century; scarcity vs abundance; threat vs opportunity; etc.).

A lens can be expressed as an **image transformation** (crop/zoom/tunnel vignette/desaturate/blur
the periphery) **and/or** as a **generated image** of the same scene reimagined, **and/or** as
**text** explaining the shift when an image is hard. Mix whatever communicates the idea best.

### B) The Perspective Room (second experience)
- A scene — e.g. a **room with several people, a baby, and an animal (cat/dog)** — shown first from
  **your** point of view.
- **Switch perspective** to see the same room **from another person's or the animal's viewpoint**,
  with an explanation of how the experience changes (the baby's view, the cat's view, a stranger's
  view, a bird's-eye view, etc.).
- Key theme for BOTH experiences: **perception depends on knowledge of reality.** An adult holds
  more information about how the world works than a child or an animal — so the *same* scene is
  understood differently. Surface this in the explanations.

## Suggested tech (keep it clean, open-source, no build-tool ceremony if avoidable)
- A simple web app (vanilla + a light framework is fine) served via Traefik at the project subdomain.
- **Image generation: use fal.ai** — the key is in `~/knowledge/.env` as `FAL_KEY`. You can generate
  the scenes and the per-lens / per-perspective variants (same scene, different viewpoint or mood),
  and cache them locally under the project. (fal.ai is a US service — fine for this creative PoC.)
- For lens *effects* you can also do a lot cheaply in-browser with CSS/canvas/SVG filters
  (vignette for tunnel vision, blur periphery, zoom, grayscale, masks) layered over a base image —
  often more responsive than regenerating an image each time.
- **No authentication** — public demo (we run inside a private VPN container). Make it click-through.

## Build approach
- **Start building a prototype now.** Ship something interactive early, then iterate.
- Treat the two experiences as modules; get the **Lens Viewer** working first, then the room.
- Prioritise the *feeling* of insight — the moment the user goes "oh, if I look at it this way…".
- Make it beautiful and calm; this is reflective, not gamey (unless gamifying helps the insight).

## Operator-environment notes
- Build under `~/projects/lenses/` as a git-versioned `docker-compose` stack (use the **new-project**
  skill); publish at `https://lenses.<username>.users.ctx7.dev` via Traefik.
- `git init` + commit throughout; keep `.ctx7/status.json` fresh via `project-status`.
- Generated images go under the project (e.g. `./assets/`), committed or in a volume — your call.
- **Test in the real browser** (`browser` CLI): open the page, switch lenses/perspectives,
  screenshot, verify it actually communicates the shift, iterate.
- Keep a `DECISIONS.md` (concept choices, what you simulated, what you'd do next).

The north star: someone opens it, swaps a lens, and *feels* their perspective change. Build toward that.
