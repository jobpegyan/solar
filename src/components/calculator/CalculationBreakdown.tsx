import React from 'react';
import { Calculator } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface CalculationBreakdownProps {
  steps: {
    label: string;
    formula: string;
    result: string;
  }[];
}

export function CalculationBreakdown({ steps }: CalculationBreakdownProps) {
  return (
    <Card className="border-slate-200">
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-6 text-slate-900 font-semibold">
          <Calculator className="h-5 w-5 text-solar" />
          <h3>How We Calculated This</h3>
        </div>
        
        <div className="space-y-6">
          {steps.map((step, idx) => (
            <div key={idx} className="relative pl-8 border-l-2 border-slate-100 last:border-0 pb-6 last:pb-0">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-solar" />
              <h4 className="text-sm font-bold text-slate-900 mb-1">{step.label}</h4>
              <div className="bg-slate-50 p-3 rounded-lg font-mono text-xs text-slate-700 whitespace-pre-wrap">
                {step.formula}
              </div>
              <div className="mt-2 text-sm font-semibold text-solar">
                = {step.result}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

