import { SCENES, LENSES, NAKED } from "./lenses.js";
import { setImage, setCard, preload, esc, textToggle, centerActive } from "./stage.js";

const $ = s => document.querySelector(s);
const stage = $("#stage"), layers = $("#layers"), card = $("#card"), dials = $("#dials");
const list = $("#lenslist"), scenesNav = $("#scenes"), stackBox = $("#stack"), hint = $("#hint");
const byId = Object.fromEntries(LENSES.map(l => [l.id, l]));

const state = {
  scene: SCENES[0].id,
  active: [],                                   // lens ids, most recent last
  stops: Object.fromEntries(LENSES.filter(l => l.stops).map(l => [l.id, l.start ?? 0])),
  stack: false,
};
let prevScope = null;

const T = (v, scene = state.scene) => (v && typeof v === "object" ? v[scene] ?? v.default : v);
const scene = () => SCENES.find(s => s.id === state.scene);
const part = l => (l.stops ? l.stops[state.stops[l.id]] : l);   // the active "content" of a lens
const imgSrc = key => key?.startsWith("@") ? `assets/scope/${key.slice(1)}.jpg`
  : `assets/scenes/${state.scene}/${key || "base"}.jpg`;

// ── build UI ────────────────────────────────────────
list.innerHTML = LENSES.map(l => `
  <li><button class="lens" data-id="${l.id}" aria-pressed="false">
    <span class="glyph">${l.glyph}</span>
    <span><strong>${esc(l.name)}</strong><em>${esc(l.sub)}</em></span>
    <kbd>${l.key}</kbd>
  </button></li>`).join("");

scenesNav.insertAdjacentHTML("beforeend", SCENES.map(s => `
  <button data-scene="${s.id}" aria-pressed="false" title="${esc(s.name)}">
    <img src="assets/scenes/${s.id}/base.jpg" alt=""><span>${esc(s.name)}</span>
  </button>`).join(""));

list.addEventListener("click", e => {
  const b = e.target.closest(".lens");
  if (b) toggle(b.dataset.id);
});
scenesNav.addEventListener("click", e => {
  const b = e.target.closest("[data-scene]");
  if (b) setScene(b.dataset.scene);
});
stackBox.addEventListener("change", () => {
  state.stack = stackBox.checked;
  if (!state.stack) state.active = state.active.slice(-1);
  render();
});
dials.addEventListener("click", e => {
  const b = e.target.closest("button[data-stop]");
  if (!b) return;
  state.stops[b.dataset.lens] = +b.dataset.stop;
  // bring that lens to the top so its text shows
  state.active = [...state.active.filter(id => id !== b.dataset.lens), b.dataset.lens];
  render();
});

// tunnel vision follows the pointer
const aim = e => {
  const r = stage.getBoundingClientRect();
  stage.style.setProperty("--px", `${((e.clientX - r.left) / r.width) * 100}%`);
  stage.style.setProperty("--py", `${((e.clientY - r.top) / r.height) * 100}%`);
};
stage.addEventListener("pointermove", aim);
stage.addEventListener("pointerdown", aim);
if (matchMedia("(hover: none)").matches) hint.textContent = "Tap a lens below";

document.addEventListener("keydown", e => {
  if (e.target.closest?.("input, textarea")) return;
  const l = LENSES.find(l => l.key === e.key);
  if (l) return toggle(l.id);
  if (e.key === "0" || e.key === "Escape") { state.active = []; return render(); }
  if (e.key === "s") { stackBox.checked = !stackBox.checked; stackBox.dispatchEvent(new Event("change")); }
  if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
    const top = [...state.active].reverse().map(id => byId[id]).find(l => l.stops);
    if (!top) return;
    const n = state.stops[top.id] + (e.key === "ArrowRight" ? 1 : -1);
    if (n >= 0 && n < top.stops.length) { state.stops[top.id] = n; e.preventDefault(); render(); }
  }
  if (e.key === "[" || e.key === "]") {
    const i = SCENES.findIndex(s => s.id === state.scene);
    setScene(SCENES[(i + (e.key === "]" ? 1 : SCENES.length - 1)) % SCENES.length].id);
  }
});

function toggle(id) {
  const l = byId[id];
  hint.classList.add("gone");
  if (state.active.includes(id)) {
    state.active = state.active.filter(x => x !== id);
  } else if (!state.stack) {
    state.active = [id];
  } else {
    if (l.kind === "image") state.active = state.active.filter(x => byId[x].kind !== "image");
    state.active.push(id);
  }
  render();
}

function setScene(id) {
  if (id === state.scene) return;
  state.scene = id;
  flashYou();
  render("fade");
  warm();
}

// ── render ──────────────────────────────────────────
function render(forceMode) {
  const s = scene();
  stage.style.setProperty("--x", `${s.you[0]}%`);
  stage.style.setProperty("--y", `${s.you[1]}%`);
  stage.style.setProperty("--rx", `${s.r[0]}%`);
  stage.style.setProperty("--ry", `${s.r[1]}%`);
  const active = state.active.map(id => byId[id]);

  // image: the most recent image lens wins
  const imgLens = [...active].reverse().find(l => l.kind === "image");
  const key = imgLens ? part(imgLens).img : undefined;

  // zoom direction for the circle-of-concern dial
  let mode = forceMode || "fade";
  const scopeNow = active.includes(byId.scope) ? state.stops.scope : 2;
  if (!forceMode && prevScope !== null && scopeNow !== prevScope && (scopeNow >= 3 || prevScope >= 3))
    mode = scopeNow > prevScope ? "out" : "in";
  prevScope = scopeNow;
  setImage(layers, imgSrc(key), { mode });

  // effects
  const fx = new Set();
  for (const l of active) {
    if (l.fx) fx.add(l.fx);
    if (l.stops && part(l).fx && (!imgLens || imgLens === l || !part(imgLens).img)) fx.add(part(l).fx);
  }
  const wide = key?.startsWith("@") || key === "aerial";
  for (const d of $("#fx").children) d.classList.toggle("on", fx.has(d.dataset.fx) && !(wide && d.dataset.fx !== "tunnel" && d.dataset.fx !== "hurry"));
  stage.classList.toggle("tunnel-on", fx.has("tunnel"));
  stage.classList.toggle("hurry-on", fx.has("hurry"));
  layers.classList.toggle("hurry", fx.has("hurry"));
  stage.classList.toggle("show-you", !wide && (fx.has("self") || fx.has("bubble") || fx.has("scope0") || youFlash));
  hurryClock(fx.has("hurry"));

  // card
  const top = active.at(-1);
  const c = top ? part(top) : NAKED;
  const others = active.slice(0, -1).map(l => l.stops ? `${l.name}: ${part(l).label}` : l.name);
  setCard(card, `
    <div class="kicker">${esc(c.kicker || top?.name || "")}</div>
    <h2>${esc(T(c.title))}</h2>
    <p>${esc(T(c.body))}</p>
    ${others.length ? `<div class="chips">${others.map(o => `<span>+ ${esc(o)}</span>`).join("")}</div>` : ""}
    <p class="q">${esc(T(c.q))}</p>`);

  // dials for active lenses that have stops
  dials.innerHTML = active.filter(l => l.stops).map(l => `
    <div class="dial" role="group" aria-label="${esc(l.name)}">
      <span class="lbl">${esc(l.name)}</span>
      ${l.stops.map((st, i) => `<button data-lens="${l.id}" data-stop="${i}" aria-pressed="${i === state.stops[l.id]}">${esc(st.label)}</button>`).join("")}
    </div>`).join("");

  // controls
  for (const b of list.querySelectorAll(".lens")) b.setAttribute("aria-pressed", state.active.includes(b.dataset.id));
  for (const b of scenesNav.querySelectorAll("[data-scene]")) b.setAttribute("aria-pressed", b.dataset.scene === state.scene);
  dials.querySelectorAll(".dial").forEach(d => centerActive(d, false));
  centerActive(list);
}

// "you" marker flashes on load / scene change so people know who they are
let youFlash = false, youTimer;
function flashYou() {
  youFlash = true;
  clearTimeout(youTimer);
  youTimer = setTimeout(() => { youFlash = false; render(); }, 3200);
}

let clockTimer, clockStart;
function hurryClock(on) {
  const el = $("#clock");
  if (!on) { clearInterval(clockTimer); clockTimer = null; return; }
  if (clockTimer) return;
  clockStart = Date.now();
  const tick = () => {
    const t = 8 * 3600 + 58 * 60 + 41 + Math.floor((Date.now() - clockStart) / 1000);
    const p = n => String(n).padStart(2, "0");
    el.innerHTML = `${p(Math.floor(t / 3600))}:${p(Math.floor(t / 60) % 60)}:${p(t % 60)}<small>meeting at 09:00</small>`;
  };
  tick();
  clockTimer = setInterval(tick, 1000);
}

// preload the current scene's variants + the shared zoom-out images
function warm() {
  const keys = new Set(["base"]);
  for (const l of LENSES) for (const p of l.stops || [l]) if (p.img) keys.add(p.img);
  keys.forEach(k => preload(imgSrc(k)));
}

flashYou();
render();
warm();
textToggle(stage);
