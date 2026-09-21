import raw from './sighi-foods.json'
import type { FoodItem } from '../types'

export const foods = raw as unknown as FoodItem[]

export const foodsById = new Map(foods.map((f) => [f.id, f]))

export const categories = Array.from(new Set(foods.map((f) => f.categoria))).sort()

/** A meal's score is the max score among its ingredients. null/incerto counts as lower priority than a known 2 or 3. */
export function mealMaxScore(scores: (0 | 1 | 2 | 3 | null)[]): 0 | 1 | 2 | 3 | null {
  const known = scores.filter((s): s is 0 | 1 | 2 | 3 => s !== null)
  if (known.length === 0) return scores.length > 0 ? null : 0
  return known.reduce((max, s) => (s > max ? s : max), 0 as 0 | 1 | 2 | 3)
}

/** Daosin rule: needed if ANY ingredient scores 2 or 3. */
export function needsDaosin(scores: (0 | 1 | 2 | 3 | null)[]): boolean {
  return scores.some((s) => s === 2 || s === 3)
}
