import { createFileRoute, Link } from '@tanstack/react-router';
import { useSolarSettings } from '@/lib/location/location-context';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { ShieldCheck, ArrowRight, MapPin, Globe, Landmark } from 'lucide-react';

export const Route = createFileRoute('/solar-incentives/')({
  component: SolarIncentivesHub,
});

function SolarIncentivesHub() {
  const hubData = [
    {
      name: 'United States',
      code: 'USA',
      flag: '🇺🇸',
      description: 'Federal ITC (30% Tax Credit), state rebates, and utility incentives.',
      link: '/solar-incentives/usa',
      count: '50+ Programs'
    },
    {
      name: 'India',
      code: 'India',
      flag: '🇮🇳',
      description: 'PM-Surya Ghar subsidies, state-level DISCOM incentives.',
      link: '/solar-incentives/india',
      count: '28+ States'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">

      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-charcoal mb-6">Solar Incentives Directory</h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          Solar panels are more affordable than ever thanks to government subsidies and tax credits. Explore programs available in your region.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {hubData.map((hub) => (
          <Card key={hub.code} className="hover:shadow-lg transition-shadow border-solar/20">
            <CardHeader>
              <div className="flex justify-between items-start">
                <span className="text-4xl mb-4">{hub.flag}</span>
                <Badge variant="secondary" className="bg-solar/10 text-charcoal">{hub.count}</Badge>
              </div>
              <CardTitle className="text-2xl">{hub.name} Solar Incentives</CardTitle>
              <CardDescription className="text-base mt-2">{hub.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full bg-solar text-charcoal hover:bg-solar/90">
                <Link to={hub.link}>
                  Explore {hub.name} Programs
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-slate-50 rounded-3xl p-8 md:p-12 mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <Landmark className="h-12 w-12 text-solar mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Why Incentives Matter</h2>
          <p className="text-slate-600 mb-8">
            Incentives can reduce the net cost of a solar installation by 30% to 70%, drastically shortening your payback period. Most programs have expiration dates or limited funding—calculating your potential savings early is key.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            <div className="flex gap-3">
              <ShieldCheck className="h-5 w-5 text-green-600 shrink-0" />
              <span className="text-sm font-medium">Verified Sources</span>
            </div>
            <div className="flex gap-3">
              <ShieldCheck className="h-5 w-5 text-green-600 shrink-0" />
              <span className="text-sm font-medium">Daily Updates</span>
            </div>
            <div className="flex gap-3">
              <ShieldCheck className="h-5 w-5 text-green-600 shrink-0" />
              <span className="text-sm font-medium">Location Sensitive</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
