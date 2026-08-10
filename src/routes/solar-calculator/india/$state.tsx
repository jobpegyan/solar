import React, { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { MainCalculator } from "@/components/MainCalculator";
import { ResultsDisplay } from "@/components/ResultsDisplay";
import { useSolarSettings } from "@/lib/location/location-context";
import { regions } from "@/lib/data/regions";
import { Disclaimer } from "@/components/Disclaimer";
import { SolarChart } from "@/components/SolarChart";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/solar-calculator/india/$state")({
  component: IndiaStateSolarCalculator,
  head: ({ params }) => {
    const stateName = params.state.charAt(0).toUpperCase() + params.state.slice(1);
    return {
      title: `Solar Panel Calculator ${stateName} – Estimate Solar Size & Savings`,
      meta: [
        { name: "description", content: `Estimate solar panel requirements, system costs, and electricity bill savings for ${stateName} homeowners. Optimized for Indian utility rates.` },
      ],
    };
  },
});

function IndiaStateSolarCalculator() {
  const { state } = Route.useParams();
  const { setCountry, setRegion, country, region } = useSolarSettings();
  const [results, setResults] = useState<any>(null);

  const stateData = regions.find(
    r => r.countryCode === "IN" && r.name.toLowerCase() === state.toLowerCase()
  );

  useEffect(() => {
    setCountry("IN");
    if (stateData) {
      setRegion(stateData.code);
    }
  }, [stateData, setCountry, setRegion]);

  const stateName = state.charAt(0).toUpperCase() + state.slice(1);

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <Breadcrumbs />
      
      <section className="mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
          Solar Panel Calculator <span className="text-solar">{stateName}</span>
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
          Get a precise estimate for your solar installation in {stateName}. We account for local electricity rates, {stateData?.defaultPeakSunHours || "regional"} peak sun hours, and Indian subsidies.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
        <div className="lg:col-span-5">
          <MainCalculator onResultsChange={setResults} />
        </div>
        <div className="lg:col-span-7">
          {results ? (
            <div className="space-y-8">
              <ResultsDisplay results={results} />
              <Card>
                <CardHeader>
                  <CardTitle>Solar Generation in {stateName}</CardTitle>
                  <CardDescription>Estimated monthly production for a {results.requiredSystemSizeKW}kW system.</CardDescription>
                </CardHeader>
                <CardContent>
                   <SolarChart 
                    data={results.monthlyBreakdown} 
                    xKey="month" 
                    yKey="generation" 
                    yKey2="consumption"
                    valueSuffix=" kWh" 
                  />
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="h-full min-h-[400px] flex items-center justify-center border-2 border-dashed rounded-3xl bg-slate-50 text-slate-400">
              Complete the calculator to see your {stateName} solar report
            </div>
          )}
        </div>
      </div>

      <section className="prose prose-slate max-w-none border-t pt-12">
        <h2>Solar Rooftop in {stateName}</h2>
        <p>
          Homeowners in {stateName} can benefit from India's push for residential solar. Systems are typically sized to cover 80-100% of average monthly usage.
        </p>
        <h3>Calculation Parameters for {stateName}:</h3>
        <ul>
          <li><strong>Average Electricity Rate:</strong> {stateData?.defaultElectricityRate ? `₹${stateData.defaultElectricityRate}/kWh` : "State average rates"} used for savings projections.</li>
          <li><strong>Solar Resource:</strong> Approximately {stateData?.defaultPeakSunHours || "local average"} peak sun hours per day.</li>
          <li><strong>System Design:</strong> 550W mono-perc panels and high-efficiency string inverters assumed.</li>
        </ul>
      </section>

      <Disclaimer context={`${stateName} solar estimates`} />
    </div>
  );
}
