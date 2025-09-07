
'use client';

import React from 'react';
import AppLayout from '@/components/smart-farming/AppLayout';
import FertilizerSuggestionForm from '@/components/smart-farming/FertilizerSuggestionForm';
import ResultsDisplay from '@/components/smart-farming/ResultsDisplay';
import { useAppContext } from '@/context/AppContext';

function FertilizerSuggestionContent() {
  const { soilData, cropResult, fertilizerResult, setFertilizerResult, isLoadingFertilizer, setIsLoadingFertilizer } = useAppContext();
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

export default function FertilizerSuggestionPage() {
  return (
    <AppLayout>
      <FertilizerSuggestionContent />
    </AppLayout>
  );
}
