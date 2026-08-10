import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Landmark, Zap, Edit2 } from 'lucide-react';

export const Route = createFileRoute('/admin/utility-rates')({
  component: AdminUtilityRates,
});

function AdminUtilityRates() {
  const [models, setModels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchModels();
  }, []);

  const fetchModels = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('utility_billing_models')
      .select('*, countries(name), regions(name)')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setModels(data);
    }
    setLoading(false);
  };

  const filteredModels = models.filter(m => 
    m.utility_name.toLowerCase().includes(search.toLowerCase()) ||
    m.countries?.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Utility Rates & Models</h1>
          <p className="text-slate-500">Manage electricity tariffs, TOU structures, and net metering rules.</p>
        </div>
        <Button className="bg-solar text-charcoal hover:bg-solar/90">
          <Plus className="h-4 w-4 mr-2" />
          Add Utility Model
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 text-muted-foreground flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Total Utilities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{models.length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input 
                placeholder="Search utilities, countries..." 
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Utility / Company</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Model Type</TableHead>
                <TableHead>Fixed Charge</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={6} className="text-center py-8">Loading...</TableCell></TableRow>
              ) : filteredModels.length === 0 ? (
                <TableRow><TableCell colSpan={6} className="text-center py-8">No utility models found.</TableCell></TableRow>
              ) : filteredModels.map((m) => (
                <TableRow key={m.id}>
                  <TableCell className="font-medium">{m.utility_name}</TableCell>
                  <TableCell>
                    {m.countries?.name}{m.regions?.name ? `, ${m.regions.name}` : ''}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {m.model_type.replace('-', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>{m.fixed_monthly_charge > 0 ? `${m.fixed_monthly_charge}` : 'None'}</TableCell>
                  <TableCell>
                    <Badge variant={m.status === 'active' ? 'default' : 'secondary'}>
                      {m.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
