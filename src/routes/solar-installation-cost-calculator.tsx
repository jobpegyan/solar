import { createFileRoute } from '@tanstack/react-router';
import { CalculatorLayout } from '@/components/calculator/CalculatorLayout';
import { SharedCalculator } from '@/components/calculator/SharedCalculator';
import { FinancialResults } from '@/components/calculator/FinancialResults';
import { useState } from 'react';

export const Route = createFileRoute('/solar-installation-cost-calculator')({
  component: InstallationCostCalculatorPage,
  head: () => ({
    title: "Solar Installation Cost Calculator — Estimate Project Costs",
    meta: [
      { name: "description", content: "Estimate solar installation and project costs using system size, cost per watt, labor, equipment and other project expenses." },
      { property: "og:title", content: "Solar Installation Cost Calculator — Estimate Project Costs" },
      { property: "og:description", content: "Estimate solar installation and project costs using system size, cost per watt, labor, equipment and other project expenses." }
    ],
  }),
});

function InstallationCostCalculatorPage() {
  const [results, setResults] = useState<any>(null);

  return (
    <CalculatorLayout
      title="Solar Installation Cost Calculator"
      description="Estimate the labor and soft costs associated with your solar project."
      currentId="solar-installation-cost-calculator"
      calculator={
        <SharedCalculator 
          calculatorId="solar-installation-cost-calculator"
          onResultsChange={(res) => setResults(res)}
        />
      }
      results={
        results && <FinancialResults results={results} type="cost" />
      }
      faq={[
        { question: "What are the components of solar installation cost?", answer: "It typically includes labor, electrical wiring, mounting hardware, permitting, and inspection fees." }
      ]}
    />
  );
}
