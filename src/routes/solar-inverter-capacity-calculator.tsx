import { createFileRoute } from '@tanstack/react-router';
import { CalculatorLayout } from '@/components/calculator/CalculatorLayout';
import { SharedCalculator } from '@/components/calculator/SharedCalculator';
import { InverterResults } from '@/components/calculator/InverterResults';
import { calculateInverterRequirements } from '@/lib/calculations/inverter.functions';
import { useServerFn } from '@tanstack/react-start';
import { useState } from 'react';
import { getCalculatorBySlug } from '@/calculators/helpers';

export const Route = createFileRoute('/solar-inverter-capacity-calculator')({
  component: InverterCapacityCalculator,
});

function InverterCapacityCalculator() {
  const calc = getCalculatorBySlug('/solar-inverter-capacity-calculator');
  const [results, setResults] = useState<any>(null);
  const calculate = useServerFn(calculateInverterRequirements);

  const handleCalculate = async (inputs: any) => {
    const res = await calculate({ data: inputs });
    setResults(res);
  };

  return (
    <CalculatorLayout 
      title={calc?.seoTitle || "Solar Inverter Capacity Calculator"}
      description={calc?.seoDescription || "Calculate inverter capacity required for a solar system."}
      currentId="solar-inverter-capacity-calculator"
      faq={calc?.faq}
      results={results ? <InverterResults results={results} type="capacity" /> : null}
      calculator={
        <SharedCalculator 
          calculatorId="solar-inverter-capacity-calculator"
          onCalculate={handleCalculate}
          hiddenFields={['bill', 'usage', 'targetOffset', 'orientation', 'shading', 'tilt', 'losses', 'batteryCapacityKWh', 'stateOfCharge', 'batteryVoltageV', 'backupLoadW', 'backupDurationHours', 'appliances', 'rate', 'sunHours']}
          initialInputs={{
            solarArraySizeKW: 8,
            targetDcAcRatio: 1.25,
            safetyMargin: 15,
            inverterType: 'grid-tied'
          }}
        />
      }
    />
  );
}
