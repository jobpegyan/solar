import { createFileRoute } from '@tanstack/react-router';
import { SharedCalculator } from '@/components/calculator/SharedCalculator';
import { CalculationBreakdown } from '@/components/calculator/CalculationBreakdown';
import { CalculatorSEOLayout } from '@/components/seo/CalculatorSEOLayout';
import { getSEOData } from '@/seo/calculator-seo';
import { RelatedCalculators } from '@/components/RelatedCalculators';
import { Disclaimer } from '@/components/Disclaimer';
import { useState } from 'react';
import { SystemResults } from '@/lib/calculations/solar-system';

const calculatorId = 'how-many-solar-panels-do-i-need';

export const Route = createFileRoute('/how-many-solar-panels-do-i-need')({
  component: HowManyPanelsCalculator,
  head: () => {
    const seo = getSEOData(calculatorId);
    return {
      title: seo?.seoTitle || 'How Many Solar Panels Do I Need?',
      meta: [
        { name: 'description', content: seo?.seoDescription || '' },
        { property: 'og:title', content: seo?.seoTitle || '' },
        { property: 'og:description', content: seo?.seoDescription || '' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      links: [
        { rel: 'canonical', href: `https://solarpanel-calculator.com/how-many-solar-panels-do-i-need` },
      ],
    };
  },
});

function HowManyPanelsCalculator() {
  const [results, setResults] = useState<(SystemResults & { inputs: any }) | null>(null);
  const seo = getSEOData(calculatorId);

  if (!seo) return null;

  const breakdownSteps = results ? [
    {
      label: "Required System Size",
      formula: `Annual Usage (${(results.inputs.monthlyUsageKWh || 450) * 12} kWh) / (Sun Hours (${results.inputs.peakSunHours}) * Performance Ratio (${Math.round(results.inputs.performanceRatio * 100)}%))`,
      result: `${results.requiredSystemSizeKW} kW`
    },
    {
      label: "Panel Count",
      formula: `System Size (${results.requiredSystemSizeKW} kW * 1000) / Panel Wattage (${results.inputs.panelWattage}W)`,
      result: `${results.panelCount} panels (Rounded Up)`
    }
  ] : [];

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <CalculatorSEOLayout seoData={seo}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <SharedCalculator 
              calculatorId={calculatorId}
              onResultsChange={setResults}
            />
          </div>
          <div className="lg:col-span-7">
            {results ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   <div className="p-6 bg-solar/5 border border-solar/10 rounded-2xl">
                     <p className="text-sm text-muted-foreground mb-1">Recommended Panels</p>
                     <p className="text-4xl font-black text-solar">{results.panelCount}</p>
                     <p className="text-xs text-muted-foreground mt-1">{results.inputs.panelWattage}W Panels</p>
                   </div>
                   <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl">
                     <p className="text-sm text-muted-foreground mb-1">System Capacity</p>
                     <p className="text-4xl font-black text-slate-900">{results.requiredSystemSizeKW} kW</p>
                   </div>
                </div>
                
                <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-4">
                   <h3 className="font-semibold text-lg">Solar Summary</h3>
                   <div className="grid grid-cols-2 gap-4 text-sm">
                     <div>
                       <p className="text-muted-foreground uppercase text-[10px] font-bold tracking-wider">Annual Production</p>
                       <p className="text-lg font-bold">{results.annualGenerationKWh.toLocaleString()} kWh</p>
                     </div>
                     <div>
                       <p className="text-muted-foreground uppercase text-[10px] font-bold tracking-wider">Est. Solar Offset</p>
                       <p className="text-lg font-bold">{results.inputs.targetOffset}%</p>
                     </div>
                   </div>
                </div>

                <CalculationBreakdown steps={breakdownSteps} />
              </div>
            ) : (
              <div className="h-full flex items-center justify-center border-dashed bg-slate-50 min-h-[400px] rounded-xl border">
                <div className="text-center p-8">
                  <p className="text-slate-500 font-medium">Enter your details to see the panel count</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CalculatorSEOLayout>
      
      <div className="mt-12 space-y-12">
        <Disclaimer context="panel count estimates" />
        <RelatedCalculators currentId={calculatorId} />
      </div>
    </div>
  );
}
