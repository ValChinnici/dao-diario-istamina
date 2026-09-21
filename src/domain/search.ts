import Fuse from 'fuse.js'
import { foods } from '../data/foods'
import type { FoodItem } from '../types'

export const foodFuse = new Fuse<FoodItem>(foods, {
  keys: [
    { name: 'nome_it', weight: 2 },
    { name: 'nome_en', weight: 2 },
    { name: 'categoria', weight: 0.5 },
  ],
  threshold: 0.35,
  ignoreLocation: true,
  minMatchCharLength: 2,
})

export function searchFoods(query: string, limit = 30): FoodItem[] {
  const trimmed = query.trim()
  if (!trimmed) return []
  return foodFuse
    .search(trimmed)
    .slice(0, limit)
    .map((r) => r.item)
}

/** Looser than `foodFuse`: OCR text from real photos is noisy (glare, curved packaging, small
 * print), so a fragment that's genuinely an ingredient name often scores worse than typed input.
 * `includeScore` is required here: `ocrMatch.ts` filters on `result.score`, which is otherwise
 * left undefined by Fuse and would silently reject every match regardless of quality. */
export const foodFuseLoose = new Fuse<FoodItem>(foods, {
  keys: [
    { name: 'nome_it', weight: 2 },
    { name: 'nome_en', weight: 2 },
    { name: 'categoria', weight: 0.5 },
  ],
  threshold: 0.5,
  ignoreLocation: true,
  minMatchCharLength: 3,
  includeScore: true,
})
