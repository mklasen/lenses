// Every generated image in the project. `gen.mjs` creates whatever is missing.
// kind: "t2i"  → text-to-image (fal-ai/flux-pro/v1.1-ultra)
//       "edit" → image edit of `from` (fal-ai/nano-banana/edit) — keeps composition consistent

const STYLE = "photorealistic, natural colour, cinematic 35mm photograph, soft light, high detail";
const KEEP = "Keep the exact same camera position, framing, composition and layout of the scene.";

export const scenes = {
  square: `Wide eye-level photograph of a lively European town square on a crisp autumn morning: a round stone fountain, plane trees with yellow leaves, café terraces, a cyclist, a mother pushing a stroller, two colleagues chatting with coffee cups, an elderly man feeding pigeons on a bench, a delivery van at the edge. Standing alone in the centre foreground, slightly left of centre, is one person in a bright mustard-yellow coat, standing still and looking down at their phone. ${STYLE}`,
  office: `Wide eye-level photograph of a bright open-plan office in late afternoon, tall windows overlooking a city skyline; colleagues working at desks, a meeting happening inside a glass room, plants, a coffee corner where two people talk, a cleaner with a cart in the background. In the centre foreground one person in a mustard-yellow sweater sits at a desk, leaning toward their laptop, intensely focused. ${STYLE}`,
  shore: `Wide eye-level photograph of a seaside promenade at golden hour: joggers, a family with an ice cream, an old fisherman on the pier, kids flying a kite, gulls, a container ship on the horizon, dunes and a lighthouse. In the centre foreground one person in a mustard-yellow jacket walks a small dog along the promenade, looking at the sea. ${STYLE}`,
};

export const variants = {
  past: `Show this exact same place as it would have looked about 100 years ago, in the 1920s: period-appropriate people, clothing, vehicles, technology and buildings. The person in the centre foreground is still there in the same pose, now wearing a period mustard-yellow coat. ${KEEP} Natural colour photograph.`,
  future: `Show this exact same place as it might look 100 years from now: adapted to a hotter climate, far more greenery and shade, unfamiliar quiet technology, some things recognisable and some not. The person in the centre foreground is still there in the same pose and mustard-yellow clothing. ${KEEP} Photorealistic.`,
  deep: `Show this exact same location 10,000 years from now, long after humans are gone: wild nature has completely reclaimed it, only faint moss-covered traces of ruins remain, wildlife roams. No people at all. ${KEEP} Photorealistic, quiet, serene.`,
  threat: `Re-imagine this exact scene as seen through the eyes of someone who feels anxious and threatened: heavy dark overcast light, harsh long shadows, every stranger looks suspicious or hostile, faces hard and turned, hazards and cracks prominent, cold desaturated colours. Same people in the same positions. ${KEEP} Photorealistic.`,
  wonder: `Re-imagine this exact scene as seen through the eyes of someone full of awe and gratitude: warm luminous golden light, people smiling and connecting, small details glowing — leaves, birds, reflections, faces. Same people in the same positions. ${KEEP} Photorealistic, not cartoonish.`,
  aerial: `A high aerial drone photograph of this exact place seen from about 400 metres up, looking down at an angle: the place is now a small part of the much larger surrounding town or city, streets, rooftops and landscape stretching to the horizon. Photorealistic.`,
};

export const shared = {
  "scope-city": `Aerial photograph of a large European city at blue hour from airplane altitude: thousands of lights, a river, bridges, highways and suburbs stretching to the horizon. ${STYLE}`,
  "scope-country": `Photograph from the International Space Station of Western Europe at night: glittering city lights connected by roads, dark coastlines and sea, thin glowing atmosphere on the curved horizon. Photorealistic NASA style.`,
  "scope-world": `The whole planet Earth seen from deep space, centred: blue oceans, white clouds, half in daylight and half in night with city lights, a thin fragile atmosphere, black space around it. Photorealistic NASA style.`,
  "scope-universe": `A deep field image of the universe: thousands of distant galaxies of every shape and colour scattered across black space, some spiral, some elliptical. Photorealistic Hubble/James Webb deep field style.`,
  room: `Wide eye-level photograph taken from the open doorway of a cosy family living room on a rainy evening. Exactly these characters, clearly visible: (1) a BABY about 8 months old in a white onesie sitting on a colourful play mat on the floor in the middle of the room, (2) a white-haired GRANDMOTHER about 75 years old in a green cardigan sitting in an armchair on the right reading a newspaper, (3) a FATHER on the sofa on the left with a laptop, (4) a 6-year-old GIRL kneeling at the low coffee table drawing with crayons, (5) a golden retriever DOG lying on the rug near the baby, (6) a ginger CAT sitting on the windowsill against rain-streaked glass. Also: a TV on the wall showing the evening news, a round wall clock, a birthday cake with unlit candles on a dining table in the back. Warm lamp light. ${STYLE}`
};

const POV = "Using this room as the reference for every person, animal, object, the decor and the rainy-evening warm lamp light, create a NEW photograph taken from a completely different camera position:";
const POV_END = "Same rainy evening, same warm lamp light, rain on the window. Photorealistic, wide-angle.";
export const room = {
  baby: `${POV} the point of view of the baby sitting on the play mat. The camera is on the floor at the baby's eye height (40 cm), where the baby sits, looking toward the window. The baby itself is not visible except its two small hands reaching into the bottom of the frame. The dining table and chairs tower overhead, the birthday cake candles glow high above, the golden retriever is a huge furry shape very close on the left, the man's big shoes and legs are on the right. ${POV_END}`,
  mum: `${POV} the point of view of the dark-haired woman sitting in the armchair on the left. Camera at her seated eye height; her own hands holding papers (bills) are visible in the lower foreground. She looks across the room at the baby on the play mat, the dog, the man on the sofa, and the wall clock. ${POV_END}`,
  grandpa: `${POV} the point of view of the older bald man sitting on the sofa on the right. Camera at his seated eye height; his own hands holding a crossword and a pen are in the lower foreground. He looks across the room to the left at the baby on the mat, the dog, the woman in the armchair and the TV showing the news. ${POV_END}`,
  dog: `${POV} the point of view of the golden retriever lying on the rug. Camera on the floor at 30 cm, the tip of the dog's own golden snout and paws visible at the bottom of the frame. The baby on the mat is right in front, close and big; the people are mostly legs and shoes; a dropped biscuit and crumbs are close in the foreground. ${POV_END}`,
  cat: `${POV} the point of view of the white cat sitting on the windowsill. Camera high at the window, looking down and back into the room toward the open doorway; the cat's own white paws are visible at the bottom edge on the sill. Below: the baby on the play mat, the dog on the rug, the woman in the armchair, the man on the sofa, the TV; the birthday cake candles very close in the foreground. ${POV_END}`,
  fly: `Show this exact same living room from the viewpoint of a fly on the ceiling: camera directly overhead looking straight down at the whole room: the colourful play mat with the baby, the dog on the rug, the woman in the armchair, the man on the sofa, the small table with the birthday cake. It is the exact same room with the same people, animals, furniture and objects, only the camera position changes. Photorealistic.`,
};

export function jobs() {
  const out = [];
  for (const [id, prompt] of Object.entries(scenes)) {
    out.push({ out: `scenes/${id}/base.jpg`, kind: "t2i", prompt });
    for (const [v, p] of Object.entries(variants))
      out.push({ out: `scenes/${id}/${v}.jpg`, kind: "edit", from: `scenes/${id}/base.jpg`, prompt: p });
  }
  for (const [id, prompt] of Object.entries(shared))
    out.push({ out: id === "room" ? `room/you.jpg` : `scope/${id.replace("scope-", "")}.jpg`, kind: "t2i", prompt });
  for (const [id, prompt] of Object.entries(room))
    out.push({ out: `room/${id}.jpg`, kind: "edit", model: id === "fly" ? undefined : "fal-ai/nano-banana-pro/edit", from: `room/you.jpg`, prompt });
  return out;
}
