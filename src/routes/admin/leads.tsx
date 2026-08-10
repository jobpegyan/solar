import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-blue-100 text-blue-800',
  contacted: 'bg-yellow-100 text-yellow-800',
  qualified: 'bg-green-100 text-green-800',
  converted: 'bg-green-500 text-white',
  invalid: 'bg-red-100 text-red-800',
  archived: 'bg-gray-100 text-gray-800',
};

export default function AdminLeads() {
  const queryClient = useQueryClient();
  const { data: leads, isLoading } = useQuery({
    queryKey: ['admin-leads'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('solar_leads')
        .select('*, regions(name)')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    }
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string, status: string }) => {
      const { error } = await supabase
        .from('solar_leads')
        .update({ status: status as any })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-leads'] });
      toast.success('Lead status updated');
    }
  });

  if (isLoading) return <div className="p-8">Loading leads...</div>;

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Solar Leads</h1>
        <Badge variant="outline" className="text-lg px-4 py-1">
          {leads?.length || 0} Total Leads
        </Badge>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>System Size</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads?.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="text-sm">
                    {new Date(lead.created_at!).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{lead.name}</div>
                    <div className="text-xs text-muted-foreground">{lead.email}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{lead.country_code} - {lead.postal_code}</div>
                    <div className="text-xs text-muted-foreground">{lead.regions?.name}</div>
                  </TableCell>
                  <TableCell>{lead.system_size_kw} kW</TableCell>
                  <TableCell>
                    <Badge className={STATUS_COLORS[lead.status || 'new']}>
                      {lead.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Select 
                      defaultValue={lead.status || 'new'} 
                      onValueChange={(val) => updateStatus.mutate({ id: lead.id, status: val })}
                    >
                      <SelectTrigger className="w-[130px] ml-auto">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="contacted">Contacted</SelectItem>
                        <SelectItem value="qualified">Qualified</SelectItem>
                        <SelectItem value="converted">Converted</SelectItem>
                        <SelectItem value="invalid">Invalid</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
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
