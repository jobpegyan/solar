import { createFileRoute } from '@tanstack/react-router';
import { CalculatorLayout } from '@/components/calculator/CalculatorLayout';
import { SharedCalculator } from '@/components/calculator/SharedCalculator';
import { AdvancedResults } from '@/components/calculator/AdvancedResults';
import { calculateAdvancedSolar } from '@/lib/calculations/advanced.functions';
import { useServerFn } from '@tanstack/react-start';
import { useState } from 'react';
import { getCalculatorBySlug } from '@/calculators/helpers';

export const Route = createFileRoute('/solar-shading-calculator')({
  component: ShadingCalculator,
});

function ShadingCalculator() {
  const calc = getCalculatorBySlug('/solar-shading-calculator');
  const [results, setResults] = useState<any>(null);
  const calculate = useServerFn(calculateAdvancedSolar);

  const handleCalculate = async (inputs: any) => {
    const res = await calculate({ data: inputs });
    setResults(res);
  };

  return (
    <CalculatorLayout 
      title={calc?.seoTitle || "Solar Shading Calculator"}
      description={calc?.seoDescription || "Estimate the potential effect of shading on your solar production."}
      currentId="solar-shading-calculator"
      faq={calc?.faq}
      results={results ? <AdvancedResults results={results} type="shading" /> : null}
      calculator={
        <SharedCalculator 
          calculatorId="solar-shading-calculator"
          onCalculate={handleCalculate}
          hiddenFields={['bill', 'usage', 'targetOffset', 'orientation', 'tilt', 'losses', 'batteryCapacityKWh', 'stateOfCharge', 'batteryVoltageV', 'backupLoadW', 'backupDurationHours', 'appliances', 'rate', 'sunHours', 'solarArraySizeKW', 'targetDcAcRatio']}
          initialInputs={{
            baselineProduction: 5000,
            shadingPercentage: 10
          }}
        />
      }
    />
  );
}
