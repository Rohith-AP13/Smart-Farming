'use client';

import { useState } from 'react';
import type { GenerateCropRecommendationsOutput } from '@/ai/flows/generate-crop-recommendations';
import type { SuggestOptimalFertilizerOutput } from '@/ai/flows/suggest-optimal-fertilizer';
import Header from './Header';
import CropRecommendationForm from './CropRecommendationForm';
import FertilizerSuggestionForm from './FertilizerSuggestionForm';
import ResultsDisplay from './ResultsDisplay';
import NutrientChart from './NutrientChart';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export type SoilData = {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
};

export default function Dashboard() {
  const [cropResult, setCropResult] = useState<GenerateCropRecommendationsOutput | null>(null);
  const [fertilizerResult, setFertilizerResult] = useState<SuggestOptimalFertilizerOutput | null>(null);
  const [isLoadingCrop, setIsLoadingCrop] = useState(false);
  const [isLoadingFertilizer, setIsLoadingFertilizer] = useState(false);
  const [soilData, setSoilData] = useState<SoilData>({ nitrogen: 50, phosphorus: 50, potassium: 50 });
  
  const recommendedCrops = cropResult?.crops.split(',').map(c => c.trim()).filter(Boolean) || [];

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1 p-4 md:p-8 lg:p-12">
        <div className="mx-auto grid max-w-7xl gap-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight font-headline text-primary">Welcome to Smart-Farming</h2>
            <p className="text-muted-foreground mt-2">
              Input your farm's data to receive AI-powered recommendations for crops and fertilizers.
            </p>
          </div>
          
          <div className="grid gap-8 lg:grid-cols-5">
            <div className="lg:col-span-2 flex flex-col gap-8">
              <CropRecommendationForm 
                setIsLoading={setIsLoadingCrop} 
                setResult={setCropResult}
                setSoilDataForChart={setSoilData}
                setFertilizerResult={setFertilizerResult}
              />
              <FertilizerSuggestionForm 
                setIsLoading={setIsLoadingFertilizer}
                setResult={setFertilizerResult}
                recommendedCrops={recommendedCrops}
                initialSoilData={soilData}
              />
            </div>
            
            <div className="lg:col-span-3 flex flex-col gap-8">
              <ResultsDisplay
                cropResult={cropResult}
                fertilizerResult={fertilizerResult}
                isLoadingCrop={isLoadingCrop}
                isLoadingFertilizer={isLoadingFertilizer}
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
        </div>
      </main>
    </div>
  );
}
