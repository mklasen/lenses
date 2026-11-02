// Content for the Lens Viewer. Text values may be a string or { default, square, office, shore }.
export const SCENES = [
  { id: "square", name: "Town square", you: [49.5, 67], r: [4.6, 20] },
  { id: "office", name: "Office",      you: [50.5, 62], r: [9, 19] },
  { id: "shore",  name: "Promenade",   you: [48.5, 66], r: [5.2, 21] },
];

// kind: "image" → swaps the picture (only one active at a time)
//       "effect" → an overlay on top (stackable)
// stops: a dial; each stop can set an image and/or an effect class.
export const LENSES = [
  {
    id: "scope", glyph: "◎", key: "1", kind: "image", name: "Circle of concern",
    sub: "From only-me to the universe", start: 0,
    stops: [
      {
        label: "Me", fx: "scope0", kicker: "Circle of concern · 1 / 8",
        title: "Only my own skin.",
        body: {
          square: "The square shrinks to the size of your phone. Is the coffee still warm, am I late, did they reply? The fountain, the leaves, a hundred lives crossing — all scenery.",
          office: "Your inbox, your deadline, your review. The colleague two desks away is a sound, not a person. The skyline is wallpaper.",
          shore: "Cold hands, step count, a dog pulling on the lead. The sea is just the big thing on your right.",
        },
        q: "When did you last notice something that had nothing to do with you?",
      },
      {
        label: "My people", fx: "scope1", kicker: "Circle of concern · 2 / 8",
        title: "The ones whose names I know.",
        body: {
          square: "The circle widens to the people you'd call if something happened. Nobody in this square is on that list — so they stay blurred. Strangers are background by default.",
          office: "Now your team comes into focus: who's stressed, who covered for you last week. The rest of the floor is still furniture.",
          shore: "Your dog, the friend you're texting, the family waiting at home. The jogger who just passed is still a moving shape.",
        },
        q: "Who decided where your circle ends?",
      },
      {
        label: "This place", kicker: "Circle of concern · 3 / 8",
        title: "Everyone here, sharing one moment.",
        body: {
          square: "The old man feeds the pigeons every morning. The cyclist is late for a shift. The van driver has forty more stops. None of them is background to themselves.",
          office: "The cleaner has a second job tonight. The meeting in the glass room is about whether three people keep theirs. Everyone is the main character of a different film.",
          shore: "A kid's first kite. A fisherman who has stood on that pier for thirty years. A ship's crew that hasn't been home in months.",
        },
        q: "Who here is the main character of their own story?",
      },
      {
        label: "Town", img: "aerial", kicker: "Circle of concern · 4 / 8",
        title: "You disappear. Patterns appear.",
        body: "From 400 metres up you can't see a single face — but you can see where the trees are, where the traffic goes, who lives near the green and who doesn't. Decisions about your street are made at this height.",
        q: "What would you change here if you knew you'd live here fifty more years?",
      },
      {
        label: "City", img: "@city", kicker: "Circle of concern · 5 / 8",
        title: "A million lit windows.",
        body: "Each light is a kitchen, a night shift, an argument, a birth. Your problem today is real — and it is one of a million happening at this exact moment.",
        q: "Whose ordinary evening is someone else's hardest day?",
      },
      {
        label: "Country", img: "@country", kicker: "Circle of concern · 6 / 8",
        title: "Lines you can't see from here.",
        body: "Borders are invisible from orbit, yet they decide who may go where. Laws, languages, elections, prices — much of what shaped your morning was decided at this scale.",
        q: "Which of your 'personal' problems is actually a shared one?",
      },
      {
        label: "World", img: "@world", kicker: "Circle of concern · 7 / 8",
        title: "One thin blue layer of air.",
        body: "Eight billion people, half of them asleep on the night side. No countries, just weather and oceans. Every 'us' and every 'them' you have ever heard of is inside this circle.",
        q: "If 'us' meant everyone in this picture — what would change?",
      },
      {
        label: "Universe", img: "@universe", kicker: "Circle of concern · 8 / 8",
        title: "Two trillion galaxies.",
        body: "Earth isn't visible here; it's a speck inside a speck. Some people feel small at this scale. Others feel calm: your mistake, your inbox, your argument — all cosmically forgivable. And the people near you suddenly rare.",
        q: "Does it make your worries smaller — or the people around you more precious?",
      },
    ],
  },
  {
    id: "time", glyph: "⧗", key: "2", kind: "image", name: "Time horizon",
    sub: "This moment, or this century?", start: 2,
    stops: [
      {
        label: "100 years ago", img: "past", kicker: "Time horizon · 1925",
        title: "They also thought it was 'now'.",
        body: {
          default: "Everyone in this picture is long gone. Their urgent worries — the rent, the gossip, the news of the day — are footnotes. They too stood exactly here, certain that this was the present.",
          office: "Typewriters, carbon paper, ledgers. The same office politics, the same Monday feeling. Every one of those deadlines passed and the world kept turning.",
        },
        q: "Which of today's worries will be a footnote?",
      },
      {
        label: "Now", kicker: "Time horizon · now",
        title: "One frame of a very long film.",
        body: "This moment feels like all of reality. It's one frame. Everything here — the trees, the buildings, the habits — was made by people who are gone, for people who aren't born yet.",
        q: "What here was built for you by someone you'll never meet?",
      },
      {
        label: "In 100 years", img: "future", kicker: "Time horizon · 2125",
        title: "Someone else wakes up here.",
        body: "None of the people in this picture will be alive. The trees planted today will be. Whatever we pave, plant, protect or neglect this year is the place someone else will call home.",
        q: "What are you building that someone will inherit?",
      },
      {
        label: "In 10,000 years", img: "deep", kicker: "Time horizon · year 12,000",
        title: "The moss is patient.",
        body: "This place belongs to the deer and the gulls again. On this clock a human life is a heartbeat — which can make it feel meaningless, or astonishingly precious. Your pick.",
        q: "What is worth doing with a heartbeat?",
      },
    ],
  },
  {
    id: "threat", glyph: "◐", key: "3", kind: "image", img: "threat", name: "Threat",
    sub: "The world as danger",
    kicker: "Lens · threat",
    title: "Everything is a risk.",
    body: "Same people, same place, same second. But your nervous system has decided there's danger, so it scans for it: a glance becomes intent, a stranger becomes a suspect, every crack glows. Nothing in the world changed. Your filter did.",
    q: "What did you see first when you looked at this picture today?",
  },
  {
    id: "wonder", glyph: "✶", key: "4", kind: "image", img: "wonder", name: "Wonder",
    sub: "The world as a gift",
    kicker: "Lens · wonder",
    title: "Everything is a gift.",
    body: "Same people, same place, same second. Now the light catches the leaves, faces soften, small rituals look like kindness. Awe adds nothing to the scene — it just stops filtering things out.",
    q: "What was here all along that you hadn't noticed?",
  },
  {
    id: "tunnel", glyph: "◉", key: "5", kind: "effect", fx: "tunnel", name: "Tunnel vision",
    sub: "You stop seeing the trees",
    kicker: "Lens · tunnel vision",
    title: "You stop seeing the trees.",
    body: "Fixed on one goal — the deadline, the argument, the notification — attention narrows to a spotlight. What's outside doesn't fade; it stops existing. Move your cursor: you only see where you look.",
    q: "What has been sitting in your periphery lately?",
  },
  {
    id: "bubble", glyph: "○", key: "6", kind: "effect", fx: "bubble", name: "One-metre bubble",
    sub: "Only what's within arm's reach",
    kicker: "Lens · one-metre bubble",
    title: "The world is one metre wide.",
    body: "Your phone, your coffee, your own feet. Everything beyond arm's reach is fog — not unknown, just unconsidered. On a busy day, most of us live here.",
    q: "What's just outside your metre?",
  },
  {
    id: "self", glyph: "●", key: "7", kind: "effect", fx: "self", name: "Only me",
    sub: "Everyone else is an extra",
    kicker: "Lens · only me",
    title: "I'm the only one in colour.",
    body: "Everyone else becomes an extra in your film — grey, interchangeable, either in the way or useful. Here's the twist: every one of them is wearing the same lens, with themselves in colour.",
    q: "In whose film are you an extra today?",
  },
  {
    id: "hurry", glyph: "⟿", key: "8", kind: "effect", fx: "hurry", name: "In a hurry",
    sub: "Late, and everything is in the way",
    kicker: "Lens · hurry",
    title: "Everything is in the way.",
    body: "When you're late, the world smears into obstacles. People are delays, a red light feels personal, beauty is a waste of seconds. The only sharp thing left is the clock.",
    q: "What did you rush past this week that deserved a second?",
  },
];

export const NAKED = {
  kicker: "No lens",
  title: "The naked eye.",
  body: "This is the scene with no lens on. Except — there's no such thing. You always look through something: your mood, your plans, your knowledge of how the world works. Pick a lens and watch the same place become a different world.",
  q: "Which lens were you wearing when you opened this page?",
};
