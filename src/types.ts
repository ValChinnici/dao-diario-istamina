export type Lang = 'it' | 'en'

export type IstaminaScore = 0 | 1 | 2 | 3 | null

export interface FoodItem {
  id: string
  nome_it: string
  nome_en: string
  categoria: string
  sottocategoria: string | null
  punteggio_istamina: IstaminaScore
  punteggio_incerto?: boolean
  ricco_istamina: 'H' | 'H!' | null
  altre_ammine: boolean
  liberatore: boolean
  bloccante: boolean
  note_it: string
  note_en: string
}

export const SYMPTOM_KEYS = [
  'mal_di_testa',
  'prurito',
  'orticaria',
  'gonfiore',
  'nausea',
  'tachicardia',
  'altro',
] as const

export type SymptomKey = (typeof SYMPTOM_KEYS)[number]

export interface SymptomEntry {
  key: SymptomKey
  intensita: 1 | 2 | 3
  nota?: string
}

export const PRESERVATION_KEYS = ['fresh', 'reheated', 'canned', 'aged', 'defrosted'] as const

export type PreservationType = (typeof PRESERVATION_KEYS)[number]

export interface MealIngredient {
  foodId: string
  nome_it: string
  nome_en: string
  punteggio_istamina: IstaminaScore
  preservation?: PreservationType
}

export interface MealLogEntry {
  id?: number
  timestamp: number
  ingredienti: MealIngredient[]
  punteggio_massimo: IstaminaScore
  daosin_preso: boolean
  sintomi: SymptomEntry[]
}
