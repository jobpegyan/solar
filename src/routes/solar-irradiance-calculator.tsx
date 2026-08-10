import { createFileRoute } from '@tanstack/react-router';
import { CalculatorLayout } from '@/components/calculator/CalculatorLayout';
import { SharedCalculator } from '@/components/calculator/SharedCalculator';
import { AdvancedResults } from '@/components/calculator/AdvancedResults';
import { calculateAdvancedSolar } from '@/lib/calculations/advanced.functions';
import { useServerFn } from '@tanstack/react-start';
import { useState } from 'react';
import { getCalculatorBySlug } from '@/calculators/helpers';

export const Route = createFileRoute('/solar-irradiance-calculator')({
  component: IrradianceCalculator,
});

function IrradianceCalculator() {
  const calc = getCalculatorBySlug('/solar-irradiance-calculator');
  const [results, setResults] = useState<any>(null);
  const calculate = useServerFn(calculateAdvancedSolar);

  const handleCalculate = async (inputs: any) => {
    const res = await calculate({ data: inputs });
    setResults(res);
  };

  return (
    <CalculatorLayout 
      title={calc?.seoTitle || "Solar Irradiance Calculator"}
      description={calc?.seoDescription || "Calculate or interpret solar irradiance values based on location or manual input."}
      currentId="solar-irradiance-calculator"
      faq={calc?.faq}
      results={results ? <AdvancedResults results={results} type="irradiance" /> : null}
      calculator={
        <SharedCalculator 
          calculatorId="solar-irradiance-calculator"
          onCalculate={handleCalculate}
          hiddenFields={['bill', 'usage', 'targetOffset', 'orientation', 'shading', 'tilt', 'losses', 'batteryCapacityKWh', 'stateOfCharge', 'batteryVoltageV', 'backupLoadW', 'backupDurationHours', 'appliances', 'rate', 'solarArraySizeKW', 'targetDcAcRatio']}
          initialInputs={{
            peakSunHours: 5
          }}
        />
      }
    />
  );
}
