import { createFileRoute } from '@tanstack/react-router';
import { CalculatorLayout } from '@/components/calculator/CalculatorLayout';
import { SharedCalculator } from '@/components/calculator/SharedCalculator';
import { CalculationBreakdown } from '@/components/calculator/CalculationBreakdown';
import { useState } from 'react';
import { SystemResults } from '@/lib/calculations/solar-system';
import { getCalculatorBySlug } from '@/calculators/helpers';
import { RoofCalculator } from '@/components/calculator/RoofCalculator';
import { RoofAreaResults } from '@/lib/calculations/roof';

export const Route = createFileRoute('/solar-panel-requirement-calculator')({
  component: SolarPanelRequirementCalculator,
});

function SolarPanelRequirementCalculator() {
  const calc = getCalculatorBySlug('/solar-panel-requirement-calculator');
  const [sysResults, setSysResults] = useState<(SystemResults & { inputs: any }) | null>(null);
  const [roofResults, setRoofResults] = useState<(RoofAreaResults & { inputs: any }) | null>(null);

  if (!calc) return null;

  return (
    <CalculatorLayout
      title={calc.name}
      description={calc.seoDescription || calc.shortDescription}
      currentId={calc.id}
      faq={calc.faq}
      calculator={
        <div className="space-y-8">
           <SharedCalculator 
            calculatorId={calc.id}
            onResultsChange={setSysResults}
          />
          {sysResults && (
            <div className="animate-in fade-in slide-in-from-top-4 duration-500">
               <RoofCalculator 
                initialPanelCount={sysResults.panelCount}
                hidePanelCount={true}
                onResultsChange={setRoofResults}
              />
            </div>
          )}
        </div>
      }
      results={
        (sysResults || roofResults) && (
          <div className="space-y-6">
            {sysResults && (
               <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 bg-solar/10 rounded-2xl border border-solar/20">
                    <p className="text-xs font-bold uppercase text-solar mb-1">Panels</p>
                    <p className="text-3xl font-black">{sysResults.panelCount}</p>
                  </div>
                  <div className="p-6 bg-slate-900 rounded-2xl text-white">
                    <p className="text-xs font-bold uppercase text-slate-400 mb-1">System</p>
                    <p className="text-3xl font-black">{sysResults.requiredSystemSizeKW} kW</p>
                  </div>
               </div>
            )}

            {roofResults && (
               <div className="p-6 bg-white border rounded-2xl space-y-4">
                  <h3 className="font-bold flex items-center gap-2">Roof Area Estimate</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase">Required Area</p>
                      <p className="text-2xl font-bold">{roofResults.estimatedTotalAreaSqFt} sq ft</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase">Array Dimensions</p>
                      <p className="text-lg font-semibold">{roofResults.arrayWidthFt}' x {roofResults.arrayHeightFt}'</p>
                    </div>
                  </div>
                  
                  {roofResults.isSpaceSufficient === false && (
                    <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-800 text-sm">
                      <p className="font-semibold mb-1">Space Constraint Detected</p>
                      The estimated panel area is larger than the available roof area based on your inputs. 
                      Consider a higher-wattage panel or a different layout.
                    </div>
                  )}
               </div>
            )}

            {sysResults && roofResults && (
               <CalculationBreakdown 
                steps={[
                  {
                    label: "System Size",
                    formula: `Requirement / Production Factors`,
                    result: `${sysResults.requiredSystemSizeKW} kW`
                  },
                  {
                    label: "Area Calculation",
                    formula: `Panels (${sysResults.panelCount}) × Panel Area × Spacing Factor`,
                    result: `${roofResults.estimatedTotalAreaSqFt} sq ft`
                  }
                ]}
               />
            )}
          </div>
        )
      }
    />
  );
}
