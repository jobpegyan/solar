import React, { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { CalculatorLayout } from '@/components/calculator/CalculatorLayout';
import { getCalculatorById } from '@/calculators/helpers';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useServerFn } from '@tanstack/react-start';
import { calculateACLoadSolar } from '@/lib/calculations/load.functions';
import { ResultsDisplay } from '@/components/ResultsDisplay';

export const Route = createFileRoute('/ac-load-solar-calculator')({
  component: ACLoadSolarCalculatorPage,
  head: () => {
    const calc = getCalculatorById('ac-load-solar-calculator');
    return {
      title: calc?.seoTitle || 'AC Load Solar Calculator',
      meta: [{ name: 'description', content: calc?.seoDescription || '' }],
    };
  }
});

function ACLoadSolarCalculatorPage() {
  const [units, setUnits] = useState(1);
  const [wattage, setWattage] = useState(1500);
  const [hours, setHours] = useState(8);
  const [days, setDays] = useState(30);
  const [results, setResults] = useState<any>(null);
  
  const calculateFn = useServerFn(calculateACLoadSolar);

  React.useEffect(() => {
    const run = async () => {
      const res = await calculateFn({ data: {
        units, wattage, hoursPerDay: hours, daysPerMonth: days,
        solarInputs: { peakSunHours: 5, performanceRatio: 0.75, targetOffset: 100, panelWattage: 400 }
      }});
      setResults(res);
    };
    run();
  }, [units, wattage, hours, days, calculateFn]);

  const calc = getCalculatorById('ac-load-solar-calculator');
  if (!calc) return null;

  return (
    <CalculatorLayout
      currentId={calc.id}
      title={calc.name}
      description={calc.shortDescription}
      calculator={
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>AC Units</Label><Input type="number" value={units} onChange={e => setUnits(Number(e.target.value))} /></div>
            <div className="space-y-2"><Label>Wattage (W)</Label><Input type="number" value={wattage} onChange={e => setWattage(Number(e.target.value))} /></div>
            <div className="space-y-2"><Label>Hours/Day</Label><Input type="number" value={hours} onChange={e => setHours(Number(e.target.value))} /></div>
            <div className="space-y-2"><Label>Days/Month</Label><Input type="number" value={days} onChange={e => setDays(Number(e.target.value))} /></div>
          </div>
        </div>
      }
      results={results && (
        <div className="space-y-8 animate-in fade-in duration-500">
          <ResultsDisplay results={results.solar} />
          <div className="p-4 bg-slate-50 border rounded-lg text-sm text-slate-600">
            Actual AC energy consumption varies with thermostat settings, weather, building insulation, equipment efficiency and operating conditions.
          </div>
        </div>
      )}
      faq={calc.faq}
    />
  );
}
