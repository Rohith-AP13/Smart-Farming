
'use client';

import { useEffect, type Dispatch, type SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { handleFertilizerSuggestion } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import type { SuggestOptimalFertilizerOutput } from '@/ai/flows/suggest-optimal-fertilizer';
import { FertilizerSuggestionSchema } from '@/lib/schemas';
import { Loader2 } from 'lucide-react';
import type { SoilData } from '@/components/smart-farming/AppLayout';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type FormData = z.infer<typeof FertilizerSuggestionSchema>;

export default function FertilizerSuggestionForm({
  setIsLoading,
  setResult,
  recommendedCrops,
  initialSoilData,
}: {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setResult: Dispatch<SetStateAction<SuggestOptimalFertilizerOutput | null>>;
  recommendedCrops: string[];
  initialSoilData: SoilData;
}) {
  const { toast } = useToast();
  const form = useForm<FormData>({
    resolver: zodResolver(FertilizerSuggestionSchema),
    defaultValues: {
      nitrogen: initialSoilData.nitrogen,
      phosphorus: initialSoilData.phosphorus,
      potassium: initialSoilData.potassium,
      cropType: '',
    },
  });

  useEffect(() => {
    form.reset({
      ...initialSoilData,
      cropType: recommendedCrops.includes(form.getValues('cropType')) ? form.getValues('cropType') : ''
    });
  }, [initialSoilData, form, recommendedCrops]);

  async function onSubmit(data: FormData) {
    setIsLoading(true);
    setResult(null);
    const { data: result, error } = await handleFertilizerSuggestion(data);
    setIsLoading(false);

    if (error || !result) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error || 'An unknown error occurred.',
      });
    } else {
      setResult(result);
      toast({
        title: 'Success!',
        description: 'Fertilizer suggestions are ready.',
        className: 'bg-primary text-primary-foreground'
      });
    }
  }

  const isFormDisabled = recommendedCrops.length === 0;

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Fertilizer Suggestion</CardTitle>
        <CardDescription>Select a crop to receive fertilizer recommendations based on your soil data.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="cropType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Crop</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value} disabled={isFormDisabled}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="First, get a crop recommendation" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {recommendedCrops.map((crop) => (
                        <SelectItem key={crop} value={crop}>
                          {crop}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isFormDisabled || form.formState.isSubmitting}>
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                'Get Fertilizer Suggestion'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
