import { createFileRoute } from '@tanstack/react-router';
import { CalculatorLayout } from '@/components/calculator/CalculatorLayout';
import { SharedCalculator } from '@/components/calculator/SharedCalculator';
import { BatteryResults } from '@/components/calculator/BatteryResults';
import { getBatterySize } from '@/lib/calculations/battery.functions';
import { useServerFn } from '@tanstack/react-start';
import { useState } from 'react';

export const Route = createFileRoute('/solar-battery-storage-calculator')({
  component: BatteryStorageCalculator,
});

function BatteryStorageCalculator() {
  const [results, setResults] = useState<any>(null);
  const calculate = useServerFn(getBatterySize);

  const handleCalculate = async (inputs: any) => {
    const batteryInputs = {
      backupLoadW: inputs.backupLoadW || 1000,
      backupDurationHours: inputs.backupDurationHours || 12,
      batteryEfficiency: inputs.batteryEfficiency || 90,
      depthOfDischarge: inputs.depthOfDischarge || 80,
      reservePercentage: inputs.reservePercentage || 15,
    };
    
    const res = await calculate({ data: batteryInputs });
    setResults(res);
  };

  return (
    <CalculatorLayout 
      title="Solar Battery Storage Calculator"
      description="Estimate solar battery storage requirements based on energy consumption, backup duration, load and battery assumptions."
      currentId="solar-battery-storage-calculator"
      results={results ? <BatteryResults results={results} type="storage" /> : null}
      calculator={
        <SharedCalculator 
          calculatorId="solar-battery-storage-calculator"
          onCalculate={handleCalculate}
          hiddenFields={['bill', 'usage', 'targetOffset', 'orientation', 'shading', 'tilt', 'losses', 'batteryCapacityKWh', 'stateOfCharge', 'inverterEfficiency', 'batteryVoltageV', 'sunHours', 'rate']}
          initialInputs={{
            backupLoadW: 1000,
            backupDurationHours: 12,
            batteryEfficiency: 90,
            depthOfDischarge: 80,
            reservePercentage: 15
          }}
        />
      }
    />
  );
}
