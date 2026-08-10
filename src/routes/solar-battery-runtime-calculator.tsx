import { createFileRoute } from '@tanstack/react-router';
import { SharedCalculator } from '@/components/calculator/SharedCalculator';
import { BatteryResults } from '@/components/calculator/BatteryResults';
import { CalculatorSEOLayout } from '@/components/seo/CalculatorSEOLayout';
import { getSEOData } from '@/seo/calculator-seo';
import { RelatedCalculators } from '@/components/RelatedCalculators';
import { Disclaimer } from '@/components/Disclaimer';
import { getBatteryRuntime } from '@/lib/calculations/battery.functions';
import { useServerFn } from '@tanstack/react-start';
import { useState } from 'react';

const calculatorId = 'solar-battery-runtime-calculator';
const seoData = getSEOData(calculatorId)!;

export const Route = createFileRoute('/solar-battery-runtime-calculator')({
  component: BatteryRuntimeCalculator,
  head: () => ({
    title: seoData.seoTitle,
    meta: [
      { name: "description", content: seoData.seoDescription },
      { property: "og:title", content: seoData.seoTitle },
      { property: "og:description", content: seoData.seoDescription },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" }
    ],
    links: [
      { rel: "canonical", href: `https://solarpanel-calculator.com${seoData.canonical || '/solar-battery-runtime-calculator'}` }
    ]
  }),
});

function BatteryRuntimeCalculator() {
  const [results, setResults] = useState<any>(null);
  const calculate = useServerFn(getBatteryRuntime);

  const handleCalculate = async (inputs: any) => {
    const batteryInputs = {
      batteryCapacityKWh: inputs.batteryCapacityKWh || 13.5,
      depthOfDischarge: inputs.depthOfDischarge || 80,
      batteryEfficiency: inputs.batteryEfficiency || 90,
      inverterEfficiency: inputs.inverterEfficiency || 95,
      backupLoadW: inputs.backupLoadW || 1000,
      stateOfCharge: inputs.stateOfCharge || 100,
    };
    
    const res = await calculate({ data: batteryInputs });
    setResults(res);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <CalculatorSEOLayout seoData={seoData}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <SharedCalculator 
              calculatorId={calculatorId}
              onCalculate={handleCalculate}
              hiddenFields={['bill', 'usage', 'targetOffset', 'orientation', 'shading', 'tilt', 'losses', 'backupDurationHours', 'batteryVoltageV', 'sunHours', 'rate']}
              initialInputs={{
                batteryCapacityKWh: 13.5,
                backupLoadW: 1000,
                stateOfCharge: 100,
                depthOfDischarge: 80,
                batteryEfficiency: 90,
                inverterEfficiency: 95
              }}
            />
          </div>
          <div className="lg:col-span-7">
            {results ? <BatteryResults results={results} type="runtime" /> : null}
          </div>
        </div>
      </CalculatorSEOLayout>
      
      <div className="mt-12 space-y-12">
        <Disclaimer context="battery runtime estimates" />
        <RelatedCalculators currentId={calculatorId} />
      </div>
    </div>
  );
}

