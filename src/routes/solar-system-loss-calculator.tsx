import { createFileRoute } from '@tanstack/react-router';
import { CalculatorLayout } from '@/components/calculator/CalculatorLayout';
import { SharedCalculator } from '@/components/calculator/SharedCalculator';
import { AdvancedResults } from '@/components/calculator/AdvancedResults';
import { calculateAdvancedSolar } from '@/lib/calculations/advanced.functions';
import { useServerFn } from '@tanstack/react-start';
import { useState } from 'react';
import { getCalculatorBySlug } from '@/calculators/helpers';

export const Route = createFileRoute('/solar-system-loss-calculator')({
  component: LossCalculator,
});

function LossCalculator() {
  const calc = getCalculatorBySlug('/solar-system-loss-calculator');
  const [results, setResults] = useState<any>(null);
  const calculate = useServerFn(calculateAdvancedSolar);

  const handleCalculate = async (inputs: any) => {
    const res = await calculate({ data: inputs });
    setResults(res);
  };

  return (
    <CalculatorLayout 
      title={calc?.seoTitle || "Solar System Loss Calculator"}
      description={calc?.seoDescription || "Calculate combined system losses from various factors."}
      currentId="solar-system-loss-calculator"
      faq={calc?.faq}
      results={results ? <AdvancedResults results={results} type="loss" /> : null}
      calculator={
        <SharedCalculator 
          calculatorId="solar-system-loss-calculator"
          onCalculate={handleCalculate}
          hiddenFields={['bill', 'usage', 'targetOffset', 'orientation', 'shading', 'tilt', 'batteryCapacityKWh', 'stateOfCharge', 'batteryVoltageV', 'backupLoadW', 'backupDurationHours', 'appliances', 'rate', 'sunHours', 'solarArraySizeKW', 'targetDcAcRatio']}
          initialInputs={{
            baselineProduction: 8000,
            losses: {
              panelDegradation: 0.5,
              inverter: 4,
              wiring: 2,
              soiling: 3,
              shading: 0,
              mismatch: 2,
              temperature: 5,
              other: 1
            }
          }}
        />
      }
    />
  );
}
