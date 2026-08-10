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
import { Info, ShieldCheck, Map, Zap, IndianRupee } from "lucide-react";

export const Route = createFileRoute("/solar-panel-calculator/india")({
  component: IndiaSolarCalculator,
  head: () => ({
    title: "Solar Panel Calculator India – State Subsidies & PM-Surya Ghar Math",
    meta: [
      { name: "description", content: "Calculate solar system size, costs, and PM-Surya Ghar subsidies for all Indian states. Accurate data for Maharashtra, Gujarat, Delhi, and more." },
      { property: "og:title", content: "India Solar Panel Calculator – PM-Surya Ghar & State Estimates" },
      { property: "og:description", content: "Estimate your solar investment in India with regional electricity rates and subsidy data." },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function IndiaSolarCalculator() {
  const { setCountry, setRegion, country, region } = useSolarSettings();
  const [results, setResults] = useState<any>(null);

  // Force India context on mount
  useEffect(() => {
    if (country.code !== "IN") {
      setCountry("IN");
    }
  }, []);

  const indiaRegions = regions.filter(r => r.countryCode === "IN");

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <Breadcrumbs />
      <section className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-800 rounded-full text-sm font-bold border border-orange-100 mb-6">
          <IndianRupee className="w-4 h-4" />
          India Edition
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
          Solar Panel Calculator <span className="text-orange-600">India</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          The most accurate residential solar estimator for Indian homeowners. 
          Includes <strong>PM-Surya Ghar: Muft Bijli Yojana</strong> subsidies and state-specific DISCOM data.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
        <div className="lg:col-span-5">
          <div className="bg-slate-50 p-6 rounded-2xl border mb-6 flex items-start gap-4">
            <Info className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-slate-900">India Context Active</h4>
              <p className="text-sm text-slate-600">
                Calculator is using INR (₹), Metric units (sq.m), and 230V grid assumptions.
              </p>
            </div>
          </div>
          <MainCalculator onResultsChange={setResults} />
        </div>

        <div className="lg:col-span-7">
          {results ? (
            <div className="space-y-8">
              <ResultsDisplay results={results} />
              
              <Card className="border-orange-100">
                <CardHeader className="bg-orange-50/50">
                  <CardTitle className="text-orange-900 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5" />
                    PM-Surya Ghar Subsidies
                  </CardTitle>
                  <CardDescription>Estimated Central Government Subsidy (CFA).</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="p-6 bg-green-50 rounded-xl border border-green-100 text-center">
                    <p className="text-xs text-green-800 uppercase font-bold tracking-widest mb-1">Estimated Subsidy Amount</p>
                    <div className="text-4xl font-extrabold text-green-700">
                      ₹{Math.min(78000, results.requiredSystemSizeKW * 30000).toLocaleString()}
                    </div>
                    <p className="mt-2 text-sm text-green-700 font-medium">For systems up to 3kW capacity</p>
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
          <h2 className="text-white text-3xl font-bold mb-8">Solar Energy in India: 2026 Outlook</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-orange-400 text-xl font-bold mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5" />
                PM-Surya Ghar Scheme
              </h3>
              <p className="text-slate-300 leading-relaxed">
                The government's new Muft Bijli Yojana provides up to ₹78,000 in direct subsidies for residential systems. This has reduced the payback period for most Indian households to under 4 years, making it one of the best financial investments available.
              </p>
            </div>
            <div>
              <h3 className="text-orange-400 text-xl font-bold mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Net Metering & DISCOMs
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Rules vary by state. Gujarat and Rajasthan have some of the most solar-friendly policies, while states like Maharashtra have implemented "Net Billing" for larger systems. Our calculator uses DISCOM-specific average rates to ensure accuracy.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-24">
        <h2 className="text-3xl font-bold text-center mb-12">Popular Indian States for Solar</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {indiaRegions.slice(0, 10).map((r) => (
            <button
              key={r.code}
              onClick={() => {
                setRegion(r.code);
                document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="p-4 border rounded-xl hover:border-orange-500 hover:bg-orange-50 transition-all text-center group"
            >
              <div className="font-bold text-slate-900 group-hover:text-orange-700">{r.name}</div>
              <div className="text-xs text-muted-foreground">{r.defaultPeakSunHours} Peak Sun Hours</div>
            </button>
          ))}
        </div>
      </section>

      <Disclaimer context="India-specific solar and subsidy estimates" />
      <RelatedCalculators />
    </div>
  );
}
