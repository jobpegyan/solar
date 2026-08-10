import { createFileRoute } from '@tanstack/react-router';
import { CalculatorLayout } from '@/components/calculator/CalculatorLayout';
import { SharedCalculator } from '@/components/calculator/SharedCalculator';
import { useState } from 'react';
import { getCalculatorById } from '@/calculators/helpers';
import { ResultsDisplay } from '@/components/ResultsDisplay';

export const Route = createFileRoute('/solar-payback-period-calculator/india')({
  component: IndiaSolarPaybackCalculatorPage,
  head: () => {
    const calc = getCalculatorById('solar-payback-period-calculator-india');
    return {
      title: calc?.seoTitle || 'Solar Payback Period Calculator India',
      meta: [
        { name: 'description', content: calc?.seoDescription || 'Estimate how many years it will take for your solar savings to cover the initial investment cost in India.' },
      ],
    };
  }
});

function IndiaSolarPaybackCalculatorPage() {
  const [results, setResults] = useState<any>(null);
  const calc = getCalculatorById('solar-payback-period-calculator-india');

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
