import React, { useState, useEffect, useCallback } from 'react';
import { useSolarSettings } from '@/lib/location/location-context';
import { getElectricityRate } from '@/lib/data/electricity-rates';
import { getSolarResource } from '@/lib/data/solar-resource';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LocationSelector } from '@/components/LocationSelector';
import { Info, Settings2, Sliders, Zap, Save, Check } from 'lucide-react';
import { solarConfig } from '@/lib/solar-config';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useServerFn } from '@tanstack/react-start';
import { calculateSolarSystem } from '@/lib/calculations/solar.functions';
import { SystemResults, calculateSystemSize } from '@/lib/calculations/solar-system';
import { LoadCalculator } from './LoadCalculator';
import { saveCalculation } from '@/lib/saved-calculations.functions';
import { trackConversion } from '@/lib/monetization/analytics.functions';
import { useAuth } from '@/lib/auth-context';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

interface SharedCalculatorProps {
  initialMode?: 'bill' | 'usage';
  calculatorId: string;
  onResultsChange?: (results: SystemResults & { inputs: any }) => void;
  onCalculate?: (inputs: any) => void;
  // Allows specific calculators to hide certain fields
  hiddenFields?: string[];
  // Allows specific calculators to force a mode
  fixedMode?: 'bill' | 'usage';
  initialInputs?: any;
}

const CALCULATOR_SCHEMAS: Record<string, { visibleFields?: string[]; title?: string; defaultFixedMode?: 'bill' | 'usage' | 'size' }> = {
  'solar-panel-calculator': { title: 'Solar System Parameters' },
  'solar-panel-size-calculator': { visibleFields: ['usage', 'sunHours', 'panelWattage', 'targetOffset'], defaultFixedMode: 'usage', title: 'Panel Sizing Inputs' },
  'solar-system-size-calculator': { visibleFields: ['usage', 'rate', 'sunHours', 'panelWattage', 'targetOffset'], defaultFixedMode: 'usage', title: 'System Capacity Parameters' },
  'solar-panel-output-calculator': { visibleFields: ['solarArraySizeKW', 'sunHours'], title: 'Solar Generation Parameters' },
  'solar-energy-production-calculator': { visibleFields: ['solarArraySizeKW', 'sunHours'], title: 'Annual Production Parameters' },
  'solar-panel-savings-calculator': { visibleFields: ['bill', 'rate', 'targetOffset'], defaultFixedMode: 'bill', title: 'Financial Savings Inputs' },
  'solar-panel-cost-calculator': { visibleFields: ['bill', 'usage', 'solarArraySizeKW', 'rate', 'costPerWatt', 'includeTaxCredit', 'targetOffset'], title: 'System Cost Parameters' },
  'solar-panel-cost-calculator-usa': { visibleFields: ['bill', 'usage', 'solarArraySizeKW', 'rate', 'costPerWatt', 'includeTaxCredit', 'targetOffset'], title: 'USA Solar Cost Parameters' },
  'solar-panel-cost-calculator-india': { visibleFields: ['bill', 'usage', 'solarArraySizeKW', 'rate', 'costPerWatt', 'includeTaxCredit', 'targetOffset'], title: 'India Solar Cost Parameters' },
  'solar-cost-calculator': { visibleFields: ['bill', 'usage', 'solarArraySizeKW', 'rate', 'costPerWatt', 'includeTaxCredit', 'targetOffset'], title: 'System Installation Cost Parameters' },
  'solar-panel-roi-calculator': { visibleFields: ['bill', 'rate', 'solarArraySizeKW'], defaultFixedMode: 'bill', title: 'ROI & Return Parameters' },
  'solar-payback-period-calculator': { visibleFields: ['bill', 'rate', 'solarArraySizeKW'], defaultFixedMode: 'bill', title: 'Payback Inputs' },
  'solar-bill-savings-calculator': { visibleFields: ['bill', 'rate'], defaultFixedMode: 'bill', title: 'Utility Bill Parameters' },
  'solar-electricity-cost-calculator': { visibleFields: ['solarArraySizeKW', 'bill', 'rate'], title: 'LCOE Cost Parameters' },
  'solar-installation-cost-calculator': { visibleFields: ['solarArraySizeKW', 'rate', 'costPerWatt', 'includeTaxCredit'], title: 'Installation Cost Parameters' },
  'solar-investment-return-calculator': { visibleFields: ['bill', 'rate', 'solarArraySizeKW'], defaultFixedMode: 'bill', title: 'Investment Parameters' },
  'solar-battery-size-calculator': { visibleFields: ['backupLoadW', 'backupDurationHours', 'batteryVoltageV', 'depthOfDischarge'], title: 'Battery Sizing Parameters' },
  'solar-battery-backup-calculator': { visibleFields: ['backupLoadW', 'backupDurationHours', 'stateOfCharge'], title: 'Backup Power Parameters' },
  'solar-battery-capacity-calculator': { visibleFields: ['batteryCapacityKWh', 'depthOfDischarge', 'batteryEfficiency'], title: 'Capacity Parameters' },
  'solar-battery-runtime-calculator': { visibleFields: ['batteryCapacityKWh', 'stateOfCharge', 'backupLoadW'], title: 'Runtime Inputs' },
  'solar-battery-storage-calculator': { visibleFields: ['usage', 'backupDurationHours', 'batteryVoltageV'], defaultFixedMode: 'usage', title: 'Storage Parameters' },
  'solar-inverter-battery-calculator': { visibleFields: ['backupLoadW', 'batteryVoltageV', 'backupDurationHours'], title: 'Inverter Battery Rating Inputs' },
  'how-many-solar-panels-do-i-need': { visibleFields: ['usage', 'panelWattage', 'sunHours'], defaultFixedMode: 'usage', title: 'Panel Count Parameters' },
  'solar-panels-needed-calculator': { visibleFields: ['solarArraySizeKW', 'panelWattage'], title: 'Target Capacity Parameters' },
  'solar-panels-for-house-calculator': { visibleFields: ['usage', 'panelWattage'], defaultFixedMode: 'usage', title: 'Household Energy Inputs' },
  'solar-inverter-size-calculator': { visibleFields: ['solarArraySizeKW', 'targetDcAcRatio'], title: 'Inverter Sizing Parameters' },
  'solar-inverter-capacity-calculator': { visibleFields: ['solarArraySizeKW', 'safetyMargin', 'inverterType'], title: 'Inverter Rating Parameters' },
  'inverter-load-calculator': { visibleFields: ['runningLoadW', 'peakLoadW', 'safetyMargin'], title: 'Load Wattage Parameters' },
  'solar-inverter-requirement-calculator': { visibleFields: ['solarArraySizeKW', 'runningLoadW', 'inverterType'], title: 'Inverter Requirement Parameters' },
  'solar-tilt-angle-calculator': { visibleFields: ['tilt'], title: 'Tilt Parameters' },
  'solar-panel-angle-calculator': { visibleFields: ['orientation', 'tilt'], title: 'Angle & Direction Parameters' },
  'solar-irradiance-calculator': { visibleFields: ['sunHours'], title: 'Irradiance Inputs' },
  'solar-shading-calculator': { visibleFields: ['solarArraySizeKW', 'shading'], title: 'Shading Parameters' },
  'solar-system-loss-calculator': { visibleFields: ['solarArraySizeKW', 'losses'], title: 'Derate Factor Inputs' },
  'solar-array-size-calculator': { visibleFields: ['usage', 'sunHours', 'panelWattage'], defaultFixedMode: 'usage', title: 'Array Capacity Inputs' }
};

export function SharedCalculator({ 
  initialMode = 'bill', 
  calculatorId,
  onResultsChange,
  onCalculate,
  hiddenFields = [],
  fixedMode,
  initialInputs
}: SharedCalculatorProps) {
  const baseId = calculatorId.replace(/-(usa|india)$/, '');
  const schema = CALCULATOR_SCHEMAS[calculatorId] || CALCULATOR_SCHEMAS[baseId];
  const isHidden = (field: string) => {
    if (hiddenFields.includes(field)) return true;
    if (schema && schema.visibleFields) {
      return !schema.visibleFields.includes(field);
    }
    return false;
  };

  const { country, region, currency, unitSystem } = useSolarSettings();
  const calculateFn = useServerFn(calculateSolarSystem);
  const trackFn = useServerFn(trackConversion);
  
  const [mode, setMode] = useState<'bill' | 'usage' | 'size'>(fixedMode || initialMode);
  const [calcLevel, setCalcLevel] = useState<'simple' | 'advanced'>('simple');
  const [bill, setBill] = useState<number>(initialInputs?.monthlyBill || 150);
  const [usage, setUsage] = useState<number>(initialInputs?.monthlyUsageKWh || 450);
  const [rate, setRate] = useState<number>(initialInputs?.tariffPerKWh || country.defaultElectricityRate);
  const [costPerWatt, setCostPerWatt] = useState<number>(initialInputs?.costPerWatt || (country.code === 'IN' ? 65 : 3.0));
  const [includeTaxCredit, setIncludeTaxCredit] = useState<boolean>(initialInputs?.includeTaxCredit !== undefined ? initialInputs.includeTaxCredit : true);
  const [targetOffset, setTargetOffset] = useState<number>(initialInputs?.targetOffset || 100);
  
  const [sunHours, setSunHours] = useState<number>(initialInputs?.peakSunHours || country.defaultPeakSunHours);
  const [pr, setPr] = useState<number>(initialInputs?.performanceRatio || country.defaultPerformanceRatio);
  const [panelWattage, setPanelWattage] = useState<number>(initialInputs?.panelWattage || solarConfig.defaultPanelWattage);
  
  const [orientation, setOrientation] = useState(initialInputs?.orientation || 'South');
  const [shading, setShading] = useState<'none' | 'some' | 'heavy'>(initialInputs?.shading || 'none');
  const [tilt, setTilt] = useState<number>(initialInputs?.tilt || 20);
  const [losses, setLosses] = useState(initialInputs?.losses || {
    inverter: 4,
    wiring: 2,
    soiling: 3
  });

  // Battery-specific inputs
  const [backupLoadW, setBackupLoadW] = useState<number>(initialInputs?.backupLoadW || 1000);
  const [backupDurationHours, setBackupDurationHours] = useState<number>(initialInputs?.backupDurationHours || 8);
  const [batteryEfficiency, setBatteryEfficiency] = useState<number>(initialInputs?.batteryEfficiency || 90);
  const [depthOfDischarge, setDepthOfDischarge] = useState<number>(initialInputs?.depthOfDischarge || 80);
  const [reservePercentage, setReservePercentage] = useState<number>(initialInputs?.reservePercentage || 10);
  const [batteryCapacityKWh, setBatteryCapacityKWh] = useState<number>(initialInputs?.batteryCapacityKWh || 13.5);
  const [stateOfCharge, setStateOfCharge] = useState<number>(initialInputs?.stateOfCharge || 100);
  const [inverterEfficiency, setInverterEfficiency] = useState<number>(initialInputs?.inverterEfficiency || 95);
  const [batteryVoltageV, setBatteryVoltageV] = useState<number>(initialInputs?.batteryVoltageV || 48);

  // Inverter-specific inputs
  const [solarArraySizeKW, setSolarArraySizeKW] = useState<number>(initialInputs?.solarArraySizeKW || 5);
  const [targetDcAcRatio, setTargetDcAcRatio] = useState<number>(initialInputs?.targetDcAcRatio || 1.2);
  const [safetyMargin, setSafetyMargin] = useState<number>(initialInputs?.safetyMargin || 10);
  const [inverterType, setInverterType] = useState<'grid-tied' | 'off-grid' | 'hybrid'>(initialInputs?.inverterType || 'grid-tied');
  const [peakLoadW, setPeakLoadW] = useState<number>(initialInputs?.peakLoadW || 0);
  const [runningLoadW, setRunningLoadW] = useState<number>(initialInputs?.runningLoadW || 0);

  useEffect(() => {
    const regionalRate = getElectricityRate(country.code, region?.code);
    setRate(regionalRate);
    
    const resource = getSolarResource(country.code, region?.code);
    setSunHours(resource.peakSunHours);
    setPr(resource.performanceRatio);

    const regionalCostW = getSolarCostPerWatt(country.code, region?.code);
    if (regionalCostW) {
      setCostPerWatt(regionalCostW);
    } else {
      setCostPerWatt(country.code === 'IN' ? 65 : 3.0);
    }
  }, [country, region]);

  const handleCalculate = useCallback(async () => {
    try {
      const inputs = {
        monthlyUsageKWh: mode === 'usage' ? usage : undefined,
        monthlyBill: mode === 'bill' ? bill : undefined,
        systemSizeKW: mode === 'size' ? solarArraySizeKW : undefined,
        costPerWatt,
        includeTaxCredit,
        tariffPerKWh: rate,
        peakSunHours: sunHours,
        performanceRatio: pr,
        panelWattage: panelWattage,
        countryCode: country.code,
        regionCode: region?.code,
        orientation,
        shading,
        tilt,
        inverterLosses: losses.inverter / 100,
        wiringLosses: losses.wiring / 100,
        soilingLosses: losses.soiling / 100,
        targetOffset,
        // Battery specific
        backupLoadW,
        backupDurationHours,
        batteryEfficiency,
        depthOfDischarge,
        reservePercentage,
        batteryCapacityKWh,
        stateOfCharge,
        inverterEfficiency,
        batteryVoltageV,
        // Inverter specific
        solarArraySizeKW,
        targetDcAcRatio,
        safetyMargin,
        inverterType,
        peakLoadW,
        runningLoadW
      };

      if (onCalculate) {
        onCalculate(inputs);
      }

      if (onResultsChange) {
        let results;
        try {
          results = await calculateFn({ data: inputs });
        } catch (serverErr) {
          console.warn("ServerFn calculation failed, using local engine fallback:", serverErr);
          results = await calculateSystemSize(inputs);
        }

        setLastResults({ ...results, inputs });
        onResultsChange({
          ...results,
          inputs
        });

        try {
          trackFn({
            data: {
              eventName: 'calculator_completed',
              calculatorId,
              metadata: { country: country.code, mode }
            }
          });
        } catch (_) {
          // ignore tracking errors
        }
      }
    } catch (error) {
      console.error("Calculation error:", error);
    }
  }, [mode, usage, bill, solarArraySizeKW, costPerWatt, includeTaxCredit, rate, sunHours, pr, panelWattage, country.code, region, orientation, shading, tilt, losses, targetOffset, backupLoadW, backupDurationHours, batteryEfficiency, depthOfDischarge, reservePercentage, batteryCapacityKWh, stateOfCharge, inverterEfficiency, batteryVoltageV, calculateFn, onResultsChange, onCalculate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleCalculate();
    }, 300);
    return () => clearTimeout(timer);
  }, [handleCalculate]);

  const { user } = useAuth();
  const saveFn = useServerFn(saveCalculation);
  const [isSaving, setIsSaving] = useState(false);
  const [lastResults, setLastResults] = useState<any>(null);

  const handleSave = async () => {
    if (!user) {
      toast.error("Please sign in to save calculations", {
        description: "Your results will be stored in your dashboard."
      });
      return;
    }

    if (!lastResults) return;

    setIsSaving(true);
    try {
      await saveFn({
        data: {
          calculatorId,
          calculatorSlug: window.location.pathname,
          name: `${calculatorId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} — ${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`,
          inputs: lastResults.inputs,
          results: lastResults,
          country: country.code,
          currency: currency,
          units: unitSystem,
          formulaVersion: 'v1'
        }
      });
      
      trackFn({
        data: {
          eventName: 'calculator_saved',
          calculatorId,
          metadata: { country: country.code }
        }
      });

      toast.success("Calculation saved successfully!", {
        action: {
          label: "View Dashboard",
          onClick: () => window.location.href = "/dashboard/calculations"
        }
      });
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Failed to save calculation");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">{schema?.title || "Calculator Inputs"}</h3>
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2" 
          onClick={handleSave}
          disabled={isSaving || !lastResults}
        >
          {isSaving ? <Check className="w-4 h-4 animate-pulse" /> : <Save className="w-4 h-4" />}
          {isSaving ? "Saving..." : "Save Calculation"}
        </Button>
      </div>
      {!isHidden('location') && <LocationSelector />}
      
      {country.code === 'US' && (
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-xs text-muted-foreground space-y-2">
          <p className="font-semibold flex items-center gap-1 text-slate-900">
            <Info className="w-3 h-3 text-solar" /> US Localization Active
          </p>
          <ul className="list-disc pl-4 space-y-1">
            <li>Currency: {currency} ($)</li>
            <li>Units: {unitSystem === 'US' ? 'US Customary (ft, sq ft)' : 'Metric'}</li>
            <li>Region: {region?.name || 'National Average'}</li>
          </ul>
        </div>
      )}

      {country.code === 'IN' && (
        <div className="p-4 bg-orange-50 border border-orange-100 rounded-lg text-xs text-muted-foreground space-y-2">
          <p className="font-semibold flex items-center gap-1 text-orange-900">
            <Info className="w-3 h-3 text-solar" /> India Localization Active
          </p>
          <ul className="list-disc pl-4 space-y-1">
            <li>Currency: INR (₹)</li>
            <li>Units: Metric (sq m) / {unitSystem === 'Metric' ? 'Units (kWh)' : 'kWh'}</li>
            <li>State: {region?.name || 'Select State'}</li>
            <li>PIN Code Support: Enabled</li>
          </ul>
        </div>
      )}


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

          {!fixedMode ? (
            <Tabs value={mode} onValueChange={(v: any) => setMode(v)} className="w-full">
              <TabsList className={`grid w-full ${!isHidden('solarArraySizeKW') ? 'grid-cols-3' : 'grid-cols-2'} mb-6`}>
                <TabsTrigger value="bill">Monthly Bill</TabsTrigger>
                <TabsTrigger value="usage">Monthly Usage</TabsTrigger>
                {!isHidden('solarArraySizeKW') && <TabsTrigger value="size">System Size</TabsTrigger>}
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

              {!isHidden('solarArraySizeKW') && (
                <TabsContent value="size" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="solarArraySizeKW">Target Solar Array Size (kW DC)</Label>
                    <Input
                      id="solarArraySizeKW"
                      type="number"
                      step="0.5"
                      value={solarArraySizeKW}
                      onChange={(e) => setSolarArraySizeKW(Math.max(0.5, Number(e.target.value)))}
                    />
                  </div>
                </TabsContent>
              )}
            </Tabs>
          ) : (
            <div className="space-y-4">
              {fixedMode === 'bill' ? (
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
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="usage">Average Monthly Usage (kWh)</Label>
                  <Input
                    id="usage"
                    type="number"
                    value={usage}
                    onChange={(e) => setUsage(Math.max(0, Number(e.target.value)))}
                  />
                </div>
              )}
            </div>
          )}

          {!isHidden('targetOffset') && (
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="targetOffset">Target Solar Offset (%)</Label>
                <span className="text-xs font-bold text-solar">{targetOffset}%</span>
              </div>
              <Input
                id="targetOffset"
                type="range"
                min="10"
                max="200"
                step="5"
                value={targetOffset}
                onChange={(e) => setTargetOffset(Number(e.target.value))}
                className="accent-solar"
              />
            </div>
          )}

          {calcLevel === 'advanced' && (
            <div className="space-y-6 pt-4 border-t animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                <Settings2 className="w-4 h-4" />
                Advanced System Assumptions
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {!isHidden('orientation') && (
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
                  </div>
                )}

                {!isHidden('shading') && (
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
                )}

                {!isHidden('tilt') && (
                  <div className="space-y-2">
                    <Label htmlFor="tilt">Roof Tilt (degrees)</Label>
                    <Input 
                      id="tilt" 
                      type="number" 
                      value={tilt} 
                      onChange={(e) => setTilt(Math.max(0, Math.min(90, Number(e.target.value))))} 
                    />
                  </div>
                )}

                {!isHidden('panelWattage') && (
                  <div className="space-y-2">
                    <Label htmlFor="panelWattage">Panel Wattage (W)</Label>
                    <Input 
                      id="panelWattage" 
                      type="number" 
                      value={panelWattage} 
                      onChange={(e) => setPanelWattage(Math.max(10, Number(e.target.value)))} 
                    />
                  </div>
                )}
              </div>

              {!isHidden('losses') && (
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
              )}

              {/* Battery specific advanced inputs */}
              {!isHidden('batteryEfficiency') && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="batteryEfficiency">Battery Efficiency (%)</Label>
                    <Input 
                      id="batteryEfficiency" 
                      type="number" 
                      value={batteryEfficiency} 
                      onChange={(e) => setBatteryEfficiency(Math.max(0, Math.min(100, Number(e.target.value))))} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="depthOfDischarge">Depth of Discharge (%)</Label>
                    <Input 
                      id="depthOfDischarge" 
                      type="number" 
                      value={depthOfDischarge} 
                      onChange={(e) => setDepthOfDischarge(Math.max(1, Math.min(100, Number(e.target.value))))} 
                    />
                  </div>
                </div>
              )}

              {!isHidden('inverterEfficiency') && (
                <div className="space-y-2 pt-4">
                  <Label htmlFor="inverterEfficiency">Inverter Efficiency (%)</Label>
                  <Input 
                    id="inverterEfficiency" 
                    type="number" 
                    value={inverterEfficiency} 
                    onChange={(e) => setInverterEfficiency(Math.max(1, Math.min(100, Number(e.target.value))))} 
                  />
                </div>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
            {!isHidden('solarArraySizeKW') && (
              <div className="space-y-2">
                <Label htmlFor="solarArraySizeKW">Solar Array Size (kW DC)</Label>
                <Input
                  id="solarArraySizeKW"
                  type="number"
                  value={solarArraySizeKW}
                  onChange={(e) => setSolarArraySizeKW(Math.max(0, Number(e.target.value)))}
                />
              </div>
            )}

            {!isHidden('targetDcAcRatio') && (
              <div className="space-y-2">
                <Label htmlFor="targetDcAcRatio">Target DC/AC Ratio</Label>
                <Input
                  id="targetDcAcRatio"
                  type="number"
                  step="0.05"
                  value={targetDcAcRatio}
                  onChange={(e) => setTargetDcAcRatio(Math.max(0.1, Number(e.target.value)))}
                />
              </div>
            )}

            {!isHidden('inverterType') && (
              <div className="space-y-2">
                <Label>Inverter Type</Label>
                <Select value={inverterType} onValueChange={(v: any) => setInverterType(v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="grid-tied">Grid-Tied</SelectItem>
                    <SelectItem value="off-grid">Off-Grid</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {!isHidden('safetyMargin') && (
              <div className="space-y-2">
                <Label htmlFor="safetyMargin">Safety Margin (%)</Label>
                <Input
                  id="safetyMargin"
                  type="number"
                  value={safetyMargin}
                  onChange={(e) => setSafetyMargin(Math.max(0, Number(e.target.value)))}
                />
              </div>
            )}

            {!isHidden('backupLoadW') && (
              <div className="space-y-2">
                <Label htmlFor="backupLoadW">Backup Load (Watts)</Label>
                <Input
                  id="backupLoadW"
                  type="number"
                  value={backupLoadW}
                  onChange={(e) => setBackupLoadW(Math.max(0, Number(e.target.value)))}
                />
              </div>
            )}

            {!isHidden('backupDurationHours') && (
              <div className="space-y-2">
                <Label htmlFor="backupDurationHours">Desired Backup Duration (Hours)</Label>
                <Input
                  id="backupDurationHours"
                  type="number"
                  value={backupDurationHours}
                  onChange={(e) => setBackupDurationHours(Math.max(0.1, Number(e.target.value)))}
                />
              </div>
            )}

            {!isHidden('batteryCapacityKWh') && (
              <div className="space-y-2">
                <Label htmlFor="batteryCapacityKWh">Battery Capacity (kWh)</Label>
                <Input
                  id="batteryCapacityKWh"
                  type="number"
                  value={batteryCapacityKWh}
                  onChange={(e) => setBatteryCapacityKWh(Math.max(0.1, Number(e.target.value)))}
                />
              </div>
            )}

            {!isHidden('stateOfCharge') && (
              <div className="space-y-2">
                <Label htmlFor="stateOfCharge">Current State of Charge (%)</Label>
                <Input
                  id="stateOfCharge"
                  type="number"
                  value={stateOfCharge}
                  onChange={(e) => setStateOfCharge(Math.max(0, Math.min(100, Number(e.target.value))))}
                />
              </div>
            )}

            {!isHidden('batteryVoltageV') && (
              <div className="space-y-2">
                <Label htmlFor="batteryVoltageV">Battery Bank Voltage (V)</Label>
                <Select value={String(batteryVoltageV)} onValueChange={(v) => setBatteryVoltageV(Number(v))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12">12V</SelectItem>
                    <SelectItem value="24">24V</SelectItem>
                    <SelectItem value="48">48V</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {!isHidden('rate') && (
              <div className="space-y-2">
                <Label htmlFor="rate">Electricity Rate ({currency}/kWh)</Label>
                <Input
                  id="rate"
                  type="number"
                  step="0.01"
                  value={rate}
                  onChange={(e) => setRate(Math.max(0, Number(e.target.value)))}
                />
              </div>
            )}

            {!isHidden('sunHours') && (
              <div className="space-y-2">
                <Label htmlFor="sunHours">Avg. Peak Sun Hours</Label>
                <Input
                  id="sunHours"
                  type="number"
                  step="0.1"
                  value={sunHours}
                  onChange={(e) => setSunHours(Math.max(0.1, Number(e.target.value)))}
                />
              </div>
            )}

            {!isHidden('costPerWatt') && (
              <div className="space-y-2">
                <Label htmlFor="costPerWatt">Est. Cost per Watt ({country.currencySymbol}/W)</Label>
                <Input
                  id="costPerWatt"
                  type="number"
                  step="0.10"
                  value={costPerWatt}
                  onChange={(e) => setCostPerWatt(Math.max(0.01, Number(e.target.value)))}
                />
              </div>
            )}

            {!isHidden('includeTaxCredit') && country.code === 'US' && (
              <div className="space-y-2 md:col-span-2 pt-2">
                <div className="flex items-center justify-between p-3.5 bg-emerald-50 border border-emerald-200 rounded-lg">
                  <div className="space-y-0.5">
                    <Label className="text-sm font-semibold text-emerald-950">Include 30% Federal Solar Tax Credit (ITC)</Label>
                    <p className="text-xs text-emerald-700">Applies 30% tax credit to overall system installation cost</p>
                  </div>
                  <Switch 
                    checked={includeTaxCredit} 
                    onCheckedChange={(checked) => setIncludeTaxCredit(checked)} 
                  />
                </div>
              </div>
            )}
          </div>

          {!isHidden('appliances') && (
            <div className="pt-6 border-t mt-6">
              <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-slate-800">
                <Zap className="w-4 h-4 text-solar" />
                Appliance Load Calculator
              </div>
              <LoadCalculator 
                onLoadChange={(l) => {
                  setRunningLoadW(l.totalRunningWatts);
                  setPeakLoadW(l.estimatedPeakWatts);
                }}
              />
            </div>
          )}

          <div className="p-4 bg-amber-50 rounded-lg border border-amber-100 flex gap-3 mt-6">
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
