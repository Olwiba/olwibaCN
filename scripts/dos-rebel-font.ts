import { readFileSync } from 'node:fs'
import { join } from 'node:path'

type ParsedFont = {
  height: number
  glyphs: Map<string, string[]>
}

let parsedFontCache: ParsedFont | null = null
let renderCache = new Map<string, string[]>()

function getFontText(): string {
  return readFileSync(join(import.meta.dir, 'DOS-Rebel.flf'), 'utf-8')
}

function parseDosRebelFont(raw: string): ParsedFont {
  if (parsedFontCache) return parsedFontCache

  const lines = raw.split(/\r?\n/)

  const header = lines[0] ?? ""
  const headerParts = header.split(" ")
  const signature = headerParts[0] ?? "flf2a$"
  const hardblank = signature[5] ?? "$"
  const height = Number.parseInt(headerParts[1] ?? "0", 10)
  const commentLines = Number.parseInt(headerParts[5] ?? "0", 10)

  const glyphs = new Map<string, string[]>()
  let lineIndex = 1 + commentLines
  const firstGlyphLine = lines[lineIndex] ?? "@"
  const endMark = firstGlyphLine[firstGlyphLine.length - 1] ?? "@"
  const stripEndMark = new RegExp(`\\${endMark}+$`)

  for (let code = 32; code <= 126; code += 1) {
    const glyph: string[] = []
    for (let row = 0; row < height; row += 1) {
      const line = lines[lineIndex] ?? ""
      lineIndex += 1
      glyph.push(line.replace(stripEndMark, "").replaceAll(hardblank, " "))
    }
    glyphs.set(String.fromCharCode(code), glyph)
  }

  parsedFontCache = { height, glyphs }
  return parsedFontCache
}

export async function renderDosRebel(text: string): Promise<string[]> {
  const cached = renderCache.get(text)
  if (cached) return cached

  const raw = getFontText()
  const { height, glyphs } = parseDosRebelFont(raw)
  const output = Array.from({ length: height }, () => "")

  for (const char of text) {
    const glyph = glyphs.get(char) ?? glyphs.get("?")
    if (!glyph) {
      for (let row = 0; row < height; row += 1) {
        output[row] += char
      }
      continue
    }
    for (let row = 0; row < height; row += 1) {
      output[row] += glyph[row] ?? ""
    }
  }

  const rendered = output.map((line) => line.replace(/\s+$/g, ""))
  renderCache.set(text, rendered)
  return rendered
}
