import { foodFuse } from './search'
import type { FoodItem } from '../types'

/**
 * Splits OCR'd ingredient-list text into candidate fragments (comma/semicolon/newline/parenthesis
 * separated, as ingredient lists on labels usually are) and fuzzy-matches each fragment against
 * the SIGHI database. Short/noisy fragments are dropped before matching to cut false positives.
 */
export function matchOcrText(text: string): FoodItem[] {
  const fragments = text
    .split(/[\n,;.()%:]+/)
    .map((f) => f.trim())
    .filter((f) => f.length >= 3 && /[a-zA-ZàèéìòùÀÈÉÌÒÙ]/.test(f))

  const matched = new Map<string, FoodItem>()

  for (const fragment of fragments) {
    const results = foodFuse.search(fragment, { limit: 1 })
    const best = results[0]
    if (best && best.score !== undefined && best.score <= 0.3) {
      matched.set(best.item.id, best.item)
    }
  }

  return Array.from(matched.values())
}
