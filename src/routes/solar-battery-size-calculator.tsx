import { createFileRoute } from '@tanstack/react-router';
import { SharedCalculator } from '@/components/calculator/SharedCalculator';
import { BatteryResults } from '@/components/calculator/BatteryResults';
import { CalculatorSEOLayout } from '@/components/seo/CalculatorSEOLayout';
import { getSEOData } from '@/seo/calculator-seo';
import { RelatedCalculators } from '@/components/RelatedCalculators';
import { Disclaimer } from '@/components/Disclaimer';
import { getBatterySize } from '@/lib/calculations/battery.functions';
import { useServerFn } from '@tanstack/react-start';
import { useState } from 'react';

const calculatorId = 'solar-battery-size-calculator';

export const Route = createFileRoute('/solar-battery-size-calculator')({
  component: BatterySizeCalculator,
  head: () => {
    const seo = getSEOData(calculatorId);
    return {
      title: seo?.seoTitle || 'Solar Battery Size Calculator',
      meta: [
        { name: 'description', content: seo?.seoDescription || '' },
        { property: 'og:title', content: seo?.seoTitle || '' },
        { property: 'og:description', content: seo?.seoDescription || '' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      links: [
        { rel: 'canonical', href: `https://solarpanel-calculator.com/solar-battery-size-calculator` },
      ],
    };
  },
});

function BatterySizeCalculator() {
  const [results, setResults] = useState<any>(null);
  const seo = getSEOData(calculatorId);
  const calculate = useServerFn(getBatterySize);

  const handleCalculate = async (inputs: any) => {
    const batteryInputs = {
      backupLoadW: inputs.backupLoadW || 1000,
      backupDurationHours: inputs.backupDurationHours || 8,
      batteryEfficiency: inputs.batteryEfficiency || 90,
      depthOfDischarge: inputs.depthOfDischarge || 80,
      reservePercentage: inputs.reservePercentage || 10,
    };
    
    const res = await calculate({ data: batteryInputs });
    setResults(res);
  };

  if (!seo) return null;

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <CalculatorSEOLayout seoData={seo}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <SharedCalculator 
              calculatorId={calculatorId}
              onCalculate={handleCalculate}
              hiddenFields={['bill', 'usage', 'targetOffset', 'orientation', 'shading', 'tilt', 'losses', 'batteryCapacityKWh', 'stateOfCharge', 'inverterEfficiency', 'batteryVoltageV', 'sunHours', 'rate']}
              initialInputs={{
                backupLoadW: 1000,
                backupDurationHours: 8,
                batteryEfficiency: 90,
                depthOfDischarge: 80,
                reservePercentage: 10
              }}
            />
          </div>
          <div className="lg:col-span-7">
            {results && <BatteryResults results={results} type="size" />}
          </div>
        </div>
      </CalculatorSEOLayout>
      
      <div className="mt-12 space-y-12">
        <Disclaimer context="battery sizing estimates" />
        <RelatedCalculators currentId={calculatorId} />
      </div>
    </div>
  );
}
