
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf, Droplets, FlaskConical } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="space-y-8">
       <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight font-headline text-primary">Welcome to Smart-Farming Dashboard</h2>
            <p className="text-muted-foreground mt-2">
              Use the menu to navigate to the different features.
            </p>
        </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">
              Crop Recommendation
            </h3>
            <Leaf className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Get AI Advice</div>
            <p className="text-xs text-muted-foreground">
              Find the best crops for your soil and climate.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">
              Fertilizer Suggestion
            </h3>
            <Droplets className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Optimize Nutrients</div>
            <p className="text-xs text-muted-foreground">
              Receive custom fertilizer recommendations.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">Nutrient Analysis</h3>
            <FlaskConical className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Visualize Data</div>
            <p className="text-xs text-muted-foreground">
              See your soil nutrient balance in a chart.
            </p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
            <CardTitle>How to Use This App</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <div>
                <h3 className="font-semibold">1. Crop Recommendation Page</h3>
                <p className="text-sm text-muted-foreground">Navigate to the "Crop Recommendation" page from the sidebar. Use the sliders to input your soil's nutrient levels (Nitrogen, Phosphorus, Potassium), pH, moisture, and local climate conditions (temperature, rainfall, humidity). Click "Get Crop Recommendation" to see a list of suitable crops and the AI's reasoning.</p>
            </div>
            <div>
                <h3 className="font-semibold">2. Fertilizer Suggestion Page</h3>
                <p className="text-sm text-muted-foreground">Once you have crop recommendations, go to the "Fertilizer Suggestion" page. The soil data from the previous step will be pre-filled. Select one of the recommended crops from the dropdown menu and click "Get Fertilizer Suggestion" to receive tailored advice on the best fertilizers to use.</p>
            </div>
            <div>
                <h3 className="font-semibold">3. Nutrient Chart</h3>
                <p className="text-sm text-muted-foreground">On the "Crop Recommendation" page, you'll find a live chart visualizing the Nitrogen, Phosphorus, and Potassium levels as you adjust the sliders. This helps you see your soil's nutrient balance at a glance.</p>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
