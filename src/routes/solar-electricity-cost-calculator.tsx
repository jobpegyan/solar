import { createFileRoute } from '@tanstack/react-router';
import { CalculatorLayout } from '@/components/calculator/CalculatorLayout';
import { SharedCalculator } from '@/components/calculator/SharedCalculator';
import { FinancialResults } from '@/components/calculator/FinancialResults';
import { useState } from 'react';

export const Route = createFileRoute('/solar-electricity-cost-calculator')({
  component: ElectricityCostCalculatorPage,
  head: () => ({
    title: "Solar Electricity Cost Calculator — Compare Solar & Grid Costs",
    meta: [
      { name: "description", content: "Compare estimated electricity costs with grid power and solar using your energy usage, rates, system costs and assumptions." },
      { property: "og:title", content: "Solar Electricity Cost Calculator — Compare Solar & Grid Costs" },
      { property: "og:description", content: "Compare estimated electricity costs with grid power and solar using your energy usage, rates, system costs and assumptions." }
    ],
  }),
});

function ElectricityCostCalculatorPage() {
  const [results, setResults] = useState<any>(null);

  return (
    <CalculatorLayout
      title="Solar Electricity Cost Calculator"
      description="Compare the levelized cost of solar electricity against your current utility grid rates."
      currentId="solar-electricity-cost-calculator"
      calculator={
        <SharedCalculator 
          calculatorId="solar-electricity-cost-calculator"
          onResultsChange={(res) => setResults(res)}
        />
      }
      results={
        results && <FinancialResults results={results} type="savings" />
      }
      faq={[
        { question: "How does solar electricity cost compare to grid power?", answer: "Over its 25-year life, solar typically provides electricity at a lower 'levelized cost' than the grid in most regions." }
      ]}
    />
  );
}
