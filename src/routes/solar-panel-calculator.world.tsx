import React, { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useSolarSettings } from "@/lib/location/location-context";
import { countries } from "@/lib/data/countries";
import { MainCalculator } from "@/components/MainCalculator";
import { ResultsDisplay } from "@/components/ResultsDisplay";
import { SolarChart } from "@/components/SolarChart";
import { RelatedCalculators } from "@/components/RelatedCalculators";
import { Disclaimer } from "@/components/Disclaimer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Globe, Sun, Zap, Info, TrendingUp, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/solar-panel-calculator/world")({
  component: WorldSolarCalculator,
  head: () => ({
    title: "Global Solar Panel Calculator – International Solar Sizing & ROI",
    meta: [
      { name: "description", content: "Estimate solar system size, panels, and savings for any country. Location-aware data for UK, Australia, Germany, and 100+ other nations." },
      { property: "og:title", content: "World Solar Panel Calculator – International Estimates" },
      { property: "og:description", content: "Get accurate solar energy projections based on global irradiance data and local currency." },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function WorldSolarCalculator() {
  const { country, region, currency } = useSolarSettings();
  const [results, setResults] = useState<any>(null);

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <section className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-full text-sm font-bold mb-6">
          <Globe className="w-4 h-4" />
          International Edition
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
          Global Solar <span className="text-solar">Calculator</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          The ultimate solar analysis tool for the international market. Automatically adjusts for local solar radiation (PSH), currency, and measurement units.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
        <div className="lg:col-span-5">
          <div className="bg-slate-50 p-6 rounded-2xl border mb-6 flex items-start gap-4">
            <Info className="w-6 h-6 text-slate-900 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-slate-900">Multi-Region Engine</h4>
              <p className="text-sm text-slate-600">
                Currently optimized for <strong>{country.name}</strong>. Change your location to update local utility and sun data.
              </p>
            </div>
          </div>
          <MainCalculator onResultsChange={setResults} />
        </div>

        <div className="lg:col-span-7">
          {results ? (
            <div className="space-y-8">
              <ResultsDisplay results={results} />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Sun className="w-4 h-4 text-solar" />
                      Solar Resource
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{results.sunHours} <span className="text-sm text-muted-foreground">kWh/m²/day</span></div>
                    <p className="text-xs text-muted-foreground mt-1">Average daily irradiance for {country.name}.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-solar" />
                      Annual Generation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{Math.round(results.generation * 12).toLocaleString()} <span className="text-sm text-muted-foreground">kWh</span></div>
                    <p className="text-xs text-muted-foreground mt-1">Estimated total year-one production.</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Global Monthly Production Profile</CardTitle>
                  <CardDescription>Variation in output based on seasonal solar resource.</CardDescription>
                </CardHeader>
                <CardContent>
                  <SolarChart 
                    data={results.monthlyBreakdown} 
                    xKey="month" 
                    yKey="generation" 
                    valuePrefix=""
                    valueSuffix=" kWh" 
                  />
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="h-full min-h-[500px] flex items-center justify-center border-2 border-dashed rounded-3xl bg-slate-50">
              <div className="text-center">
                <Globe className="w-16 h-16 text-slate-200 mx-auto mb-4 animate-spin-slow" />
                <p className="text-slate-400 font-medium">Select a country to start global analysis</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <section className="prose prose-slate max-w-none mb-24">
        <h2 className="text-3xl font-bold mb-8 text-center">Solar Factors Around the World</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 not-prose">
          <div className="p-8 bg-white border rounded-2xl shadow-sm">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
              <Zap className="w-5 h-5 text-solar" />
              Utility Variations
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Electricity tariffs vary wildly from $0.05/kWh in some Middle Eastern nations to over $0.40/kWh in parts of Europe and Australia. The economic case for solar is strongest where utility rates are high.
            </p>
          </div>
          <div className="p-8 bg-white border rounded-2xl shadow-sm">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
              <Sun className="w-5 h-5 text-solar" />
              Latitudinal Impact
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Countries near the equator receive consistent sunlight year-round, while those in Northern Europe see extreme seasonal variation. Our engine adjusts production curves based on your specific latitude.
            </p>
          </div>
          <div className="p-8 bg-white border rounded-2xl shadow-sm">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-solar" />
              Regional Incentives
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              From feed-in tariffs in the UK to VAT exemptions in Africa, localized incentives can drastically reduce the effective cost of your solar system. Always check for local government grants.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-24">
        <h2 className="text-3xl font-bold text-center mb-12">Supported Markets</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {countries.map((c) => (
            <button
              key={c.code}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                // Note: The context setter is already used in MainCalculator
              }}
              className={`p-4 border rounded-xl hover:border-solar transition-all text-center ${country.code === c.code ? 'border-solar bg-solar/5' : ''}`}
            >
              <div className="font-bold text-slate-900">{c.name}</div>
              <div className="text-xs text-muted-foreground">{c.currency} | {c.measurementSystem}</div>
            </button>
          ))}
        </div>
      </section>

      <Disclaimer context="international solar resource estimates" />
      <RelatedCalculators currentId="solar-panel-calculator" />
    </div>
  );
}
