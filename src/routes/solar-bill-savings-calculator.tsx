import { createFileRoute } from '@tanstack/react-router';
import { SharedCalculator } from '@/components/calculator/SharedCalculator';
import { FinancialResults } from '@/components/calculator/FinancialResults';
import { CalculatorSEOLayout } from '@/components/seo/CalculatorSEOLayout';
import { getSEOData } from '@/seo/calculator-seo';
import { RelatedCalculators } from '@/components/RelatedCalculators';
import { Disclaimer } from '@/components/Disclaimer';
import { useState } from 'react';

const calculatorId = 'solar-bill-savings-calculator';

export const Route = createFileRoute('/solar-bill-savings-calculator')({
  component: BillSavingsCalculatorPage,
  head: () => {
    const seo = getSEOData(calculatorId);
    return {
      title: seo?.seoTitle || 'Solar Bill Savings Calculator',
      meta: [
        { name: 'description', content: seo?.seoDescription || '' },
        { property: 'og:title', content: seo?.seoTitle || '' },
        { property: 'og:description', content: seo?.seoDescription || '' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      links: [
        { rel: 'canonical', href: `https://solarpanel-calculator.com/solar-bill-savings-calculator` },
      ],
    };
  },
});

function BillSavingsCalculatorPage() {
  const [results, setResults] = useState<any>(null);
  const seo = getSEOData(calculatorId);

  if (!seo) return null;

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <CalculatorSEOLayout seoData={seo}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <SharedCalculator 
              calculatorId={calculatorId}
              onResultsChange={(res) => setResults(res)}
            />
          </div>
          <div className="lg:col-span-7">
            {results && <FinancialResults results={results} type="bill" />}
          </div>
        </div>
      </CalculatorSEOLayout>
      
      <div className="mt-12 space-y-12">
        <Disclaimer context="bill savings estimates" />
        <RelatedCalculators currentId={calculatorId} />
      </div>
    </div>
  );
}
