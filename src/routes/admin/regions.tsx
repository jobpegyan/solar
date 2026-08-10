import React, { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import { toast } from 'sonner';

export const Route = createFileRoute('/admin/regions')({
  component: RegionManagement,
});

function RegionManagement() {
  const [search, setSearch] = useState('');

  const { data: regions, refetch, isLoading } = useQuery({
    queryKey: ['admin-regions', search],
    queryFn: async () => {
      let query = supabase.from('regions').select('*, countries(name)');
      if (search) query = query.ilike('name', `%${search}%`);
      const { data, error } = await query.order('name');
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Regions</h1>
        <Button className="bg-solar text-white">
          <Plus className="mr-2 h-4 w-4" /> Add Region
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search regions..." 
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
                <TableHead>Region Name</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Electricity Rate</TableHead>
                <TableHead>Sun Hours</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow><TableCell colSpan={7} className="text-center">Loading...</TableCell></TableRow>
              ) : regions?.map((region) => (
                <TableRow key={region.id}>
                  <TableCell className="font-medium">{region.name}</TableCell>
                  <TableCell>{region.code}</TableCell>
                  <TableCell>{region.countries?.name}</TableCell>
                  <TableCell>{region.average_electricity_rate || '-'}</TableCell>
                  <TableCell>{region.peak_sun_hours || '-'}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                      {region.status}
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
