import React from 'react';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useServerFn } from '@tanstack/react-start';
import { getSavedCalculations, deleteSavedCalculation } from '@/lib/saved-calculations.functions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Calculator, Calendar, Globe, Trash2, Eye, Copy, ArrowRightLeft } from 'lucide-react';
import { toast } from 'sonner';

export const Route = createFileRoute('/_authenticated/dashboard/calculations/')({
  component: DashboardCalculations,
});

function DashboardCalculations() {
  const getCalculationsFn = useServerFn(getSavedCalculations);
  const deleteFn = useServerFn(deleteSavedCalculation);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: calculations, isLoading } = useQuery({
    queryKey: ['saved-calculations'],
    queryFn: () => getCalculationsFn()
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteFn({ data: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['saved-calculations'] });
      toast.success("Calculation deleted");
    }
  });

  const [search, setSearch] = React.useState('');

  const filtered = calculations?.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.calculator_id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Saved Calculations</h1>
          <p className="text-muted-foreground">Manage and compare your solar project estimates.</p>
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search saved..." 
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => <div key={i} className="h-48 bg-slate-100 animate-pulse rounded-xl" />)}
        </div>
      ) : filtered && filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((calc) => (
            <Card key={calc.id} className="overflow-hidden group hover:border-solar transition-colors">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <Badge variant="outline" className="text-[10px] uppercase tracking-wider mb-2">
                    {calc.calculator_id.split('-').join(' ')}
                  </Badge>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => deleteMutation.mutate(calc.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <CardTitle className="text-lg leading-tight">{calc.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(calc.created_at).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Globe className="w-3 h-3" />
                    {calc.country}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 pt-2 border-t">
                   <Button variant="outline" size="sm" className="w-full gap-2" onClick={() => navigate({ to: `/dashboard/calculations/${calc.id}` })}>
                     <Eye className="w-3 h-3" /> View
                   </Button>
                   <Button variant="outline" size="sm" className="w-full gap-2">
                     <Copy className="w-3 h-3" /> Clone
                   </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed">
          <Calculator className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">No saved calculations yet</h3>
          <p className="text-muted-foreground mb-6">Run any solar calculator and save the results to see them here.</p>
          <Button asChild>
            <Link to="/calculators">Explore Calculators</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
