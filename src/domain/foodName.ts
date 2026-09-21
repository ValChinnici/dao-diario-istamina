import type { FoodItem, Lang } from '../types'

export function foodName(food: FoodItem, lang: Lang): string {
  if (lang === 'en' && food.nome_en.trim()) return food.nome_en
  return food.nome_it
}
