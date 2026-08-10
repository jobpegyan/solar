import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Landmark, Calendar, Edit2 } from 'lucide-react';

export const Route = createFileRoute('/admin/incentives')({
  component: AdminIncentives,
});

function AdminIncentives() {
  const [incentives, setIncentives] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchIncentives();
  }, []);

  const fetchIncentives = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('incentives')
      .select('*, countries(name), regions(name)')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setIncentives(data);
    }
    setLoading(false);
  };

  const filtered = incentives.filter(i => 
    i.name.toLowerCase().includes(search.toLowerCase()) ||
    i.countries?.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Solar Incentives</h1>
          <p className="text-slate-500">Manage tax credits, rebates, and subsidies for solar and storage.</p>
        </div>
        <Button className="bg-solar text-charcoal hover:bg-solar/90">
          <Plus className="h-4 w-4 mr-2" />
          Add Incentive
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 text-muted-foreground flex items-center gap-2">
              <Landmark className="h-4 w-4" />
              Active Programs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{incentives.filter(i => i.status === 'active').length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input 
                placeholder="Search programs, locations..." 
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
                <TableHead>Program Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Expires</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={6} className="text-center py-8">Loading...</TableCell></TableRow>
              ) : filtered.length === 0 ? (
                <TableRow><TableCell colSpan={6} className="text-center py-8">No programs found.</TableCell></TableRow>
              ) : filtered.map((i) => (
                <TableRow key={i.id}>
                  <TableCell className="font-medium">{i.name}</TableCell>
                  <TableCell>
                    {i.countries?.name}{i.regions?.name ? `, ${i.regions.name}` : ''}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {i.type.replace('-', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>{i.value} {i.value_type === 'percentage' ? '%' : ''}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-slate-500">
                      <Calendar className="h-3 w-3" />
                      {i.expires_at ? new Date(i.expires_at).toLocaleDateString() : 'Ongoing'}
                    </div>
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
