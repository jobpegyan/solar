import React, { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useSolarSettings } from "@/lib/location/location-context";
import { countries } from "@/lib/data/countries";
import { regions } from "@/lib/data/regions";
import { MainCalculator } from "@/components/MainCalculator";
import { ResultsDisplay } from "@/components/ResultsDisplay";
import { SolarChart } from "@/components/SolarChart";
import { RelatedCalculators } from "@/components/RelatedCalculators";
import { Disclaimer } from "@/components/Disclaimer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Flag, Info, ShieldCheck, Map, Landmark, Zap } from "lucide-react";

export const Route = createFileRoute("/solar-panel-calculator/usa")({
  component: USASolarCalculator,
  head: () => ({
    title: "Solar Panel Calculator USA – State-Specific Sizing & Tax Credit Math",
    meta: [
      { name: "description", content: "Calculate solar system size, costs, and 30% Federal Tax Credit savings for all US states. Accurate data for California, Texas, Florida, and more." },
      { property: "og:title", content: "USA Solar Panel Calculator – Federal & State Estimates" },
      { property: "og:description", content: "Estimate your US solar investment with state-level electricity rates and sun hour data." },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function USASolarCalculator() {
  const { setCountry, setRegion, country, region } = useSolarSettings();
  const [results, setResults] = useState<any>(null);

  // Force USA context on mount
  useEffect(() => {
    if (country.code !== "US") {
      setCountry("US");
    }
  }, []);

  const usRegions = regions.filter(r => r.countryCode === "US");

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <Breadcrumbs />
      <section className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-800 rounded-full text-sm font-bold border border-blue-100 mb-6">
          <Flag className="w-4 h-4" />
          US Edition
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
          Solar Panel Calculator <span className="text-blue-600">USA</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          The most accurate residential solar estimator for American homeowners. 
          Includes the <strong>30% Federal Investment Tax Credit (ITC)</strong> and state-specific utility data.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
        <div className="lg:col-span-5">
          <div className="bg-slate-50 p-6 rounded-2xl border mb-6 flex items-start gap-4">
            <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-slate-900">US Context Active</h4>
              <p className="text-sm text-slate-600">
                Calculator is using USD ($), US Customary units (sq ft), and 120/240V grid assumptions.
              </p>
            </div>
          </div>
          <MainCalculator onResultsChange={setResults} />
        </div>

        <div className="lg:col-span-7">
          {results ? (
            <div className="space-y-8">
              <ResultsDisplay results={results} />
              
              <Card className="border-blue-100">
                <CardHeader className="bg-blue-50/50">
                  <CardTitle className="text-blue-900 flex items-center gap-2">
                    <Landmark className="w-5 h-5" />
                    Federal Incentives
                  </CardTitle>
                  <CardDescription>Estimated savings from the Inflation Reduction Act (IRA).</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="p-6 bg-green-50 rounded-xl border border-green-100 text-center">
                    <p className="text-xs text-green-800 uppercase font-bold tracking-widest mb-1">Estimated 30% Tax Credit</p>
                    <div className="text-4xl font-extrabold text-green-700">
                      ${Math.round((results.requiredSystemSizeKW * 3000) * 0.3).toLocaleString()}
                    </div>
                    <p className="mt-2 text-sm text-green-700 font-medium">Applied to your Federal Income Tax</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Regional Production Comparison</CardTitle>
                  <CardDescription>Monthly kWh output for {region?.name || "your region"}.</CardDescription>
                </CardHeader>
                <CardContent>
                  <SolarChart 
                    data={results.monthlyBreakdown} 
                    xKey="month" 
                    yKey="generation" 
                    yKey2="consumption"
                    valuePrefix=""
                    valueSuffix=" kWh" 
                  />
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="h-full min-h-[500px] flex items-center justify-center border-2 border-dashed rounded-3xl bg-slate-50">
              <div className="text-center">
                <Map className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                <p className="text-slate-400 font-medium">Select your state and usage to begin</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <section className="prose prose-slate max-w-none mb-24 bg-slate-900 text-white p-12 rounded-3xl">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-white text-3xl font-bold mb-8">Understanding Solar in the United States</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-blue-400 text-xl font-bold mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5" />
                The Federal Tax Credit (ITC)
              </h3>
              <p className="text-slate-300 leading-relaxed">
                The Residential Clean Energy Credit allows you to deduct 30% of the cost of installing a solar energy system from your federal taxes. There is no cap on the amount you can claim, and the credit applies to equipment, labor, and even battery storage.
              </p>
            </div>
            <div>
              <h3 className="text-blue-400 text-xl font-bold mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Net Metering (NEM 3.0)
              </h3>
              <p className="text-slate-300 leading-relaxed">
                In states like California, recent changes to net metering (NEM 3.0) have reduced the value of exported solar energy. This makes battery storage much more attractive, as homeowners can store their own power for use during expensive evening peak hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-24">
        <h2 className="text-3xl font-bold text-center mb-12">Popular US States for Solar</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {usRegions.slice(0, 10).map((r) => (
            <button
              key={r.code}
              onClick={() => {
                setRegion(r.code);
                document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="p-4 border rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all text-center group"
            >
              <div className="font-bold text-slate-900 group-hover:text-blue-700">{r.name}</div>
              <div className="text-xs text-muted-foreground">{r.defaultPeakSunHours} Peak Sun Hours</div>
            </button>
          ))}
        </div>
      </section>

      <Disclaimer context="US-specific solar and tax estimates" />
      <RelatedCalculators />
    </div>
  );
}
