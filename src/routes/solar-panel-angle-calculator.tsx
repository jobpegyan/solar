import { createFileRoute } from '@tanstack/react-router';
import { CalculatorLayout } from '@/components/calculator/CalculatorLayout';
import { SharedCalculator } from '@/components/calculator/SharedCalculator';
import { AdvancedResults } from '@/components/calculator/AdvancedResults';
import { calculateAdvancedSolar } from '@/lib/calculations/advanced.functions';
import { useServerFn } from '@tanstack/react-start';
import { useState } from 'react';
import { getCalculatorBySlug } from '@/calculators/helpers';

export const Route = createFileRoute('/solar-panel-angle-calculator')({
  component: PanelAngleCalculator,
});

function PanelAngleCalculator() {
  const calc = getCalculatorBySlug('/solar-panel-angle-calculator');
  const [results, setResults] = useState<any>(null);
  const calculate = useServerFn(calculateAdvancedSolar);

  const handleCalculate = async (inputs: any) => {
    const res = await calculate({ data: inputs });
    setResults(res);
  };

  return (
    <CalculatorLayout 
      title={calc?.seoTitle || "Solar Panel Angle Calculator"}
      description={calc?.seoDescription || "Calculate the ideal tilt and orientation for your solar panels."}
      currentId="solar-panel-angle-calculator"
      faq={calc?.faq}
      results={results ? <AdvancedResults results={results} type="angle" /> : null}
      calculator={
        <SharedCalculator 
          calculatorId="solar-panel-angle-calculator"
          onCalculate={handleCalculate}
          hiddenFields={['bill', 'usage', 'targetOffset', 'shading', 'losses', 'batteryCapacityKWh', 'stateOfCharge', 'batteryVoltageV', 'backupLoadW', 'backupDurationHours', 'appliances', 'rate', 'sunHours', 'solarArraySizeKW', 'targetDcAcRatio']}
          initialInputs={{
            optimizationGoal: 'annual',
            latitude: 34.05
          }}
        />
      }
    />
  );
}
