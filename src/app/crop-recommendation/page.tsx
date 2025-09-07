
'use client';

import { useState } from 'react';
import AppLayout from '@/components/smart-farming/AppLayout';
import CropRecommendationForm from '@/components/smart-farming/CropRecommendationForm';
import ResultsDisplay from '@/components/smart-farming/ResultsDisplay';
import NutrientChart from '@/components/smart-farming/NutrientChart';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { GenerateCropRecommendationsOutput } from '@/ai/flows/generate-crop-recommendations';
import type { SuggestOptimalFertilizerOutput } from '@/ai/flows/suggest-optimal-fertilizer';

export type SoilData = {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
};

export default function CropRecommendationPage() {
  const [cropResult, setCropResult] = useState<GenerateCropRecommendationsOutput | null>(null);
  const [isLoadingCrop, setIsLoadingCrop] = useState(false);
  const [soilData, setSoilData] = useState<SoilData>({ nitrogen: 50, phosphorus: 50, potassium: 50 });
  const [fertilizerResult, setFertilizerResult] = useState<SuggestOptimalFertilizerOutput | null>(null);

  return (
    <AppLayout>
      <div className="grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <CropRecommendationForm 
            setIsLoading={setIsLoadingCrop} 
            setResult={setCropResult}
            setSoilDataForChart={setSoilData}
            setFertilizerResult={setFertilizerResult}
          />
        </div>
        
        <div className="lg:col-span-3 flex flex-col gap-8">
          <ResultsDisplay
            cropResult={cropResult}
            fertilizerResult={null} 
            isLoadingCrop={isLoadingCrop}
            isLoadingFertilizer={false}
          />
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Soil Nutrient Balance</CardTitle>
              <CardDescription>
                Live visualization of the primary soil nutrients from the form above.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <NutrientChart data={soilData} />
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
