import React, { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { CalculatorLayout } from '@/components/calculator/CalculatorLayout';
import { getCalculatorById } from '@/calculators/helpers';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { calculateKWToPanels } from '@/lib/calculations/load';

export const Route = createFileRoute('/kw-to-solar-panels-calculator')({
  component: KWToPanelsCalculatorPage,
  head: () => {
    const calc = getCalculatorById('kw-to-solar-panels-calculator');
    return {
      title: calc?.seoTitle || 'kW to Solar Panels Calculator',
      meta: [{ name: 'description', content: calc?.seoDescription || '' }],
    };
  }
});

function KWToPanelsCalculatorPage() {
  const [kw, setKw] = useState(5);
  const [wattage, setWattage] = useState(400);
  const calc = getCalculatorById('kw-to-solar-panels-calculator');
  if (!calc) return null;

  const { panels, actualKW } = calculateKWToPanels(kw, wattage);

  return (
    <CalculatorLayout
      currentId={calc.id}
      title={calc.name}
      description={calc.shortDescription}
      calculator={
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2"><Label>System Size (kW)</Label><Input type="number" value={kw} onChange={e => setKw(Number(e.target.value))} /></div>
          <div className="space-y-2"><Label>Panel Wattage (W)</Label><Input type="number" value={wattage} onChange={e => setWattage(Number(e.target.value))} /></div>
        </div>
      }
      results={
        <div className="text-center p-8 bg-solar/5 border border-solar/20 rounded-2xl animate-in zoom-in duration-300">
          <div className="text-6xl font-black text-solar mb-2">{panels}</div>
          <div className="text-xl font-bold uppercase tracking-wide text-slate-700">Solar Panels</div>
          <div className="mt-4 text-sm text-muted-foreground">Estimated for a {kw}kW system using {wattage}W panels. Actual capacity: {actualKW}kW.</div>
        </div>
      }
      faq={calc.faq}
    />
  );
}
