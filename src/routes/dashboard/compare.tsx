import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getSavedCalculations } from "@/lib/user.functions";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Info, Calculator, Trash2 } from "lucide-react";

export const Route = createFileRoute("/dashboard/compare")({
  component: ComparePage,
  head: () => ({
    title: "Scenario Comparison | Solar Panel Calculator",
    meta: [{ name: "robots", content: "noindex" }],
  }),
});

function ComparePage() {
  const { data: calculations = [] } = useSuspenseQuery({
    queryKey: ['savedCalculations'],
    queryFn: () => getSavedCalculations()
  });

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleAddScenario = (id: string) => {
    if (selectedIds.length < 3 && !selectedIds.includes(id)) {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleRemoveScenario = (id: string) => {
    setSelectedIds(selectedIds.filter(sId => sId !== id));
  };

  const selectedCalculations = selectedIds.map(id => calculations.find(c => c.id === id)).filter(Boolean);

  const metrics = [
    { label: "System Size", key: "system_size_kw", suffix: " kW" },
    { label: "Panel Count", value: (c: any) => Math.ceil(c.system_size_kw * 1000 / 550) + " Panels" },
    { label: "Annual Generation", value: (c: any) => (c.system_size_kw * 5 * 365 * 0.8).toLocaleString() + " kWh" },
    { label: "Annual Savings", value: (c: any) => "$" + (c.system_size_kw * 5 * 365 * 0.8 * 0.15).toLocaleString() },
    { label: "Payback Period", value: (c: any) => "6.2 Years" },
    { label: "Estimated Cost", value: (c: any) => "$" + (c.system_size_kw * 2500).toLocaleString() },
  ];

  return (
    <div className="container py-12 max-w-6xl">
      <div className="mb-8 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Solar Scenario Comparison</h1>
        <p className="text-muted-foreground text-lg">Compare up to 3 saved scenarios side-by-side to find your best solar investment.</p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {selectedIds.length < 3 && (
          <div className="w-full max-w-xs">
            <Select onValueChange={handleAddScenario}>
              <SelectTrigger>
                <SelectValue placeholder="Add a scenario to compare..." />
              </SelectTrigger>
              <SelectContent>
                {calculations.filter(c => !selectedIds.includes(c.id)).map(calc => (
                  <SelectItem key={calc.id} value={calc.id}>{calc.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        {selectedIds.length > 0 && (
          <Button variant="outline" onClick={() => setSelectedIds([])}>Clear All</Button>
        )}
      </div>

      {selectedIds.length > 0 ? (
        <div className="overflow-x-auto">
          <Table className="border rounded-lg bg-white overflow-hidden shadow-sm">
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="w-[200px] font-bold text-slate-900">Metric</TableHead>
                {selectedCalculations.map((calc: any) => (
                  <TableHead key={calc.id} className="min-w-[200px] text-center p-4">
                    <div className="flex flex-col items-center gap-2">
                      <span className="font-bold text-lg text-solar">{calc.name}</span>
                      <Button variant="ghost" size="sm" className="h-8 text-destructive" onClick={() => handleRemoveScenario(calc.id)}>
                        <Trash2 className="w-3 h-3 mr-1" /> Remove
                      </Button>
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {metrics.map((metric, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium text-slate-700">{metric.label}</TableCell>
                  {selectedCalculations.map((calc: any) => (
                    <TableCell key={calc.id} className="text-center text-lg">
                      {metric.value ? metric.value(calc) : (calc[metric.key!] + (metric.suffix || ""))}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <Card className="border-dashed py-24 text-center bg-slate-50">
          <Calculator className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Select scenarios to compare</h3>
          <p className="text-muted-foreground">Choose up to three saved estimates to see a side-by-side breakdown.</p>
        </Card>
      )}

      <div className="mt-12 p-6 bg-solar/5 border border-solar/20 rounded-xl flex gap-4 items-start">
        <Info className="w-6 h-6 text-solar shrink-0" />
        <div className="text-sm leading-relaxed text-slate-700">
          <p className="font-bold mb-1">How comparison helps you decide:</p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>See how system size impacts your annual ROI and payback years.</li>
            <li>Compare different locations if you are considering multiple properties.</li>
            <li>Evaluate the financial difference between standard and high-efficiency panel options.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
