import { createFileRoute } from '@tanstack/react-router';
import { CalculatorLayout } from '@/components/calculator/CalculatorLayout';
import { useState } from 'react';
import { getCalculatorBySlug } from '@/calculators/helpers';
import { RoofCalculator } from '@/components/calculator/RoofCalculator';
import { RoofAreaResults } from '@/lib/calculations/roof';

export const Route = createFileRoute('/solar-panel-space-calculator')({
  component: SolarPanelSpaceCalculator,
});

function SolarPanelSpaceCalculator() {
  const calc = getCalculatorBySlug('/solar-panel-space-calculator');
  const [results, setResults] = useState<(RoofAreaResults & { inputs: any }) | null>(null);

  if (!calc) return null;

  return (
    <CalculatorLayout
      title={calc.name}
      description={calc.seoDescription || calc.shortDescription}
      currentId={calc.id}
      faq={calc.faq}
      calculator={
        <RoofCalculator onResultsChange={setResults} />
      }
      results={
        results && (
          <div className="space-y-6">
            <div className="p-6 bg-white border-2 border-slate-100 rounded-3xl shadow-sm">
               <h3 className="font-bold text-lg mb-4">Array Footprint</h3>
               <div className="flex items-center justify-center p-8 bg-slate-50 rounded-2xl border-dashed border-2 border-slate-200 mb-6">
                  <div className="text-center">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">Dimensions</p>
                    <p className="text-4xl font-black text-slate-900">{results.arrayWidthFt} ft <span className="text-slate-400">×</span> {results.arrayHeightFt} ft</p>
                  </div>
               </div>
               
               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground uppercase">Total Footprint</p>
                    <p className="text-xl font-bold">{results.estimatedTotalAreaSqFt} sq ft</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground uppercase">Orientation</p>
                    <p className="text-xl font-bold capitalize">{results.inputs.orientation}</p>
                  </div>
               </div>
            </div>
          </div>
        )
      }
    />
  );
}
