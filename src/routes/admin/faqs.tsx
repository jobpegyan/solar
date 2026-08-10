import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { Plus, Pencil, Trash2, GripVertical } from 'lucide-react';

export const Route = createFileRoute('/admin/faqs')({
  component: FAQManagement,
});

function FAQManagement() {
  const { data: faqs, isLoading } = useQuery({
    queryKey: ['admin-faqs'],
    queryFn: async () => {
      const { data, error } = await supabase.from('faqs').select('*').order('display_order');
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Frequently Asked Questions</h1>
        <Button className="bg-solar text-white">
          <Plus className="mr-2 h-4 w-4" /> Add FAQ
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40px]"></TableHead>
                <TableHead>Question</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow><TableCell colSpan={5} className="text-center">Loading...</TableCell></TableRow>
              ) : faqs?.map((faq) => (
                <TableRow key={faq.id}>
                  <TableCell><GripVertical className="h-4 w-4 text-slate-400 cursor-grab" /></TableCell>
                  <TableCell className="font-medium max-w-[300px] truncate">{faq.question}</TableCell>
                  <TableCell className="capitalize">{faq.category || 'General'}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs uppercase font-bold tracking-wider">
                      {faq.status}
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
