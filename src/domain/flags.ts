import type { FoodItem } from '../types'

type FlaggableFood = Pick<FoodItem, 'ricco_istamina' | 'altre_ammine' | 'liberatore' | 'bloccante'>

export function foodFlags(food: FlaggableFood): string[] {
  const flags: string[] = []
  if (food.ricco_istamina) flags.push(food.ricco_istamina)
  if (food.altre_ammine) flags.push('A')
  if (food.liberatore) flags.push('L')
  if (food.bloccante) flags.push('B')
  return flags
}
