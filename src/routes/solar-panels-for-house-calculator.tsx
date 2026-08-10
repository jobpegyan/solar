import { createFileRoute } from '@tanstack/react-router';
import { CalculatorLayout } from '@/components/calculator/CalculatorLayout';
import { SharedCalculator } from '@/components/calculator/SharedCalculator';
import { CalculationBreakdown } from '@/components/calculator/CalculationBreakdown';
import { useState } from 'react';
import { SystemResults } from '@/lib/calculations/solar-system';
import { getCalculatorBySlug } from '@/calculators/helpers';

export const Route = createFileRoute('/solar-panels-for-house-calculator')({
  component: SolarPanelsForHouseCalculator,
});

function SolarPanelsForHouseCalculator() {
  const calc = getCalculatorBySlug('/solar-panels-for-house-calculator');
  const [results, setResults] = useState<(SystemResults & { inputs: any }) | null>(null);

  if (!calc) return null;

  return (
    <CalculatorLayout
      title={calc.name}
      description={calc.seoDescription || calc.shortDescription}
      currentId={calc.id}
      faq={calc.faq}
      calculator={
        <SharedCalculator 
          calculatorId={calc.id}
          onResultsChange={setResults}
        />
      }
      results={
        results && (
          <div className="space-y-6">
            <div className="p-8 bg-blue-600 rounded-3xl text-white shadow-xl shadow-blue-100">
               <div className="flex justify-between items-start mb-4">
                  <p className="text-blue-100 font-medium">Home Solar Estimate</p>
                  <span className="px-2 py-1 bg-white/20 rounded text-[10px] font-bold uppercase tracking-widest">Recommended</span>
               </div>
               <h3 className="text-5xl font-black mb-1">{results.panelCount} Panels</h3>
               <p className="text-blue-100 text-sm mb-6">Required for a {results.requiredSystemSizeKW} kW system</p>
               
               <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
                  <div>
                    <p className="text-blue-200 text-xs uppercase font-bold">Roof Space</p>
                    <p className="text-lg font-bold">{results.requiredRoofAreaSqFt} sq ft</p>
                  </div>
                  <div>
                    <p className="text-blue-200 text-xs uppercase font-bold">Annual Savings</p>
                    <p className="text-lg font-bold">~{results.annualSavings.toLocaleString()}/yr</p>
                  </div>
               </div>
            </div>

            <CalculationBreakdown 
              steps={[
                {
                  label: "System Sizing",
                  formula: `Annual Energy Needed / Local Production Factor`,
                  result: `${results.requiredSystemSizeKW} kW`
                },
                {
                  label: "Panel Selection",
                  formula: `System Size / ${results.inputs.panelWattage}W Panel Output`,
                  result: `${results.panelCount} panels`
                }
              ]}
            />
          </div>
        )
      }
    />
  );
}
