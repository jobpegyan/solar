import React, { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { Plus, Pencil, Search, Globe, Eye } from 'lucide-react';

export const Route = createFileRoute('/admin/content')({
  component: ContentManagement,
});

function ContentManagement() {
  const [search, setSearch] = useState('');

  const { data: pages, isLoading } = useQuery({
    queryKey: ['admin-seo-pages', search],
    queryFn: async () => {
      let query = supabase.from('seo_pages').select('*');
      if (search) query = query.ilike('title', `%${search}%`);
      const { data, error } = await query.order('updated_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">SEO & Content</h1>
        <Button className="bg-solar text-white">
          <Plus className="mr-2 h-4 w-4" /> Create Page
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search by title or slug..." 
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
                <TableHead>Page Title / Slug</TableHead>
                <TableHead>Meta Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow><TableCell colSpan={5} className="text-center">Loading...</TableCell></TableRow>
              ) : pages?.map((page) => (
                <TableRow key={page.id}>
                  <TableCell className="font-medium">
                    {page.title}
                    <div className="text-xs text-slate-500 font-mono">/{page.slug}</div>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate text-xs">{page.meta_title || '-'}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      page.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {page.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs text-slate-500">
                    {new Date(page.updated_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="flex gap-2">
                    <Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>
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
