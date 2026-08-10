import React, { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { TrendingUp, Zap, Wallet, Info, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { calculateSavings, type SavingsResults } from "@/lib/calculations/solar-savings";
import { solarConfig } from "@/lib/solar-config";
import { SolarChart } from "@/components/SolarChart";
import { RelatedCalculators } from "@/components/RelatedCalculators";
import { Disclaimer } from "@/components/Disclaimer";
import { LocationSelector } from "@/components/LocationSelector";
import { DataFreshness } from "@/components/DataFreshness";
import { useSolarSettings } from "@/lib/location/location-context";
import { formatCurrency } from "@/lib/currency/currency-utils";
import { getElectricityRate, electricityRates } from "@/lib/data/electricity-rates";
import { getSolarResource } from "@/lib/data/solar-resource";

export const Route = createFileRoute("/solar-savings-calculator")({
  component: SolarSavingsCalculator,
  head: () => ({
    title: "Solar Savings Calculator – Estimate Solar Electricity Savings",
    meta: [
      { name: "description", content: "Use our solar savings calculator to estimate electricity generation, monthly savings, and long-term solar ROI based on your specific location." },
      { property: "og:title", content: "Solar Savings Calculator – Estimate Solar Energy Savings" },
      { property: "og:description", content: "Accurately predict your solar savings with our location-aware calculator." },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function SolarSavingsCalculator() {
  const { country, region, currency } = useSolarSettings();
  const search = Route.useSearch() as { systemSize?: string };
  
  const [results, setResults] = useState<SavingsResults | null>(null);
  const [mode, setMode] = useState<"usage" | "bill">("usage");
  const [tariff, setTariff] = useState<number>(country.defaultElectricityRate || 0.15);
  const [systemSize, setSystemSize] = useState<number>(parseFloat(search.systemSize || "5"));
  const [monthlyUsage, setMonthlyUsage] = useState<number>(500);
  const [monthlyBill, setMonthlyBill] = useState<number>(3500);
  const [annualIncrease, setAnnualIncrease] = useState<number>(solarConfig.defaultAnnualPriceIncrease * 100);
  const [lifetime, setLifetime] = useState<number>(solarConfig.defaultSystemLifetime);

  // Sync tariff with location changes
  useEffect(() => {
    const regionalRate = getElectricityRate(country.code, region?.code);
    setTariff(regionalRate);
  }, [country, region]);

  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    const resource = getSolarResource(country.code, region?.code);
    
    try {
      const res = calculateSavings({
        systemSizeKW: systemSize,
        tariffPerKWh: tariff,
        annualPriceIncrease: annualIncrease / 100,
        systemLifetime: lifetime,
        peakSunHours: resource.peakSunHours,
        performanceRatio: resource.performanceRatio
      });
      setResults(res);
    } catch (err) {
      console.error(err);
    }
  };

  // Auto-calculate on mount/search changes
  useEffect(() => {
    handleCalculate();
  }, [search.systemSize, country, region]);

  const rateInfo = electricityRates.find(r => r.countryCode === country.code && r.regionCode === region?.code);

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <section className="mb-12 text-center">
        <div className="inline-flex items-center justify-center p-3 bg-solar/10 rounded-full mb-4">
          <Wallet className="w-8 h-8 text-solar" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Solar Savings Calculator</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          How much money can you actually save with solar? Estimate your monthly, annual, and lifetime benefits.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        <div className="lg:col-span-5 space-y-6">
          <LocationSelector />

          <Card>
            <CardHeader>
              <CardTitle>Calculation Inputs</CardTitle>
              <CardDescription>Adjust your system size and local utility data.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCalculate} className="space-y-6">
                <Tabs defaultValue="usage" className="w-full" onValueChange={(v) => setMode(v as any)}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="usage">Energy Usage</TabsTrigger>
                    <TabsTrigger value="bill">Utility Bill</TabsTrigger>
                  </TabsList>
                  <div className="mt-4">
                    <TabsContent value="usage" className="space-y-2">
                      <Label htmlFor="monthlyUsage">Avg. Monthly Usage (kWh)</Label>
                      <Input 
                        id="monthlyUsage" 
                        type="number" 
                        value={monthlyUsage} 
                        onChange={(e) => setMonthlyUsage(Number(e.target.value))} 
                      />
                    </TabsContent>
                    <TabsContent value="bill" className="space-y-2">
                      <Label htmlFor="monthlyBill">Avg. Monthly Bill ({currency})</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-muted-foreground">{country.currencySymbol}</span>
                        <Input 
                          id="monthlyBill" 
                          className="pl-8"
                          type="number" 
                          value={monthlyBill} 
                          onChange={(e) => setMonthlyBill(Number(e.target.value))} 
                        />
                      </div>
                    </TabsContent>
                  </div>
                </Tabs>

                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="systemSize">System Size (kW)</Label>
                    <Input 
                      id="systemSize" 
                      type="number" 
                      step="0.1" 
                      value={systemSize} 
                      onChange={(e) => setSystemSize(Number(e.target.value))} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="tariff">Tariff ({currency}/kWh)</Label>
                      {rateInfo && <DataFreshness date={rateInfo.lastUpdated} source={rateInfo.source} />}
                    </div>
                    <Input 
                      id="tariff" 
                      type="number" 
                      step="0.01" 
                      value={tariff} 
                      onChange={(e) => setTariff(Number(e.target.value))} 
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="annualIncrease">Price Incr. (%/yr)</Label>
                      <Input 
                        id="annualIncrease" 
                        type="number" 
                        value={annualIncrease} 
                        onChange={(e) => setAnnualIncrease(Number(e.target.value))} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lifetime">Lifetime (Yrs)</Label>
                      <Input 
                        id="lifetime" 
                        type="number" 
                        value={lifetime} 
                        onChange={(e) => setLifetime(Number(e.target.value))} 
                      />
                    </div>
                  </div>
                </div>

                <Button type="submit" variant="solar" className="w-full">Update Results</Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-7">
          {results && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-solar border-solar text-white">
                  <CardContent className="pt-6 text-center">
                    <p className="text-sm font-bold uppercase tracking-wider opacity-80 mb-1">Annual Savings</p>
                    <div className="text-4xl font-extrabold">{formatCurrency(results.annualSavings, currency)}</div>
                    <div className="mt-2 text-sm opacity-90">{results.annualGenerationKWh.toLocaleString()} kWh/yr Generated</div>
                  </CardContent>
                </Card>
                <Card className="bg-slate-900 border-slate-900 text-white">
                  <CardContent className="pt-6 text-center">
                    <p className="text-sm font-bold uppercase tracking-wider opacity-80 mb-1">Lifetime Savings</p>
                    <div className="text-4xl font-extrabold">{formatCurrency(results.lifetimeSavings, currency)}</div>
                    <div className="mt-2 text-sm opacity-90">Over {lifetime} Years</div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl text-center border">
                  <p className="text-xs font-bold text-muted-foreground uppercase mb-1">Monthly</p>
                  <p className="text-lg font-bold">{formatCurrency(results.monthlySavings, currency)}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl text-center border">
                  <p className="text-xs font-bold text-muted-foreground uppercase mb-1">10-Year</p>
                  <p className="text-lg font-bold">{formatCurrency(results.savings10Year, currency)}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl text-center border">
                  <p className="text-xs font-bold text-muted-foreground uppercase mb-1">25-Year</p>
                  <p className="text-lg font-bold">{formatCurrency(results.savings25Year, currency)}</p>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Cumulative Savings Projection</CardTitle>
                  <CardDescription>Visualizing how your savings grow as electricity prices rise.</CardDescription>
                </CardHeader>
                <CardContent>
                  <SolarChart 
                    data={results.cumulativeSavings} 
                    xKey="year" 
                    yKey="savings" 
                    type="line" 
                    valuePrefix={country.currencySymbol}
                  />
                </CardContent>
              </Card>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button asChild variant="outline" className="flex-1">
                  <Link to="/solar-cost-calculator" search={{ systemSize: systemSize.toString() }}>
                    Check System Costs <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="flex-1">
                  <Link to="/solar-payback-calculator" search={{ systemSize: systemSize.toString() }}>
                    Calculate Payback ROI <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <section className="prose prose-slate max-w-none mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Maximizing Your Solar Return</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 not-prose">
          <div className="space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Zap className="w-5 h-5 text-solar" />
              The Escalation Effect
            </h3>
            <p className="text-muted-foreground">
              Utility companies typically raise rates by 3% to 6% annually. Every year electricity gets more expensive, your solar panels generate "free" energy that is worth more than it was the year before. This compound effect is why the lifetime savings of a solar system often exceed the initial investment by 3-5 times.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-solar" />
              Location & Orientation
            </h3>
            <p className="text-muted-foreground">
              Your specific location's "Peak Sun Hours" is the primary driver of production. However, panel orientation (facing South in the Northern Hemisphere) and tilt angle also play significant roles. A system that isn't perfectly oriented may see 10-15% less production, impacting your monthly savings.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto mb-24">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible>
          <AccordionItem value="q1">
            <AccordionTrigger>How accurate are these savings estimates?</AccordionTrigger>
            <AccordionContent>
              Our estimates use regional averages for sunlight and utility rates. For the highest accuracy, we recommend entering your exact utility tariff from a recent bill and adjusting the system size based on your actual roof space.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q2">
            <AccordionTrigger>Does the calculator account for battery storage?</AccordionTrigger>
            <AccordionContent>
              This calculator focuses on energy generation savings. While batteries allow you to store and use more of your solar power (increasing self-consumption), the primary savings come from offsetting utility purchases during daylight hours.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q3">
            <AccordionTrigger>What happens to my savings if I sell my home?</AccordionTrigger>
            <AccordionContent>
              Studies by organizations like Zillow and NREL show that solar panels typically increase home value by 4.1% on average. You don't just save on bills; you build equity in your property.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <Disclaimer context="solar savings estimates" />
      <RelatedCalculators currentId="solar-savings-calculator" />
    </div>
  );
}
