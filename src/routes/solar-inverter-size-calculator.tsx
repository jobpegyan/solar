import { createFileRoute } from '@tanstack/react-router';
import { SharedCalculator } from '@/components/calculator/SharedCalculator';
import { InverterResults } from '@/components/calculator/InverterResults';
import { CalculatorSEOLayout } from '@/components/seo/CalculatorSEOLayout';
import { getSEOData } from '@/seo/calculator-seo';
import { RelatedCalculators } from '@/components/RelatedCalculators';
import { Disclaimer } from '@/components/Disclaimer';
import { calculateInverterRequirements } from '@/lib/calculations/inverter.functions';
import { useServerFn } from '@tanstack/react-start';
import { useState } from 'react';

const calculatorId = 'solar-inverter-size-calculator';

export const Route = createFileRoute('/solar-inverter-size-calculator')({
  component: InverterSizeCalculator,
  head: () => {
    const seo = getSEOData(calculatorId);
    return {
      title: seo?.seoTitle || 'Solar Inverter Size Calculator',
      meta: [
        { name: 'description', content: seo?.seoDescription || '' },
        { property: 'og:title', content: seo?.seoTitle || '' },
        { property: 'og:description', content: seo?.seoDescription || '' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      links: [
        { rel: 'canonical', href: `https://solarpanel-calculator.com/solar-inverter-size-calculator` },
      ],
    };
  },
});

function InverterSizeCalculator() {
  const [results, setResults] = useState<any>(null);
  const seo = getSEOData(calculatorId);
  const calculate = useServerFn(calculateInverterRequirements);

  const handleCalculate = async (inputs: any) => {
    const res = await calculate({ data: inputs });
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
              hiddenFields={['bill', 'usage', 'targetOffset', 'orientation', 'shading', 'tilt', 'losses', 'batteryCapacityKWh', 'stateOfCharge', 'batteryVoltageV', 'backupLoadW', 'backupDurationHours', 'appliances', 'rate', 'sunHours']}
              initialInputs={{
                solarArraySizeKW: 5,
                targetDcAcRatio: 1.2,
                safetyMargin: 10,
                inverterType: 'grid-tied'
              }}
            />
          </div>
          <div className="lg:col-span-7">
            {results && <InverterResults results={results} type="size" />}
          </div>
        </div>
      </CalculatorSEOLayout>
      
      <div className="mt-12 space-y-12">
        <Disclaimer context="inverter sizing estimates" />
        <RelatedCalculators currentId={calculatorId} />
      </div>
    </div>
  );
}
