import { z } from 'zod';

export const CropRecommendationSchema = z.object({
  nitrogen: z.number().min(0, "Nitrogen can't be negative.").max(140, 'Nitrogen value is too high.'),
  phosphorus: z.number().min(5, 'Phosphorus value is too low.').max(145, 'Phosphorus value is too high.'),
  potassium: z.number().min(5, 'Potassium value is too low.').max(205, 'Potassium value is too high.'),
  ph: z.number().min(3.5, 'pH value is too low.').max(9.9, 'pH value is too high.'),
  moisture: z.number().min(10, 'Moisture level is too low.').max(100, 'Moisture level cannot exceed 100.'),
  temperature: z.number().min(8, 'Temperature is too low.').max(44, 'Temperature is too high.'),
  rainfall: z.number().min(20, 'Rainfall is too low.').max(299, 'Rainfall is too high.'),
  humidity: z.number().min(14, 'Humidity is too low.').max(100, 'Humidity cannot exceed 100.'),
});

export const FertilizerSuggestionSchema = z.object({
  nitrogen: z.number().min(0).max(140),
  phosphorus: z.number().min(5).max(145),
  potassium: z.number().min(5).max(205),
  cropType: z.string().min(1, { message: 'Please select a crop to get a fertilizer suggestion.' }),
});
