import React, { useState, useEffect } from 'react';
import { useSolarSettings } from '@/lib/location/location-context';
import { getElectricityRate, electricityRates } from '@/lib/data/electricity-rates';
import { getSolarResource, solarResources } from '@/lib/data/solar-resource';
import { formatCurrency } from '@/lib/currency/currency-utils';
import { calculateSystemSize } from '@/lib/calculations/solar-system';
import { trackConversion } from '@/lib/monetization/analytics.functions';
import { useServerFn } from '@tanstack/react-start';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LocationSelector } from '@/components/LocationSelector';
import { DataFreshness } from '@/components/DataFreshness';
import { Info, Settings2, Sliders } from 'lucide-react';
import { solarConfig } from '@/lib/solar-config';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface MainCalculatorProps {
  onResultsChange: (results: any) => void;
}

export function MainCalculator({ onResultsChange }: MainCalculatorProps) {

  const { country, region, currency } = useSolarSettings();
  const trackFn = useServerFn(trackConversion);
  
  const [mode, setMode] = useState<'bill' | 'usage'>('bill');
  const [calcLevel, setCalcLevel] = useState<'simple' | 'advanced'>('simple');
  const [bill, setBill] = useState<number>(150);
  const [usage, setUsage] = useState<number>(450);
  const [rate, setRate] = useState<number>(country.defaultElectricityRate || 0.15);
  
  // Advanced settings
  const [sunHours, setSunHours] = useState<number>(country.defaultPeakSunHours || 5.0);
  const [pr, setPr] = useState<number>(country.defaultPerformanceRatio);

  const [panelWattage, setPanelWattage] = useState<number>(solarConfig.defaultPanelWattage);
  
  // Phase 6 Advanced UI state
  const [orientation, setOrientation] = useState('South');
  const [shading, setShading] = useState<'none' | 'some' | 'heavy'>('none');
  const [tilt, setTilt] = useState<number>(20);
  const [losses, setLosses] = useState({
    inverter: 4,
    wiring: 2,
    soiling: 3
  });

  // Update rates and sun hours when location changes
  useEffect(() => {
    const regionalRate = getElectricityRate(country.code, region?.code);
    setRate(regionalRate);
    
    const resource = getSolarResource(country.code, region?.code);
    setSunHours(resource.peakSunHours);
    setPr(resource.performanceRatio);
  }, [country, region]);

  const handleCalculate = React.useCallback(async () => {
    const results = await calculateSystemSize({
      monthlyUsageKWh: mode === 'usage' ? usage : undefined,
      monthlyBill: mode === 'bill' ? bill : undefined,
      tariffPerKWh: rate,
      peakSunHours: sunHours,
      performanceRatio: pr,
      panelWattage: panelWattage,
      countryCode: country.code,
      regionCode: region?.code,
      orientation,
      shading,
      inverterLosses: losses.inverter / 100,
      wiringLosses: losses.wiring / 100,
      soilingLosses: losses.soiling / 100,
    } as any);

    onResultsChange({
      ...results,
      systemSize: results.requiredSystemSizeKW, // Mapping for compatibility
      panels: results.panelCount,
      generation: results.monthlyGenerationKWh,
      roofArea: results.requiredRoofAreaSqFt,
      monthlySavings: results.annualSavings / 12,
      locationName: region ? `${region.name}, ${country.name}` : country.name,
      currency,
      rate,
      sunHours
    });

    trackFn({
      data: {
        eventName: 'calculator_completed',
        calculatorId: 'main-solar-calculator',
        metadata: { country: country.code, mode }
      }
    });
  }, [mode, usage, bill, rate, sunHours, pr, panelWattage, country.code, region, orientation, shading, losses, currency, onResultsChange, trackFn]);


  // Debounced calculation
  useEffect(() => {
    const timer = setTimeout(() => {
      handleCalculate();
    }, 150); // 150ms debounce for UI responsiveness
    return () => clearTimeout(timer);
  }, [handleCalculate]);

  const rateInfo = electricityRates.find(r => r.countryCode === country.code && r.regionCode === region?.code);
  const resourceInfo = solarResources.find(r => r.countryCode === country.code && r.regionCode === region?.code);

  return (
    <div className="space-y-8">
      <LocationSelector />

      <Card>
        <CardContent className="pt-6 space-y-6">
          <div className="flex items-center justify-between pb-2 border-b">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-solar" />
              <span className="text-sm font-medium">Calculator Mode</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs ${calcLevel === 'simple' ? 'font-bold text-solar' : 'text-muted-foreground'}`}>Simple</span>
              <Switch 
                checked={calcLevel === 'advanced'} 
                onCheckedChange={(checked) => setCalcLevel(checked ? 'advanced' : 'simple')} 
              />
              <span className={`text-xs ${calcLevel === 'advanced' ? 'font-bold text-solar' : 'text-muted-foreground'}`}>Advanced</span>
            </div>
          </div>

          <Tabs value={mode} onValueChange={(v: any) => setMode(v)} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="bill">Monthly Bill</TabsTrigger>
              <TabsTrigger value="usage">Monthly Usage (kWh)</TabsTrigger>
            </TabsList>
            
            <TabsContent value="bill" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bill">Average Monthly Bill ({currency})</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-muted-foreground">{country.currencySymbol}</span>
                  <Input
                    id="bill"
                    type="number"
                    className="pl-8"
                    value={bill}
                    onChange={(e) => setBill(Math.max(0, Number(e.target.value)))}
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="usage" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="usage">Average Monthly Usage (kWh)</Label>
                <Input
                  id="usage"
                  type="number"
                  value={usage}
                  onChange={(e) => setUsage(Math.max(0, Number(e.target.value)))}
                />
              </div>
            </TabsContent>
          </Tabs>

          {calcLevel === 'advanced' && (
            <div className="space-y-6 pt-4 border-t animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                <Settings2 className="w-4 h-4" />
                Advanced System Assumptions
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Roof Orientation</Label>
                  <Select value={orientation} onValueChange={setOrientation}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {['South', 'Southeast', 'Southwest', 'East', 'West', 'North', 'Flat'].map(o => (
                        <SelectItem key={o} value={o}>{o}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-[10px] text-muted-foreground">South is typically optimal in the Northern Hemisphere.</p>
                </div>

                <div className="space-y-2">
                  <Label>Roof Shading</Label>
                  <Select value={shading} onValueChange={(v: any) => setShading(v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No significant shade</SelectItem>
                      <SelectItem value="some">Some shade (15% loss)</SelectItem>
                      <SelectItem value="heavy">Heavy shade (50% loss)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tilt">Roof Tilt (degrees)</Label>
                  <Input 
                    id="tilt" 
                    type="number" 
                    value={tilt} 
                    onChange={(e) => setTilt(Math.max(0, Math.min(90, Number(e.target.value))))} 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="panelWattage">Panel Wattage (W)</Label>
                  <Input 
                    id="panelWattage" 
                    type="number" 
                    value={panelWattage} 
                    onChange={(e) => setPanelWattage(Math.max(10, Number(e.target.value)))} 
                  />
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">System Losses (%)</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <Label className="text-[10px]">Inverter</Label>
                    <Input 
                      type="number" 
                      className="h-8 text-xs" 
                      value={losses.inverter}
                      onChange={(e) => setLosses({...losses, inverter: Math.max(0, Math.min(100, Number(e.target.value)))})}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px]">Wiring</Label>
                    <Input 
                      type="number" 
                      className="h-8 text-xs" 
                      value={losses.wiring}
                      onChange={(e) => setLosses({...losses, wiring: Math.max(0, Math.min(100, Number(e.target.value)))})}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px]">Soiling</Label>
                    <Input 
                      type="number" 
                      className="h-8 text-xs" 
                      value={losses.soiling}
                      onChange={(e) => setLosses({...losses, soiling: Math.max(0, Math.min(100, Number(e.target.value)))})}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="rate">Electricity Rate ({currency}/kWh)</Label>
                {rateInfo && <DataFreshness date={rateInfo.lastUpdated} source={rateInfo.source} />}
              </div>
              <Input
                id="rate"
                type="number"
                step="0.01"
                value={rate}
                onChange={(e) => setRate(Math.max(0, Number(e.target.value)))}
              />
              <p className="text-[10px] text-muted-foreground">Rates vary by utility, plan, and usage.</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="sunHours">Avg. Peak Sun Hours</Label>
                {resourceInfo && <DataFreshness date={resourceInfo.lastUpdated} source={resourceInfo.source} />}
              </div>
              <Input
                id="sunHours"
                type="number"
                step="0.1"
                value={sunHours}
                onChange={(e) => setSunHours(Math.max(0.1, Number(e.target.value)))}
              />
              <p className="text-[10px] text-muted-foreground">
                {region ? `Using average for ${region.name}.` : `Using average for ${country.name}.`}
              </p>
            </div>
          </div>

          <div className="p-4 bg-amber-50 rounded-lg border border-amber-100 flex gap-3">
            <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-800">
              Solar production varies with season, weather, shading and system conditions.
              A professional site assessment is recommended.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
