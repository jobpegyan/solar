import React, { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { CalculatorLayout } from '@/components/calculator/CalculatorLayout';
import { SharedCalculator } from '@/components/calculator/SharedCalculator';
import { ResultsDisplay } from '@/components/ResultsDisplay';
import { getCalculatorById } from '@/calculators/helpers';

export const Route = createFileRoute('/electricity-bill-to-solar-size-calculator')({
  component: ElectricityBillToSolarSizePage,
  head: () => {
    const calc = getCalculatorById('electricity-bill-to-solar-size-calculator');
    return {
      title: calc?.seoTitle || 'Electricity Bill to Solar Size Calculator',
      meta: [{ name: 'description', content: calc?.seoDescription || '' }],
    };
  }
});

function ElectricityBillToSolarSizePage() {
  const [results, setResults] = useState<any>(null);
  const calc = getCalculatorById('electricity-bill-to-solar-size-calculator');
  if (!calc) return null;

  return (
    <CalculatorLayout
      currentId={calc.id}
      title={calc.name}
      description={calc.shortDescription}
      calculator={<SharedCalculator fixedMode="bill" calculatorId={calc.id} onResultsChange={setResults} />}
      results={results && <ResultsDisplay results={results} />}
      faq={calc.faq}
    />
  );
}
