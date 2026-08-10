import { createFileRoute } from '@tanstack/react-router';
import { CalculatorLayout } from '@/components/calculator/CalculatorLayout';
import { SharedCalculator } from '@/components/calculator/SharedCalculator';
import { InverterResults } from '@/components/calculator/InverterResults';
import { calculateInverterRequirements } from '@/lib/calculations/inverter.functions';
import { useServerFn } from '@tanstack/react-start';
import { useState } from 'react';
import { getCalculatorBySlug } from '@/calculators/helpers';

export const Route = createFileRoute('/solar-inverter-requirement-calculator')({
  component: InverterRequirementCalculator,
});

function InverterRequirementCalculator() {
  const calc = getCalculatorBySlug('/solar-inverter-requirement-calculator');
  const [results, setResults] = useState<any>(null);
  const calculate = useServerFn(calculateInverterRequirements);

  const handleCalculate = async (inputs: any) => {
    const res = await calculate({ data: inputs });
    setResults(res);
  };

  return (
    <CalculatorLayout 
      title={calc?.seoTitle || "Solar Inverter Requirement Calculator"}
      description={calc?.seoDescription || "Estimate solar inverter requirements using PV capacity, running load, peak load and safety assumptions."}
      currentId="solar-inverter-requirement-calculator"
      faq={calc?.faq}
      results={results ? <InverterResults results={results} type="requirement" /> : null}
      calculator={
        <SharedCalculator 
          calculatorId="solar-inverter-requirement-calculator"
          onCalculate={handleCalculate}
          hiddenFields={['bill', 'usage', 'targetOffset', 'orientation', 'shading', 'tilt', 'losses', 'batteryCapacityKWh', 'stateOfCharge', 'batteryVoltageV', 'backupLoadW', 'backupDurationHours', 'rate', 'sunHours']}
          initialInputs={{
            solarArraySizeKW: 6,
            targetDcAcRatio: 1.2,
            safetyMargin: 15,
            inverterType: 'hybrid'
          }}
        />
      }
    />
  );
}
