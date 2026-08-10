import { createFileRoute } from '@tanstack/react-router';
import { SharedCalculator } from '@/components/calculator/SharedCalculator';
import { FinancialResults } from '@/components/calculator/FinancialResults';
import { CalculatorSEOLayout } from '@/components/seo/CalculatorSEOLayout';
import { getSEOData } from '@/seo/calculator-seo';
import { RelatedCalculators } from '@/components/RelatedCalculators';
import { Disclaimer } from '@/components/Disclaimer';
import { useState } from 'react';

const calculatorId = 'solar-panel-savings-calculator';
const seoData = getSEOData(calculatorId)!;

export const Route = createFileRoute('/solar-panel-savings-calculator')({
  component: SavingsCalculatorPage,
  head: () => ({
    title: seoData.seoTitle,
    meta: [
      { name: "description", content: seoData.seoDescription },
      { property: "og:title", content: seoData.seoTitle },
      { property: "og:description", content: seoData.seoDescription },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" }
    ],
    links: [
      { rel: "canonical", href: `https://solarpanel-calculator.com${seoData.canonical || '/solar-panel-savings-calculator'}` }
    ]
  }),
});

function SavingsCalculatorPage() {
  const [results, setResults] = useState<any>(null);

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <CalculatorSEOLayout seoData={seoData}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <SharedCalculator 
              calculatorId={calculatorId}
              onResultsChange={(res) => setResults(res)}
            />
          </div>
          <div className="lg:col-span-7">
            {results && <FinancialResults results={results} type="savings" />}
          </div>
        </div>
      </CalculatorSEOLayout>
      
      <div className="mt-12 space-y-12">
        <Disclaimer context="savings estimates" />
        <RelatedCalculators currentId={calculatorId} />
      </div>
    </div>
  );
}

