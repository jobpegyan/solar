import { createFileRoute } from '@tanstack/react-router';
import { CalculatorLayout } from '@/components/calculator/CalculatorLayout';
import { SharedCalculator } from '@/components/calculator/SharedCalculator';
import { CalculationBreakdown } from '@/components/calculator/CalculationBreakdown';
import { useState } from 'react';
import { SystemResults } from '@/lib/calculations/solar-system';
import { getCalculatorBySlug } from '@/calculators/helpers';

export const Route = createFileRoute('/solar-panels-needed-calculator')({
  component: SolarPanelsNeededCalculator,
});

function SolarPanelsNeededCalculator() {
  const calc = getCalculatorBySlug('/solar-panels-needed-calculator');
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
          hiddenFields={['location', 'targetOffset']}
          initialInputs={{ targetSystemSizeKW: 5 }}
        />
      }
      results={
        results && (
          <div className="space-y-6">
            <div className="p-8 bg-solar rounded-3xl text-white text-center">
              <p className="text-solar-foreground/80 font-medium mb-2 text-sm uppercase tracking-wider">Panels Required</p>
              <h3 className="text-6xl font-black mb-2">{results.panelCount}</h3>
              <p className="text-solar-foreground/90">{results.inputs.panelWattage}W Solar Panels</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="p-4 bg-slate-50 rounded-2xl border text-center">
                 <p className="text-xs text-muted-foreground uppercase mb-1">System Size</p>
                 <p className="text-xl font-bold">{results.requiredSystemSizeKW} kW</p>
               </div>
               <div className="p-4 bg-slate-50 rounded-2xl border text-center">
                 <p className="text-xs text-muted-foreground uppercase mb-1">Daily Generation</p>
                 <p className="text-xl font-bold">{results.dailyGenerationKWh} kWh</p>
               </div>
            </div>

            <CalculationBreakdown 
              steps={[
                {
                  label: "Panel Calculation",
                  formula: `Target Capacity (${results.requiredSystemSizeKW} kW * 1000) / Panel Wattage (${results.inputs.panelWattage}W)`,
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
