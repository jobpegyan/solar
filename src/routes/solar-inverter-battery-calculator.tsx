import { createFileRoute } from '@tanstack/react-router';
import { CalculatorLayout } from '@/components/calculator/CalculatorLayout';
import { SharedCalculator } from '@/components/calculator/SharedCalculator';
import { BatteryResults } from '@/components/calculator/BatteryResults';
import { getBatterySize } from '@/lib/calculations/battery.functions';
import { useServerFn } from '@tanstack/react-start';
import { useState } from 'react';

export const Route = createFileRoute('/solar-inverter-battery-calculator')({
  component: InverterBatteryCalculator,
});

function InverterBatteryCalculator() {
  const [results, setResults] = useState<any>(null);
  const calculate = useServerFn(getBatterySize);

  const handleCalculate = async (inputs: any) => {
    const batteryInputs = {
      backupLoadW: inputs.backupLoadW || 1500,
      backupDurationHours: inputs.backupDurationHours || 4,
      batteryEfficiency: inputs.batteryEfficiency || 85,
      depthOfDischarge: inputs.depthOfDischarge || 50,
      reservePercentage: 0,
    };
    
    const res = await calculate({ data: batteryInputs });
    setResults(res);
  };

  return (
    <CalculatorLayout 
      title="Solar Inverter Battery Calculator"
      description="Estimate battery capacity requirements for an inverter and backup load using power, duration, efficiency and battery assumptions."
      currentId="solar-inverter-battery-calculator"
      results={results ? <BatteryResults results={results} type="inverter" /> : null}
      calculator={
        <SharedCalculator 
          calculatorId="solar-inverter-battery-calculator"
          onCalculate={handleCalculate}
          hiddenFields={['bill', 'usage', 'targetOffset', 'orientation', 'shading', 'tilt', 'losses', 'batteryCapacityKWh', 'stateOfCharge', 'inverterEfficiency', 'sunHours', 'rate']}
          initialInputs={{
            backupLoadW: 1500,
            backupDurationHours: 4,
            batteryEfficiency: 85,
            depthOfDischarge: 50,
            batteryVoltageV: 48
          }}
        />
      }
    />
  );
}
