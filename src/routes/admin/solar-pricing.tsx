import React, { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { Plus, Pencil, Trash2, Search, DollarSign, Filter } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const Route = createFileRoute('/admin/solar-pricing')({
  component: SolarPricingManagement,
});

function SolarPricingManagement() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const { data: pricing, isLoading } = useQuery({
    queryKey: ['admin-solar-pricing', search, activeTab],
    queryFn: async () => {
      let query = supabase.from('solar_pricing').select('*, countries(name), regions(name)');
      if (search) query = query.ilike('item_name', `%${search}%`);
      if (activeTab !== 'all') query = query.eq('category', activeTab);
      const { data, error } = await query.order('last_updated', { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Solar Pricing</h1>
        <Button className="bg-solar text-white">
          <Plus className="mr-2 h-4 w-4" /> Add Pricing
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="panel">Panels</TabsTrigger>
            <TabsTrigger value="inverter">Inverters</TabsTrigger>
            <TabsTrigger value="installation">Installation</TabsTrigger>
            <TabsTrigger value="battery">Battery</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="relative w-64">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Search pricing items..." 
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category / Item</TableHead>
                <TableHead>Region</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Price/Watt</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow><TableCell colSpan={6} className="text-center">Loading...</TableCell></TableRow>
              ) : pricing?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    <span className="capitalize text-xs px-2 py-0.5 bg-slate-100 rounded-full mr-2">
                      {item.category}
                    </span>
                    {item.item_name || 'Generic'}
                  </TableCell>
                  <TableCell>
                    {item.regions?.name || item.countries?.name || 'Global'}
                  </TableCell>
                  <TableCell className="font-semibold">
                    {item.currency} {item.price}
                  </TableCell>
                  <TableCell>
                    {item.price_per_watt ? `${item.currency} ${item.price_per_watt}` : '-'}
                  </TableCell>
                  <TableCell className="text-xs text-slate-500">
                    {item.last_updated ? new Date(item.last_updated).toLocaleDateString() : '-'}
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
