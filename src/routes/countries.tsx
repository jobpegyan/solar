import { createFileRoute, Link } from '@tanstack/react-router';
import { getEnabledCountries } from '@/lib/data/countries';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Globe, ArrowRight } from 'lucide-react';
import { formatCurrency } from '@/lib/currency/currency-utils';

export const Route = createFileRoute('/countries')({
  component: CountriesDirectory,
  head: () => ({
    title: 'Solar Calculator Supported Countries | Global Solar Planning',
    meta: [
      { name: 'description', content: 'Explore our supported countries for localized solar energy estimates, cost analysis, and savings projections.' },
    ],
  }),
});

function CountriesDirectory() {
  const countries = getEnabledCountries();
  
  // Group by continent for better UI
  const regions = {
    'North America': countries.filter(c => ['US', 'CA'].includes(c.code)),
    'Oceania': countries.filter(c => ['AU', 'NZ'].includes(c.code)),
    'Europe': countries.filter(c => ['GB', 'DE', 'FR', 'ES', 'IT', 'NL'].includes(c.code)),
    'Asia': countries.filter(c => ['IN'].includes(c.code)),
    'Africa': countries.filter(c => ['ZA'].includes(c.code)),
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Supported Countries</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          We provide localized solar data for 12+ primary markets, with manual override support for the rest of the world.
        </p>
      </div>

      <div className="space-y-16">
        {Object.entries(regions).map(([region, countryList]) => (
          countryList.length > 0 && (
            <div key={region} className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-2 border-b pb-2">
                <Globe className="w-6 h-6 text-solar" />
                {region}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {countryList.map((c) => (
                  <Card key={c.code} className="hover:border-solar transition-colors group">
                    <CardHeader>
                      <CardTitle>{c.name}</CardTitle>
                      <CardDescription>{c.officialName || c.name}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="bg-slate-50 p-2 rounded">
                          <span className="text-muted-foreground block">Currency</span>
                          <span className="font-bold">{c.currency} ({c.currencySymbol})</span>
                        </div>
                        <div className="bg-slate-50 p-2 rounded">
                          <span className="text-muted-foreground block">Units</span>
                          <span className="font-bold">{c.measurementSystem}</span>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t space-y-2">
                        <Link 
                          to="/solar-calculator/world" 
                          className="text-sm font-medium flex items-center justify-between group-hover:text-solar"
                        >
                          Solar Calculator
                          <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
                        </Link>
                        {/* Placeholder for country-specific routes once content exists */}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
}
