import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Battery, Zap, Shield, Timer, Info } from 'lucide-react';
import { Link } from '@tanstack/react-router';

interface BatteryResultsProps {
  results: any;
  type: 'size' | 'backup' | 'capacity' | 'runtime' | 'storage' | 'inverter';
}

export function BatteryResults({ results, type }: BatteryResultsProps) {
  const formatValue = (val: number, unit: string) => {
    return `${val.toLocaleString(undefined, { maximumFractionDigits: 1 })} ${unit}`;
  };

  const renderSizeResults = () => (
    <div className="space-y-6">
      <Card className="bg-solar/5 border-solar/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-solar flex items-center gap-2">
            <Battery className="w-4 h-4" />
            Required Battery Capacity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-black">{formatValue(results.requiredNominalCapacityKWh || 0, 'kWh')}</div>
          <p className="text-xs text-muted-foreground mt-2">Estimated nominal storage needed</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground uppercase tracking-wider">Usable Capacity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{formatValue(results.estimatedUsableCapacityKWh || 0, 'kWh')}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground uppercase tracking-wider">Backup Energy Need</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{formatValue(results.backupEnergyRequiredKWh || 0, 'kWh')}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderBackupResults = () => (
    <div className="space-y-6">
      <Card className="bg-solar/5 border-solar/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-solar flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Estimated Backup Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-black">{formatValue(results.estimatedBackupTimeHours || 0, 'hours')}</div>
          <p className="text-xs text-muted-foreground mt-2">Based on current load and assumptions</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground uppercase tracking-wider">AC Energy Available</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{formatValue(results.availableACEnergyKWh || 0, 'kWh')}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground uppercase tracking-wider">Usable Storage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{formatValue(results.usableEnergyKWh || 0, 'kWh')}</div>
          </CardContent>
        </Card>
      </div>
      
      {results.estimatedBackupTimeHours < 1 && results.estimatedBackupTimeHours > 0 && (
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-sm flex gap-2">
          <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <p>The selected battery may not provide sufficient backup duration for this load.</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {(type === 'size' || type === 'capacity' || type === 'storage' || type === 'inverter') && renderSizeResults()}
      {(type === 'backup' || type === 'runtime') && renderBackupResults()}
      
      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex gap-3">
        <Info className="w-5 h-5 text-slate-500 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-slate-600 leading-relaxed">
          Battery calculations are estimates for planning purposes. 
          Actual runtime and performance depend on battery chemistry, temperature, age, state of charge, load behavior, inverter efficiency, wiring losses and manufacturer specifications. 
          Learn more in our <Link to="/disclaimer" className="text-solar underline">disclaimer</Link>.
        </p>
      </div>
    </div>
  );
}
