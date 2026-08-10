import React, { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { DollarSign, Settings, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { calculateCost, type CostInput, type CostResults } from "@/lib/calculations/solar-cost";
import { RelatedCalculators } from "@/components/RelatedCalculators";
import { Disclaimer } from "@/components/Disclaimer";
import { LocationSelector } from "@/components/LocationSelector";
import { useSolarSettings } from "@/lib/location/location-context";
import { formatCurrency } from "@/lib/currency/currency-utils";
import { getSolarCostPerWatt, solarPricing } from "@/lib/data/solar-pricing";

export const Route = createFileRoute("/solar-cost-calculator")({
  component: SolarCostCalculator,
  head: () => ({
    title: "Solar Panel Cost Calculator – Estimate Solar Installation Cost",
    meta: [
      { name: "description", content: "Estimate solar panel installation costs based on system size, equipment, and location-specific market data." },
      { property: "og:title", content: "Solar Cost Calculator – Detailed Price Estimates" },
      { property: "og:description", content: "Break down the costs of your solar project with our location-aware calculator." },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function SolarCostCalculator() {
  const { country, region, currency } = useSolarSettings();
  const search = Route.useSearch() as { systemSize?: string };
  
  const [results, setResults] = useState<CostResults | null>(null);
  
  const [inputs, setInputs] = useState<CostInput>({
    systemSizeKW: parseFloat(search.systemSize || "5"),
    systemType: 'on-grid',
    includePanels: true,
    includeInverter: true,
    includeMounting: true,
    includeInstallation: true,
    includeElectrical: true,
    batteryKWh: 0,
    customSubsidy: 0,
  });

  // Update subsidy and state when location changes
  useEffect(() => {
    // Basic auto-subsidy logic or just defaults
    setInputs(prev => ({
      ...prev,
      customSubsidy: country.code === 'US' ? 4500 : country.code === 'IN' ? 78000 : 0
    }));
  }, [country]);

  useEffect(() => {
    setResults(calculateCost(inputs));
  }, [inputs, country, region]);

  const pricingInfo = solarPricing.find(p => p.countryCode === country.code && p.regionCode === region?.code);

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <section className="mb-12 text-center">
        <div className="inline-flex items-center justify-center p-3 bg-solar/10 rounded-full mb-4">
          <DollarSign className="w-8 h-8 text-solar" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Solar Installation Cost Calculator</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Get a detailed breakdown of equipment, labor, and component costs for your solar energy project.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        <div className="lg:col-span-7 space-y-6">
          <LocationSelector />

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-solar" />
                System Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="systemSize">System Size (kW)</Label>
                  <Input 
                    id="systemSize"
                    type="number" 
                    value={inputs.systemSizeKW} 
                    onChange={(e) => setInputs({...inputs, systemSizeKW: parseFloat(e.target.value) || 0})} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="systemType">System Type</Label>
                  <Select value={inputs.systemType} onValueChange={(val: any) => setInputs({...inputs, systemType: val})}>
                    <SelectTrigger id="systemType"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="on-grid">On-Grid (Standard)</SelectItem>
                      <SelectItem value="off-grid">Off-Grid (Independent)</SelectItem>
                      <SelectItem value="hybrid">Hybrid (With Battery Backup)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Included Components</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { label: 'Panels', key: 'includePanels' },
                    { label: 'Inverter', key: 'includeInverter' },
                    { label: 'Mounting', key: 'includeMounting' },
                    { label: 'Installation', key: 'includeInstallation' },
                    { label: 'Wiring/Elec', key: 'includeElectrical' },
                  ].map(({ label, key }) => (
                    <div key={key} className="flex items-center space-x-2 p-2 rounded-lg border hover:bg-slate-50 cursor-pointer transition-colors">
                      <Checkbox 
                        id={key} 
                        checked={inputs[key as keyof CostInput] as boolean}
                        onCheckedChange={(checked) => setInputs({...inputs, [key]: !!checked})} 
                      />
                      <Label htmlFor={key} className="cursor-pointer flex-1 text-sm">{label}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="batteryKWh">Battery Backup (kWh)</Label>
                  <Input 
                    id="batteryKWh"
                    type="number" 
                    value={inputs.batteryKWh} 
                    onChange={(e) => setInputs({...inputs, batteryKWh: parseFloat(e.target.value) || 0})} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customSubsidy">Incentives/Subsidies ({currency})</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-muted-foreground">{country.currencySymbol}</span>
                    <Input 
                      id="customSubsidy"
                      className="pl-8"
                      type="number" 
                      value={inputs.customSubsidy} 
                      onChange={(e) => setInputs({...inputs, customSubsidy: parseFloat(e.target.value) || 0})} 
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-5">
          {results && (
            <Card className="sticky top-24 border-2 border-solar/20">
              <CardHeader className="bg-slate-50 border-b">
                <CardTitle className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-green-600" />
                  Estimated Price Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-3">
                  {results.breakdown.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm border-b border-dashed pb-2">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="font-medium">{formatCurrency(item.cost, currency)}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between pt-2 font-bold text-lg">
                  <span>Gross Cost</span>
                  <span>{formatCurrency(results.totalCost, currency)}</span>
                </div>

                {results.subsidyAmount > 0 && (
                  <div className="flex justify-between text-green-600 font-bold bg-green-50 p-2 rounded-lg">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      Applied Subsidies
                    </span>
                    <span>-{formatCurrency(results.subsidyAmount, currency)}</span>
                  </div>
                )}

                <div className="pt-4 mt-4 border-t-2 border-solar/10">
                  <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest mb-1">Final Net Investment</p>
                  <div className="text-4xl font-extrabold text-solar">
                    {formatCurrency(results.netCost, currency)}
                  </div>
                </div>

                <div className="p-3 bg-blue-50 rounded-lg text-[11px] text-blue-800 leading-relaxed border border-blue-100">
                  <p><strong>Pricing Basis:</strong> {pricingInfo ? `Market rates for ${region ? `${region.name}, ` : ""}${country.name}` : "Global average estimates"}</p>
                  <p><strong>System Size:</strong> {inputs.systemSizeKW}kW {inputs.systemType}</p>
                </div>

                <Button variant="solar" className="w-full mt-4" asChild>
                  <a href="#contact" className="flex items-center justify-center gap-2">
                    Get Local Quotes <ArrowRight className="w-4 h-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <section className="prose prose-slate max-w-none mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Breaking Down Solar Costs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 not-prose">
          <div className="p-6 bg-slate-50 rounded-xl">
            <h3 className="text-lg font-bold mb-3">Hardware (45-55%)</h3>
            <p className="text-sm text-muted-foreground">
              This includes solar panels, the inverter (string or micro-inverters), and mounting hardware. High-efficiency monocrystalline panels represent the largest hardware cost.
            </p>
          </div>
          <div className="p-6 bg-slate-50 rounded-xl">
            <h3 className="text-lg font-bold mb-3">Soft Costs (30-40%)</h3>
            <p className="text-sm text-muted-foreground">
              Soft costs cover installation labor, permitting, interconnection fees, and customer acquisition. These vary significantly by country and installer.
            </p>
          </div>
          <div className="p-6 bg-slate-50 rounded-xl">
            <h3 className="text-lg font-bold mb-3">Electrical & BOS (5-10%)</h3>
            <p className="text-sm text-muted-foreground">
              "Balance of System" costs include wiring, breakers, disconnects, and any necessary electrical panel upgrades to handle the solar input.
            </p>
          </div>
        </div>
      </section>

      <Disclaimer context="solar cost estimates" />
      <RelatedCalculators currentId="solar-cost-calculator" />
    </div>
  );
}
