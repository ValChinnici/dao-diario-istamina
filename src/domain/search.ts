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
