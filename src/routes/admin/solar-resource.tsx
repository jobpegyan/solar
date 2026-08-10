import React, { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { Plus, Pencil, Trash2, Search, Sun } from 'lucide-react';

export const Route = createFileRoute('/admin/solar-resource')({
  component: SolarResourceManagement,
});

function SolarResourceManagement() {
  const [search, setSearch] = useState('');

  const { data: resources, isLoading } = useQuery({
    queryKey: ['admin-solar-resource', search],
    queryFn: async () => {
      let query = supabase.from('solar_resources').select('*, countries(name), regions(name)');
      if (search) query = query.or(`city.ilike.%${search}%,zip_code.ilike.%${search}%`);
      const { data, error } = await query.order('last_updated', { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Solar Resource Data</h1>
        <Button className="bg-solar text-white">
          <Plus className="mr-2 h-4 w-4" /> Add Record
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search by city or ZIP..." 
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
                <TableHead>Location</TableHead>
                <TableHead>Peak Sun Hours</TableHead>
                <TableHead>PR</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow><TableCell colSpan={6} className="text-center">Loading...</TableCell></TableRow>
              ) : resources?.map((res) => (
                <TableRow key={res.id}>
                  <TableCell className="font-medium">
                    {res.city || res.zip_code || 'Generic'}
                    <div className="text-xs text-slate-500">
                      {res.regions?.name}, {res.countries?.name}
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold">{res.peak_sun_hours}h</TableCell>
                  <TableCell>{res.performance_ratio || 'Default'}</TableCell>
                  <TableCell className="max-w-[150px] truncate text-xs">{res.data_source || '-'}</TableCell>
                  <TableCell className="text-xs text-slate-500">
                    {res.last_updated ? new Date(res.last_updated).toLocaleDateString() : '-'}
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
