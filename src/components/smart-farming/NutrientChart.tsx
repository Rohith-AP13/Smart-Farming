
'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, LabelList } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from '@/components/ui/chart';

export type SoilData = {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
};


const chartConfig = {
  value: {
    label: 'Value',
  },
  nitrogen: {
    label: 'Nitrogen',
    color: 'hsl(var(--chart-1))',
  },
  phosphorus: {
    label: 'Phosphorus',
    color: 'hsl(var(--chart-2))',
  },
  potassium: {
    label: 'Potassium',
    color: 'hsl(var(--accent))',
  },
} satisfies ChartConfig;

export default function NutrientChart({ data }: { data: SoilData }) {
  const chartData = [
    { nutrient: 'Nitrogen', value: data.nitrogen, fill: 'var(--color-nitrogen)' },
    { nutrient: 'Phosphorus', value: data.phosphorus, fill: 'var(--color-phosphorus)' },
    { nutrient: 'Potassium', value: data.potassium, fill: 'var(--color-potassium)' },
  ];

  return (
    <div className="h-[250px] w-full">
      <ChartContainer config={chartConfig}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart accessibilityLayer data={chartData} margin={{ left: -20 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="nutrient"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Bar dataKey="value" radius={8}>
               <LabelList dataKey="value" position="top" offset={8} className="fill-foreground text-sm" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}
