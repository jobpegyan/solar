import { createFileRoute } from '@tanstack/react-router';
import { CalculatorLayout } from '@/components/calculator/CalculatorLayout';
import { SharedCalculator } from '@/components/calculator/SharedCalculator';
import { useState } from 'react';
import { getCalculatorById } from '@/calculators/helpers';
import { ResultsDisplay } from '@/components/ResultsDisplay';

export const Route = createFileRoute('/solar-panel-cost-calculator/india')({
  component: IndiaSolarCostCalculatorPage,
  head: () => {
    const calc = getCalculatorById('solar-panel-cost-calculator-india');
    return {
      title: calc?.seoTitle || 'Solar Panel Cost Calculator India',
      meta: [
        { name: 'description', content: calc?.seoDescription || 'Estimate solar system and installation costs in India.' },
      ],
    };
  }
});

function IndiaSolarCostCalculatorPage() {
  const [results, setResults] = useState<any>(null);
  const calc = getCalculatorById('solar-panel-cost-calculator-india');

  if (!calc) return null;

  return (
    <CalculatorLayout
      currentId={calc.id}
      title={calc.name}
      description={calc.shortDescription}
      calculator={
        <SharedCalculator
          calculatorId={calc.id}
          onResultsChange={(res) => setResults(res)}
        />
      }
      results={
        results && (
          <ResultsDisplay results={results} />
        )
      }
      faq={calc.faq}
    />
  );
}
