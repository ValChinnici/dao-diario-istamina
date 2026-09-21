import type { FoodItem } from '../types'

/**
 * Stub for a future paid vision API (e.g. for unlabeled dish photos, where OCR/fuzzy matching
 * against the SIGHI list doesn't apply). Wire this up to a provider once an API key is available;
 * nothing here is called unless the user explicitly enables it in the UI.
 *
 * TODO: implement once an API key is configured. Suggested shape:
 *   1. Send the photo to the vision provider with a prompt asking it to list visible ingredients.
 *   2. Run the returned ingredient names through `matchOcrText`-style fuzzy matching against
 *      `foods` to map them back to SIGHI entries (never trust free-text scores from the provider).
 *   3. Surface results the same way OCR matches are surfaced: as a proposal, never auto-logged.
 */
export async function analyzeDishPhotoWithAI(_imageFile: File): Promise<FoodItem[]> {
  throw new Error('AI vision analysis is not configured. Add a provider API key to enable this feature.')
}

export const AI_VISION_ENABLED = false
