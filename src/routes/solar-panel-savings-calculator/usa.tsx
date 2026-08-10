import { createFileRoute } from '@tanstack/react-router';
import { CalculatorLayout } from '@/components/calculator/CalculatorLayout';
import { SharedCalculator } from '@/components/calculator/SharedCalculator';
import { useState } from 'react';
import { getCalculatorById } from '@/calculators/helpers';
import { ResultsDisplay } from '@/components/ResultsDisplay';

export const Route = createFileRoute('/solar-panel-savings-calculator/usa')({
  component: USASolarSavingsCalculatorPage,
  head: () => {
    const calc = getCalculatorById('solar-panel-savings-calculator-usa');
    return {
      title: calc?.seoTitle || 'Solar Savings Calculator USA',
      meta: [
        { name: 'description', content: calc?.seoDescription || 'Estimate potential solar electricity savings in the USA.' },
      ],
    };
  }
});

function USASolarSavingsCalculatorPage() {
  const [results, setResults] = useState<any>(null);
  const calc = getCalculatorById('solar-panel-savings-calculator-usa');

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

