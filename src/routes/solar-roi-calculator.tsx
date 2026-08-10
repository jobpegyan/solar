import { createFileRoute } from '@tanstack/react-router';
import React, { useState, useMemo } from 'react';
import { useSolarSettings } from '@/lib/location/location-context';
import { calculateLongTermProjection, PaybackConfig, findBreakEvenYear } from '@/lib/calculations/solar-payback';
import { BillResult } from '@/lib/calculations/utility-billing';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
const SolarChart = React.lazy(() => import('@/components/SolarChart').then(mod => ({ default: mod.SolarChart })));
import { RelatedCalculators } from '@/components/RelatedCalculators';
import { Disclaimer } from '@/components/Disclaimer';
import { formatCurrency } from '@/lib/currency/currency-utils';
import { TrendingUp, Wallet, ShieldCheck, Clock } from 'lucide-react';


export const Route = createFileRoute('/solar-roi-calculator')({
  component: SolarROICalculator,
  head: () => ({
    title: "Solar ROI Calculator | 25-Year Financial Projection",
    meta: [
      { name: "description", content: "Calculate your long-term solar return on investment. Model maintenance, panel degradation, and rising electricity costs for a realistic financial forecast." },
      { property: "og:title", content: "Solar ROI Calculator | 25-Year Financial Projection" },
      { property: "og:description", content: "Calculate your long-term solar return on investment. Model maintenance, panel degradation, and rising electricity costs for a realistic financial forecast." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://solarpanel-calculator.com/solar-roi-calculator" },
    ],
  }),
});

function SolarROICalculator() {
  const { currency, country } = useSolarSettings();
  const currencySymbol = country.currencySymbol;
  
  // Basic Financial Inputs
  const [systemCost, setSystemCost] = useState(15000);
  const [incentives, setIncentives] = useState(4500);
  const [annualSavings, setAnnualSavings] = useState(1800);
  
  // Advanced Assumptions
  const [degradation, setDegradation] = useState(0.5); // 0.5%
  const [priceIncrease, setPriceIncrease] = useState(3); // 3%
  const [maintenance, setMaintenance] = useState(150);
  
  const projection = useMemo(() => {
    // Mock BillResult for simplified ROI calculation
    const mockBill: BillResult[] = Array(12).fill(null).map(() => ({
      month: 'Jan',
      billWithoutSolar: (annualSavings / 0.8) / 12,
      billWithSolar: ((annualSavings / 0.8) - annualSavings) / 12,
      savings: annualSavings / 12,
      consumption: 1000,
      generation: 800,
      imported: 400,
      exported: 200,
      selfConsumed: 600,
      exportCompensation: 10
    }));

    const config: PaybackConfig = {
      systemCost,
      incentives,
      annualDegradation: degradation / 100,
      electricityPriceIncrease: priceIncrease / 100,
      maintenanceAnnual: maintenance,
      analysisPeriodYears: 25
    };

    return calculateLongTermProjection(mockBill, config);
  }, [systemCost, incentives, annualSavings, degradation, priceIncrease, maintenance]);

  const breakEvenYear = findBreakEvenYear(projection);
  const lastYear = projection[projection.length - 1];
  const totalBenefit = lastYear ? lastYear.cumulativeBenefit : 0;
  const roi = ((totalBenefit / Math.max(1, systemCost - incentives)) * 100).toFixed(1);

  const chartData = projection.map(p => ({
    name: `Year ${p.year}`,
    'Cumulative Benefit': p.cumulativeBenefit,
    'Annual Savings': p.savings
  }));

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">

      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-charcoal mb-4">Solar ROI Calculator</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Solar is a 25-year investment. Use our professional financial model to see your estimated break-even point and cumulative net benefit.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <Card className="lg:col-span-1 border-solar/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-solar" />
              Financial Inputs
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Label>Gross System Cost ({currencySymbol})</Label>
              <Input type="number" value={systemCost} onChange={(e) => setSystemCost(Number(e.target.value))} />

              <Label>Total Incentives ({currencySymbol})</Label>
              <Input type="number" value={incentives} onChange={(e) => setIncentives(Number(e.target.value))} />
              
              <Label>Year 1 Savings ({currencySymbol})</Label>
              <Input type="number" value={annualSavings} onChange={(e) => setAnnualSavings(Number(e.target.value))} />

              <div className="pt-4 border-t space-y-4">
                <h4 className="text-sm font-semibold text-slate-700">Advanced Assumptions</h4>
                
                <Label>Annual Degradation ({degradation}%)</Label>
                <Slider value={[degradation * 10]} min={0} max={20} step={1} onValueChange={([v]) => setDegradation((v || 0) / 10)} />
                
                <Label>Elec. Price Increase ({priceIncrease}%)</Label>
                <Slider value={[priceIncrease]} min={0} max={10} step={0.5} onValueChange={([v]) => setPriceIncrease(v || 0)} />

                <Label>Annual Maintenance ({currencySymbol})</Label>
                <Input type="number" value={maintenance} onChange={(e) => setMaintenance(Number(e.target.value))} />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className={breakEvenYear ? "bg-green-50" : "bg-red-50"}>
              <CardContent className="pt-6">
                <div className="text-sm font-medium text-slate-500 mb-1">Payback Period</div>
                <div className="text-2xl font-bold flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  {breakEvenYear ? `Year ${breakEvenYear}` : 'No break-even'}
                </div>
              </CardContent>
            </Card>
            <Card className="bg-solar/5 border-solar/20">
              <CardContent className="pt-6">
                <div className="text-sm font-medium text-solar mb-1">25-Year Net Benefit</div>
                <div className="text-2xl font-bold">{formatCurrency(totalBenefit, currency, currencySymbol)}</div>
              </CardContent>
            </Card>
            <Card className="bg-blue-50">
              <CardContent className="pt-6">
                <div className="text-sm font-medium text-blue-600 mb-1">Estimated ROI</div>
                <div className="text-2xl font-bold">{roi}%</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Cumulative Solar Benefit (25 Years)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <React.Suspense fallback={<div className="h-full w-full flex items-center justify-center bg-slate-50 rounded-lg animate-pulse text-muted-foreground">Loading chart...</div>}>
                  <SolarChart data={chartData} xKey="name" yKey="Cumulative Benefit" type="line" />
                </React.Suspense>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-slate-50 border-none">
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2 flex items-center gap-2 text-slate-700">
                  <ShieldCheck className="h-4 w-4 text-green-600" />
                  Conservative Modeling
                </h4>
                <p className="text-xs text-slate-600">
                  Our model accounts for natural performance loss over time (degradation) and typical maintenance costs, ensuring your ROI estimate is realistic, not just a best-case scenario.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-slate-50 border-none">
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2 flex items-center gap-2 text-slate-700">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                  Energy Inflation
                </h4>
                <p className="text-xs text-slate-600">
                  By modeling annual electricity price increases, we show how solar panels protect you from rising energy costs, significantly improving long-term financial returns.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Disclaimer context="Solar ROI Calculation" />
      
      <div className="mt-12">
        <RelatedCalculators currentId="solar-roi-calculator" />
      </div>
    </div>
  );
}
