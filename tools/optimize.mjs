#!/usr/bin/env node
// Normalise every generated image to 1600x900 JPEG (cover crop) so variants overlay exactly.
// Originals are kept (git-ignored) under ../originals/ for re-editing.
import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";
const here = path.dirname(new URL(import.meta.url).pathname);
const ASSETS = path.resolve(here, "../site/assets"), ORIG = path.resolve(here, "../originals");
async function* walk(d) { for (const e of await fs.readdir(d, { withFileTypes: true })) {
  const p = path.join(d, e.name); if (e.isDirectory()) yield* walk(p); else if (p.endsWith(".jpg")) yield p; } }
for await (const f of walk(ASSETS)) {
  const meta = await sharp(f).metadata();
  if (meta.width === 1600 && meta.height === 900) continue;
  const o = path.join(ORIG, path.relative(ASSETS, f));
  await fs.mkdir(path.dirname(o), { recursive: true });
  await fs.copyFile(f, o);
  const buf = await sharp(o).resize(1600, 900, { fit: "cover" }).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
  await fs.writeFile(f, buf);
  console.log(`${path.relative(ASSETS, f)}  ${meta.width}x${meta.height} → 1600x900 ${(buf.length/1024)|0}KB`);
}
