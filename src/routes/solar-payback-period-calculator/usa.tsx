import { createFileRoute } from '@tanstack/react-router';
import { CalculatorLayout } from '@/components/calculator/CalculatorLayout';
import { SharedCalculator } from '@/components/calculator/SharedCalculator';
import { useState } from 'react';
import { getCalculatorById } from '@/calculators/helpers';
import { ResultsDisplay } from '@/components/ResultsDisplay';

export const Route = createFileRoute('/solar-payback-period-calculator/usa')({
  component: USASolarPaybackCalculatorPage,
  head: () => {
    const calc = getCalculatorById('solar-payback-period-calculator-usa');
    return {
      title: calc?.seoTitle || 'Solar Payback Period Calculator USA',
      meta: [
        { name: 'description', content: calc?.seoDescription || 'Calculate estimated time for solar investment to pay for itself in the USA.' },
      ],
    };
  }
});

function USASolarPaybackCalculatorPage() {
  const [results, setResults] = useState<any>(null);
  const calc = getCalculatorById('solar-payback-period-calculator-usa');

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
      results={results && <ResultsDisplay results={results} />}
      faq={calc.faq}
    />
  );
}

