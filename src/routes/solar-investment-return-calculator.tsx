import { createFileRoute } from '@tanstack/react-router';
import { CalculatorLayout } from '@/components/calculator/CalculatorLayout';
import { SharedCalculator } from '@/components/calculator/SharedCalculator';
import { FinancialResults } from '@/components/calculator/FinancialResults';
import { useState } from 'react';

export const Route = createFileRoute('/solar-investment-return-calculator')({
  component: InvestmentReturnCalculatorPage,
  head: () => ({
    title: "Solar Investment Return Calculator — Estimate Solar Returns",
    meta: [
      { name: "description", content: "Estimate long-term solar savings, net gain, payback and simple return using project cost and energy savings assumptions." },
      { property: "og:title", content: "Solar Investment Return Calculator — Estimate Solar Returns" },
      { property: "og:description", content: "Estimate long-term solar savings, net gain, payback and simple return using project cost and energy savings assumptions." }
    ],
  }),
});

function InvestmentReturnCalculatorPage() {
  const [results, setResults] = useState<any>(null);

  return (
    <CalculatorLayout
      title="Solar Investment Return Calculator"
      description="Project the long-term financial performance of your solar energy system."
      currentId="solar-investment-return-calculator"
      calculator={
        <SharedCalculator 
          calculatorId="solar-investment-return-calculator"
          onResultsChange={(res) => setResults(res)}
        />
      }
      results={
        results && <FinancialResults results={results} type="roi" />
      }
      faq={[
        { question: "Is solar a good financial investment?", answer: "For most homeowners in sunny regions with high electricity rates, solar offers an internal rate of return (IRR) that beats traditional savings accounts." }
      ]}
    />
  );
}
