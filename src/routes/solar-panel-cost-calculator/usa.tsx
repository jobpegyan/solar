import { createFileRoute } from '@tanstack/react-router';
import { CalculatorLayout } from '@/components/calculator/CalculatorLayout';
import { SharedCalculator } from '@/components/calculator/SharedCalculator';
import { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { getCalculatorById } from '@/calculators/helpers';
import { ResultsDisplay } from '@/components/ResultsDisplay';

export const Route = createFileRoute('/solar-panel-cost-calculator/usa')({
  component: USASolarCostCalculatorPage,
  head: () => {
    const calc = getCalculatorById('solar-panel-cost-calculator-usa');
    return {
      title: calc?.seoTitle || 'Solar Panel Cost Calculator USA',
      meta: [
        { name: 'description', content: calc?.seoDescription || 'Estimate solar installation costs across the United States.' },
      ],
    };
  }
});

function USASolarCostCalculatorPage() {
  const [results, setResults] = useState<any>(null);
  const calc = getCalculatorById('solar-panel-cost-calculator-usa');

  if (!calc) return null;

  return (
    <CalculatorLayout
      currentId={calc.id}
      title={calc.name}
      description={calc.shortDescription}
      heroContent={
        <Alert className="mt-6 max-w-2xl mx-auto">
          <Info className="h-4 w-4" />
          <AlertTitle>USA Solar Cost Estimates</AlertTitle>
          <AlertDescription>
            Estimating solar system and installation costs across the United States. 
            Actual installer pricing varies. 
            Read our <Link to="/disclaimer" className="underline">disclaimer</Link>.
          </AlertDescription>
        </Alert>
      }
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

