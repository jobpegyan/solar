import React, { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Zap, Info, ShieldCheck, Settings, Battery, Sun, Globe, MapPin } from "lucide-react";
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
import { calculateHybrid, HybridResults } from "@/lib/calculations/hybrid-solar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/hybrid-solar-calculator")({
  head: () => ({
    title: "Hybrid Solar Calculator – Calculate Solar, Battery & Inverter Size",
    meta: [
      {
        name: "description",
        content: "Estimate solar capacity, battery storage and inverter size for a hybrid solar system that combines grid power with solar and batteries.",
      },
      { property: "og:title", content: "Hybrid Solar Calculator – Calculate Solar, Battery & Inverter Size" },
      { property: "og:description", content: "Optimize your energy independence with a hybrid solar system estimate." },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HybridSolarCalculator,
});

function HybridSolarCalculator() {
  const { country, region } = useSolarSettings();

  const [monthlyUsage, setMonthlyUsage] = useState<number>(450);
  const [peakLoad, setPeakLoad] = useState<number>(5);
  const [backupLoad, setBackupLoad] = useState<number>(2);
  const [backupHours, setBackupHours] = useState<number>(6);
  const [sunHours, setSunHours] = useState<number>(solarConfig.defaultPeakSunHours);
  
  const [results, setResults] = useState<HybridResults | null>(null);

  useEffect(() => {
    const resource = getSolarResource(country.code, region?.code);
    setSunHours(resource.peakSunHours);
  }, [country, region]);

  useEffect(() => {

    const res = calculateHybrid({
      monthlyUsageKWh: monthlyUsage,
      peakLoadKW: peakLoad,
      backupLoadKW: backupLoad,
      backupHours: backupHours,
      peakSunHours: sunHours
    });
    setResults(res);
  }, [monthlyUsage, peakLoad, backupLoad, backupHours, sunHours]);

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-solar/10 rounded-full mb-4">
          <Globe className="w-8 h-8 text-solar" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Hybrid Solar Calculator</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          The Best of Both Worlds. Estimate solar, battery, and inverter needs for a system that stays connected to the grid while providing backup.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-6">
          <LocationSelector />

          <Card>
            <CardHeader>
              <CardTitle>Usage & Load Profile</CardTitle>
              <CardDescription>Enter your electricity consumption and power requirements.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="monthlyUsage">Monthly Usage (kWh)</Label>
                  <Input
                    id="monthlyUsage"
                    type="number"
                    value={monthlyUsage}
                    onChange={(e) => setMonthlyUsage(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="peakLoad">Max Continuous Load (kW)</Label>
                  <Input
                    id="peakLoad"
                    type="number"
                    step="0.1"
                    value={peakLoad}
                    onChange={(e) => setPeakLoad(Number(e.target.value))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Backup Requirements</CardTitle>
              <CardDescription>Define what needs power during a grid outage.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="backupLoad">Backup Load (kW)</Label>
                  <Input
                    id="backupLoad"
                    type="number"
                    step="0.1"
                    value={backupLoad}
                    onChange={(e) => setBackupLoad(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="backupHours">Backup Duration (Hours)</Label>
                  <Input
                    id="backupHours"
                    type="number"
                    value={backupHours}
                    onChange={(e) => setBackupHours(Number(e.target.value))}
                  />
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-blue-50 text-blue-800 rounded-lg text-sm">
                <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p>
                  <strong>Backup Load:</strong> This is typically smaller than your peak load, focusing only on essential circuits like lights, internet, and refrigeration.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Environment</CardTitle>
              <CardDescription>Local solar conditions.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-w-sm">
                <Label htmlFor="sunHours">Avg. Peak Sun Hours</Label>
                <Input
                  id="sunHours"
                  type="number"
                  step="0.1"
                  value={sunHours}
                  onChange={(e) => setSunHours(Number(e.target.value))}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <Card className="border-solar border-2 sticky top-24">
            <CardHeader className="bg-solar/5">
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-solar" />
                Hybrid System Estimate
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-6">
                <div className="text-center p-4 bg-slate-50 rounded-xl">
                  <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest mb-1">Recommended Solar Capacity</p>
                  <div className="text-4xl font-bold text-solar">{results?.recommendedSolarKW} <span className="text-xl">kW</span></div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-slate-50 rounded-lg text-center">
                    <p className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Battery (Backup)</p>
                    <div className="text-xl font-bold">{results?.recommendedBatteryKWh} kWh</div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg text-center">
                    <p className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Hybrid Inverter</p>
                    <div className="text-xl font-bold">{results?.recommendedInverterKW} kW</div>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Daily Gen:</span>
                    <span className="font-semibold">{results?.dailyGenerationKWh} kWh</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Est. Grid Dependence:</span>
                    <span className="font-semibold text-blue-600">{results?.estimatedGridDependence}%</span>
                  </div>
                </div>
              </div>

              <Disclaimer context="hybrid solar system sizing" />
            </CardContent>
          </Card>
        </div>
      </div>

      <section className="mt-24 prose prose-slate max-w-none">
        <h2 className="text-3xl font-bold mb-6">Understanding Hybrid Solar Systems</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3>What is a Hybrid System?</h3>
            <p>
              A hybrid solar system combines the best features of on-grid and off-grid systems. It is connected to the utility grid but also includes battery storage. This allows you to store excess solar energy for use at night (self-consumption) or keep it in reserve for power outages (backup).
            </p>
            <h3>Grid Dependence</h3>
            <p>
              Our <strong>Grid Dependence</strong> estimate represents the percentage of your total energy needs that might still come from the utility company. Even with a large solar array, weather fluctuations and high night-time usage can result in some grid reliance unless the system is significantly oversized.
            </p>
          </div>
          <div>
            <h3>Sizing the Battery</h3>
            <p>
              In a hybrid system, you don't necessarily need to cover 100% of your load with batteries. Instead, you size the battery to handle your <strong>Essential Load</strong> for a specific number of hours. This keeps system costs down while providing peace of mind during blackouts.
            </p>
            <h3>The Hybrid Inverter</h3>
            <p>
              A hybrid inverter is more sophisticated than a standard string inverter. It manages power flow between the panels, the batteries, your home loads, and the grid simultaneously. It can automatically switch to battery power within milliseconds when it detects a grid failure.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Hybrid Solar FAQ</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Can I sell excess power to the grid with a hybrid system?</AccordionTrigger>
            <AccordionContent>
              Yes, in most regions with Net Metering or Feed-in Tariffs, a hybrid system can export excess solar power to the grid once the batteries are fully charged.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>How long will my backup last?</AccordionTrigger>
            <AccordionContent>
              This depends entirely on the size of your battery and the load you run. If you only run lights and a fridge, a 10kWh battery could last over 24 hours. If you run an air conditioner, it might last only 2-3 hours.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is hybrid more expensive than on-grid?</AccordionTrigger>
            <AccordionContent>
              Yes, hybrid systems are more expensive because they require a more advanced inverter and the addition of battery storage. However, they provide backup security and higher self-consumption rates.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <RelatedCalculators currentId="hybrid-solar-calculator" />
    </div>
  );
}
