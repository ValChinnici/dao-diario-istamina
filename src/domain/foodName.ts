import type { FoodItem, Lang } from '../types'

export function foodName(food: FoodItem, lang: Lang): string {
  if (lang === 'en' && food.nome_en.trim()) return food.nome_en
  return food.nome_it
}

export function foodNote(food: FoodItem, lang: Lang): string {
  if (lang === 'en' && food.note_en.trim()) return food.note_en
  return food.note_it
}
