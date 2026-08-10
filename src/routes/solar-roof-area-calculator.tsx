import { createFileRoute } from '@tanstack/react-router';
import { CalculatorLayout } from '@/components/calculator/CalculatorLayout';
import { useState } from 'react';
import { getCalculatorBySlug } from '@/calculators/helpers';
import { RoofCalculator } from '@/components/calculator/RoofCalculator';
import { RoofAreaResults } from '@/lib/calculations/roof';
import { CalculationBreakdown } from '@/components/calculator/CalculationBreakdown';
import { AlertCircle } from 'lucide-react';

export const Route = createFileRoute('/solar-roof-area-calculator')({
  component: SolarRoofAreaCalculator,
});

function SolarRoofAreaCalculator() {
  const calc = getCalculatorBySlug('/solar-roof-area-calculator');
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
            <div className="p-8 bg-slate-900 rounded-3xl text-white text-center">
              <p className="text-slate-400 font-medium mb-2 text-sm uppercase tracking-wider">Estimated Roof Area</p>
              <h3 className="text-5xl font-black mb-2">{results.estimatedTotalAreaSqFt} sq ft</h3>
              <p className="text-slate-500 text-sm">≈ {results.estimatedTotalAreaSqM} sq m</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="p-4 bg-white border rounded-2xl">
                  <p className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Panel-Only Area</p>
                  <p className="text-lg font-bold">{results.panelOnlyAreaSqFt} sq ft</p>
               </div>
               <div className="p-4 bg-white border rounded-2xl">
                  <p className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Array Size</p>
                  <p className="text-lg font-bold">{results.arrayWidthFt}' x {results.arrayHeightFt}'</p>
               </div>
            </div>

            {results.isSpaceSufficient === false && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                <div>
                  <p className="text-sm font-bold text-red-900">Insufficient Space</p>
                  <p className="text-xs text-red-800">Your available roof area is {Math.abs(results.areaDifferenceSqFt || 0)} sq ft too small for this configuration.</p>
                </div>
              </div>
            )}

            <CalculationBreakdown 
              steps={[
                {
                  label: "Individual Panel Area",
                  formula: `${results.inputs.panelWidthIn}" × ${results.inputs.panelHeightIn}" / 144`,
                  result: `${(results.panelOnlyAreaSqFt / results.inputs.panelCount).toFixed(2)} sq ft`
                },
                {
                  label: "Total Required Area",
                  formula: `Panel Area × Panels (${results.inputs.panelCount}) × Spacing (${results.inputs.spacingFactor})`,
                  result: `${results.estimatedTotalAreaSqFt} sq ft`
                }
              ]}
            />
          </div>
        )
      }
    />
  );
}
