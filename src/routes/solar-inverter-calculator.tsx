import React, { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Zap, Info, ShieldCheck, Settings, Maximize, Activity, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RelatedCalculators } from "@/components/RelatedCalculators";
import { Disclaimer } from "@/components/Disclaimer";
import { LocationSelector } from "@/components/LocationSelector";
import { useSolarSettings } from "@/lib/location/location-context";
import { solarConfig } from "@/lib/solar-config";
import { calculateInverter, InverterResults, InverterSystemType } from "@/lib/calculations/solar-inverter";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/solar-inverter-calculator")({
  head: () => ({
    title: "Solar Inverter Calculator – Calculate Recommended Inverter Size",
    meta: [
      {
        name: "description",
        content: "Estimate an appropriate inverter size based on your solar panel capacity and electrical load requirements.",
      },
      { property: "og:title", content: "Solar Inverter Calculator – Calculate Recommended Inverter Size" },
      { property: "og:description", content: "Find the right inverter size for your solar system based on panel capacity and load." },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SolarInverterCalculator,
});

function SolarInverterCalculator() {
  const { country, region } = useSolarSettings();

  const [systemSizeKW, setSystemSizeKW] = useState<number>(5);
  const [maxLoadKW, setMaxLoadKW] = useState<number>(3.5);
  const [peakLoadKW, setPeakLoadKW] = useState<number>(7);
  const [systemType, setSystemType] = useState<InverterSystemType>("on-grid");
  const [loadingRatio, setLoadingRatio] = useState<number>(solarConfig.defaultInverterLoadingRatio);
  const [futureExpansion, setFutureExpansion] = useState<number>(solarConfig.defaultFutureExpansion * 100);

  const [results, setResults] = useState<InverterResults | null>(null);

  useEffect(() => {
    const res = calculateInverter({
      systemSizeKW,
      maxContinuousLoadKW: maxLoadKW,
      peakLoadKW,
      systemType,
      loadingRatio,
      futureExpansion: futureExpansion / 100
    });
    setResults(res);
  }, [systemSizeKW, maxLoadKW, peakLoadKW, systemType, loadingRatio, futureExpansion]);

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-solar/10 rounded-full mb-4">
          <Zap className="w-8 h-8 text-solar" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Solar Inverter Calculator</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Find the Right Solar Inverter Size. Estimate capacity based on panels and load.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-6">
          <LocationSelector />

          <Card>
            <CardHeader>
              <CardTitle>System Inputs</CardTitle>
              <CardDescription>Enter your system capacity and load requirements.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="systemSize">Solar Panel System Size (kW)</Label>
                  <Input
                    id="systemSize"
                    type="number"
                    step="0.1"
                    value={systemSizeKW}
                    onChange={(e) => setSystemSizeKW(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="systemType">System Type</Label>
                  <div className="flex gap-2">
                    {["on-grid", "off-grid", "hybrid"].map(type => (
                      <Button 
                        key={type}
                        variant={systemType === type ? "solar" : "outline"}
                        size="sm"
                        onClick={() => setSystemType(type as any)}
                        className="capitalize"
                      >
                        {type.replace("-", " ")}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maxLoad">Max Continuous Load (kW)</Label>
                  <Input
                    id="maxLoad"
                    type="number"
                    step="0.1"
                    value={maxLoadKW}
                    onChange={(e) => setMaxLoadKW(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="peakLoad">Peak Load / Surge (kW)</Label>
                  <Input
                    id="peakLoad"
                    type="number"
                    step="0.1"
                    value={peakLoadKW}
                    onChange={(e) => setPeakLoadKW(Number(e.target.value))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Advanced Options</CardTitle>
              <CardDescription>Adjust sizing ratios and growth assumptions.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ratio">Inverter Loading Ratio (DC/AC)</Label>
                  <Input
                    id="ratio"
                    type="number"
                    step="0.05"
                    value={loadingRatio}
                    onChange={(e) => setLoadingRatio(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expansion">Future Expansion (%)</Label>
                  <Input
                    id="expansion"
                    type="number"
                    value={futureExpansion}
                    onChange={(e) => setFutureExpansion(Number(e.target.value))}
                  />
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-slate-50 text-muted-foreground rounded-lg text-sm">
                <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p>
                  <strong>Loading Ratio:</strong> It is common to "oversize" the DC array relative to the AC inverter (e.g., 1.2 ratio) to maximize generation during low light.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <Card className="border-solar border-2 sticky top-24">
            <CardHeader className="bg-solar/5">
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-solar" />
                Inverter Size Estimate
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="text-center py-6 border-b">
                <p className="text-sm text-muted-foreground uppercase font-semibold tracking-wider mb-1">Recommended Inverter Size</p>
                <div className="text-5xl font-bold text-solar">{results?.recommendedInverterSizeKW} <span className="text-2xl">kW</span></div>
                <p className="text-muted-foreground mt-2 font-medium capitalize">{systemType.replace("-", " ")} System</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Maximize className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium">Solar Array Size</span>
                  </div>
                  <span className="font-bold">{results?.solarArraySizeKW} kW</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium">Continuous Load</span>
                  </div>
                  <span className="font-bold">{results?.maxLoadKW} kW</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-solar" />
                    <span className="text-sm font-medium">Peak Surge</span>
                  </div>
                  <span className="font-bold">{results?.peakLoadKW} kW</span>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm">Sizing Logic:</h4>
                <div className="p-3 bg-muted rounded-md text-xs">
                  {results?.explanation}
                </div>
              </div>

              <Disclaimer context="inverter sizing" />
            </CardContent>
          </Card>
        </div>
      </div>

      <section className="mt-24 prose prose-slate max-w-none">
        <h2 className="text-3xl font-bold mb-6">How to Size Your Solar Inverter</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3>What Does a Solar Inverter Do?</h3>
            <p>
              The inverter is the "brain" of your solar system. Its primary job is to convert the Direct Current (DC) electricity produced by your solar panels into the Alternating Current (AC) electricity used by your home appliances and the utility grid.
            </p>
            <h3>Continuous vs. Peak Load</h3>
            <p>
              <strong>Continuous Load:</strong> The total wattage of all appliances you expect to run at the same time for long periods.
            </p>
            <p>
              <strong>Peak Load (Surge):</strong> Some appliances, like refrigerators or air conditioners, require a brief burst of extra power when they start up. Your inverter (especially off-grid) must be able to handle this surge.
            </p>
          </div>
          <div>
            <h3>Solar Array vs. Inverter Size</h3>
            <p>
              It's often beneficial to have a solar array that is slightly larger (10-30%) than your inverter's AC rating. This is called the <strong>DC/AC Ratio</strong> or <strong>Loading Ratio</strong>. This allows the system to produce more power in the morning, evening, and on cloudy days without wasting much energy during peak noon hours (a process called "clipping").
            </p>
            <h3>System Types</h3>
            <ul>
              <li><strong>On-Grid:</strong> Usually sized close to the solar array capacity.</li>
              <li><strong>Off-Grid:</strong> Must be sized to handle the maximum simultaneous load of all appliances.</li>
              <li><strong>Hybrid:</strong> A balance of both, allowing for grid interaction and battery backup.</li>
            </ul>
          </div>
        </div>
      </section>

      <RelatedCalculators currentId="solar-inverter-calculator" />
    </div>
  );
}
