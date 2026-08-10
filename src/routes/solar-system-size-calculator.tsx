import React, { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { CalculatorLayout } from '@/components/calculator/CalculatorLayout';
import { SharedCalculator } from '@/components/calculator/SharedCalculator';
import { ResultsDisplay } from '@/components/ResultsDisplay';
import { AssumptionsPanel } from '@/components/calculator/AssumptionsPanel';
import { CalculationBreakdown } from '@/components/calculator/CalculationBreakdown';
import { getCalculatorById } from '@/calculators/helpers';

export const Route = createFileRoute('/solar-system-size-calculator')({
  component: SolarSystemSizeCalculatorPage,
  head: () => {
    const calc = getCalculatorById('solar-system-size-calculator');
    return {
      title: calc?.seoTitle || 'Solar System Size Calculator',
      meta: [
        { name: 'description', content: calc?.seoDescription || 'Estimate the solar system capacity needed for your home or property.' },
      ],
    };
  }
});

function SolarSystemSizeCalculatorPage() {
  const [results, setResults] = useState<any>(null);
  const calc = getCalculatorById('solar-system-size-calculator');

  if (!calc) return null;

  return (
    <CalculatorLayout
      currentId={calc.id}
      title={calc.name}
      description={calc.shortDescription}
      calculator={
        <SharedCalculator 
          calculatorId={calc.id}
          onResultsChange={setResults}
        />
      }
      results={
        results && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ResultsDisplay results={results} />
            <AssumptionsPanel 
              sunHours={results.inputs.peakSunHours}
              performanceRatio={results.inputs.performanceRatio}
              systemLoss={results.inputs.inverterLosses + results.inputs.wiringLosses + results.inputs.soilingLosses}
              panelWattage={results.inputs.panelWattage}
              targetOffset={results.inputs.targetOffset}
            />
            <CalculationBreakdown 
              steps={[
                {
                  label: "Calculate Daily Requirement",
                  formula: `Annual Consumption (${Math.round((results.inputs.monthlyUsageKWh || results.inputs.monthlyBill / results.inputs.tariffPerKWh) * 12)} kWh) ÷ 365 Days`,
                  result: `${(results.annualGenerationKWh / 365).toFixed(1)} kWh/day`
                },
                {
                  label: "Determine Solar Capacity",
                  formula: `Daily Requirement ÷ (Peak Sun Hours (${results.inputs.sunHours || results.inputs.peakSunHours}) × Efficiency Factor)`,
                  result: `${results.requiredSystemSizeKW} kW`
                }
              ]}
            />
          </div>
        )
      }
      faq={[
        {
          question: "How is annual solar production calculated?",
          answer: "Annual production is calculated by multiplying the system size (kW) by the average daily peak sun hours for your location, then by 365 days, and finally by a 'performance ratio' which accounts for losses like heat and wiring."
        },
        {
          question: "Why does solar production vary by month?",
          answer: "Seasonal changes in the sun's position and day length mean that most locations get much more solar energy in the summer than in the winter. Our calculator accounts for these seasonal variations."
        },
        {
          question: "Does location affect annual production?",
          answer: "Absolutely. A 5kW system in a desert environment can produce significantly more electricity than the same 5kW system in a rainy, northern climate."
        }
      ]}
      calculatorSpecificContent={
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Understanding Solar Capacity</h2>
          <p>
            When we talk about a '5kW system', we are referring to the total DC capacity of the solar panels under standard test conditions. The actual AC power available to your home will be slightly lower due to inverter conversion and other system losses.
          </p>
          <h3 className="text-2xl font-semibold">Residential vs Commercial Sizing</h3>
          <p>
            Residential systems typically range from 3kW to 15kW. Commercial systems can be hundreds of kilowatts. This calculator is designed to scale across both types of installations by using your specific energy consumption data.
          </p>
        </div>
      }
    />
  );
}
