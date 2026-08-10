import React, { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Battery, Zap, Info, ShieldCheck, Clock, Layers, MapPin } from "lucide-react";
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
import { calculateBattery, BatteryResults } from "@/lib/calculations/solar-battery";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/solar-battery-calculator")({
  head: () => ({
    title: "Solar Battery Calculator – Calculate Battery Size & Backup",
    meta: [
      {
        name: "description",
        content: "Estimate the battery capacity required for your solar system based on your electricity usage, backup requirements and battery specifications.",
      },
      { property: "og:title", content: "Solar Battery Calculator – Calculate Battery Size & Backup" },
      { property: "og:description", content: "Estimate the battery capacity required for your solar system based on your electricity usage and backup requirements." },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SolarBatteryCalculator,
});

function SolarBatteryCalculator() {
  const { country, region } = useSolarSettings();

  const [method, setMethod] = useState<"backup" | "usage">("backup");
  const [backupLoad, setBackupLoad] = useState<number>(1000);
  const [backupHours, setBackupHours] = useState<number>(4);
  const [dailyUsage, setDailyUsage] = useState<number>(15);
  const [backupPercentage, setBackupPercentage] = useState<number>(50);
  
  const [voltage, setVoltage] = useState<number>(solarConfig.defaultBatteryVoltage);
  const [efficiency, setEfficiency] = useState<number>(solarConfig.defaultBatteryEfficiency * 100);
  const [dod, setDod] = useState<number>(solarConfig.defaultDepthOfDischarge * 100);
  const [batteryType, setBatteryType] = useState<string>("LiFePO4");

  const [results, setResults] = useState<BatteryResults | null>(null);

  useEffect(() => {
    const input = method === "backup" 
      ? { backupLoadW: backupLoad, backupDurationHours: backupHours }
      : { dailyEnergyKWh: dailyUsage, backupPercentage: backupPercentage / 100 };

    const res = calculateBattery({
      ...input,
      batteryVoltage: voltage,
      batteryEfficiency: efficiency / 100,
      depthOfDischarge: dod / 100,
      batteryType
    });
    setResults(res);
  }, [method, backupLoad, backupHours, dailyUsage, backupPercentage, voltage, efficiency, dod, batteryType]);

  const batteryTypes = [
    { name: "Lithium-ion", dod: 90, efficiency: 95 },
    { name: "LiFePO4", dod: 80, efficiency: 90 },
    { name: "Lead-acid", dod: 50, efficiency: 80 },
    { name: "Custom", dod: 80, efficiency: 90 },
  ];

  const handleTypeChange = (typeName: string) => {
    setBatteryType(typeName);
    const type = batteryTypes.find(t => t.name === typeName);
    if (type && typeName !== "Custom") {
      setDod(type.dod);
      setEfficiency(type.efficiency);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-solar/10 rounded-full mb-4">
          <Battery className="w-8 h-8 text-solar" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Solar Battery Calculator</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Calculate the Battery Capacity You Need. Estimate required storage for backup or daily self-consumption.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-6">
          <LocationSelector />

          <Card>
            <CardHeader>
              <CardTitle>Calculation Method</CardTitle>
              <CardDescription>Choose how you want to estimate your battery needs.</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={method} onValueChange={(v) => setMethod(v as any)} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="backup">Based on Backup Load</TabsTrigger>
                  <TabsTrigger value="usage">Based on Daily Usage</TabsTrigger>
                </TabsList>

                <TabsContent value="backup" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="backupLoad">Required backup load (W)</Label>
                      <Input
                        id="backupLoad"
                        type="number"
                        value={backupLoad}
                        onChange={(e) => setBackupLoad(Number(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="backupHours">Backup duration (hours)</Label>
                      <Input
                        id="backupHours"
                        type="number"
                        value={backupHours}
                        onChange={(e) => setBackupHours(Number(e.target.value))}
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="usage" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dailyUsage">Daily consumption (kWh)</Label>
                      <Input
                        id="dailyUsage"
                        type="number"
                        value={dailyUsage}
                        onChange={(e) => setDailyUsage(Number(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="backupPercentage">Required backup %</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {[25, 50, 75, 100].map(p => (
                          <Button 
                            key={p} 
                            variant={backupPercentage === p ? "solar" : "outline"} 
                            size="sm"
                            onClick={() => setBackupPercentage(p)}
                          >
                            {p}%
                          </Button>
                        ))}
                        <Input
                          type="number"
                          placeholder="Custom %"
                          className="w-24 h-9"
                          value={backupPercentage}
                          onChange={(e) => setBackupPercentage(Number(e.target.value))}
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Battery Specifications</CardTitle>
              <CardDescription>Adjust battery technical details for more accurate results.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Battery Technology</Label>
                <div className="flex flex-wrap gap-2">
                  {batteryTypes.map(t => (
                    <Button 
                      key={t.name} 
                      variant={batteryType === t.name ? "solar" : "outline"} 
                      size="sm"
                      onClick={() => handleTypeChange(t.name)}
                    >
                      {t.name}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="voltage">System Voltage (V)</Label>
                  <Input
                    id="voltage"
                    type="number"
                    value={voltage}
                    onChange={(e) => setVoltage(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="efficiency">Efficiency (%)</Label>
                  <Input
                    id="efficiency"
                    type="number"
                    value={efficiency}
                    onChange={(e) => setEfficiency(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dod">Depth of Discharge (%)</Label>
                  <Input
                    id="dod"
                    type="number"
                    value={dod}
                    onChange={(e) => setDod(Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-blue-50 text-blue-800 rounded-lg text-sm">
                <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p>
                  <strong>Note:</strong> Usable capacity, cycle life, and efficiency vary by battery technology. Lithium-ion/LiFePO4 batteries typically support higher DOD and have better efficiency than Lead-acid batteries.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <Card className="border-solar border-2 sticky top-24">
            <CardHeader className="bg-solar/5">
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-solar" />
                Battery Sizing Estimate
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="text-center py-6 border-b">
                <p className="text-sm text-muted-foreground uppercase font-semibold tracking-wider mb-1">Recommended Nominal Capacity</p>
                <div className="text-5xl font-bold text-solar">{results?.nominalCapacityKWh} <span className="text-2xl">kWh</span></div>
                <p className="text-muted-foreground mt-2 font-medium">({results?.nominalCapacityAh} Ah at {results?.recommendedVoltageV}V)</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium">Usable Capacity</span>
                  </div>
                  <span className="font-bold">{results?.usableCapacityKWh} kWh</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium">Backup Duration</span>
                  </div>
                  <span className="font-bold">{results?.estimatedBackupDurationHours} hours</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-solar" />
                    <span className="text-sm font-medium">Battery Count</span>
                  </div>
                  <span className="text-xs text-muted-foreground italic">Depends on individual battery rating</span>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm">How We Calculated:</h4>
                <div className="p-3 bg-muted rounded-md text-xs font-mono">
                  {results?.calculationExplanation}
                  <br />
                  <br />
                  Nominal Capacity = Required Energy ÷ Efficiency ÷ Depth of Discharge
                </div>
              </div>

              <Disclaimer context="battery sizing" />
            </CardContent>
          </Card>
        </div>
      </div>

      <section className="mt-24 prose prose-slate max-w-none">
        <h2 className="text-3xl font-bold mb-6">Complete Guide to Solar Battery Sizing</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3>What is Battery Capacity?</h3>
            <p>
              Battery capacity is a measure of the charge stored by the battery, and is determined by the mass of active material contained in the battery. It represents the maximum amount of energy that can be extracted from the battery under certain specified conditions.
            </p>
            <p>
              Capacity is usually expressed in kilowatt-hours (kWh) for residential storage or Ampere-hours (Ah) for smaller systems.
            </p>

            <h3>Usable vs. Nominal Capacity</h3>
            <p>
              <strong>Nominal Capacity</strong> is the total amount of energy a battery can hold. However, you should never drain a battery completely as it can significantly reduce its lifespan.
            </p>
            <p>
              <strong>Usable Capacity</strong> is the actual amount of energy you can safely use, calculated by multiplying the nominal capacity by the Depth of Discharge (DOD).
            </p>
          </div>
          <div>
            <h3>Battery Efficiency & DOD</h3>
            <p>
              <strong>Efficiency (Round-trip efficiency)</strong> accounts for energy lost as heat during the charging and discharging process. Typical modern lithium batteries have efficiencies between 90% and 95%.
            </p>
            <p>
              <strong>Depth of Discharge (DOD)</strong> is the percentage of the battery that has been discharged relative to its overall capacity. Most manufacturers specify a recommended maximum DOD (e.g., 80% for LiFePO4).
            </p>

            <h3>Choosing the Right Chemistry</h3>
            <ul>
              <li><strong>LiFePO4 (Lithium Iron Phosphate):</strong> Highly safe, long cycle life (3000-6000 cycles), and 80-90% DOD.</li>
              <li><strong>Lithium-ion:</strong> High energy density, lightweight, good efficiency, usually 80-90% DOD.</li>
              <li><strong>Lead-acid:</strong> Lower upfront cost but shorter lifespan (300-500 cycles) and recommended 50% max DOD.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>How many batteries do I need for my home?</AccordionTrigger>
            <AccordionContent>
              The number of batteries depends on the capacity of each individual battery unit. Once you know your total required kWh (from this calculator), simply divide it by the capacity of the battery model you are considering. For example, if you need 10kWh and are buying 5kWh batteries, you need 2 units.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Can I add more batteries later?</AccordionTrigger>
            <AccordionContent>
              With Lithium-ion and LiFePO4 systems, it is often possible to expand the system later, provided your inverter supports it and the new batteries are compatible. For Lead-acid systems, it is generally discouraged to mix old and new batteries.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Does a battery backup work during a grid outage?</AccordionTrigger>
            <AccordionContent>
              Yes, if you have an off-grid or hybrid inverter with "islanding" capability, your battery system can power your home when the grid goes down.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <RelatedCalculators currentId="solar-battery-calculator" />
    </div>
  );
}
