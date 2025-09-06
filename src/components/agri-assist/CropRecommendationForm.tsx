'use client';

import type { Control } from 'react-hook-form';
import { useEffect, type Dispatch, type SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { handleCropRecommendation } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import type { GenerateCropRecommendationsOutput, SuggestOptimalFertilizerOutput } from '@/ai/flows/generate-crop-recommendations';
import type { SoilData } from './Dashboard';
import { CropRecommendationSchema } from '@/lib/schemas';
import { Loader2, Thermometer, CloudDrizzle, Droplets, FlaskConical, Waves } from 'lucide-react';
import { cn } from '@/lib/utils';

type FormData = z.infer<typeof CropRecommendationSchema>;

const SliderField = ({
  control,
  name,
  label,
  icon: Icon,
  min,
  max,
  step,
  unit,
}: {
  control: Control<FormData>;
  name: keyof FormData;
  label: string;
  icon: React.ElementType;
  min: number;
  max: number;
  step: number;
  unit?: string;
}) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <div className="flex items-center justify-between">
          <FormLabel className="flex items-center gap-2 text-sm font-medium">
            <Icon className="h-4 w-4 text-muted-foreground" />
            {label}
          </FormLabel>
          <span className="text-sm font-semibold text-primary">
            {field.value.toFixed(name === 'ph' ? 1 : 0)} {unit}
          </span>
        </div>
        <FormControl>
          <Slider
            onValueChange={(value) => field.onChange(value[0])}
            value={[field.value]}
            min={min}
            max={max}
            step={step}
            className="py-2"
          />
        </FormControl>
      </FormItem>
    )}
  />
);

export default function CropRecommendationForm({
  setIsLoading,
  setResult,
  setSoilDataForChart,
  setFertilizerResult,
}: {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setResult: Dispatch<SetStateAction<GenerateCropRecommendationsOutput | null>>;
  setSoilDataForChart: Dispatch<SetStateAction<SoilData>>;
  setFertilizerResult: Dispatch<SetStateAction<SuggestOptimalFertilizerOutput | null>>;
}) {
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(CropRecommendationSchema),
    defaultValues: {
      nitrogen: 50,
      phosphorus: 50,
      potassium: 50,
      ph: 6.5,
      moisture: 60,
      temperature: 25,
      rainfall: 100,
      humidity: 65,
    },
  });

  const watchedData = form.watch();

  useEffect(() => {
    setSoilDataForChart({
      nitrogen: watchedData.nitrogen,
      phosphorus: watchedData.phosphorus,
      potassium: watchedData.potassium,
    });
  }, [watchedData.nitrogen, watchedData.phosphorus, watchedData.potassium, setSoilDataForChart]);

  async function onSubmit(data: FormData) {
    setIsLoading(true);
    setResult(null);
    setFertilizerResult(null);
    const { data: result, error } = await handleCropRecommendation(data);
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
        description: 'Crop recommendations have been generated.',
        className: 'bg-primary text-primary-foreground'
      });
    }
  }

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Crop Recommendation</CardTitle>
        <CardDescription>Enter soil and climate data to find the best crops for your land.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <div className="font-bold text-primary col-span-full">Soil Conditions</div>
              <SliderField control={form.control} name="nitrogen" label="Nitrogen" icon={() => <span className="font-bold">N</span>} min={0} max={140} step={1} unit="ppm" />
              <SliderField control={form.control} name="phosphorus" label="Phosphorus" icon={() => <span className="font-bold">P</span>} min={5} max={145} step={1} unit="ppm" />
              <SliderField control={form.control} name="potassium" label="Potassium" icon={() => <span className="font-bold">K</span>} min={5} max={205} step={1} unit="ppm" />
              <SliderField control={form.control} name="ph" label="pH Level" icon={FlaskConical} min={3.5} max={9.9} step={0.1} />
              <SliderField control={form.control} name="moisture" label="Moisture" icon={Droplets} min={10} max={100} step={1} unit="%" />
            </div>

            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <div className="font-bold text-primary col-span-full">Climate Conditions</div>
              <SliderField control={form.control} name="temperature" label="Temperature" icon={Thermometer} min={8} max={44} step={0.5} unit="°C" />
              <SliderField control={form.control} name="rainfall" label="Rainfall" icon={CloudDrizzle} min={20} max={299} step={1} unit="mm" />
              <SliderField control={form.control} name="humidity" label="Humidity" icon={Waves} min={14} max={100} step={1} unit="%" />
            </div>
            
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Get Crop Recommendation'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
