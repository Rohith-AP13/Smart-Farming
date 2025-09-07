
'use client';

import { useState, useEffect } from 'react';
import AppLayout from '@/components/smart-farming/AppLayout';
import FertilizerSuggestionForm from '@/components/smart-farming/FertilizerSuggestionForm';
import ResultsDisplay from '@/components/smart-farming/ResultsDisplay';
import type { GenerateCropRecommendationsOutput } from '@/ai/flows/generate-crop-recommendations';
import type { SuggestOptimalFertilizerOutput } from '@/ai/flows/suggest-optimal-fertilizer';

export type SoilData = {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
};

export default function FertilizerSuggestionPage() {
  const [fertilizerResult, setFertilizerResult] = useState<SuggestOptimalFertilizerOutput | null>(null);
  const [isLoadingFertilizer, setIsLoadingFertilizer] = useState(false);
  
  // In a real app, this would come from a shared state or props
  const [recommendedCrops, setRecommendedCrops] = useState<string[]>([]);
  const [initialSoilData, setInitialSoilData] = useState<SoilData>({ nitrogen: 50, phosphorus: 50, potassium: 50 });

  useEffect(() => {
    // This is a placeholder. In a real application, you'd fetch this data
    // or pass it from the crop recommendation page, perhaps via query params or a global state manager.
    const storedCropResult = localStorage.getItem('cropResult');
    if (storedCropResult) {
        const parsedResult: GenerateCropRecommendationsOutput = JSON.parse(storedCropResult);
        setRecommendedCrops(parsedResult.crops.split(',').map(c => c.trim()).filter(Boolean));
    }
     const storedSoilData = localStorage.getItem('soilData');
     if (storedSoilData) {
        setInitialSoilData(JSON.parse(storedSoilData));
     }
  }, []);


  return (
    <AppLayout>
      <div className="grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <FertilizerSuggestionForm 
            setIsLoading={setIsLoadingFertilizer}
            setResult={setFertilizerResult}
            recommendedCrops={recommendedCrops}
            initialSoilData={initialSoilData}
          />
        </div>
        
        <div className="lg:col-span-3">
          <ResultsDisplay
            cropResult={null}
            fertilizerResult={fertilizerResult}
            isLoadingCrop={false}
            isLoadingFertilizer={isLoadingFertilizer}
          />
        </div>
      </div>
    </AppLayout>
  );
}
