import { createFileRoute } from '@tanstack/react-router';
import { CalculatorLayout } from '@/components/calculator/CalculatorLayout';
import { SharedCalculator } from '@/components/calculator/SharedCalculator';
import { BatteryResults } from '@/components/calculator/BatteryResults';
import { getBatterySize } from '@/lib/calculations/battery.functions';
import { useServerFn } from '@tanstack/react-start';
import { useState } from 'react';

export const Route = createFileRoute('/solar-battery-capacity-calculator')({
  component: BatteryCapacityCalculator,
});

function BatteryCapacityCalculator() {
  const [results, setResults] = useState<any>(null);
  const calculate = useServerFn(getBatterySize);

  const handleCalculate = async (inputs: any) => {
    const batteryInputs = {
      backupLoadW: inputs.backupLoadW || 1000,
      backupDurationHours: inputs.backupDurationHours || 8,
      batteryEfficiency: inputs.batteryEfficiency || 90,
      depthOfDischarge: inputs.depthOfDischarge || 80,
      reservePercentage: inputs.reservePercentage || 0,
    };
    
    const res = await calculate({ data: batteryInputs });
    setResults(res);
  };

  return (
    <CalculatorLayout 
      title="Solar Battery Capacity Calculator"
      description="Calculate the estimated battery storage capacity needed for your solar system and backup requirements."
      currentId="solar-battery-capacity-calculator"
      results={results ? <BatteryResults results={results} type="capacity" /> : null}
      calculator={
        <SharedCalculator 
          calculatorId="solar-battery-capacity-calculator"
          onCalculate={handleCalculate}
          hiddenFields={['bill', 'usage', 'targetOffset', 'orientation', 'shading', 'tilt', 'losses', 'batteryCapacityKWh', 'stateOfCharge', 'inverterEfficiency', 'batteryVoltageV', 'sunHours', 'rate']}
          initialInputs={{
            backupLoadW: 1000,
            backupDurationHours: 8,
            batteryEfficiency: 90,
            depthOfDischarge: 80
          }}
        />
      }
    />
  );
}
