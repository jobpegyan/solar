import React from 'react';
import { useSolarSettings } from '@/lib/location/location-context';
import { Card, CardContent } from '@/components/ui/card';
import { Database, Info } from 'lucide-react';

interface AssumptionsPanelProps {
  sunHours: number;
  performanceRatio: number;
  systemLoss: number;
  panelWattage: number;
  electricityRate?: number;
  targetOffset?: number;
}

export function AssumptionsPanel({
  sunHours,
  performanceRatio,
  systemLoss,
  panelWattage,
  electricityRate,
  targetOffset
}: AssumptionsPanelProps) {
  const { currency } = useSolarSettings();

  return (
    <Card className="bg-slate-50 border-slate-200">
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-4 text-slate-900 font-semibold">
          <Database className="h-5 w-5 text-solar" />
          <h3>Calculation Assumptions</h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="flex justify-between border-b pb-2">
            <span className="text-muted-foreground">Peak Sun Hours</span>
            <span className="font-medium">{sunHours.toFixed(1)} h/day</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-muted-foreground">Performance Ratio</span>
            <span className="font-medium">{Math.round(performanceRatio * 100)}%</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-muted-foreground">System Loss</span>
            <span className="font-medium">{Math.round(systemLoss * 100)}%</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-muted-foreground">Panel Wattage</span>
            <span className="font-medium">{panelWattage} W</span>
          </div>
          {targetOffset !== undefined && (
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Target Solar Offset</span>
              <span className="font-medium">{targetOffset}%</span>
            </div>
          )}
          {electricityRate !== undefined && (
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Electricity Rate</span>
              <span className="font-medium">{currency} {electricityRate.toFixed(2)}/kWh</span>
            </div>
          )}
        </div>

        <div className="mt-4 flex gap-2">
          <Info className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
          <p className="text-[10px] text-slate-500 leading-relaxed">
            These values are estimated based on your location and industry standards. 
            You can adjust them in the advanced settings.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
