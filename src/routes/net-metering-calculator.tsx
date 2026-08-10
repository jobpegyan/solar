import { createFileRoute } from '@tanstack/react-router';
import React, { useState, useMemo } from 'react';
import { useSolarSettings } from '@/lib/location/location-context';
import { calculateMonthlyBill, UtilityBillingConfig } from '@/lib/calculations/utility-billing';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
const SolarChart = React.lazy(() => import('@/components/SolarChart').then(mod => ({ default: mod.SolarChart })));
import { RelatedCalculators } from '@/components/RelatedCalculators';
import { Disclaimer } from '@/components/Disclaimer';
import { formatCurrency } from '@/lib/currency/currency-utils';

import { Receipt, Zap, Share2 } from 'lucide-react';

export const Route = createFileRoute('/net-metering-calculator')({
  component: NetMeteringCalculator,
  head: () => ({
    title: "Net Metering Calculator | Solar Export & Grid Offset Tool",
    meta: [
      { name: "description", content: "Calculate how net metering affects your solar savings. Model grid imports, exports, and bill offsets with our easy-to-use calculator." },
      { property: "og:title", content: "Net Metering Calculator | Solar Export & Grid Offset Tool" },
      { property: "og:description", content: "Calculate how net metering affects your solar savings. Model grid imports, exports, and bill offsets with our easy-to-use calculator." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://solarpanel-calculator.com/net-metering-calculator" },
    ],
  }),
});

function NetMeteringCalculator() {
  const { currency, country } = useSolarSettings();
  const currencySymbol = country.currencySymbol;

  const [consumption, setConsumption] = useState(1000);
  const [generation, setGeneration] = useState(800);
  const [selfConsumption, setSelfConsumption] = useState(0.4);
  const [importRate, setImportRate] = useState(0.15);
  const [exportRate, setExportRate] = useState(0.05);

  const result = useMemo(() => {
    const config: UtilityBillingConfig = {
      modelType: 'net-metering',
      fixedMonthlyCharge: 15,
      importRate,
      exportRate,
      selfConsumptionRate: selfConsumption
    };
    return calculateMonthlyBill(consumption, generation, config);
  }, [consumption, generation, selfConsumption, importRate, exportRate]);

  const chartData = [
    { name: 'Consumption', value: consumption },
    { name: 'Generation', value: generation },
    { name: 'Imported', value: result.imported },
    { name: 'Exported', value: result.exported },
    { name: 'Self-Consumed', value: result.selfConsumed }
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">

      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-charcoal mb-4">Net Metering Calculator</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Understand the flow of energy between your home, your solar panels, and the utility grid.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-solar" />
              Monthly Energy Flow
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Label>Monthly Consumption (kWh)</Label>
              <Input type="number" value={consumption} onChange={(e) => setConsumption(Number(e.target.value))} />

              <Label>Solar Generation (kWh)</Label>
              <Input type="number" value={generation} onChange={(e) => setGeneration(Number(e.target.value))} />

              <Label>Direct Usage (Self-Consumption) - {Math.round(selfConsumption * 100)}%</Label>
              <Slider value={[selfConsumption * 100]} min={0} max={100} onValueChange={([v]) => setSelfConsumption((v || 0) / 100)} />
              
              <Label>Import Rate ({currencySymbol}/kWh)</Label>
              <Input type="number" step="0.01" value={importRate} onChange={(e) => setImportRate(Number(e.target.value))} />

              <Label>Excess Export Rate ({currencySymbol}/kWh)</Label>
              <Input type="number" step="0.01" value={exportRate} onChange={(e) => setExportRate(Number(e.target.value))} />
            </div>
          </CardContent>
        </Card>

        <Card className="border-solar border-2">
          <CardHeader className="bg-solar/5">
            <CardTitle className="flex items-center gap-2">
              <Receipt className="h-5 w-5 text-solar" />
              Grid Interaction Results
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-4 bg-slate-50 rounded-lg">
                <div className="text-xs text-slate-500 uppercase font-bold mb-1">Grid Imports</div>
                <div className="text-xl font-bold">{result.imported.toFixed(0)} kWh</div>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg">
                <div className="text-xs text-slate-500 uppercase font-bold mb-1">Grid Exports</div>
                <div className="text-xl font-bold">{result.exported.toFixed(0)} kWh</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-600">Bill Without Solar:</span>
                <span className="font-semibold">{formatCurrency(result.billWithoutSolar, currency, currencySymbol)}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-600">Bill With Solar:</span>
                <span className="font-semibold">{formatCurrency(result.billWithSolar, currency, currencySymbol)}</span>
              </div>
              <div className="flex justify-between border-b pb-2 text-green-600">
                <span className="font-medium">Monthly Savings:</span>
                <span className="font-bold">{formatCurrency(result.savings, currency, currencySymbol)}</span>
              </div>
            </div>

            <div className="h-[200px] mt-4">
              <React.Suspense fallback={<div className="h-full w-full flex items-center justify-center bg-slate-50 rounded-lg animate-pulse text-muted-foreground">Loading chart...</div>}>
                <SolarChart data={chartData} xKey="name" yKey="value" type="bar" />
              </React.Suspense>
            </div>
          </CardContent>
        </Card>
      </div>

      <Disclaimer context="Net Metering Calculation" />

      <div className="mt-12">
        <RelatedCalculators currentId="net-metering-calculator" />
      </div>
    </div>
  );
}
