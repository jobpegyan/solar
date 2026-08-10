import React, { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { CalculatorSEOLayout } from '@/components/seo/CalculatorSEOLayout';
import { SharedCalculator } from '@/components/calculator/SharedCalculator';
import { ResultsDisplay } from '@/components/ResultsDisplay';
import { AssumptionsPanel } from '@/components/calculator/AssumptionsPanel';
import { CalculationBreakdown } from '@/components/calculator/CalculationBreakdown';
import { getSEOData } from '@/seo/calculator-seo';

export const Route = createFileRoute('/solar-panel-calculator')({
  component: SolarPanelCalculatorPage,
  head: () => {
    const seo = getSEOData('solar-panel-calculator');
    return {
      title: seo?.seoTitle || 'Solar Panel Calculator',
      meta: [
        { name: 'description', content: seo?.seoDescription || 'Calculate your ideal solar panel system size, panel count, and production.' },
        { property: 'og:title', content: seo?.seoTitle || '' },
        { property: 'og:description', content: seo?.seoDescription || '' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      links: [
        { rel: 'canonical', href: 'https://solarpanel-calculator.com/solar-panel-calculator' },
      ],
    };
  }
});

function SolarPanelCalculatorPage() {
  const [results, setResults] = useState<any>(null);
  const seo = getSEOData('solar-panel-calculator');

  if (!seo) return null;

  return (
    <CalculatorSEOLayout seoData={seo}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <div className="space-y-8">
          <SharedCalculator 
            calculatorId={seo.id}
            onResultsChange={setResults}
          />
        </div>

        <div className="space-y-8">
          {results ? (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <ResultsDisplay results={results} />
              <AssumptionsPanel 
                sunHours={results.inputs.peakSunHours}
                performanceRatio={results.inputs.performanceRatio}
                systemLoss={results.inputs.inverterLosses + results.inputs.wiringLosses + results.inputs.soilingLosses}
                panelWattage={results.inputs.panelWattage}
                electricityRate={results.inputs.tariffPerKWh}
                targetOffset={results.inputs.targetOffset}
              />
              <CalculationBreakdown 
                steps={[
                  {
                    label: "Target Annual Consumption",
                    formula: `Monthly Usage (${Math.round(results.annualGenerationKWh / 12)} kWh) × 12 × Offset (${results.inputs.targetOffset}%)`,
                    result: `${Math.round(results.annualGenerationKWh * (results.inputs.targetOffset / 100))} kWh/year`
                  },
                  {
                    label: "Required System Size",
                    formula: `Annual Requirement ÷ (Peak Sun Hours (${results.inputs.peakSunHours}) × 365 × Efficiency)`,
                    result: `${results.requiredSystemSizeKW} kW`
                  }
                ]}
              />
            </div>
          ) : (
            <div className="h-full flex items-center justify-center border-dashed bg-slate-50 min-h-[400px] rounded-xl border">
              <div className="text-center p-8">
                <p className="text-slate-500 font-medium">Complete the form to see your results</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </CalculatorSEOLayout>
  );
}
