import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Plus, 
  Layers, 
  MoreVertical, 
  Edit, 
  Trash2, 
  GripVertical 
} from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { 
  getAdminCategories, 
  updateCategory 
} from '@/lib/admin/calculator.functions';
import { toast } from 'sonner';

export const Route = createFileRoute('/admin/categories')({
  component: AdminCategories,
});

function AdminCategories() {
  const queryClient = useQueryClient();

  const { data: categories, isLoading } = useQuery({
    queryKey: ['admin-categories'],
    queryFn: () => getAdminCategories(),
  });

  const sortMutation = useMutation({
    mutationFn: ({ id, sortOrder }: { id: string, sortOrder: number }) => 
      updateCategory({ data: { id, updates: { sort_order: sortOrder } } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-categories'] });
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Categories</h1>
          <p className="text-slate-500">Organize calculators into logical groups.</p>
        </div>
        <Button disabled>
          <Plus className="w-4 h-4 mr-2" /> New Category
        </Button>
      </div>

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10"></TableHead>
              <TableHead>Category Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Icon</TableHead>
              <TableHead>Calculators</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              [1, 2, 3].map(i => (
                <TableRow key={i}>
                  <TableCell colSpan={6} className="h-12 animate-pulse bg-slate-50/50"></TableCell>
                </TableRow>
              ))
            ) : categories?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center text-slate-500">
                  No categories found.
                </TableCell>
              </TableRow>
            ) : (
              categories?.map((cat: any) => (
                <TableRow key={cat.id} className="hover:bg-slate-50/50">
                  <TableCell>
                    <GripVertical className="w-4 h-4 text-slate-300" />
                  </TableCell>
                  <TableCell className="font-medium">
                    {cat.name}
                  </TableCell>
                  <TableCell className="text-slate-500 font-mono text-xs">
                    {cat.slug}
                  </TableCell>
                  <TableCell>
                    <div className="p-1.5 bg-slate-100 rounded w-fit">
                      <Layers className="w-4 h-4 text-slate-600" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full font-medium">
                      {cat.calculator_count || 0}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </Button>
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
