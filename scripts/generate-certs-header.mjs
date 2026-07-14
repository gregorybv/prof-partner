import sharp from "sharp";
import { fileURLToPath } from "url";
import path from "path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "public/prof-p/certs-header.png");

const WIDTH = 820;
const HEIGHT = 400;

async function certSlice(src, targetWidth, rotateDeg) {
  const resized = await sharp(path.join(root, src))
    .resize({
      width: targetWidth,
      height: Math.round(targetWidth * 1.35),
      fit: "cover",
      position: "top",
    })
    .png()
    .toBuffer();

  if (!rotateDeg) return resized;

  return sharp(resized)
    .rotate(rotateDeg, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .trim()
    .toBuffer();
}

const left = await certSlice("public/prof-p/cert-3.jpg", 220, -10);
const center = await certSlice("public/prof-p/cert-2.jpg", 250, 0);
const right = await certSlice("public/prof-p/cert-alfa.jpg", 220, 10);

const leftMeta = await sharp(left).metadata();
const centerMeta = await sharp(center).metadata();
const rightMeta = await sharp(right).metadata();

await sharp({
  create: {
    width: WIDTH,
    height: HEIGHT,
    channels: 4,
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  },
})
  .composite([
    {
      input: left,
      left: Math.round(WIDTH * 0.04),
      top: Math.round((HEIGHT - (leftMeta.height ?? 0)) / 2),
    },
    {
      input: center,
      left: Math.round((WIDTH - (centerMeta.width ?? 0)) / 2),
      top: Math.round((HEIGHT - (centerMeta.height ?? 0)) / 2),
    },
    {
      input: right,
      left: Math.round(WIDTH * 0.96 - (rightMeta.width ?? 0)),
      top: Math.round((HEIGHT - (rightMeta.height ?? 0)) / 2),
    },
  ])
  .png({ compressionLevel: 9 })
  .toFile(out);

console.log(`Wrote ${out}`);
