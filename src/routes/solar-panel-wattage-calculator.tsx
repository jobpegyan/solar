import React, { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { CalculatorLayout } from '@/components/calculator/CalculatorLayout';
import { SharedCalculator } from '@/components/calculator/SharedCalculator';
import { ResultsDisplay } from '@/components/ResultsDisplay';
import { AssumptionsPanel } from '@/components/calculator/AssumptionsPanel';
import { CalculationBreakdown } from '@/components/calculator/CalculationBreakdown';
import { getCalculatorById } from '@/calculators/helpers';

export const Route = createFileRoute('/solar-panel-wattage-calculator')({
  component: SolarPanelWattageCalculatorPage,
  head: () => {
    const calc = getCalculatorById('solar-panel-wattage-calculator');
    return {
      title: calc?.seoTitle || 'Solar Panel Wattage Calculator',
      meta: [
        { name: 'description', content: calc?.seoDescription || 'Calculate how many panels you need for a target solar system size.' },
      ],
    };
  }
});

function SolarPanelWattageCalculatorPage() {
  const [results, setResults] = useState<any>(null);
  const calc = getCalculatorById('solar-panel-wattage-calculator');

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
          initialMode="usage"
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
            />
            <CalculationBreakdown 
              steps={[
                {
                  label: "Raw Panel Count",
                  formula: `Target System Size (${results.requiredSystemSizeKW} kW × 1000) ÷ Panel Wattage (${results.inputs.panelWattage} W)`,
                  result: `${((results.requiredSystemSizeKW * 1000) / results.inputs.panelWattage).toFixed(2)} panels`
                },
                {
                  label: "Final Panel Count (Rounded Up)",
                  formula: `Ceiling(${((results.requiredSystemSizeKW * 1000) / results.inputs.panelWattage).toFixed(2)})`,
                  result: `${results.panelCount} panels`
                }
              ]}
            />
          </div>
        )
      }
      faq={[
        {
          question: "Is a higher wattage solar panel better?",
          answer: "Not necessarily. Higher wattage panels are usually larger or more efficient, meaning you need fewer individual panels to reach your target system size. This saves roof space and can reduce installation labor, but the total energy produced per kW remains similar."
        },
        {
          question: "How many 400W panels do I need?",
          answer: "For a standard 6kW (6000W) system, you would need 15 panels (6000 / 400 = 15). If you used 300W panels, you would need 20 panels."
        },
        {
          question: "How does panel wattage affect system size?",
          answer: "Panel wattage determines the 'building blocks' of your system. A system's total capacity is always a multiple of the panel wattage. Using higher wattage panels allows you to hit higher capacities in smaller spaces."
        }
      ]}
      calculatorSpecificContent={
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Understanding Solar Panel Wattage</h2>
          <p>
            Solar panels are rated by their DC power output under Standard Test Conditions (STC). Most modern residential panels range from 350W to 550W.
          </p>
          <h3 className="text-2xl font-semibold">Space Efficiency</h3>
          <p>
            If you have limited roof space, choosing a higher-wattage, higher-efficiency panel is critical. While a 300W panel and a 400W panel might look similar in size, the 400W panel will produce 33% more energy in the same footprint.
          </p>
        </div>
      }
    />
  );
}
