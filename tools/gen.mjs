#!/usr/bin/env node
// Generate missing images with fal.ai.
//   FAL_KEY=… node tools/gen.mjs [filter] [--force]
// Writes to site/assets/<out>. Edits wait for their source image first.
import { jobs } from "./manifest.mjs";
import fs from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../site/assets");
const KEY = process.env.FAL_KEY;
if (!KEY) { console.error("FAL_KEY not set"); process.exit(1); }
const filter = process.argv.slice(2).find(a => !a.startsWith("--")) || "";
const force = process.argv.includes("--force");

const exists = p => fs.access(p).then(() => true, () => false);

async function fal(model, body) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    const r = await fetch(`https://fal.run/${model}`, {
      method: "POST",
      headers: { Authorization: `Key ${KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const j = await r.json().catch(() => ({}));
    const url = j?.images?.[0]?.url;
    if (r.ok && url) return url;
    console.warn(`  ${model} attempt ${attempt} failed: ${r.status} ${JSON.stringify(j).slice(0, 200)}`);
  }
  throw new Error(`fal ${model} failed`);
}

const done = new Map();
async function run(job) {
  const dest = path.join(ROOT, job.out);
  if (!force && await exists(dest)) return;
  let url;
  if (job.kind === "t2i") {
    url = await fal("fal-ai/flux-pro/v1.1-ultra", {
      prompt: job.prompt, aspect_ratio: "16:9", output_format: "jpeg", safety_tolerance: "2",
    });
  } else {
    if (done.has(job.from)) await done.get(job.from);
    const src = await fs.readFile(path.join(ROOT, job.from));
    url = await fal(job.model || "fal-ai/nano-banana/edit", {
      prompt: job.prompt, image_urls: [`data:image/jpeg;base64,${src.toString("base64")}`],
      output_format: "jpeg", aspect_ratio: "16:9",
    });
  }
  const img = Buffer.from(await (await fetch(url)).arrayBuffer());
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await fs.writeFile(dest, img);
  console.log(`✓ ${job.out} (${(img.length / 1024) | 0} KB)`);
}

const list = jobs().filter(j => j.out.includes(filter));
// t2i first (sources), then edits; small concurrency pool
const queue = [...list.filter(j => j.kind === "t2i"), ...list.filter(j => j.kind !== "t2i")];
let failed = 0;
async function worker() {
  while (queue.length) {
    const job = queue.shift();
    const p = run(job).catch(e => { failed++; console.error(`✗ ${job.out}: ${e.message}`); });
    done.set(job.out, p);
    await p;
  }
}
await Promise.all(Array.from({ length: 4 }, worker));
console.log(failed ? `${failed} failed` : "all done");
