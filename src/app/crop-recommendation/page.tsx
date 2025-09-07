
'use client';

import React from 'react';
import AppLayout from '@/components/smart-farming/AppLayout';
import CropRecommendationForm from '@/components/smart-farming/CropRecommendationForm';
import ResultsDisplay from '@/components/smart-farming/ResultsDisplay';
import NutrientChart from '@/components/smart-farming/NutrientChart';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function CropRecommendationPage() {
  return (
    <AppLayout>
      {({ soilData, setSoilData, cropResult, setCropResult, fertilizerResult, setFertilizerResult, isLoadingCrop, setIsLoadingCrop, isLoadingFertilizer, setIsLoadingFertilizer }) => (
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
      )}
    </AppLayout>
  );
}
