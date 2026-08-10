import React from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useServerFn } from '@tanstack/react-start';
import { getGuides } from '@/lib/content/guides.functions';
import { deleteGuide } from '@/lib/admin/guide.functions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  ExternalLink,
  Filter,
  MoreVertical
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Guide } from '@/lib/content/types';

export const Route = createFileRoute('/admin/guides/')({
  component: AdminGuidesList,
});

function AdminGuidesList() {
  const [search, setSearch] = React.useState('');
  const queryClient = useQueryClient();
  const getGuidesFn = useServerFn(getGuides);
  const deleteFn = useServerFn(deleteGuide);

  const { data: guides, isLoading } = useQuery({
    queryKey: ['admin-guides'],
    queryFn: () => getGuidesFn({ data: { limit: 100 } })
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteFn({ data: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-guides'] });
      toast.success("Guide deleted");
    }
  });

  const filtered = guides?.filter(g => 
    g.title.toLowerCase().includes(search.toLowerCase()) ||
    g.slug.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published': return <Badge className="bg-green-500">Published</Badge>;
      case 'draft': return <Badge variant="secondary">Draft</Badge>;
      case 'review': return <Badge className="bg-yellow-500">Review</Badge>;
      case 'archived': return <Badge variant="destructive">Archived</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Content Guides</h1>
          <p className="text-muted-foreground">Manage educational articles and topical clusters.</p>
        </div>
        <Button asChild className="gap-2">
          <Link to="/admin/guides/$id" params={{ id: 'new' }}>
            <Plus className="w-4 h-4" /> New Guide
          </Link>
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search guides by title or slug..." 
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="w-4 h-4" /> Filter
        </Button>
      </div>

      {isLoading ? (
        <div className="grid gap-4">
          {[1, 2, 3].map(i => <div key={i} className="h-20 bg-slate-100 animate-pulse rounded-lg" />)}
        </div>
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-slate-50/50">
                  <th className="text-left p-4 font-medium">Title</th>
                  <th className="text-left p-4 font-medium">Category</th>
                  <th className="text-left p-4 font-medium">Status</th>
                  <th className="text-left p-4 font-medium">Updated</th>
                  <th className="text-right p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered?.map((guide: Guide) => (
                  <tr key={guide.id} className="border-b hover:bg-slate-50 transition-colors">
                    <td className="p-4">
                      <div className="font-medium">{guide.title}</div>
                      <div className="text-xs text-muted-foreground">{guide.slug}</div>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline" className="capitalize">
                        {guide.category.replace(/-/g, ' ')}
                      </Badge>
                    </td>
                    <td className="p-4">{getStatusBadge(guide.status)}</td>
                    <td className="p-4 text-muted-foreground">
                      {new Date(guide.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" asChild>
                          <a href={`/guides/${guide.slug}`} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                        <Button variant="ghost" size="icon" asChild>
                          <Link to="/admin/guides/$id" params={{ id: guide.id }}>
                            <Edit className="w-4 h-4" />
                          </Link>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-destructive"
                          onClick={() => {
                            if (confirm("Are you sure you want to delete this guide?")) {
                              deleteMutation.mutate(guide.id);
                            }
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {(!filtered || filtered.length === 0) && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-muted-foreground">
                      No guides found. Create your first one to get started!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
