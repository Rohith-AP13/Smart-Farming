'use server';

import {
  generateCropRecommendations,
  GenerateCropRecommendationsInput,
  GenerateCropRecommendationsOutput,
} from '@/ai/flows/generate-crop-recommendations';
import {
  suggestOptimalFertilizer,
  SuggestOptimalFertilizerInput,
  SuggestOptimalFertilizerOutput,
} from '@/ai/flows/suggest-optimal-fertilizer';

export async function handleCropRecommendation(
  data: GenerateCropRecommendationsInput
): Promise<{ data: GenerateCropRecommendationsOutput | null; error: string | null }> {
  try {
    const result = await generateCropRecommendations(data);
    return { data: result, error: null };
  } catch (error) {
    console.error('Error in handleCropRecommendation:', error);
    return { data: null, error: 'Failed to generate crop recommendations. The AI model may be unavailable. Please try again later.' };
  }
}

export async function handleFertilizerSuggestion(
  data: SuggestOptimalFertilizerInput
): Promise<{ data: SuggestOptimalFertilizerOutput | null; error: string | null }> {
  try {
    const result = await suggestOptimalFertilizer(data);
    return { data: result, error: null };
  } catch (error) {
    console.error('Error in handleFertilizerSuggestion:', error);
    return { data: null, error: 'Failed to suggest fertilizer. The AI model may be unavailable. Please try again later.' };
  }
}
