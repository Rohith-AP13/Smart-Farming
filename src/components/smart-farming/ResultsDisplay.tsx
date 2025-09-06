import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Leaf } from 'lucide-react';
import type { GenerateCropRecommendationsOutput } from '@/ai/flows/generate-crop-recommendations';
import type { SuggestOptimalFertilizerOutput } from '@/ai/flows/suggest-optimal-fertilizer';
import { Separator } from '../ui/separator';

const ResultSkeleton = () => (
  <div className="space-y-3">
    <Skeleton className="h-5 w-2/5" />
    <Skeleton className="h-4 w-4/5" />
    <Skeleton className="h-4 w-3/5" />
  </div>
);

const NoResults = ({ title, message }: { title: string, message: string }) => (
  <div className="text-center py-8">
    <p className="font-semibold">{title}</p>
    <p className="text-sm text-muted-foreground">{message}</p>
  </div>
);

export default function ResultsDisplay({
  cropResult,
  fertilizerResult,
  isLoadingCrop,
  isLoadingFertilizer,
}: {
  cropResult: GenerateCropRecommendationsOutput | null;
  fertilizerResult: SuggestOptimalFertilizerOutput | null;
  isLoadingCrop: boolean;
  isLoadingFertilizer: boolean;
}) {
  const recommendedCrops = cropResult?.crops.split(',').map(c => c.trim()).filter(Boolean) || [];

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Recommendations</CardTitle>
        <CardDescription>AI-powered suggestions based on your input will appear here.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="mb-2 font-semibold text-primary flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5" />
            Recommended Crops
          </h3>
          {isLoadingCrop ? (
            <ResultSkeleton />
          ) : cropResult ? (
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                {recommendedCrops.map(crop => (
                  <Badge key={crop} variant="secondary" className="text-base px-3 py-1 bg-primary/10 text-primary border-primary/20">
                    {crop}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-muted-foreground pt-2">
                <strong>Reasoning:</strong> {cropResult.reasoning}
              </p>
            </div>
          ) : (
            <NoResults title="No Crop Recommendations Yet" message="Fill out the form to get started." />
          )}
        </div>

        <Separator />

        <div>
          <h3 className="mb-2 font-semibold text-primary flex items-center gap-2">
            <Leaf className="h-5 w-5" />
            Fertilizer Suggestions
          </h3>
          {isLoadingFertilizer ? (
            <ResultSkeleton />
          ) : fertilizerResult ? (
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1 h-5 w-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">N</div>
                <div>
                  <span className="font-medium">Nitrogen:</span> {fertilizerResult.nitrogenSuggestion}
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1 h-5 w-5 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-xs">P</div>
                <div>
                  <span className="font-medium">Phosphorus:</span> {fertilizerResult.phosphorusSuggestion}
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1 h-5 w-5 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-xs">K</div>
                <div>
                  <span className="font-medium">Potassium:</span> {fertilizerResult.potassiumSuggestion}
                </div>
              </li>
            </ul>
          ) : (
            <NoResults title="No Fertilizer Suggestions Yet" message="Select a crop to see suggestions." />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
