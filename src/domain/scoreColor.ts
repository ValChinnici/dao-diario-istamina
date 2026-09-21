import type { IstaminaScore } from '../types'

export interface ScoreColorSet {
  dot: string
  text: string
  bg: string
}

/** Score 0-1 read as "safe" tones, 2-3 as "needs Daosin" tones (matching the Daosin business rule);
 * 2 vs 3 and 0 vs 1 are distinguished by the badge's number + label text, never by color alone. */
export function scoreColors(score: IstaminaScore, incerto?: boolean): ScoreColorSet {
  if (incerto || score === null) {
    return { dot: 'var(--unsure)', text: 'var(--unsure)', bg: 'var(--unsure-soft)' }
  }
  if (score === 0) return { dot: 'var(--safe)', text: 'var(--safe)', bg: 'var(--safe-soft)' }
  if (score === 1) return { dot: 'var(--warn)', text: 'var(--warn)', bg: 'var(--warn-soft)' }
  return { dot: 'var(--high)', text: 'var(--high)', bg: 'var(--high-soft)' }
}
