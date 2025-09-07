
'use client';

import React from 'react';
import AppLayout from '@/components/smart-farming/AppLayout';
import FertilizerSuggestionForm from '@/components/smart-farming/FertilizerSuggestionForm';
import ResultsDisplay from '@/components/smart-farming/ResultsDisplay';

export default function FertilizerSuggestionPage() {
  return (
    <AppLayout>
      {({ soilData, cropResult, fertilizerResult, setFertilizerResult, isLoadingFertilizer, setIsLoadingFertilizer }) => {
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
      }}
    </AppLayout>
  );
}
