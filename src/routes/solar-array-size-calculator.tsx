import { createFileRoute } from '@tanstack/react-router';
import { CalculatorLayout } from '@/components/calculator/CalculatorLayout';
import { SharedCalculator } from '@/components/calculator/SharedCalculator';
import { AdvancedResults } from '@/components/calculator/AdvancedResults';
import { calculateAdvancedSolar } from '@/lib/calculations/advanced.functions';
import { useServerFn } from '@tanstack/react-start';
import { useState } from 'react';
import { getCalculatorBySlug } from '@/calculators/helpers';

export const Route = createFileRoute('/solar-array-size-calculator')({
  component: ArraySizeCalculator,
});

function ArraySizeCalculator() {
  const calc = getCalculatorBySlug('/solar-array-size-calculator');
  const [results, setResults] = useState<any>(null);
  const calculate = useServerFn(calculateAdvancedSolar);

  const handleCalculate = async (inputs: any) => {
    const res = await calculate({ data: inputs });
    setResults(res);
  };

  return (
    <CalculatorLayout 
      title={calc?.seoTitle || "Solar Array Size Calculator"}
      description={calc?.seoDescription || "Calculate the required solar array capacity based on your energy demand."}
      currentId="solar-array-size-calculator"
      faq={calc?.faq}
      results={results ? <AdvancedResults results={results} type="array" /> : null}
      calculator={
        <SharedCalculator 
          calculatorId="solar-array-size-calculator"
          onCalculate={handleCalculate}
          hiddenFields={['bill', 'usage', 'orientation', 'shading', 'tilt', 'losses', 'batteryCapacityKWh', 'stateOfCharge', 'batteryVoltageV', 'backupLoadW', 'backupDurationHours', 'appliances', 'rate', 'solarArraySizeKW', 'targetDcAcRatio']}
          initialInputs={{
            annualEnergyKwh: 12000,
            peakSunHours: 5,
            panelWattage: 400,
            targetOffset: 100
          }}
        />
      }
    />
  );
}
