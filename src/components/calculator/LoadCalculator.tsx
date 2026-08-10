import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, Info, PieChart, Zap } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell 
} from 'recharts';

export interface ApplianceLoad {
  id: string;
  name: string;
  quantity: number;
  wattage: number;
  hoursPerDay: number;
  daysPerMonth: number;
  standbyWatts: number;
}

interface LoadCalculatorProps {
  onLoadChange: (results: { 
    totalRunningWatts: number; 
    dailyEnergyKWh: number;
    monthlyEnergyKWh: number;
    annualEnergyKWh: number;
    estimatedPeakWatts: number;
    appliances: ApplianceLoad[];
    breakdown: any[];
  }) => void;
  initialAppliances?: ApplianceLoad[];
}

const PRESETS = [
  { name: 'Refrigerator', wattage: 200, hours: 24, standby: 5 },
  { name: 'LED TV', wattage: 100, hours: 5, standby: 1 },
  { name: 'Lights (LED)', wattage: 10, hours: 6, standby: 0 },
  { name: 'Ceiling Fan', wattage: 75, hours: 10, standby: 0 },
  { name: 'AC (1.5 Ton)', wattage: 1500, hours: 8, standby: 5 },
  { name: 'Washing Machine', wattage: 500, hours: 1, standby: 2 },
  { name: 'Water Heater', wattage: 2000, hours: 1, standby: 0 },
  { name: 'Microwave', wattage: 1200, hours: 0.5, standby: 3 },
  { name: 'Laptop', wattage: 60, hours: 6, standby: 1 },
  { name: 'Router', wattage: 10, hours: 24, standby: 0 },
  { name: 'Water Pump', wattage: 750, hours: 0.5, standby: 0 },
];

const COLORS = ['#F59E0B', '#10B981', '#3B82F6', '#6366F1', '#8B5CF6', '#EC4899', '#EF4444', '#F97316'];

export function LoadCalculator({ onLoadChange, initialAppliances }: LoadCalculatorProps) {
  const [appliances, setAppliances] = useState<ApplianceLoad[]>(
    initialAppliances || [{ 
      id: '1', 
      name: '', 
      quantity: 1, 
      wattage: 0, 
      hoursPerDay: 0, 
      daysPerMonth: 30, 
      standbyWatts: 0 
    }]
  );

  const calculateResults = (currentAppliances: ApplianceLoad[]) => {
    let totalRunning = 0;
    let totalDailyKWh = 0;
    let maxSurgeDiff = 0;
    
    const breakdown = currentAppliances.map(app => {
      const running = (app.wattage || 0) * (app.quantity || 0);
      totalRunning += running;
      
      const surge = (app.wattage * 1.5) * app.quantity; // Default surge heuristic
      const diff = surge - running;
      if (diff > maxSurgeDiff) maxSurgeDiff = diff;
      
      const standbyHours = Math.max(0, 24 - app.hoursPerDay);
      const activeDailyWh = app.wattage * app.quantity * app.hoursPerDay;
      const standbyDailyWh = (app.standbyWatts || 0) * app.quantity * standbyHours;
      
      const dailyKWh = (activeDailyWh + standbyDailyWh) / 1000;
      totalDailyKWh += dailyKWh;
      
      return {
        name: app.name || 'Unnamed',
        dailyKWh: Number(dailyKWh.toFixed(3)),
        monthlyKWh: Number((dailyKWh * app.daysPerMonth).toFixed(2))
      };
    });

    const monthlyTotal = breakdown.reduce((acc, b) => acc + b.monthlyKWh, 0);

    onLoadChange({
      totalRunningWatts: totalRunning,
      estimatedPeakWatts: totalRunning + maxSurgeDiff,
      dailyEnergyKWh: Number(totalDailyKWh.toFixed(3)),
      monthlyEnergyKWh: Number(monthlyTotal.toFixed(2)),
      annualEnergyKWh: Number((totalDailyKWh * 365).toFixed(0)),
      appliances: currentAppliances,
      breakdown: breakdown.map(b => ({
        ...b,
        percentage: monthlyTotal > 0 ? Number(((b.monthlyKWh / monthlyTotal) * 100).toFixed(1)) : 0
      }))
    });
  };

  const addAppliance = () => {
    const newApps = [...appliances, { 
      id: Math.random().toString(36).substr(2, 9), 
      name: '', 
      quantity: 1, 
      wattage: 0, 
      hoursPerDay: 0, 
      daysPerMonth: 30, 
      standbyWatts: 0 
    }];
    setAppliances(newApps);
    calculateResults(newApps);
  };

  const updateAppliance = (id: string, updates: Partial<ApplianceLoad>) => {
    const newApps = appliances.map(app => app.id === id ? { ...app, ...updates } : app);
    setAppliances(newApps);
    calculateResults(newApps);
  };

  const removeAppliance = (id: string) => {
    if (appliances.length === 1) return;
    const newApps = appliances.filter(app => app.id !== id);
    setAppliances(newApps);
    calculateResults(newApps);
  };

  const applyPreset = (id: string, presetName: string) => {
    const preset = PRESETS.find(p => p.name === presetName);
    if (preset) {
      updateAppliance(id, { 
        name: preset.name, 
        wattage: preset.wattage, 
        hoursPerDay: preset.hours,
        standbyWatts: preset.standby
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {appliances.map((app) => (
          <Card key={app.id} className="relative overflow-visible group border-slate-200">
            <CardContent className="p-4 pt-6 md:pt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-4 items-end">
              <div className="md:col-span-3 space-y-2">
                <Label className="text-xs font-semibold">Appliance</Label>
                <div className="flex gap-1">
                  <Input 
                    placeholder="e.g. Fridge" 
                    value={app.name} 
                    onChange={(e) => updateAppliance(app.id, { name: e.target.value })}
                    className="h-9"
                  />
                  <select 
                    className="w-10 h-9 border rounded-md bg-slate-50 text-[10px] px-1"
                    onChange={(e) => applyPreset(app.id, e.target.value)}
                    value=""
                  >
                    <option value="" disabled>✨</option>
                    {PRESETS.map(p => <option key={p.name} value={p.name}>{p.name}</option>)}
                  </select>
                </div>
              </div>
              
              <div className="md:col-span-1 space-y-2">
                <Label className="text-xs font-semibold">Qty</Label>
                <Input 
                  type="number" 
                  value={app.quantity} 
                  onChange={(e) => updateAppliance(app.id, { quantity: Math.max(1, parseInt(e.target.value) || 0) })}
                  className="h-9"
                />
              </div>
              
              <div className="md:col-span-2 space-y-2">
                <Label className="text-xs font-semibold">Watts (W)</Label>
                <Input 
                  type="number" 
                  value={app.wattage} 
                  onChange={(e) => updateAppliance(app.id, { wattage: Math.max(0, parseInt(e.target.value) || 0) })}
                  className="h-9"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <Label className="text-xs font-semibold">Hours/Day</Label>
                <Input 
                  type="number" 
                  step="0.5"
                  value={app.hoursPerDay} 
                  onChange={(e) => updateAppliance(app.id, { hoursPerDay: Math.max(0, Math.min(24, parseFloat(e.target.value) || 0)) })}
                  className="h-9"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <Label className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                  Standby (W) <Info className="w-3 h-3" />
                </Label>
                <Input 
                  type="number" 
                  value={app.standbyWatts} 
                  onChange={(e) => updateAppliance(app.id, { standbyWatts: Math.max(0, parseInt(e.target.value) || 0) })}
                  className="h-9"
                />
              </div>

              <div className="md:col-span-2 flex justify-end pb-0.5">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 h-9"
                  onClick={() => removeAppliance(app.id)}
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  <span className="sm:hidden lg:inline">Remove</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <Button variant="outline" size="sm" onClick={addAppliance} className="gap-2 border-dashed border-2 hover:border-solar hover:text-solar">
          <Plus className="w-4 h-4" /> Add Another Appliance
        </Button>
        
        <div className="flex gap-4 items-center px-4 py-2 bg-slate-900 text-white rounded-lg shadow-sm">
          <div className="text-sm">
            <span className="text-slate-400 mr-2">Total Load:</span>
            <span className="font-bold text-solar">{appliances.reduce((acc, app) => acc + (app.wattage * app.quantity), 0)} W</span>
          </div>
          <div className="text-sm border-l border-slate-700 pl-4">
            <span className="text-slate-400 mr-2">Daily Energy:</span>
            <span className="font-bold text-solar">
              {(() => {
                let totalDailyKWh = 0;
                appliances.forEach(app => {
                  const activeWh = app.wattage * app.quantity * app.hoursPerDay;
                  const standbyWh = app.standbyWatts * app.quantity * (24 - app.hoursPerDay);
                  totalDailyKWh += (activeWh + standbyWh) / 1000;
                });
                return totalDailyKWh.toFixed(2);
              })()} kWh
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LoadBreakdown({ data }: { data: any[] }) {
  if (!data || data.length === 0) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <PieChart className="w-5 h-5 text-solar" />
            Energy Usage Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }: any) => {
                    const total = data.reduce((acc, curr) => acc + curr.monthlyKWh, 0);
                    const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
                    return `${name} (${percentage}%)`;
                  }}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="monthlyKWh"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length] || '#8884d8'} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Zap className="w-5 h-5 text-solar" />
            Appliance Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.map((item, index) => (
              <div key={index} className="flex flex-col space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{item.name}</span>
                  <span className="text-muted-foreground">{item.monthlyKWh} kWh/mo</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full" 
                    style={{ 
                      width: `${item.percentage}%`,
                      backgroundColor: COLORS[index % COLORS.length]
                    }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
