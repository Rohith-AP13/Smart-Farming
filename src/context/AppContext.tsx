
'use client';

import React, { createContext, useContext, useState, type ReactNode, type Dispatch, type SetStateAction } from 'react';
import type { GenerateCropRecommendationsOutput } from '@/ai/flows/generate-crop-recommendations';
import type { SuggestOptimalFertilizerOutput } from '@/ai/flows/suggest-optimal-fertilizer';

export type SoilData = {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
};

interface AppContextType {
  cropResult: GenerateCropRecommendationsOutput | null;
  setCropResult: Dispatch<SetStateAction<GenerateCropRecommendationsOutput | null>>;
  fertilizerResult: SuggestOptimalFertilizerOutput | null;
  setFertilizerResult: Dispatch<SetStateAction<SuggestOptimalFertilizerOutput | null>>;
  soilData: SoilData;
  setSoilData: Dispatch<SetStateAction<SoilData>>;
  isLoadingCrop: boolean;
  setIsLoadingCrop: Dispatch<SetStateAction<boolean>>;
  isLoadingFertilizer: boolean;
  setIsLoadingFertilizer: Dispatch<SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [cropResult, setCropResult] = useState<GenerateCropRecommendationsOutput | null>(null);
  const [fertilizerResult, setFertilizerResult] = useState<SuggestOptimalFertilizerOutput | null>(null);
  const [soilData, setSoilData] = useState<SoilData>({ nitrogen: 50, phosphorus: 50, potassium: 50 });
  const [isLoadingCrop, setIsLoadingCrop] = useState(false);
  const [isLoadingFertilizer, setIsLoadingFertilizer] = useState(false);

  const value = {
    cropResult,
    setCropResult,
    fertilizerResult,
    setFertilizerResult,
    soilData,
    setSoilData,
    isLoadingCrop,
    setIsLoadingCrop,
    isLoadingFertilizer,
    setIsLoadingFertilizer,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
