import React, { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { CalculatorLayout } from '@/components/calculator/CalculatorLayout';
import { LoadCalculator, LoadBreakdown } from '@/components/calculator/LoadCalculator';
import { useServerFn } from '@tanstack/react-start';
import { calculateHomeLoadSolar } from '@/lib/calculations/load.functions';
import { ResultsDisplay } from '@/components/ResultsDisplay';
import { getCalculatorById } from '@/calculators/helpers';
import { Card, CardContent } from '@/components/ui/card';

export const Route = createFileRoute('/home-load-solar-calculator')({
  component: HomeLoadSolarCalculatorPage,
  head: () => {
    const calc = getCalculatorById('home-load-solar-calculator');
    return {
      title: calc?.seoTitle || 'Home Load Solar Calculator',
      meta: [{ name: 'description', content: calc?.seoDescription || '' }],
    };
  }
});

function HomeLoadSolarCalculatorPage() {
  const [results, setResults] = useState<any>(null);
  const calculateFn = useServerFn(calculateHomeLoadSolar);

  const handleLoadChange = async (data: any) => {
    const res = await calculateFn({ data: {
      appliances: data.appliances.map((a: any) => ({
        name: a.name, quantity: a.quantity, wattage: a.wattage, hoursPerDay: a.hoursPerDay, daysPerMonth: a.daysPerMonth, standbyWatts: a.standbyWatts
      })),
      solarInputs: { peakSunHours: 5, performanceRatio: 0.75, targetOffset: 100, panelWattage: 400 }
    }});
    setResults(res);
  };

  const calc = getCalculatorById('home-load-solar-calculator');
  if (!calc) return null;

  return (
    <CalculatorLayout
      currentId={calc.id}
      title={calc.name}
      description={calc.shortDescription}
      calculator={<LoadCalculator onLoadChange={handleLoadChange} />}
      results={results && (
        <div className="space-y-8 animate-in fade-in duration-500">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card><CardContent className="pt-4 text-center">
              <div className="text-sm text-muted-foreground">Running Load</div>
              <div className="text-2xl font-bold">{results.load.totalRunningWatts} W</div>
            </CardContent></Card>
            <Card><CardContent className="pt-4 text-center">
              <div className="text-sm text-muted-foreground">Daily Energy</div>
              <div className="text-2xl font-bold">{results.load.dailyEnergyKWh} kWh</div>
            </CardContent></Card>
            <Card><CardContent className="pt-4 text-center">
              <div className="text-sm text-muted-foreground">Monthly Energy</div>
              <div className="text-2xl font-bold">{results.load.monthlyEnergyKWh} kWh</div>
            </CardContent></Card>
            <Card><CardContent className="pt-4 text-center">
              <div className="text-sm text-muted-foreground">Est. Solar Size</div>
              <div className="text-2xl font-bold text-solar">{results.solar.requiredSystemSizeKW} kW</div>
            </CardContent></Card>
          </div>
          <LoadBreakdown data={results.load.breakdown} />
        </div>
      )}
      faq={calc.faq}
    />
  );
}
