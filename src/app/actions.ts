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
import { z } from 'zod';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function handleLogin(prevState: any, formData: FormData) {
  const validatedFields = loginSchema.safeParse(Object.fromEntries(formData));

  if (!validatedFields.success) {
    return {
      error: 'Invalid email or password.',
    };
  }

  const { email, password } = validatedFields.data;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    return { success: true };
  } catch (error: any) {
    return {
      error: 'Login failed. Please check your credentials.',
    };
  }
}

export async function handleSignup(prevState: any, formData: FormData) {
  const validatedFields = signupSchema.safeParse(Object.fromEntries(formData));

  if (!validatedFields.success) {
    return {
      error: 'Invalid email or password. Password must be at least 6 characters.',
    };
  }

  const { email, password } = validatedFields.data;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    return { success: true };
  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      return {
        error: 'This email is already in use.',
      };
    }
    return {
      error: 'Signup failed. Please try again.',
    };
  }
}

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
