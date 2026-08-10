import React, { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import { toast } from 'sonner';

export const Route = createFileRoute('/admin/countries')({
  component: CountryManagement,
});

function CountryManagement() {
  const [search, setSearch] = useState('');

  const { data: countries, refetch, isLoading } = useQuery({
    queryKey: ['admin-countries', search],
    queryFn: async () => {
      let query = supabase.from('countries').select('*');
      if (search) query = query.ilike('name', `%${search}%`);
      const { data, error } = await query.order('name');
      if (error) throw error;
      return data;
    },
  });

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this country?')) return;
    const { error } = await supabase.from('countries').delete().eq('id', id);
    if (error) toast.error('Failed to delete');
    else {
      toast.success('Deleted');
      refetch();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Countries</h1>
        <Button className="bg-solar text-white">
          <Plus className="mr-2 h-4 w-4" /> Add Country
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search countries..." 
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
                <TableHead>Name</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Currency</TableHead>
                <TableHead>Units</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow><TableCell colSpan={6} className="text-center">Loading...</TableCell></TableRow>
              ) : countries?.map((country) => (
                <TableRow key={country.id}>
                  <TableCell className="font-medium">{country.name}</TableCell>
                  <TableCell>{country.code}</TableCell>
                  <TableCell>{country.currency_code} ({country.currency_symbol})</TableCell>
                  <TableCell>{country.unit_system}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                      {country.status}
                    </span>
                  </TableCell>
                  <TableCell className="flex gap-2">
                    <Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(country.id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
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
