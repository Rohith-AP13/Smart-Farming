
'use client';

import type { Dispatch, SetStateAction } from 'react';
import FertilizerSuggestionForm from '@/components/smart-farming/FertilizerSuggestionForm';
import ResultsDisplay from '@/components/smart-farming/ResultsDisplay';
import type { GenerateCropRecommendationsOutput } from '@/ai/flows/generate-crop-recommendations';
import type { SuggestOptimalFertilizerOutput } from '@/ai/flows/suggest-optimal-fertilizer';
import type { SoilData } from '@/components/smart-farming/AppLayout';

interface FertilizerSuggestionPageProps {
  cropResult: GenerateCropRecommendationsOutput | null;
  fertilizerResult: SuggestOptimalFertilizerOutput | null;
  setFertilizerResult: Dispatch<SetStateAction<SuggestOptimalFertilizerOutput | null>>;
  soilData: SoilData;
  isLoadingFertilizer: boolean;
  setIsLoadingFertilizer: Dispatch<SetStateAction<boolean>>;
}

export default function FertilizerSuggestionPage({
  cropResult,
  fertilizerResult,
  setFertilizerResult,
  soilData,
  isLoadingFertilizer,
  setIsLoadingFertilizer,
}: FertilizerSuggestionPageProps) {
  
  const recommendedCrops = cropResult?.crops.split(',').map(c => c.trim()).filter(Boolean) || [];

  return (
      <div className="grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <FertilizerSuggestionForm 
            setIsLoading={setIsLoadingFertilizer}
            setResult={setFertilizerResult}
            recommendedCrops={recommendedCrops}
            initialSoilData={soilData}
          />
        </div>
        
        <div className="lg:col-span-3">
          <ResultsDisplay
            cropResult={cropResult}
            fertilizerResult={fertilizerResult}
            isLoadingCrop={false}
            isLoadingFertilizer={isLoadingFertilizer}
          />
        </div>
      </div>
  );
}
