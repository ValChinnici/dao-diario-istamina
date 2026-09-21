import { foodFuseLoose } from './search'
import type { FoodItem } from '../types'

/** Label boilerplate that isn't itself an ingredient, so it's dropped before matching rather than
 * left to coincidentally fuzzy-match some unrelated database entry. */
const LABEL_STOPWORDS = new Set([
  'ingredienti',
  'ingredients',
  'allergeni',
  'allergens',
  'puo contenere',
  'può contenere',
  'conservare',
  'scadenza',
  'lotto',
  'valori nutrizionali',
  'nutrition facts',
  'peso netto',
  'net weight',
])

/**
 * Splits OCR'd ingredient-list text into candidate fragments (comma/semicolon/newline/parenthesis
 * separated, as ingredient lists on labels usually are) and fuzzy-matches each fragment against
 * the SIGHI database. Uses a looser match than the search bar: real photos (glare, curved
 * packaging, small print) produce noisier text than someone typing a food name.
 */
export function matchOcrText(text: string): FoodItem[] {
  const fragments = text
    .split(/[\n,;.()%:]+/)
    .map((f) => f.trim())
    .filter((f) => f.length >= 3 && /[a-zA-ZàèéìòùÀÈÉÌÒÙ]/.test(f))
    .filter((f) => !LABEL_STOPWORDS.has(f.toLowerCase()))

  const matched = new Map<string, FoodItem>()

  for (const fragment of fragments) {
    const results = foodFuseLoose.search(fragment, { limit: 1 })
    const best = results[0]
    if (best && best.score !== undefined && best.score <= 0.45) {
      matched.set(best.item.id, best.item)
    }
  }

  return Array.from(matched.values())
}
