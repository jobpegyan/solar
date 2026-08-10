import { createFileRoute } from '@tanstack/react-router';
import { SharedCalculator } from '@/components/calculator/SharedCalculator';
import { ResultsDisplay } from '@/components/ResultsDisplay';
import { CalculatorSEOLayout } from '@/components/seo/CalculatorSEOLayout';
import { getSEOData } from '@/seo/calculator-seo';
import { RelatedCalculators } from '@/components/RelatedCalculators';
import { Disclaimer } from '@/components/Disclaimer';
import { useState } from 'react';

const calculatorId = 'solar-energy-production-calculator';

export const Route = createFileRoute('/solar-energy-production-calculator')({
  component: EnergyProductionCalculatorPage,
  head: () => {
    const seo = getSEOData(calculatorId);
    return {
      title: seo?.seoTitle || 'Solar Energy Production Calculator',
      meta: [
        { name: 'description', content: seo?.seoDescription || '' },
        { property: 'og:title', content: seo?.seoTitle || '' },
        { property: 'og:description', content: seo?.seoDescription || '' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      links: [
        { rel: 'canonical', href: `https://solarpanel-calculator.com/solar-energy-production-calculator` },
      ],
    };
  },
});

function EnergyProductionCalculatorPage() {
  const [results, setResults] = useState<any>(null);
  const seo = getSEOData(calculatorId);

  if (!seo) return null;

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <CalculatorSEOLayout seoData={seo}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <SharedCalculator 
              calculatorId={calculatorId}
              onResultsChange={setResults}
            />
          </div>
          <div className="space-y-8">
            {results ? (
              <ResultsDisplay results={results} />
            ) : (
              <div className="h-full flex items-center justify-center border-dashed bg-slate-50 min-h-[400px] rounded-xl border">
                <div className="text-center p-8">
                  <p className="text-slate-500 font-medium">Enter your details to see projected energy production</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CalculatorSEOLayout>
      
      <div className="mt-12 space-y-12">
        <Disclaimer context="energy production estimates" />
        <RelatedCalculators currentId={calculatorId} />
      </div>
    </div>
  );
}
