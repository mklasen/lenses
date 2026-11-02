// Shared stage helpers: crossfading / zooming image layers and the explanation card.

const loaded = new Map();
export function preload(src) {
  if (!loaded.has(src)) {
    const img = new Image();
    img.src = src;
    loaded.set(src, img.decode().catch(() => {}));
  }
  return loaded.get(src);
}

let token = 0;
// mode: "fade" | "out" (zoom out to a wider view) | "in" (zoom back in) | "swoop" (perspective change)
export async function setImage(layers, src, { mode = "fade", cls = "" } = {}) {
  const current = layers.lastElementChild;
  if (current && current.dataset.src === src) {
    current.className = cls;
    return;
  }
  const my = ++token;
  await preload(src);
  if (my !== token) return; // a newer request superseded us

  const img = document.createElement("img");
  img.alt = "";
  img.src = src;
  img.dataset.src = src;
  img.className = cls;
  const from = { out: "scale(1.9)", in: "scale(.82)", swoop: "scale(1.12) translateY(2%)", fade: "scale(1.02)" }[mode];
  img.style.opacity = "0";
  img.style.transform = from;
  layers.appendChild(img);

  // old layers: shrink into / blow past the focus point, then go
  const olds = [...layers.children].filter(n => n !== img);
  requestAnimationFrame(() => requestAnimationFrame(() => {
    img.style.opacity = "1";
    img.style.transform = "none";
    for (const o of olds) {
      o.style.transform = { out: "scale(.45)", in: "scale(2.2)", swoop: "scale(.94)", fade: "none" }[mode];
      o.style.opacity = "0";
    }
  }));
  setTimeout(() => olds.forEach(o => o.remove()), 1500);
}

export function setCard(card, html) {
  if (card.dataset.html === html) return;
  card.dataset.html = html;
  card.classList.add("swap");
  setTimeout(() => {
    card.innerHTML = html;
    card.classList.remove("swap");
  }, card.innerHTML ? 220 : 0);
}

export const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
