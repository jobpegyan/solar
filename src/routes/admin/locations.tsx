import React, { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Plus, 
  MapPin, 
  Trash2, 
  Edit, 
  Globe,
  Filter,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';

export const Route = createFileRoute('/admin/locations')({
  component: AdminLocations,
});

function AdminLocations() {
  const [search, setSearch] = useState('');
  const [countryFilter, setCountryFilter] = useState('all');
  const queryClient = useQueryClient();

  const { data: locations, isLoading } = useQuery({
    queryKey: ['admin-locations', search, countryFilter],
    queryFn: async () => {
      let query = supabase
        .from('locations')
        .select('*, countries(name, code), regions(name, code)');
      
      if (search) {
        query = query.or(`name.ilike."%${search}%",postal_code.ilike."%${search}%"`);
      }
      
      if (countryFilter !== 'all') {
        query = query.eq('country_id', countryFilter);
      }

      const { data, error } = await query.order('name');
      if (error) throw error;
      return data;
    },
  });

  const { data: countries } = useQuery({
    queryKey: ['admin-countries-list'],
    queryFn: async () => {
      const { data } = await supabase.from('countries').select('id, name, code').eq('status', 'active');
      return data || [];
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('locations').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-locations'] });
      toast.success('Location deleted successfully');
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Locations</h1>
          <p className="text-slate-500">Manage city and postal-code level intelligence.</p>
        </div>
        <Button className="bg-solar hover:bg-solar-hover text-white">
          <Plus className="w-4 h-4 mr-2" /> Add Location
        </Button>
      </div>

      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search by name or postal code..." 
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="w-full md:w-64">
            <Select value={countryFilter} onValueChange={setCountryFilter}>
              <SelectTrigger>
                <Filter className="w-4 h-4 mr-2 text-slate-400" />
                <SelectValue placeholder="Filter by Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                {countries?.map(c => (
                  <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <div className="bg-white border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name / Postal Code</TableHead>
              <TableHead>Country / Region</TableHead>
              <TableHead>Coordinates</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              [1, 2, 3].map(i => (
                <TableRow key={i}>
                  <TableCell colSpan={5} className="h-12 animate-pulse bg-slate-50" />
                </TableRow>
              ))
            ) : locations?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-slate-500">
                  No locations found.
                </TableCell>
              </TableRow>
            ) : (
              locations?.map((loc) => (
                <TableRow key={loc.id}>
                  <TableCell>
                    <div className="font-medium text-slate-900">{loc.name}</div>
                    <div className="text-xs text-slate-500">{loc.postal_code || 'No Postal Code'}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      <Globe className="w-3 h-3 text-slate-400" />
                      <span className="text-sm">{(loc.countries as any)?.name}</span>
                    </div>
                    {loc.regions && (
                      <div className="flex items-center gap-1.5 mt-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span className="text-xs text-slate-500">{(loc.regions as any)?.name}</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="text-xs text-slate-500 font-mono">
                      {loc.latitude}, {loc.longitude}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={loc.status === 'active' ? 'default' : 'secondary'} className={loc.status === 'active' ? 'bg-green-100 text-green-700 hover:bg-green-100' : ''}>
                      {loc.status === 'active' ? <CheckCircle2 className="w-3 h-3 mr-1" /> : <XCircle className="w-3 h-3 mr-1" />}
                      {loc.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => {
                          if (confirm('Are you sure you want to delete this location?')) {
                            deleteMutation.mutate(loc.id);
                          }
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function Card({ children, className }: { children: React.ReactNode, className?: string }) {
  return <div className={`bg-white border rounded-lg shadow-sm ${className}`}>{children}</div>;
}
