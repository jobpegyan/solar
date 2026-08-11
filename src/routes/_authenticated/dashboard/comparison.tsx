import React from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { useServerFn } from '@tanstack/react-start';
import { getSavedCalculations } from '@/lib/saved-calculations.functions';
import { getComparisonResults, COMPARISON_SCHEMAS } from '@/lib/comparison.functions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowRightLeft, TrendingDown, TrendingUp, Minus } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const Route = createFileRoute('/_authenticated/dashboard/comparison')({
  component: ComparisonDashboard,
});

function ComparisonDashboard() {
  const getSavedFn = useServerFn(getSavedCalculations);
  const getCompFn = useServerFn(getComparisonResults);
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
  const [activeCalculator, setActiveCalculator] = React.useState<string | null>(null);

  const { data: saved = [] } = useQuery({
    queryKey: ['saved-calculations-list'],
    queryFn: () => getSavedFn()
  });

  const { data: comparisonData, isLoading: isComparing } = useQuery({
    queryKey: ['comparison', selectedIds, activeCalculator],
    queryFn: () => getCompFn({ data: { calculationIds: selectedIds, calculatorId: activeCalculator! } }),
    enabled: selectedIds.length >= 2 && !!activeCalculator
  });

  const toggleSelect = (id: string, calculatorId: string) => {
    if (activeCalculator && activeCalculator !== calculatorId) {
      setSelectedIds([id]);
      setActiveCalculator(calculatorId);
      return;
    }
    
    setActiveCalculator(calculatorId);
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const schema = activeCalculator ? COMPARISON_SCHEMAS[activeCalculator] || COMPARISON_SCHEMAS['solar-panel-calculator'] : null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <ArrowRightLeft className="w-8 h-8 text-solar" />
          Scenario Comparison
        </h1>
        <p className="text-muted-foreground">Select two or more calculations of the same type to compare metrics.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-4">
          <h2 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Select Scenarios</h2>
          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
            {saved.map(calc => (
              <div 
                key={calc.id} 
                className={`p-3 rounded-lg border transition-all cursor-pointer ${selectedIds.includes(calc.id) ? 'bg-solar/5 border-solar' : 'bg-white hover:border-slate-300'}`}
                onClick={() => toggleSelect(calc.id, calc.calculator_id)}
              >
                <div className="flex items-start gap-3">
                  <Checkbox checked={selectedIds.includes(calc.id)} />
                  <div className="min-w-0">
                    <p className="font-semibold text-sm truncate">{calc.name}</p>
                    <p className="text-[10px] text-muted-foreground uppercase">{calc.calculator_id.split('-').join(' ')}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3">
          {selectedIds.length < 2 ? (
            <div className="h-full flex flex-col items-center justify-center py-20 bg-slate-50 rounded-3xl border border-dashed text-center px-4">
              <ArrowRightLeft className="w-12 h-12 text-slate-300 mb-4" />
              <h3 className="text-xl font-bold mb-2">Ready to compare</h3>
              <p className="text-muted-foreground max-w-xs">Select at least two saved calculations of the same type from the sidebar to begin comparison.</p>
            </div>
          ) : isComparing ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => <div key={i} className="h-20 bg-slate-100 animate-pulse rounded-xl" />)}
            </div>
          ) : (comparisonData && schema) ? (
            <div className="space-y-8 animate-in fade-in duration-500">
              <Table className="border rounded-xl overflow-hidden">
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead className="w-[200px]">Metric</TableHead>
                    {comparisonData.map(calc => (
                      <TableHead key={calc.id} className="text-center font-bold text-slate-900">
                        {calc.name}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {schema.metrics.map(metric => {
                    const firstCalc = comparisonData[0];
                    const firstVal = firstCalc?.results ? (firstCalc.results as any)[metric] : undefined;
                    
                    return (
                      <TableRow key={metric}>
                        <TableCell className="font-medium">{schema.labels[metric]}</TableCell>
                        {comparisonData.map((calc, idx) => {
                          const val = (calc.results as any)[metric];
                          const isCurrency = typeof val === 'number' && (schema?.labels?.[metric]?.toLowerCase()?.includes('savings') ?? false);
                          const displayVal = isCurrency 
                            ? new Intl.NumberFormat('en-US', { style: 'currency', currency: calc.currency || 'USD' }).format(val)
                            : `${val} ${schema.units[metric]}`;
                          
                          return (
                            <TableCell key={calc.id} className="text-center">
                              <span className="font-semibold">{displayVal}</span>
                              {idx > 0 && typeof val === 'number' && typeof firstVal === 'number' && (
                                <div className={`text-[10px] mt-1 flex items-center justify-center gap-1 ${val > firstVal ? 'text-green-600' : val < firstVal ? 'text-red-600' : 'text-slate-400'}`}>
                                  {val > firstVal ? <TrendingUp className="w-2 h-2" /> : val < firstVal ? <TrendingDown className="w-2 h-2" /> : <Minus className="w-2 h-2" />}
                                  {firstVal !== 0 ? Math.abs(((val - firstVal) / firstVal) * 100).toFixed(1) : 0}%
                                </div>
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {comparisonData.map(calc => (
                   <Card key={calc.id} className="border-solar/20 bg-solar/5">
                     <CardHeader className="pb-2">
                       <CardTitle className="text-sm font-bold">{calc.name} Summary</CardTitle>
                     </CardHeader>
                     <CardContent>
                       <div className="text-xs text-muted-foreground space-y-1">
                         <div className="flex justify-between">
                            <span>Country:</span>
                            <span className="font-medium text-slate-900">{calc.country}</span>
                         </div>
                         <div className="flex justify-between">
                            <span>Units:</span>
                            <span className="font-medium text-slate-900 uppercase">{calc.units}</span>
                         </div>
                         <div className="flex justify-between">
                            <span>Created:</span>
                            <span className="font-medium text-slate-900">{new Date(calc.created_at).toLocaleDateString()}</span>
                         </div>
                       </div>
                       <Button variant="outline" size="sm" className="w-full mt-4" asChild>
                         <Link to={`/dashboard/calculations/${calc.id}` as any}>Full Details</Link>
                       </Button>
                     </CardContent>
                   </Card>
                 ))}
              </div>
            </div>
          ) : (
             <div className="p-8 text-center bg-amber-50 rounded-xl border border-amber-200">
               <p className="text-amber-800">Comparison schema not found for {activeCalculator}.</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
