import { setImage, setCard, preload, esc, textToggle, centerActive } from "./stage.js";

// perceive: how much raw sensory detail they take in · interpret: how much human meaning they can read
const P = [
  {
    id: "you", glyph: "◧", name: "You", sub: "Adult, in the doorway", perceive: 50, interpret: 90,
    kicker: "Your view · adult",
    title: "You don't see the room. You read it.",
    body: "Half a second in the doorway and you know: it's Grandpa's birthday, the bills are out, the news is bad again, the baby should be in bed soon. That reading is so fast you mistake it for seeing.",
    q: "How much of what you 'see' is actually what you know?",
    m: { cake: "Grandpa's 75th — someone should light the candles.", clock: "Nearly seven. Baby's bedtime is close.", tv: "Another crisis abroad. Prices up again.", rain: "Glad we're inside.", baby: "Rubbing her eyes — tired.", others: "Everyone's here, each in their own world." },
  },
  {
    id: "baby", glyph: "◔", name: "The baby", sub: "Eight months, on the floor", perceive: 60, interpret: 12,
    kicker: "Perspective · baby, 8 months",
    title: "Everything is new. Nothing is boring.",
    body: "The world is enormous and mostly up. Faces are the best thing in it, especially the ones that come back. She is only just learning that things still exist when they're out of sight. Nothing here has a name yet — so nothing is filtered out.",
    q: "When did you last look at something without already knowing what it was?",
    m: { cake: "Tiny suns, high up. Want.", clock: "Not there. Clocks don't exist yet.", tv: "Moving colours and a voice that isn't anyone's.", rain: "A soft hiss. Nice.", baby: "— (that's me, but I don't know that yet)", others: "Faces! A warm breathing hill (the dog)." },
  },
  {
    id: "mum", glyph: "◑", name: "Mum", sub: "In the armchair, with the bills", perceive: 45, interpret: 95,
    kicker: "Perspective · adult, same room",
    title: "Knowing more means carrying more.",
    body: "Same knowledge as you, different weight. The clock isn't decoration: it says forty minutes to bedtime. The news is about interest rates, which is about the mortgage, which is the paper in her hands. The more you understand, the more of the room is consequences.",
    q: "Is knowing more always seeing more — or sometimes just carrying more?",
    m: { cake: "Candles, plates, who cuts it — and who cleans up.", clock: "Forty minutes to bedtime. Then the dishes.", tv: "Interest rates → mortgage → these bills.", rain: "Did I close the car window?", baby: "Overtired. Will be cranky.", others: "Has anyone walked the dog?" },
  },
  {
    id: "grandpa", glyph: "◕", name: "Grandpa", sub: "75 today, on the sofa", perceive: 40, interpret: 100,
    kicker: "Perspective · adult, 75 years of data",
    title: "He has seen this evening before.",
    body: "From the floor, from the armchair, and now from here. He knows the baby will be doing bills in that armchair one day; that the anchors change but the news mostly doesn't. Older eyes let in less light — the lens yellows with age. Older minds fill in more.",
    q: "What would you notice if you'd lived this evening seventy times?",
    m: { cake: "Seventy-five. Fewer chairs at the table than there used to be.", clock: "Ticks faster every year.", tv: "Same news, new faces.", rain: "She loved evenings like this.", baby: "Won't remember any of this. That's all right.", others: "The fourth dog he's known in this house." },
  },
  {
    id: "dog", glyph: "◒", name: "The dog", sub: "On the rug, nose first", perceive: 92, interpret: 22,
    kicker: "Perspective · dog",
    title: "A room made of smells.",
    body: "Colours collapse to blues and yellows and the edges are softer — but the nose reads everything: butter in the cake, wet earth through the window seal, worry coming off the armchair. The clock means nothing, yet the dog knows dinner is due, to the minute.",
    q: "What's right in front of you that you can't sense at all?",
    m: { cake: "Butter. Sugar. Forbidden.", clock: "Means nothing. Dinner is in nine minutes.", tv: "Noise.", rain: "Wet earth, worms — another dog passed at four.", baby: "Milk, crumbs, a friend who drops things.", others: "Pack. Stress-smell from the armchair." },
  },
  {
    id: "cat", glyph: "◓", name: "The cat", sub: "On the windowsill", perceive: 82, interpret: 8,
    kicker: "Perspective · cat",
    title: "High ground. Everything in view.",
    body: "In this dim lamp light the cat sees far better than anyone in the room — softer, in fewer colours, with a wider field of view. The TV flickers for her. The birthday is a row of small flames: fascinating, not to be touched. The baby is unpredictable — best watched from up here.",
    q: "Who in your life is quietly watching from the windowsill?",
    m: { cake: "Little flames. Watch. Don't touch.", clock: "Tick. Ignore.", tv: "A flickering box.", rain: "Birds will be hiding.", baby: "Loud, sticky, unpredictable.", others: "The dog: tolerated." },
  },
  {
    id: "fly", glyph: "⬡", name: "A fly", sub: "On the ceiling", perceive: 55, interpret: 1,
    kicker: "Perspective · housefly",
    title: "No birthday. No news. Just sugar.",
    body: "Thousands of tiny lenses make one blurry mosaic — but a fast one. A fly takes in several times more 'frames' per second than you: the people move as if wading through honey, and the lamps and TV flicker. There is no mortgage here. There is sugar, warmth, and big slow hands.",
    q: "If everything human-made meant nothing — what would be left in this room?",
    m: { cake: "SUGAR.", clock: "—", tv: "A strobe light.", rain: "Cold. Stay in.", baby: "Warm. Slow. Sticky.", others: "Huge slow shapes. Avoid the hands." },
  },
];
const ROWS = [["cake", "The cake"], ["clock", "The clock"], ["tv", "The news"], ["rain", "The rain"], ["baby", "The baby"], ["others", "Everyone else"]];

const $ = s => document.querySelector(s);
const stage = $("#stage"), layers = $("#layers"), card = $("#card"), list = $("#plist"), meaning = $("#meaning"), eyes = $("#eyes");
let cur = null;

list.innerHTML = P.map((p, i) => `
  <li><button class="lens" data-id="${p.id}" aria-pressed="false">
    <span class="glyph">${p.glyph}</span>
    <span><strong>${esc(p.name)}</strong><em>${esc(p.sub)}</em></span>
    <kbd>${i + 1}</kbd>
  </button></li>`).join("");
meaning.innerHTML = ROWS.map(([k, label]) => `<div class="obj"><dt>${label}</dt><dd data-k="${k}"></dd></div>`).join("");

list.addEventListener("click", e => { const b = e.target.closest(".lens"); if (b) go(b.dataset.id); });
eyes.addEventListener("change", () => stage.classList.toggle("raw", !eyes.checked));
document.addEventListener("keydown", e => {
  const i = +e.key - 1;
  if (P[i]) go(P[i].id);
  if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
    const j = P.findIndex(p => p.id === cur) + (e.key === "ArrowRight" ? 1 : -1);
    if (P[j]) go(P[j].id);
  }
  if (e.key === "e") { eyes.checked = !eyes.checked; eyes.dispatchEvent(new Event("change")); }
});

function go(id) {
  const p = P.find(p => p.id === id);
  const first = cur === null;
  cur = id;
  setImage(layers, `assets/room/${id}.jpg`, { mode: first ? "fade" : "swoop", cls: `p-${id}` });
  $("#fx-mosaic").classList.toggle("on", id === "fly");
  setCard(card, `
    <div class="kicker">${esc(p.kicker)}</div>
    <h2>${esc(p.title)}</h2>
    <p>${esc(p.body)}</p>
    <div class="meters">
      <div class="meter">Perceives <i><b style="--v:${p.perceive}%;--c:#8fb8de"></b></i></div>
      <div class="meter">Interprets <i><b style="--v:${p.interpret}%;--c:var(--accent)"></b></i></div>
    </div>
    <p class="q">${esc(p.q)}</p>`);
  meaning.classList.add("swap");
  setTimeout(() => {
    for (const dd of meaning.querySelectorAll("dd")) dd.textContent = p.m[dd.dataset.k];
    meaning.classList.remove("swap");
  }, first ? 0 : 300);
  $("#mname").textContent = p.id === "you" ? "you" : p.name.replace(/^The /, "the ").replace(/^A /, "a ");
  for (const b of list.querySelectorAll(".lens")) b.setAttribute("aria-pressed", b.dataset.id === id);
  centerActive(list);
}

P.forEach(p => preload(`assets/room/${p.id}.jpg`));
go("you");
textToggle(stage);
