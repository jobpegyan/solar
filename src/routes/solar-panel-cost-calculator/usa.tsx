import { createFileRoute } from '@tanstack/react-router';
import { CalculatorLayout } from '@/components/calculator/CalculatorLayout';
import { SharedCalculator } from '@/components/calculator/SharedCalculator';
import { useState, useEffect } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info, Sparkles, ShieldCheck, Flag } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { getCalculatorById } from '@/calculators/helpers';
import { ResultsDisplay } from '@/components/ResultsDisplay';
import { useSolarSettings } from '@/lib/location/location-context';

export const Route = createFileRoute('/solar-panel-cost-calculator/usa')({
  component: USASolarCostCalculatorPage,
  head: () => {
    const calc = getCalculatorById('solar-panel-cost-calculator-usa');
    return {
      title: calc?.seoTitle || 'Solar Panel Cost Calculator USA — Estimate Installation Cost',
      meta: [
        { name: 'description', content: calc?.seoDescription || 'Estimate solar system and installation costs across the United States.' },
        { property: 'og:title', content: 'USA Solar Panel Cost Calculator' },
        { property: 'og:description', content: 'Calculate gross & net solar installation costs in the USA with 30% Federal ITC Tax Credit.' },
      ],
    };
  }
});

function USASolarCostCalculatorPage() {
  const [results, setResults] = useState<any>(null);
  const calc = getCalculatorById('solar-panel-cost-calculator-usa');
  const { country, region, setCountry, setRegion } = useSolarSettings();

  useEffect(() => {
    if (country.code !== 'US') {
      setCountry('US');
    }
  }, [country.code, setCountry]);

  if (!calc) return null;

  const topStates = [
    { code: 'CA', name: 'California' },
    { code: 'TX', name: 'Texas' },
    { code: 'FL', name: 'Florida' },
    { code: 'NY', name: 'New York' },
    { code: 'AZ', name: 'Arizona' },
    { code: 'PA', name: 'Pennsylvania' },
    { code: 'NC', name: 'North Carolina' },
    { code: 'IL', name: 'Illinois' },
    { code: 'OH', name: 'Ohio' },
    { code: 'GA', name: 'Georgia' },
  ];

  return (
    <CalculatorLayout
      currentId={calc.id}
      title="USA Solar Panel Cost Calculator"
      description="Estimate residential solar system costs, 30% federal tax credit savings, equipment costs, and payback timeline for your US state."
      heroContent={
        <div className="mt-6 space-y-4 max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-xs font-semibold">
              <Flag className="w-3.5 h-3.5 text-blue-600" />
              US Regional Rates Active
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              30% Federal Solar ITC Included
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              2026 Updated Market Pricing
            </span>
          </div>

          <div className="bg-white/90 backdrop-blur border p-4 rounded-2xl shadow-sm text-center">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Select US State for Instant Local Rates:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {topStates.map((st) => (
                <button
                  key={st.code}
                  onClick={() => setRegion(st.code)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    region?.code === st.code
                      ? 'bg-solar text-white font-bold shadow-md scale-105'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {st.name}
                </button>
              ))}
            </div>
          </div>

          <Alert className="bg-emerald-50/80 border-emerald-200 text-emerald-950">
            <Info className="h-4 w-4 text-emerald-600" />
            <AlertTitle className="font-semibold text-emerald-900">2026 Federal Solar Tax Credit (Section 25D)</AlertTitle>
            <AlertDescription className="text-xs text-emerald-800">
              Homeowners across all 50 states are eligible for a 30% Federal Investment Tax Credit on total solar system cost (equipment & labor). State-specific rebates and net-metering rules vary. Read our <Link to="/disclaimer" className="underline font-semibold">disclaimer</Link>.
            </AlertDescription>
          </Alert>
        </div>
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
