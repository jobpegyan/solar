import React from 'react';
import { createFileRoute, notFound, Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { useServerFn } from '@tanstack/react-start';
import { getSavedCalculation } from '@/lib/saved-calculations.functions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Share2, ArrowLeft, Globe, Calendar, Zap, Layout, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';

export const Route = createFileRoute('/_authenticated/dashboard/calculations/$id')({
  component: CalculationView,
});

function CalculationView() {
  const { id } = Route.useParams();
  const getCalcFn = useServerFn(getSavedCalculation);

  const { data: calculation, isLoading } = useQuery({
    queryKey: ['saved-calculation', id],
    queryFn: () => getCalcFn({ data: id })
  });

  if (isLoading) return <div className="container mx-auto px-4 py-20 text-center">Loading calculation...</div>;
  if (!calculation) throw notFound();

  const handleShare = () => {
    const url = `${window.location.origin}/share/${calculation.share_token}`;
    navigator.clipboard.writeText(url);
    toast.success("Share link copied to clipboard");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link to="/dashboard/calculations" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-solar mb-8">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </Link>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Badge variant="outline" className="text-solar border-solar/20 uppercase tracking-tighter">
              {calculation.calculator_id.split('-').join(' ')}
            </Badge>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date(calculation.created_at).toLocaleDateString()}
            </span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight">{calculation.name}</h1>
        </div>
        <Button className="gap-2" onClick={handleShare}>
          <Share2 className="w-4 h-4" /> Share Results
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <Card className="bg-solar/5 border-solar/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground uppercase tracking-wider">Region</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold flex items-center gap-2">
              <Globe className="w-5 h-5 text-solar" />
              {calculation.country}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-solar/5 border-solar/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground uppercase tracking-wider">Currency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{calculation.currency}</div>
          </CardContent>
        </Card>
        <Card className="bg-solar/5 border-solar/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground uppercase tracking-wider">Units</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold uppercase">{calculation.units}</div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Layout className="w-6 h-6 text-solar" />
            Input Parameters
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(calculation.inputs).map(([key, val]: [string, any]) => (
              <div key={key} className="p-4 bg-slate-50 rounded-xl border">
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
            Calculation Results
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(calculation.results).map(([key, val]: [string, any]) => {
              if (typeof val === 'object' || key === 'inputs') return null;
              return (
                <div key={key} className="flex justify-between items-center p-4 border-b">
                  <span className="text-slate-600 font-medium">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                  <span className="font-bold text-lg">{typeof val === 'number' ? val.toLocaleString() : val}</span>
                </div>
              );
            })}
          </div>
        </section>

        <Card className="bg-slate-900 text-white p-8 rounded-3xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-solar/20 rounded-lg">
              <Zap className="w-6 h-6 text-solar" />
            </div>
            <h3 className="text-xl font-bold">Calculation Insights</h3>
          </div>
          <p className="text-white/70 leading-relaxed mb-6">
            This calculation was generated using the {calculation.calculator_id.split('-').join(' ')} engine ({calculation.formula_version}).
            It accounts for regional solar resource data, local electricity rates, and equipment efficiency assumptions verified for the {calculation.country} market.
          </p>
          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10" asChild>
            <Link to={calculation.calculator_slug as any}>Re-run Calculator</Link>
          </Button>
        </Card>
      </div>
    </div>
  );
}
