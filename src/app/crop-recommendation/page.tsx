
'use client';

import type { Dispatch, SetStateAction } from 'react';
import AppLayout from '@/components/smart-farming/AppLayout';
import CropRecommendationForm from '@/components/smart-farming/CropRecommendationForm';
import ResultsDisplay from '@/components/smart-farming/ResultsDisplay';
import NutrientChart from '@/components/smart-farming/NutrientChart';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { GenerateCropRecommendationsOutput } from '@/ai/flows/generate-crop-recommendations';
import type { SuggestOptimalFertilizerOutput } from '@/ai/flows/suggest-optimal-fertilizer';
import type { SoilData } from '@/components/smart-farming/AppLayout';


interface CropRecommendationPageProps {
  cropResult: GenerateCropRecommendationsOutput | null;
  setCropResult: Dispatch<SetStateAction<GenerateCropRecommendationsOutput | null>>;
  fertilizerResult: SuggestOptimalFertilizerOutput | null;
  setFertilizerResult: Dispatch<SetStateAction<SuggestOptimalFertilizerOutput | null>>;
  soilData: SoilData;
  setSoilData: Dispatch<SetStateAction<SoilData>>;
  isLoadingCrop: boolean;
  setIsLoadingCrop: Dispatch<SetStateAction<boolean>>;
  isLoadingFertilizer: boolean;
}


export default function CropRecommendationPage({
  cropResult,
  setCropResult,
  setFertilizerResult,
  soilData,
  setSoilData,
  isLoadingCrop,
  setIsLoadingCrop,
}: CropRecommendationPageProps) {

  return (
      <div className="grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <CropRecommendationForm 
            setIsLoading={setIsLoadingCrop} 
            setResult={setCropResult}
            setSoilDataForChart={setSoilData}
            setFertilizerResult={setFertilizerResult}
            initialSoilData={soilData}
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
  );
}
