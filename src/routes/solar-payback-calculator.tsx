import React, { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp, Info, Zap, ShieldCheck, ArrowRight, Wallet, MapPin, Sun } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RelatedCalculators } from "@/components/RelatedCalculators";
import { SolarChart } from "@/components/SolarChart";
import { Disclaimer } from "@/components/Disclaimer";
import { LocationSelector } from "@/components/LocationSelector";
import { DataFreshness } from "@/components/DataFreshness";
import { useSolarSettings } from "@/lib/location/location-context";
import { formatCurrency } from "@/lib/currency/currency-utils";
import { getElectricityRate, electricityRates } from "@/lib/data/electricity-rates";
import { getSolarResource, solarResources } from "@/lib/data/solar-resource";
import { calculatePayback, PaybackResults } from "@/lib/calculations/solar-payback";
import { solarConfig } from "@/lib/solar-config";

export const Route = createFileRoute("/solar-payback-calculator")({
  head: () => ({
    title: "Solar Payback Calculator – Calculate ROI & Break-Even Point",
    meta: [
      {
        name: "description",
        content: "Calculate how many years it will take for your solar panels to pay for themselves. Get accurate ROI estimates based on your location and utility rates.",
      },
      { property: "og:title", content: "Solar Payback Calculator – Break-Even Estimates" },
      { property: "og:description", content: "Determine your solar investment's break-even point and lifetime savings." },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PaybackCalculator,
});

function PaybackCalculator() {
  const { country, region, currency } = useSolarSettings();
  
  const [systemSize, setSystemSize] = useState<number>(5);
  const [systemCost, setSystemCost] = useState<number>(15000);
  const [subsidy, setSubsidy] = useState<number>(4500);
  const [monthlyBill, setMonthlyBill] = useState<number>(150);
  const [rate, setRate] = useState<number>(country.defaultElectricityRate || 0.15);
  const [maintenance, setMaintenance] = useState<number>(150);
  
  const [results, setResults] = useState<PaybackResults | null>(null);

  useEffect(() => {
    const resource = getSolarResource(country.code, region?.code);
    const res = calculatePayback({
      systemSizeKW: systemSize,
      systemCost: systemCost,
      subsidy: subsidy,
      monthlyBill: monthlyBill,
      tariffPerKWh: rate,
      annualMaintenanceCost: maintenance,
      peakSunHours: resource.peakSunHours,
      performanceRatio: resource.performanceRatio
    });
    setResults(res);
  }, [systemSize, systemCost, subsidy, monthlyBill, rate, maintenance, country, region]);

  // Update rates when location changes
  useEffect(() => {
    const regionalRate = getElectricityRate(country.code, region?.code);
    setRate(regionalRate);
    
    // Set a default system cost based on country if not manually edited?
    // For now keep the default 15000 but user can override.
  }, [country, region]);

  const rateInfo = electricityRates.find(r => r.countryCode === country.code && r.regionCode === region?.code);

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-solar/10 rounded-full mb-4">
          <TrendingUp className="w-8 h-8 text-solar" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Solar Payback Calculator</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Calculate your return on investment and see exactly when your solar panels will pay for themselves.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-7 space-y-6">
          <LocationSelector />

          <Card>
            <CardHeader>
              <CardTitle>Investment Details</CardTitle>
              <CardDescription>Enter the total cost and any incentives.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="systemCost">Total System Cost ({currency})</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-muted-foreground">{country.currencySymbol}</span>
                    <Input
                      id="systemCost"
                      type="number"
                      className="pl-8"
                      value={systemCost}
                      onChange={(e) => setSystemCost(Number(e.target.value))}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subsidy">Subsidies / Incentives ({currency})</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-muted-foreground">{country.currencySymbol}</span>
                    <Input
                      id="subsidy"
                      type="number"
                      className="pl-8"
                      value={subsidy}
                      onChange={(e) => setSubsidy(Number(e.target.value))}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Energy & Tariff</CardTitle>
              <CardDescription>Enter your system size and utility information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="systemSize">System Size (kW)</Label>
                  <Input
                    id="systemSize"
                    type="number"
                    value={systemSize}
                    onChange={(e) => setSystemSize(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="monthlyBill">Avg. Monthly Bill ({currency})</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-muted-foreground">{country.currencySymbol}</span>
                    <Input
                      id="monthlyBill"
                      type="number"
                      className="pl-8"
                      value={monthlyBill}
                      onChange={(e) => setMonthlyBill(Number(e.target.value))}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="rate">Electricity Rate ({currency}/kWh)</Label>
                    {rateInfo && <DataFreshness date={rateInfo.lastUpdated} source={rateInfo.source} />}
                  </div>
                  <Input
                    id="rate"
                    type="number"
                    step="0.01"
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maintenance">Annual Maintenance ({currency})</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-muted-foreground">{country.currencySymbol}</span>
                    <Input
                      id="maintenance"
                      type="number"
                      className="pl-8"
                      value={maintenance}
                      onChange={(e) => setMaintenance(Number(e.target.value))}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <Card className="border-solar border-2 sticky top-24">
            <CardHeader className="bg-solar/5">
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-solar" />
                Payback Estimate
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="text-center p-6 bg-slate-50 rounded-2xl">
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest mb-1">Break-Even Point</p>
                <div className="text-5xl font-bold text-solar">{results?.paybackYears} <span className="text-xl">Years</span></div>
                <div className="flex items-center justify-center gap-1 text-sm text-green-600 mt-2 font-medium">
                  <TrendingUp className="w-4 h-4" />
                  Estimated ROI
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm border-b pb-2">
                  <span className="text-muted-foreground">Net Investment:</span>
                  <span className="font-semibold">{formatCurrency(results?.netInvestment || 0, currency)}</span>
                </div>
                <div className="flex justify-between items-center text-sm border-b pb-2">
                  <span className="text-muted-foreground">Est. Annual Savings:</span>
                  <span className="font-semibold text-green-600">+{formatCurrency(results?.annualSavings || 0, currency)}</span>
                </div>
                <div className="flex justify-between items-center text-sm border-b pb-2">
                  <span className="text-muted-foreground">Lifetime Savings (25y):</span>
                  <span className="font-semibold">{formatCurrency(results?.lifetimeSavings || 0, currency)}</span>
                </div>
                
                <div className="p-3 bg-blue-50 rounded-lg text-[11px] text-blue-800 leading-relaxed border border-blue-100">
                  <p><strong>Location:</strong> {region ? `${region.name}, ` : ""}{country.name}</p>
                  <p><strong>Electricity Rate:</strong> {country.currencySymbol}{rate}/kWh</p>
                  <p><strong>Annual Increase:</strong> {solarConfig.defaultAnnualPriceIncrease * 100}%</p>
                </div>
              </div>

              <Disclaimer context="solar payback calculation" />
            </CardContent>
          </Card>
        </div>
      </div>

      {results && results.cumulativeCashflow && (
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Payback Timeline</CardTitle>
            <CardDescription>Cumulative savings vs. initial investment over 25 years.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <SolarChart 
                data={results.cumulativeCashflow} 
                type="line"
                xKey="year"
                yKey="cashflow"
                yKey2="investment"
              />
            </div>
          </CardContent>
        </Card>
      )}

      <section className="prose prose-slate max-w-none mb-16">
        <h2 className="text-3xl font-bold mb-6 text-center">Solar ROI: What You Need to Know</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 not-prose">
          <div className="p-6 bg-slate-50 rounded-xl">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
              <Zap className="w-5 h-5 text-solar" />
              Electricity Rates
            </h3>
            <p className="text-sm text-muted-foreground">
              The higher your utility rate, the faster your payback period. Solar becomes much more attractive in regions with expensive electricity like California or Massachusetts.
            </p>
          </div>
          <div className="p-6 bg-slate-50 rounded-xl">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
              <Wallet className="w-5 h-5 text-solar" />
              Incentives & Tax Credits
            </h3>
            <p className="text-sm text-muted-foreground">
              In the US, the 30% Federal Investment Tax Credit (ITC) significantly reduces the net cost. In India, PM-Surya Ghar subsidies play a similar role in speeding up ROI.
            </p>
          </div>
          <div className="p-6 bg-slate-50 rounded-xl">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
              <Sun className="w-5 h-5 text-solar" />
              Solar Resource
            </h3>
            <p className="text-sm text-muted-foreground">
              A system in Arizona will generate more energy (and save more money) than the exact same system in Washington state, leading to a shorter payback period.
            </p>
          </div>
        </div>
      </section>

      <RelatedCalculators currentId="solar-payback-calculator" />
    </div>
  );
}
