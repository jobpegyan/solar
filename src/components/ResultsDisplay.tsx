import React from 'react';
import { useSolarSettings } from '@/lib/location/location-context';
import { formatCurrency, formatEnergy } from '@/lib/utils/formatters';
import { formatArea } from '@/lib/units/unit-utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Zap, Sun, Maximize, TrendingUp, MapPin, Share2, Printer, Calendar, Info, Bookmark, FileText, LayoutGrid, DollarSign, PiggyBank, ShieldCheck, Clock, Sparkles, CheckCircle2 } from 'lucide-react';
import { CalculationDetails } from './CalculationDetails';
const SolarChart = React.lazy(() => import('./SolarChart').then(mod => ({ default: mod.SolarChart })));
import { Button } from './ui/button';
import { QuoteCTA } from './QuoteCTA';
import { toast } from 'sonner';
import { saveCalculation } from '@/lib/user.functions';
import { useAuth } from '@/lib/auth-context';
import { Link } from '@tanstack/react-router';


interface ResultsDisplayProps {
  results: any;
}

export function ResultsDisplay({ results }: ResultsDisplayProps) {
  const { country, currency, unitSystem } = useSolarSettings();

  const { user } = useAuth();
  const [isSaving, setIsSaving] = React.useState(false);

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard!");
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSave = async () => {
    if (!user) {
      toast.info("Please sign in to save calculations", {
        action: {
          label: "Login",
          onClick: () => window.location.href = "/login"
        }
      });
      return;
    }

    setIsSaving(true);
    try {
      const response = await saveCalculation({
        data: {
          name: `Solar Estimate - ${results.locationName || 'Unknown'}`,
          calculator_type: "solar-panel",
          input_data: results,
          result_data: results,
          location_data: { name: results.locationName }
        }
      });
      toast.success("Estimate saved to your dashboard!");
    } catch (err) {
      toast.error("Failed to save estimate");
    } finally {
      setIsSaving(false);
    }
  };


  if (!results) return null;

  const systemSize = results.systemSize ?? results.requiredSystemSizeKW ?? 0;
  const panels = results.panels ?? results.panelCount ?? 0;
  const roofArea = results.roofArea ?? results.requiredRoofAreaSqFt ?? 0;
  const panelWattage = results.panelWattage ?? results.inputs?.panelWattage ?? 400;
  const locationName = results.locationName ?? results.dataSourceInfo?.region ?? (results.inputs?.regionCode ? `${results.inputs.regionCode}, ${results.inputs.countryCode || 'US'}` : country.name);
  const costDetails = results.costDetails;

  const activeCurrency = costDetails?.currency || results.currency || currency;

  return (
    <div className="space-y-6 print:space-y-4">
      <div className="flex justify-between items-center print:hidden">
        <h2 className="text-xl font-bold text-slate-900">Your Solar Estimate</h2>
        <div className="flex gap-2">
          {user ? (
            <Button variant="solar" size="sm" onClick={handleSave} disabled={isSaving}>
              <Bookmark className={`w-4 h-4 mr-2 ${isSaving ? 'animate-pulse' : ''}`} />
              {isSaving ? 'Saving...' : 'Save Estimate'}
            </Button>
          ) : (
            <Button variant="outline" size="sm" onClick={handleSave}>
              <Bookmark className="w-4 h-4 mr-2" /> Save
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share2 className="w-4 h-4 mr-2" /> Share
          </Button>
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="w-4 h-4 mr-2" /> Print
          </Button>
        </div>
      </div>

      {costDetails && (
        <Card className="overflow-hidden border-2 border-emerald-500/30 bg-gradient-to-br from-emerald-50/50 via-white to-slate-50 shadow-xl">
          <CardHeader className="bg-emerald-500/10 border-b border-emerald-500/20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              <div>
                <CardTitle className="text-2xl flex items-center gap-2 text-emerald-950">
                  <DollarSign className="w-6 h-6 text-emerald-600" />
                  Estimated Solar System Cost & Investment
                </CardTitle>
                <CardDescription className="text-emerald-800/80">
                  Financial breakdown including equipment, installation, and incentives.
                </CardDescription>
              </div>
              {costDetails.taxCreditPct > 0 && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-600 text-white rounded-full text-xs font-bold shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                  {costDetails.taxCreditPct}% Federal Tax Credit Applied
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-5 bg-emerald-600 text-white rounded-2xl shadow-md border border-emerald-500">
                <p className="text-xs uppercase font-bold tracking-wider text-emerald-100 mb-1">Net System Cost</p>
                <div className="text-3xl font-extrabold">{formatCurrency(costDetails.netCost, activeCurrency)}</div>
                <p className="text-[11px] text-emerald-100 mt-1">
                  {costDetails.taxCreditPct > 0 ? `After ${costDetails.taxCreditPct}% tax credit` : 'Net out-of-pocket'}
                </p>
              </div>

              <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm">
                <p className="text-xs uppercase font-bold tracking-wider text-muted-foreground mb-1">Gross System Cost</p>
                <div className="text-2xl font-bold text-slate-900">{formatCurrency(costDetails.grossCost, activeCurrency)}</div>
                <p className="text-[11px] text-muted-foreground mt-1">
                  @ {formatCurrency(costDetails.costPerWatt, activeCurrency)}/Watt gross
                </p>
              </div>

              <div className="p-5 bg-emerald-50/80 border border-emerald-200 rounded-2xl shadow-sm">
                <p className="text-xs uppercase font-bold tracking-wider text-emerald-800 mb-1">Tax Savings (ITC)</p>
                <div className="text-2xl font-bold text-emerald-700">-{formatCurrency(costDetails.taxCreditAmount, activeCurrency)}</div>
                <p className="text-[11px] text-emerald-600 mt-1">Direct tax reduction</p>
              </div>

              <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm">
                <p className="text-xs uppercase font-bold tracking-wider text-muted-foreground mb-1">Payback Period</p>
                <div className="text-2xl font-bold text-slate-900">{costDetails.paybackYears} <span className="text-base font-normal text-slate-600">Years</span></div>
                <p className="text-[11px] text-muted-foreground mt-1">Est. break-even time</p>
              </div>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-4">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <PiggyBank className="w-4 h-4 text-emerald-600" />
                Cost Breakdown & 25-Year Value
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2 border-r pr-0 md:pr-4">
                  <div className="flex justify-between py-1.5 border-b">
                    <span className="text-slate-600">Equipment (Panels, Inverter, Racking)</span>
                    <span className="font-semibold">{formatCurrency(costDetails.equipmentCostEst, activeCurrency)}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b">
                    <span className="text-slate-600">Installation, Labor & Permitting</span>
                    <span className="font-semibold">{formatCurrency(costDetails.installationCostEst, activeCurrency)}</span>
                  </div>
                  <div className="flex justify-between py-1.5 text-emerald-700 font-medium">
                    <span>Federal Solar Tax Credit ({costDetails.taxCreditPct}%)</span>
                    <span>-{formatCurrency(costDetails.taxCreditAmount, activeCurrency)}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between py-1.5 border-b">
                    <span className="text-slate-600">Effective Net Cost per Watt</span>
                    <span className="font-semibold">{formatCurrency(costDetails.netCostPerWatt, activeCurrency)}/W</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b">
                    <span className="text-slate-600">Monthly Bill Savings</span>
                    <span className="font-semibold text-solar">{formatCurrency(costDetails.monthlySavings, activeCurrency)}/mo</span>
                  </div>
                  <div className="flex justify-between py-1.5 text-emerald-800 font-bold">
                    <span>Est. 25-Year Net Savings</span>
                    <span>{formatCurrency(costDetails.lifetimeSavings25Y, activeCurrency)}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="overflow-hidden border-2 border-solar print:border-slate-200 shadow-lg">
        <CardHeader className="bg-solar/5 border-b border-solar/10 print:bg-white">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-2xl">Recommended System</CardTitle>
              <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>Estimate for: {locationName}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-solar print:text-slate-900">{systemSize} <span className="text-xl">kW</span></div>
              <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">System Size</p>
              {results.dataSourceInfo && (
                <div className="mt-2 flex flex-col items-end gap-1">
                  <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded-full text-slate-500 border">
                    Source: {results.dataSourceInfo.solarSource}
                  </span>
                  {results.dataSourceInfo.lastUpdated && (
                    <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded-full text-slate-500 border">
                      Updated: {results.dataSourceInfo.lastUpdated}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl text-center print:bg-white print:border">
              <Sun className="w-5 h-5 text-solar mx-auto mb-2" />
              <div className="text-xl font-bold">{panels}</div>
              <p className="text-[10px] text-muted-foreground uppercase font-bold">{panelWattage}W Panels</p>
            </div>
            
            <div className="p-4 bg-slate-50 rounded-xl text-center print:bg-white print:border">
              <Zap className="w-5 h-5 text-solar mx-auto mb-2" />
              <div className="text-xl font-bold">{formatEnergy(results.annualGenerationKWh, results.countryCode || country.code)}</div>
              <p className="text-[10px] text-muted-foreground uppercase font-bold">{ (results.countryCode || country.code) === 'IN' ? 'Units' : 'kWh'} / Year</p>

            </div>
            
            <div className="p-4 bg-slate-50 rounded-xl text-center print:bg-white print:border">
              <Maximize className="w-5 h-5 text-solar mx-auto mb-2" />
              <div className="text-xl font-bold whitespace-nowrap">{formatArea(roofArea, unitSystem)}</div>
              <p className="text-[10px] text-muted-foreground uppercase font-bold">Est. Roof Area</p>
            </div>
            
            <div className="p-4 bg-solar/10 rounded-xl text-center border border-solar/20 print:bg-white print:border-slate-300">
              <TrendingUp className="w-5 h-5 text-solar mx-auto mb-2" />
              <div className="text-xl font-bold text-solar print:text-slate-900">{formatCurrency(results.annualSavings, results.currency || currency)}</div>
              <p className="text-[10px] text-muted-foreground uppercase font-bold">Est. Savings / Year</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="p-4 border rounded-lg bg-slate-50/50">
              <div className="text-xs font-bold text-muted-foreground uppercase mb-1">Daily Production</div>
              <div className="text-lg font-bold">{results.dailyGenerationKWh} kWh</div>
            </div>
            <div className="p-4 border rounded-lg bg-slate-50/50">
              <div className="text-xs font-bold text-muted-foreground uppercase mb-1">Monthly Production</div>
              <div className="text-lg font-bold">{results.monthlyGenerationKWh} kWh</div>
            </div>
            <div className="p-4 border rounded-lg bg-green-50/30 border-green-100">
              <div className="text-xs font-bold text-green-700 uppercase mb-1">Grid Coverage</div>
              <div className="text-lg font-bold text-green-800">
                {Math.min(100, Math.round((results.annualGenerationKWh / (results.monthlyGenerationKWh * 12)) * 100))}%
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="w-5 h-5 text-solar" />
            Estimated Monthly Generation vs Usage
          </CardTitle>
          <CardDescription>
            Solar production varies throughout the year based on seasonal sunlight.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <React.Suspense fallback={<div className="h-full w-full flex items-center justify-center bg-slate-50 rounded-lg animate-pulse text-muted-foreground">Loading chart data...</div>}>
              <SolarChart 
                data={results.monthlyBreakdown} 
                xKey="month" 
                yKey="generation" 
                yKey2="consumption"
              />
            </React.Suspense>
          </div>
          <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-100 flex gap-3">
            <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-1" />
            <p className="text-xs text-amber-800">
              Monthly production varies with season, weather, shading and system conditions. 
              Solar generation coverage is not the same as bill reduction due to utility billing rules.
            </p>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print:hidden">
        <Card className="hover:border-solar transition-colors cursor-pointer group">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="w-5 h-5 text-solar" />
              Full Project Report
            </CardTitle>
            <CardDescription>
              Generate a professional-grade PDF report for this scenario.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full group-hover:bg-solar group-hover:text-white transition-colors" asChild>
              <Link to="/dashboard/report/$id" params={{ id: 'current' }}>
                View Report
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:border-solar transition-colors cursor-pointer group">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <LayoutGrid className="w-5 h-5 text-solar" />
              Compare Scenarios
            </CardTitle>
            <CardDescription>
              See how this estimate stacks up against other saved options.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full group-hover:bg-solar group-hover:text-white transition-colors" asChild>
              <Link to="/dashboard/compare">
                Open Comparison
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <CalculationDetails results={results} />

      <QuoteCTA 
        systemSize={systemSize} 
        monthlyBill={results.monthlyGenerationKWh * results.rate}
        countryCode={results.countryCode || 'US'}
      />
    </div>

  );
}
