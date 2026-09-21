import Dexie, { type EntityTable } from 'dexie'
import type { MealLogEntry } from './types'

class DaoDB extends Dexie {
  meals!: EntityTable<MealLogEntry, 'id'>

  constructor() {
    super('dao-diario-istamina')
    this.version(1).stores({
      meals: '++id, timestamp, punteggio_massimo, daosin_preso',
    })
  }
}

export const db = new DaoDB()
