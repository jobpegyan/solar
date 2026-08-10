import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, Building2, MapPin, Zap, DollarSign, BarChart3, Info } from 'lucide-react';
import { calculateCommercialSystemSize, calculateCommercialArea, estimateDemandSavings } from '@/lib/calculations/commercial-solar';
import { SolarChart } from './SolarChart';

export function CommercialSolarCalculator() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    propertyType: 'office',
    country: 'USA',
    region: 'Texas',
    zipCode: '',
    usageMethod: 'monthly',
    usageValue: 5000,
    peakDemand: 50,
    knowsDemand: false,
    installationType: 'rooftop',
    dcAcRatio: 1.25,
  });

  const [results, setResults] = useState<any>(null);

  const handleCalculate = () => {
    const annualKwh = formData.usageMethod === 'monthly' ? formData.usageValue * 12 : formData.usageValue;
    
    // Mock location data
    const location = { lat: 30, lng: -97, sunHoursPerDay: 5.2 };
    
    const sizeResults = calculateCommercialSystemSize({
      annualConsumptionKwh: annualKwh,
      location,
      propertyType: formData.propertyType,
      installationType: formData.installationType as any,
      dcAcRatio: formData.dcAcRatio,
      deratingFactor: 0.8
    });

    const areaResults = calculateCommercialArea(sizeResults.recommendedKw, formData.installationType as any);
    
    let demandSavings = null;
    if (formData.knowsDemand) {
      demandSavings = estimateDemandSavings(sizeResults.recommendedKw, formData.peakDemand, 15);
    }

    setResults({
      ...sizeResults,
      ...areaResults,
      demandSavings,
      annualGeneration: Math.round(sizeResults.recommendedKw * location.sunHoursPerDay * 0.8 * 365),
      estCost: Math.round(sizeResults.recommendedKw * 2.5 * 1000), // $2.50 per watt
    });
    setStep(6);
  };

  return (
    <div className="container py-12 max-w-4xl">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Commercial Solar Calculator</h1>
        <p className="text-xl text-muted-foreground">
          Estimate the solar system size, energy production, cost, savings and payback for your business or commercial property.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[1, 2, 3, 4, 5, 6].map((s) => (
          <div 
            key={s} 
            className={`h-2 rounded-full ${step >= s ? 'bg-solar' : 'bg-muted'}`}
            title={`Step ${s}`}
          />
        ))}
      </div>

      <Card className="border-2">
        <CardContent className="pt-6">
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="text-solar" />
                <h2 className="text-2xl font-semibold">Property Type</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Select Property Type</Label>
                  <Select 
                    value={formData.propertyType} 
                    onValueChange={(v) => setFormData({...formData, propertyType: v})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="office">Office</SelectItem>
                      <SelectItem value="retail">Retail Store</SelectItem>
                      <SelectItem value="warehouse">Warehouse</SelectItem>
                      <SelectItem value="factory">Factory</SelectItem>
                      <SelectItem value="farm">Farm</SelectItem>
                      <SelectItem value="hotel">Hotel</SelectItem>
                      <SelectItem value="school">School</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Installation Type</Label>
                  <Select 
                    value={formData.installationType} 
                    onValueChange={(v) => setFormData({...formData, installationType: v})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rooftop">Rooftop</SelectItem>
                      <SelectItem value="ground">Ground Mount</SelectItem>
                      <SelectItem value="carport">Carport</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={() => setStep(2)} className="w-full bg-solar text-white">Next Step</Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="text-solar" />
                <h2 className="text-2xl font-semibold">Business Location</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Country</Label>
                  <Input value={formData.country} disabled />
                </div>
                <div className="space-y-2">
                  <Label>ZIP / Postal Code</Label>
                  <Input 
                    placeholder="Enter ZIP code" 
                    value={formData.zipCode}
                    onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">Back</Button>
                <Button onClick={() => setStep(3)} className="flex-1 bg-solar text-white">Next Step</Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="text-solar" />
                <h2 className="text-2xl font-semibold">Energy Usage</h2>
              </div>
              <Tabs value={formData.usageMethod} onValueChange={(v: any) => setFormData({...formData, usageMethod: v})}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="monthly">Monthly Usage</TabsTrigger>
                  <TabsTrigger value="annual">Annual Usage</TabsTrigger>
                </TabsList>
                <TabsContent value="monthly" className="pt-4 space-y-4">
                  <Label>Average Monthly Consumption (kWh)</Label>
                  <Input 
                    type="number" 
                    value={formData.usageValue}
                    onChange={(e) => setFormData({...formData, usageValue: Number(e.target.value)})}
                  />
                </TabsContent>
                <TabsContent value="annual" className="pt-4 space-y-4">
                  <Label>Annual Consumption (kWh)</Label>
                  <Input 
                    type="number" 
                    value={formData.usageValue}
                    onChange={(e) => setFormData({...formData, usageValue: Number(e.target.value)})}
                  />
                </TabsContent>
              </Tabs>
              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setStep(2)} className="flex-1">Back</Button>
                <Button onClick={() => setStep(4)} className="flex-1 bg-solar text-white">Next Step</Button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="text-solar" />
                <h2 className="text-2xl font-semibold">Demand / Peak Load</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    id="knowsDemand" 
                    checked={formData.knowsDemand}
                    onChange={(e) => setFormData({...formData, knowsDemand: e.target.checked})}
                  />
                  <Label htmlFor="knowsDemand">I know my peak demand (kW)</Label>
                </div>
                {formData.knowsDemand && (
                  <div className="space-y-2">
                    <Label>Peak Demand (kW)</Label>
                    <Input 
                      type="number" 
                      value={formData.peakDemand}
                      onChange={(e) => setFormData({...formData, peakDemand: Number(e.target.value)})}
                    />
                  </div>
                )}
                <div className="p-4 bg-muted rounded-lg text-sm italic">
                  Note: If you don't know your demand, we will use a simpler energy-only model.
                </div>
              </div>
              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setStep(3)} className="flex-1">Back</Button>
                <Button onClick={() => setStep(5)} className="flex-1 bg-solar text-white">Next Step</Button>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="text-solar" />
                <h2 className="text-2xl font-semibold">Design Assumptions</h2>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>DC / AC Ratio (Inverter Overloading)</Label>
                  <Input 
                    type="number" 
                    step="0.05"
                    value={formData.dcAcRatio}
                    onChange={(e) => setFormData({...formData, dcAcRatio: Number(e.target.value)})}
                  />
                  <p className="text-xs text-muted-foreground">Typical range: 1.1 to 1.4</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setStep(4)} className="flex-1">Back</Button>
                <Button onClick={handleCalculate} className="flex-1 bg-solar text-white">Calculate Commercial Solar</Button>
              </div>
            </div>
          )}

          {step === 6 && results && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-solar/10 p-6 rounded-xl border-2 border-solar text-center">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-solar mb-2">Recommended Commercial Solar System</h2>
                <div className="text-5xl font-bold">
                  {results.recommendedKw >= 1000 ? `${(results.recommendedKw / 1000).toFixed(2)} MW` : `${results.recommendedKw} kW`}
                </div>
                <div className="text-muted-foreground mt-2">
                  Recommended Range: {results.range.min} – {results.range.max} kW
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">System Specifications</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">DC Capacity</span>
                      <span className="font-semibold">{results.recommendedKw} kWp</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">AC Inverter Rating</span>
                      <span className="font-semibold">{results.inverterAcKw} kW AC</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Panel Count (550W)</span>
                      <span className="font-semibold">{Math.ceil(results.recommendedKw * 1000 / 550)}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2 mt-2">
                      <span className="text-muted-foreground font-semibold text-black">Estimated Area</span>
                      <span className="font-bold">{results.sqft.toLocaleString()} sq ft</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Financial Estimates</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between text-green-600">
                      <span>Annual Generation</span>
                      <span className="font-semibold">{results.annualGeneration.toLocaleString()} kWh</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Est. System Cost</span>
                      <span className="font-semibold">${results.estCost.toLocaleString()}</span>
                    </div>
                    {results.demandSavings && (
                      <div className="flex justify-between text-green-600 font-semibold">
                        <span>Demand Savings</span>
                        <span>${results.demandSavings.annualSavings.toLocaleString()}/yr</span>
                      </div>
                    )}
                    <div className="flex justify-between border-t pt-2 mt-2">
                      <span className="text-muted-foreground font-semibold text-black">Payback Period</span>
                      <span className="font-bold text-green-600">~5.5 Years</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg flex gap-3 text-sm text-blue-800">
                <Info className="shrink-0 w-5 h-5" />
                <p>
                  <strong>Preliminary Planning Estimate:</strong> These results are for planning purposes only. 
                  Final DC/AC sizing and design must be verified by a qualified solar professional.
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <Button variant="outline" onClick={() => setStep(5)} className="flex-1">Refine Inputs</Button>
                <Button className="flex-1 bg-solar text-white">Generate Full Report</Button>
                <Button className="flex-1 bg-black text-white">Request Quote</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="mt-12 space-y-8">
        <section className="prose prose-slate max-w-none">
          <h2>Commercial Solar Planning</h2>
          <p>
            Commercial solar systems represent a significant investment in operational efficiency. 
            Unlike residential systems, commercial installations must account for demand charges, 
            coincidental load profiles, and often complex tax incentives like MACRS depreciation.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 not-prose">
            <div className="bg-muted p-6 rounded-xl">
              <h3 className="font-bold mb-2">Demand Charge Reduction</h3>
              <p className="text-sm text-muted-foreground">
                For many businesses, a large portion of the bill comes from peak demand (kW). 
                Solar can help reduce these charges if peak consumption coincides with high sun availability.
              </p>
            </div>
            <div className="bg-muted p-6 rounded-xl">
              <h3 className="font-bold mb-2">Solar Capacity vs. Load</h3>
              <p className="text-sm text-muted-foreground">
                Ideally, a commercial system is sized to offset 80-100% of annual usage, 
                provided roof or ground space allows. We recommend MW-scale planning for warehouses and factories.
              </p>
            </div>
          </div>
        </section>

        <section className="p-8 border-2 border-dashed rounded-2xl text-center">
          <h2 className="text-2xl font-bold mb-2">Ready to go solar?</h2>
          <p className="text-muted-foreground mb-6">Connect with vetted commercial solar installers in your region.</p>
          <Button size="lg" className="bg-solar text-white px-8">Get Commercial Solar Quotes</Button>
        </section>

        <section className="text-xs text-muted-foreground italic border-t pt-8">
          <p>
            Commercial solar results are preliminary planning estimates, not engineering, financial, tax, legal or utility-interconnection advice. 
            Actual system sizing, production, project cost, savings, incentives and payback depend on site conditions, equipment, 
            utility tariffs, demand patterns, permitting, interconnection requirements, financing and other project-specific factors. 
            Obtain professional engineering and financial review before making project decisions.
          </p>
        </section>
      </div>
    </div>
  );
}
