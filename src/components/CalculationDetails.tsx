import React from 'react';
import { Database, Info } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface CalculationDetailsProps {
  results: {
    dataSourceInfo?: {
      locationSource: string;
      rateSource: string;
      solarSource: string;
      lastUpdated: string;
    };
    currency: string;
    rate: number;
    sunHours: number;
  };
}

export function CalculationDetails({ results }: CalculationDetailsProps) {
  const info = results.dataSourceInfo;
  
  return (
    <Card className="bg-slate-50 border-slate-200">
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-4 text-slate-900 font-semibold">
          <Database className="h-5 w-5 text-solar" />
          <h3>Data & Assumptions</h3>
        </div>
        
        {info && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-6 pb-6 border-b border-slate-200">
            <div className="space-y-1">
              <div className="text-slate-500 text-xs uppercase font-bold tracking-wider">Location Used</div>
              <div className="font-medium text-slate-900">{info.locationSource}</div>
            </div>
            
            <div className="space-y-1">
              <div className="text-slate-500 text-xs uppercase font-bold tracking-wider">Electricity Rate</div>
              <div className="font-medium text-slate-900">
                {results.currency} {results.rate}/kWh ({info.rateSource})
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="text-slate-500 text-xs uppercase font-bold tracking-wider">Solar Resource</div>
              <div className="font-medium text-slate-900">
                {results.sunHours} Peak Sun Hours ({info.solarSource})
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="text-slate-500 text-xs uppercase font-bold tracking-wider">Last Updated</div>
              <div className="font-medium text-slate-900">
                {new Date(info.lastUpdated).toLocaleDateString()}
              </div>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">How This Estimate Was Calculated</h4>
          <div className="space-y-2 text-xs text-slate-600">
            <div className="flex justify-between">
              <span>Required Daily Generation:</span>
              <span className="font-medium">{(results as any).dailyGenerationKWh} kWh</span>
            </div>
            <div className="flex justify-between">
              <span>System Size (kW) = Daily Req / (Sun Hours × Efficiency)</span>
              <span className="font-medium">{(results as any).systemSize} kW</span>
            </div>
            <div className="flex justify-between">
              <span>Solar Coverage (Annual):</span>
              <span className="font-medium">{Math.min(100, Math.round(((results as any).annualGenerationKWh / ((results as any).monthlyGenerationKWh * 12)) * 100))}%</span>
            </div>
            <div className="flex justify-between pt-1 border-t">
              <span>Efficiency Factor (PR):</span>
              <span className="font-medium">80% Default</span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-200 flex gap-2">
          <Info className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
          <p className="text-[10px] text-slate-500 leading-relaxed">
            These values are derived from our global database. User-entered values take priority. 
            Utility billing rules (Net Metering, Export) are not fully modeled in this estimate.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
