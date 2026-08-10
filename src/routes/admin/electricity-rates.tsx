import React, { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { Plus, Pencil, Trash2, Search, Zap } from 'lucide-react';

export const Route = createFileRoute('/admin/electricity-rates')({
  component: ElectricityRateManagement,
});

function ElectricityRateManagement() {
  const [search, setSearch] = useState('');

  const { data: rates, isLoading } = useQuery({
    queryKey: ['admin-electricity-rates', search],
    queryFn: async () => {
      let query = supabase.from('electricity_rates').select('*, countries(name), regions(name)');
      if (search) query = query.ilike('utility_provider', `%${search}%`);
      const { data, error } = await query.order('last_updated', { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Electricity Rates</h1>
        <Button className="bg-solar text-white">
          <Plus className="mr-2 h-4 w-4" /> Add Rate
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search by utility provider..." 
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Utility / Region</TableHead>
                <TableHead>Rate (kWh)</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Fixed Charge</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow><TableCell colSpan={6} className="text-center">Loading...</TableCell></TableRow>
              ) : rates?.map((rate) => (
                <TableRow key={rate.id}>
                  <TableCell className="font-medium">
                    {rate.utility_provider || 'Regional Average'}
                    <div className="text-xs text-slate-500">
                      {rate.regions?.name}, {rate.countries?.name}
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold text-green-700">
                    {rate.currency} {rate.rate_per_kwh}
                  </TableCell>
                  <TableCell className="capitalize">{rate.rate_type}</TableCell>
                  <TableCell>{rate.fixed_charge ? `${rate.currency} ${rate.fixed_charge}` : '-'}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                      {rate.status}
                    </span>
                  </TableCell>
                  <TableCell className="flex gap-2">
                    <Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-red-500" /></Button>
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
