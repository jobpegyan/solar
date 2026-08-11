import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cpu, Zap, Activity, Info, AlertTriangle } from 'lucide-react';
import { Link } from '@tanstack/react-router';

interface InverterResultsProps {
  results: any;
  type: 'size' | 'capacity' | 'load' | 'requirement';
}

export function InverterResults({ results, type }: InverterResultsProps) {
  if (!results) return null;

  const formatValue = (val: number, unit: string) => {
    return `${val.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${unit}`;
  };

  const renderLoadResults = () => (
    <div className="space-y-6">
      <Card className="bg-solar/5 border-solar/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-solar flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Estimated Peak Load
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-black">{formatValue(results.peakLoadW || results.estimatedPeakWatts || 0, 'W')}</div>
          <p className="text-xs text-muted-foreground mt-2">Total power required at peak demand</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground uppercase tracking-wider">Total Running Load</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{formatValue(results.runningLoadW || results.totalRunningWatts || 0, 'W')}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground uppercase tracking-wider">Surge Capacity Need</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{formatValue(results.surgeRequirementW * 1000 || results.suggestedInverterSurgeWatts || 0, 'W')}</div>
          </CardContent>
        </Card>
      </div>

      {(results.peakLoadW || results.estimatedPeakWatts) > 10000 && (
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-sm flex gap-2">
          <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <p>This is a high electrical load. Ensure your main panel and utility service can support this capacity.</p>
        </div>
      )}
    </div>
  );

  const renderSizeResults = () => (
    <div className="space-y-6">
      <Card className="bg-solar/5 border-solar/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-solar flex items-center gap-2">
            <Cpu className="w-4 h-4" />
            Estimated Inverter Capacity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-black">{formatValue(results.estimatedCapacityKW || 0, 'kW AC')}</div>
          {results.recommendedRangeKW && (
            <p className="text-xs text-muted-foreground mt-2">
              Recommended Range: {results.recommendedRangeKW[0]} – {results.recommendedRangeKW[1]} kW
            </p>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground uppercase tracking-wider">DC/AC Ratio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{results.dcAcRatio || 'N/A'}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground uppercase tracking-wider">Solar Array Size</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{formatValue(results.inputs?.solarArraySizeKW || results.solarArraySizeKW || 0, 'kW DC')}</div>
          </CardContent>
        </Card>
      </div>

      {results.dcAcRatio > 1.5 && (
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-sm flex gap-2">
          <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <p>The DC/AC ratio is high ({results.dcAcRatio}). Significant solar clipping may occur. Review your inverter sizing.</p>
        </div>
      )}
    </div>
  );

  const renderCapacityResults = () => (
    <div className="space-y-6">
      <Card className="bg-indigo-500/5 border-indigo-500/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-indigo-600 flex items-center gap-2">
            <Cpu className="w-4 h-4" />
            Inverter Continuous Capacity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-black text-indigo-700">{formatValue(results.estimatedCapacityKW || 0, 'kW / kVA')}</div>
          <p className="text-xs text-muted-foreground mt-2">Continuous AC power rating requirement</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground uppercase tracking-wider">Safety Margin Buffer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{results.inputs?.safetyMargin || 10}% Included</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground uppercase tracking-wider">Max Array DC Input</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{formatValue((results.estimatedCapacityKW || 0) * 1.25, 'kW DC')}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderRequirementResults = () => (
    <div className="space-y-6">
      <Card className="bg-emerald-500/5 border-emerald-500/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-emerald-600 flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Minimum Inverter Requirement
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-black text-emerald-700">{formatValue(results.estimatedCapacityKW || 0, 'kW AC')}</div>
          <p className="text-xs text-muted-foreground mt-2">Class: {results.inputs?.inverterType ? results.inputs.inverterType.toUpperCase() : 'GRID-TIED'} Inverter</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground uppercase tracking-wider">System Compatibility</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold capitalize">{results.inputs?.inverterType || 'Grid-Tied'} System</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground uppercase tracking-wider">Peak Surge Handling</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{formatValue((results.estimatedCapacityKW || 0) * 2, 'kW Surge')}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {type === 'load' && renderLoadResults()}
      {type === 'size' && renderSizeResults()}
      {type === 'capacity' && renderCapacityResults()}
      {type === 'requirement' && renderRequirementResults()}
      
      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex gap-3">
        <Info className="w-5 h-5 text-slate-500 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-slate-600 leading-relaxed">
          Inverter calculations are preliminary estimates for planning purposes. 
          Final inverter selection depends on the solar array, electrical loads, voltage, phase configuration, battery system, equipment specifications, local requirements and site conditions. 
          Verify final system design with a qualified solar/electrical professional. 
          Learn more in our <Link to="/disclaimer" className="text-solar underline">disclaimer</Link>.
        </p>
      </div>
    </div>
  );
}

