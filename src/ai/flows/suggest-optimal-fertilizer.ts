'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting optimal fertilizer based on soil nutrient levels and the selected crop type.
 *
 * - suggestOptimalFertilizer - A function that takes soil nutrient levels and crop type as input and returns fertilizer suggestions.
 * - SuggestOptimalFertilizerInput - The input type for the suggestOptimalFertilizer function.
 * - SuggestOptimalFertilizerOutput - The return type for the suggestOptimalFertilizer function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestOptimalFertilizerInputSchema = z.object({
  nitrogen: z.number().describe('Nitrogen level in the soil (ppm)').min(0),
  phosphorus: z.number().describe('Phosphorus level in the soil (ppm)').min(0),
  potassium: z.number().describe('Potassium level in the soil (ppm)').min(0),
  cropType: z.string().describe('The type of crop being grown.'),
});

export type SuggestOptimalFertilizerInput = z.infer<
  typeof SuggestOptimalFertilizerInputSchema
>;

const SuggestOptimalFertilizerOutputSchema = z.object({
  nitrogenSuggestion: z
    .string()
    .describe('Suggestion for nitrogen fertilizer (e.g., type and amount).'),
  phosphorusSuggestion: z
    .string()
    .describe('Suggestion for phosphorus fertilizer (e.g., type and amount).'),
  potassiumSuggestion: z
    .string()
    .describe('Suggestion for potassium fertilizer (e.g., type and amount).'),
});

export type SuggestOptimalFertilizerOutput = z.infer<
  typeof SuggestOptimalFertilizerOutputSchema
>;

export async function suggestOptimalFertilizer(
  input: SuggestOptimalFertilizerInput
): Promise<SuggestOptimalFertilizerOutput> {
  return suggestOptimalFertilizerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestOptimalFertilizerPrompt',
  input: {schema: SuggestOptimalFertilizerInputSchema},
  output: {schema: SuggestOptimalFertilizerOutputSchema},
  prompt: `You are an expert agricultural advisor. Based on the soil nutrient levels and the crop type provided, suggest the optimal type and amount of fertilizer to use.

Soil Nutrient Levels:
- Nitrogen: {{nitrogen}} ppm
- Phosphorus: {{phosphorus}} ppm
- Potassium: {{potassium}} ppm

Crop Type: {{cropType}}

Provide specific recommendations for Nitrogen, Phosphorus, and Potassium fertilizers. Consider providing a few options for fertilizer types.

Suggestions:
- Nitrogen Fertilizer: {{nitrogenSuggestion}}
- Phosphorus Fertilizer: {{phosphorusSuggestion}}
- Potassium Fertilizer: {{potassiumSuggestion}}`,
});

const suggestOptimalFertilizerFlow = ai.defineFlow(
  {
    name: 'suggestOptimalFertilizerFlow',
    inputSchema: SuggestOptimalFertilizerInputSchema,
    outputSchema: SuggestOptimalFertilizerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
