import { createFileRoute } from '@tanstack/react-router';
import { CalculatorLayout } from '@/components/calculator/CalculatorLayout';
import { SharedCalculator } from '@/components/calculator/SharedCalculator';
import { InverterResults } from '@/components/calculator/InverterResults';
import { calculateInverterRequirements } from '@/lib/calculations/inverter.functions';
import { useServerFn } from '@tanstack/react-start';
import { useState } from 'react';
import { getCalculatorBySlug } from '@/calculators/helpers';

export const Route = createFileRoute('/inverter-load-calculator')({
  component: InverterLoadCalculator,
});

function InverterLoadCalculator() {
  const calc = getCalculatorBySlug('/inverter-load-calculator');
  const [results, setResults] = useState<any>(null);
  const calculate = useServerFn(calculateInverterRequirements);

  const handleCalculate = async (inputs: any) => {
    const res = await calculate({ data: inputs });
    setResults(res);
  };

  return (
    <CalculatorLayout 
      title={calc?.seoTitle || "Inverter Load Calculator"}
      description={calc?.seoDescription || "Calculate running load, estimated peak load and inverter capacity requirements from your appliances."}
      currentId="inverter-load-calculator"
      faq={calc?.faq}
      results={results ? <InverterResults results={results} type="load" /> : null}
      calculator={
        <SharedCalculator 
          calculatorId="inverter-load-calculator"
          onCalculate={handleCalculate}
          hiddenFields={['bill', 'usage', 'targetOffset', 'orientation', 'shading', 'tilt', 'losses', 'batteryCapacityKWh', 'stateOfCharge', 'batteryVoltageV', 'backupLoadW', 'backupDurationHours', 'solarArraySizeKW', 'targetDcAcRatio', 'rate', 'sunHours']}
          initialInputs={{
            safetyMargin: 20,
            inverterType: 'off-grid'
          }}
        />
      }
    />
  );
}
