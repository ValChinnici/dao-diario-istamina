import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const SVG_PATH = path.join(ROOT, 'assets/icon-source.svg')
const OUT = path.join(ROOT, 'public/icons')

const BG = '#12151a' // --bg

async function makeIcon(size, { maskable = false, path: outPath }) {
  const pad = maskable ? 0 : Math.round(size * 0.0625)
  const radius = maskable ? 0 : Math.round(size * 0.1875)
  const artSize = Math.round(size * (maskable ? 0.66 : 0.78))

  const bgSvg = `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><rect x="${pad}" y="${pad}" width="${size - 2 * pad}" height="${size - 2 * pad}" rx="${radius}" ry="${radius}" fill="${BG}"/></svg>`
  const bg = await sharp(Buffer.from(bgSvg)).png().toBuffer()
  const art = await sharp(SVG_PATH).resize(artSize, artSize).png().toBuffer()

  await sharp(bg).composite([{ input: art, gravity: 'center' }]).png().toFile(outPath)
}

async function main() {
  await makeIcon(192, { path: `${OUT}/icon-192.png` })
  await makeIcon(512, { path: `${OUT}/icon-512.png` })
  await makeIcon(192, { maskable: true, path: `${OUT}/icon-maskable-192.png` })
  await makeIcon(512, { maskable: true, path: `${OUT}/icon-maskable-512.png` })
  await makeIcon(180, { path: `${OUT}/apple-touch-icon.png` })
  await makeIcon(32, { path: `${OUT}/favicon-32.png` })
  console.log('icons generated from', SVG_PATH)
}

main()
