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

  const renderCapacityResults = () => (
    <div className="space-y-6">
      <Card className="bg-emerald-500/5 border-emerald-500/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-emerald-600 flex items-center gap-2">
            <Battery className="w-4 h-4" />
            Installed Capacity Requirement
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-black text-emerald-700">{formatValue(results.requiredNominalCapacityKWh || 0, 'kWh')}</div>
          <p className="text-xs text-muted-foreground mt-2">Total battery bank nominal rating</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground uppercase tracking-wider">Usable Storage Capacity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{formatValue(results.estimatedUsableCapacityKWh || (results.requiredNominalCapacityKWh * 0.8) || 0, 'kWh')}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground uppercase tracking-wider">Safety Margin Reserve</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{formatValue((results.requiredNominalCapacityKWh * 0.2) || 0, 'kWh')}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderRuntimeResults = () => (
    <div className="space-y-6">
      <Card className="bg-amber-500/5 border-amber-500/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-amber-600 flex items-center gap-2">
            <Timer className="w-4 h-4" />
            Estimated Appliance Runtime
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-black text-amber-700">{formatValue(results.estimatedBackupTimeHours || 0, 'Hours')}</div>
          <p className="text-xs text-muted-foreground mt-2">Continuous runtime under target load</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground uppercase tracking-wider">Available Energy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{formatValue(results.availableACEnergyKWh || 0, 'kWh')}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground uppercase tracking-wider">Discharge Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{formatValue(results.inputs?.backupLoadW ? (results.inputs.backupLoadW / 1000) : 1, 'kW load')}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderStorageResults = () => (
    <div className="space-y-6">
      <Card className="bg-blue-500/5 border-blue-500/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-blue-600 flex items-center gap-2">
            <Battery className="w-4 h-4" />
            Total Daily Energy Storage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-black text-blue-700">{formatValue(results.requiredNominalCapacityKWh || 0, 'kWh')}</div>
          <p className="text-xs text-muted-foreground mt-2">Recommended off-grid/backup storage size</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground uppercase tracking-wider">Bank Capacity (48V System)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{formatValue(Math.round(((results.requiredNominalCapacityKWh || 0) * 1000) / 48), 'Ah')}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground uppercase tracking-wider">Daily Autonomy Yield</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{formatValue(results.estimatedUsableCapacityKWh || 0, 'kWh/day')}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderInverterBatteryResults = () => (
    <div className="space-y-6">
      <Card className="bg-purple-500/5 border-purple-500/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-purple-600 flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Required Battery Ah Rating
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-black text-purple-700">
            {formatValue(Math.round(((results.requiredNominalCapacityKWh || 0) * 1000) / (results.inputs?.batteryVoltageV || 48)), 'Ah')}
          </div>
          <p className="text-xs text-muted-foreground mt-2">At {results.inputs?.batteryVoltageV || 48}V DC System Voltage</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground uppercase tracking-wider">Equivalent 200Ah Batteries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">
              {Math.max(1, Math.ceil((((results.requiredNominalCapacityKWh || 0) * 1000) / (results.inputs?.batteryVoltageV || 48)) / 200))} Batteries
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground uppercase tracking-wider">DC Bank Voltage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{results.inputs?.batteryVoltageV || 48} Volts DC</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {type === 'size' && renderSizeResults()}
      {type === 'backup' && renderBackupResults()}
      {type === 'capacity' && renderCapacityResults()}
      {type === 'runtime' && renderRuntimeResults()}
      {type === 'storage' && renderStorageResults()}
      {type === 'inverter' && renderInverterBatteryResults()}
      
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

