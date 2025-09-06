'use server';
/**
 * @fileOverview An AI agent that recommends crops based on soil and environmental data.
 *
 * - generateCropRecommendations - A function that handles the crop recommendation process.
 * - GenerateCropRecommendationsInput - The input type for the generateCropRecommendations function.
 * - GenerateCropRecommendationsOutput - The return type for the generateCropRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCropRecommendationsInputSchema = z.object({
  nitrogen: z.number().describe('Nitrogen level in the soil.'),
  phosphorus: z.number().describe('Phosphorus level in the soil.'),
  potassium: z.number().describe('Potassium level in the soil.'),
  ph: z.number().describe('pH level of the soil.'),
  moisture: z.number().describe('Moisture level in the soil.'),
  temperature: z.number().describe('Temperature in Celsius.'),
  rainfall: z.number().describe('Rainfall in mm.'),
  humidity: z.number().describe('Humidity as a percentage.'),
});
export type GenerateCropRecommendationsInput = z.infer<
  typeof GenerateCropRecommendationsInputSchema
>;

const GenerateCropRecommendationsOutputSchema = z.object({
  crops: z
    .string()
    .describe(
      'A comma-separated list of suitable crops for the given conditions.'
    ),
  reasoning: z
    .string()
    .describe('The reasoning behind the crop recommendations.'),
});
export type GenerateCropRecommendationsOutput = z.infer<
  typeof GenerateCropRecommendationsOutputSchema
>;

export async function generateCropRecommendations(
  input: GenerateCropRecommendationsInput
): Promise<GenerateCropRecommendationsOutput> {
  return generateCropRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCropRecommendationsPrompt',
  input: {schema: GenerateCropRecommendationsInputSchema},
  output: {schema: GenerateCropRecommendationsOutputSchema},
  prompt: `You are an expert agricultural advisor. Based on the provided soil and environmental data, recommend suitable crops for cultivation.

Soil Data:
Nitrogen: {{nitrogen}}
Phosphorus: {{phosphorus}}
Potassium: {{potassium}}
pH: {{ph}}
Moisture: {{moisture}}

Environmental Data:
Temperature: {{temperature}} Celsius
Rainfall: {{rainfall}} mm
Humidity: {{humidity}}%

Consider the following:
- Crops should be suitable for the given soil nutrient levels.
- Crops should be able to tolerate the given pH and moisture levels.
- Crops should thrive in the given temperature, rainfall, and humidity conditions.

Provide the output in a clear and concise manner, including your reasoning for the recommendations.
`,
});

const generateCropRecommendationsFlow = ai.defineFlow(
  {
    name: 'generateCropRecommendationsFlow',
    inputSchema: GenerateCropRecommendationsInputSchema,
    outputSchema: GenerateCropRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
