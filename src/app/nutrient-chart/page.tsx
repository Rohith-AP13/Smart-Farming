
'use client';

import type { Dispatch, SetStateAction } from 'react';
import NutrientChart from '@/components/smart-farming/NutrientChart';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import type { SoilData } from '@/components/smart-farming/AppLayout';

interface NutrientChartPageProps {
    soilData: SoilData;
    setSoilData: Dispatch<SetStateAction<SoilData>>;
}

export default function NutrientChartPage({ soilData, setSoilData }: NutrientChartPageProps) {

  const handleSliderChange = (nutrient: keyof SoilData, value: number) => {
    const newData = {...soilData, [nutrient]: value};
    setSoilData(newData);
  }

  return (
      <div className="grid gap-8 lg:grid-cols-2">
        <Card className="shadow-sm">
            <CardHeader>
                <CardTitle>Soil Nutrient Balance</CardTitle>
                <CardDescription>
                Adjust the sliders to see a live visualization of the primary soil nutrients. This data is shared across the app.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between mb-2">
                            <Label htmlFor="nitrogen">Nitrogen (ppm)</Label>
                            <span className="text-primary font-semibold">{soilData.nitrogen}</span>
                        </div>
                        <Slider id="nitrogen" value={[soilData.nitrogen]} onValueChange={(v) => handleSliderChange('nitrogen', v[0])} max={140} step={1} />
                    </div>
                     <div>
                        <div className="flex justify-between mb-2">
                            <Label htmlFor="phosphorus">Phosphorus (ppm)</Label>
                             <span className="text-primary font-semibold">{soilData.phosphorus}</span>
                        </div>
                        <Slider id="phosphorus" value={[soilData.phosphorus]} onValueChange={(v) => handleSliderChange('phosphorus', v[0])} min={5} max={145} step={1} />
                    </div>
                     <div>
                        <div className="flex justify-between mb-2">
                            <Label htmlFor="potassium">Potassium (ppm)</Label>
                             <span className="text-primary font-semibold">{soilData.potassium}</span>
                        </div>
                        <Slider id="potassium" value={[soilData.potassium]} onValueChange={(v) => handleSliderChange('potassium', v[0])} min={5} max={205} step={1} />
                    </div>
                </div>
            </CardContent>
        </Card>
        <Card className="shadow-sm">
            <CardHeader>
                <CardTitle>Nutrient Visualization</CardTitle>
                 <CardDescription>
                    This chart reflects the values you set on the left.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <NutrientChart data={soilData} />
            </CardContent>
        </Card>
      </div>
  );
}
