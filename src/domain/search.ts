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

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * Lower rank = more relevant: exact name, then starts-with, then the query as a whole
 * word, then the query starting a longer word, then a mid-word substring.
 */
function matchRank(name: string, normQuery: string, wholeWordRe: RegExp, wordStartRe: RegExp): number {
  const norm = normalize(name)
  if (norm === normQuery) return 0
  if (norm.startsWith(normQuery)) return 1
  if (wholeWordRe.test(norm)) return 2
  if (wordStartRe.test(norm)) return 3
  return norm.includes(normQuery) ? 4 : 5
}

export function searchFoods(query: string, limit = 30): FoodItem[] {
  const trimmed = query.trim()
  if (!trimmed) return []
  const norm = normalize(trimmed)
  const escaped = escapeRegExp(norm)
  const wholeWordRe = new RegExp(`(^|[^a-z0-9])${escaped}([^a-z0-9]|$)`)
  const wordStartRe = new RegExp(`(^|[^a-z0-9])${escaped}`)

  const matched = foods
    .map((food) => ({
      food,
      rank: Math.min(
        matchRank(food.nome_it, norm, wholeWordRe, wordStartRe),
        matchRank(food.nome_en || '', norm, wholeWordRe, wordStartRe),
      ),
    }))
    .filter((r) => r.rank < 5)

  if (matched.length > 0) {
    return matched
      .sort((a, b) => a.rank - b.rank || a.food.nome_it.length - b.food.nome_it.length || a.food.nome_it.localeCompare(b.food.nome_it))
      .slice(0, limit)
      .map((r) => r.food)
  }

  // Fallback to fuzzy matching for typos when no direct substring match exists.
  return foodFuse
    .search(trimmed)
    .slice(0, limit)
    .map((r) => r.item)
}
