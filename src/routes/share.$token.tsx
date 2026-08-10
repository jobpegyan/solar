import React from 'react';
import { createFileRoute, notFound, Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { useServerFn } from '@tanstack/react-start';
import { getSavedCalculation } from '@/lib/saved-calculations.functions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Globe, Calendar, Zap, Layout, TrendingUp, Sun } from 'lucide-react';

export const Route = createFileRoute('/share/$token')({
  component: SharedCalculationView,
  head: ({ loaderData }) => ({
    title: 'Shared Solar Calculation Result',
    meta: [
      { name: 'robots', content: 'noindex, nofollow' },
      { name: 'description', content: 'View a shared solar energy calculation estimate.' },
    ],
  }),
});

function SharedCalculationView() {
  const { token } = Route.useParams();
  const getCalcFn = useServerFn(getSavedCalculation);

  const { data: calculation, isLoading, error } = useQuery({
    queryKey: ['shared-calculation', token],
    queryFn: () => getCalcFn({ data: token })
  });

  if (isLoading) return <div className="container mx-auto px-4 py-20 text-center">Loading calculation...</div>;
  if (error || !calculation || !calculation.is_public) throw notFound();

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <Link to="/" className="inline-flex items-center gap-2 mb-6">
          <div className="p-2 bg-solar rounded-lg">
            <Sun className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tighter">SolarPanelCalculator</span>
        </Link>
        <div className="flex items-center justify-center gap-3 mb-4">
          <Badge variant="outline" className="text-solar border-solar/20 uppercase tracking-tighter">
            Shared Estimate
          </Badge>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {new Date(calculation.created_at).toLocaleDateString()}
          </span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">{calculation.name}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <Card className="bg-solar/5 border-solar/20 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground uppercase tracking-wider">Market</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold flex items-center gap-2">
              <Globe className="w-5 h-5 text-solar" />
              {calculation.country}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-solar/5 border-solar/20 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground uppercase tracking-wider">Currency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{calculation.currency}</div>
          </CardContent>
        </Card>
        <Card className="bg-solar/5 border-solar/20 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground uppercase tracking-wider">System Info</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold uppercase">{calculation.units} Units</div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-12 bg-white p-8 md:p-12 rounded-[2.5rem] border shadow-sm">
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Layout className="w-6 h-6 text-solar" />
            Project Inputs
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {Object.entries(calculation.inputs).map(([key, val]: [string, any]) => (
              <div key={key}>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">{key.replace(/([A-Z])/g, ' $1')}</p>
                <p className="font-semibold text-slate-900">{typeof val === 'boolean' ? (val ? 'Yes' : 'No') : val}</p>
              </div>
            ))}
          </div>
        </section>

        <Separator />

        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-solar" />
            Estimated Results
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
            {Object.entries(calculation.results).map(([key, val]: [string, any]) => {
              if (typeof val === 'object' || key === 'inputs') return null;
              return (
                <div key={key} className="flex justify-between items-center py-3 border-b border-slate-100">
                  <span className="text-slate-600 text-sm font-medium">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                  <span className="font-bold text-lg">{typeof val === 'number' ? val.toLocaleString() : val}</span>
                </div>
              );
            })}
          </div>
        </section>

        <div className="pt-8 text-center border-t">
          <p className="text-sm text-muted-foreground mb-6">
            Want to run your own solar analysis? Try our free professional calculators.
          </p>
          <Button size="lg" className="rounded-full px-8 bg-solar hover:bg-solar/90 text-white" asChild>
            <Link to="/calculators">Explore All Calculators</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
