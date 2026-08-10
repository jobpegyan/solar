import React, { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Mountain, Zap, Info, ShieldCheck, Sun, Battery, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RelatedCalculators } from "@/components/RelatedCalculators";
import { Disclaimer } from "@/components/Disclaimer";
import { LocationSelector } from "@/components/LocationSelector";
import { useSolarSettings } from "@/lib/location/location-context";
import { getSolarResource } from "@/lib/data/solar-resource";
import { solarConfig } from "@/lib/solar-config";
import { calculateOffGrid, OffGridResults } from "@/lib/calculations/off-grid";
import { Appliance } from "@/lib/calculations/appliances";
import { ApplianceSelector } from "@/components/ApplianceSelector";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/off-grid-solar-calculator")({
  head: () => ({
    title: "Off-Grid Solar Calculator – Calculate Panels, Battery & Inverter",
    meta: [
      {
        name: "description",
        content: "Estimate the solar panel capacity, battery storage and inverter size needed for an off-grid solar setup based on your appliance load.",
      },
      { property: "og:title", content: "Off-Grid Solar Calculator – Calculate Panels, Battery & Inverter" },
      { property: "og:description", content: "Design your off-grid solar system by calculating required panels, batteries, and inverter size." },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OffGridCalculator,
});

function OffGridCalculator() {
  const { country, region } = useSolarSettings();

  const [appliances, setAppliances] = useState<Appliance[]>([
    { id: "1", name: "LED Bulb", quantity: 5, power: 9, hoursPerDay: 6 },
    { id: "2", name: "Ceiling Fan", quantity: 2, power: 70, hoursPerDay: 10 },
    { id: "3", name: "Refrigerator", quantity: 1, power: 150, hoursPerDay: 24 },
  ]);
  const [autonomyDays, setAutonomyDays] = useState<number>(1);
  const [sunHours, setSunHours] = useState<number>(solarConfig.defaultPeakSunHours);
  
  const [results, setResults] = useState<OffGridResults | null>(null);

  useEffect(() => {
    const resource = getSolarResource(country.code, region?.code);
    setSunHours(resource.peakSunHours);
  }, [country, region]);

  useEffect(() => {

    const res = calculateOffGrid({
      appliances,
      autonomyDays,
      peakSunHours: sunHours
    });
    setResults(res);
  }, [appliances, autonomyDays, sunHours]);

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-solar/10 rounded-full mb-4">
          <Mountain className="w-8 h-8 text-solar" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Off-Grid Solar Calculator</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Design Your Independent Energy System. Estimate panels, batteries, and inverter size for total off-grid living.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-6">
          <LocationSelector />

          <Card>
            <CardHeader>
              <CardTitle>1. Define Your Load</CardTitle>
              <CardDescription>Add all appliances you plan to run on your off-grid system.</CardDescription>
            </CardHeader>
            <CardContent>
              <ApplianceSelector appliances={appliances} onChange={setAppliances} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. System Assumptions</CardTitle>
              <CardDescription>Adjust based on your location and requirements.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sunHours">Avg. Peak Sun Hours/Day</Label>
                  <Input
                    id="sunHours"
                    type="number"
                    step="0.1"
                    value={sunHours}
                    onChange={(e) => setSunHours(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="autonomy">Days of Autonomy (Backup)</Label>
                  <div className="flex gap-2">
                    {[1, 2, 3].map(d => (
                      <Button 
                        key={d}
                        variant={autonomyDays === d ? "solar" : "outline"}
                        size="sm"
                        onClick={() => setAutonomyDays(d)}
                      >
                        {d} Day{d > 1 ? 's' : ''}
                      </Button>
                    ))}
                    <Input
                      type="number"
                      placeholder="Custom"
                      className="w-20 h-9"
                      value={autonomyDays}
                      onChange={(e) => setAutonomyDays(Number(e.target.value))}
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-slate-50 text-muted-foreground rounded-lg text-sm">
                <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p>
                  <strong>Autonomy:</strong> The number of days your battery system can power your home without any solar charging (e.g., during consecutive rainy days).
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <Card className="border-solar border-2 sticky top-24">
            <CardHeader className="bg-solar/5">
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-solar" />
                System Recommendation
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-6">
                <div className="text-center p-4 bg-slate-50 rounded-xl">
                  <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest mb-1">Recommended Solar Array</p>
                  <div className="text-4xl font-bold text-solar">{results?.recommendedSolarKW} <span className="text-xl">kW</span></div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-slate-50 rounded-lg text-center">
                    <p className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Battery Storage</p>
                    <div className="text-xl font-bold">{results?.recommendedBatteryKWh} kWh</div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg text-center">
                    <p className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Inverter Size</p>
                    <div className="text-xl font-bold">{results?.recommendedInverterKW} kW</div>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Daily Energy Need:</span>
                    <span className="font-semibold">{results?.dailyEnergyRequirementKWh} kWh</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Est. Generation:</span>
                    <span className="font-semibold">{results?.estimatedGenerationKWhPerDay} kWh/day</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Peak Load:</span>
                    <span className="font-semibold">{results?.peakLoadW} W</span>
                  </div>
                </div>
              </div>

              <Disclaimer context="off-grid system sizing" />
            </CardContent>
          </Card>
        </div>
      </div>

      <section className="mt-24 prose prose-slate max-w-none">
        <h2 className="text-3xl font-bold mb-6">Designing a Reliable Off-Grid System</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3>Why Off-Grid is Different</h3>
            <p>
              Unlike grid-tied systems where the utility grid acts as an infinite backup, an off-grid system must be entirely self-sufficient. This means you must size your system for the "worst-case" scenario—usually the shortest, cloudiest days of winter.
            </p>
            <h3>Calculating Daily Energy</h3>
            <p>
              The first and most critical step is an accurate load assessment. Every watt matters when you're off-grid. Be honest about how many hours appliances are used. A refrigerator, for instance, runs 24/7, but its compressor only cycles on for a portion of that time (we handle this in our defaults).
            </p>
          </div>
          <div>
            <h3>Battery Autonomy</h3>
            <p>
              <strong>Autonomy</strong> refers to how long your batteries can last if the sun doesn't shine. For weekend cabins, 1 day might be enough. For a primary residence, 2 or 3 days of autonomy is recommended to avoid deep-discharging your batteries and shortening their life during bad weather.
            </p>
            <h3>Peak Load & Inverter Sizing</h3>
            <p>
              Your inverter must be able to handle the simultaneous startup of your most power-hungry appliances. If your pump and AC start at the same time, the surge can be 3-5 times their running wattage. We recommend sizing your inverter with at least a 25% safety margin above your expected peak load.
            </p>
          </div>
        </div>
      </section>

      <RelatedCalculators currentId="off-grid-solar-calculator" />
    </div>
  );
}
