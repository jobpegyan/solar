import { createFileRoute } from '@tanstack/react-router';
import { MainCalculator } from '@/components/MainCalculator';
import { ResultsDisplay } from '@/components/ResultsDisplay';
import { useSolarSettings } from '@/lib/location/location-context';
import { useEffect, useState } from 'react';

const createCountryRoute = (countryCode: string, countryName: string) => {
  return function CountryCalculator() {
    const { setCountry } = useSolarSettings();
    const [results, setResults] = useState(null);

    useEffect(() => {
      setCountry(countryCode);
    }, []);

    return (
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <h1 className="text-4xl font-extrabold mb-8">Solar Calculator {countryName}</h1>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <MainCalculator onResultsChange={setResults} />
          </div>
          <div className="lg:col-span-7">
            {results && <ResultsDisplay results={results} />}
          </div>
        </div>
      </div>
    );
  };
};

export const Route = createFileRoute('/solar-calculator/south-africa')({
  component: createCountryRoute('ZA', 'South Africa'),
});
