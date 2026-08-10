import React from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Plus, 
  Search, 
  MoreVertical, 
  ExternalLink, 
  Edit, 
  Eye,
  CheckCircle,
  AlertCircle,
  Clock,
  Archive,
  Ban,
  Filter
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
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { getAdminCalculators, updateCalculator } from '@/lib/admin/calculator.functions';
import { format } from 'date-fns';
import { toast } from 'sonner';

export const Route = createFileRoute('/admin/calculators/')({
  component: AdminCalculatorsList,
});

function AdminCalculatorsList() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState<string>('all');

  const { data: calculators, isLoading } = useQuery({
    queryKey: ['admin-calculators'],
    queryFn: () => getAdminCalculators(),
  });

  const publishMutation = useMutation({
    mutationFn: (id: string) => updateCalculator({ data: { id, updates: { status: 'published' } } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-calculators'] });
      toast.success('Calculator published');
    }
  });

  const unpublishMutation = useMutation({
    mutationFn: (id: string) => updateCalculator({ data: { id, updates: { status: 'draft' } } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-calculators'] });
      toast.success('Calculator unpublished (set to draft)');
    }
  });

  const filteredCalculators = calculators?.filter(calc => {
    const matchesSearch = calc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          calc.slug.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || calc.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200"><CheckCircle className="w-3 h-3 mr-1" /> Published</Badge>;
      case 'draft':
        return <Badge variant="outline" className="text-slate-500"><Clock className="w-3 h-3 mr-1" /> Draft</Badge>;
      case 'review':
        return <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 border-orange-200"><AlertCircle className="w-3 h-3 mr-1" /> In Review</Badge>;
      case 'noindex':
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200"><Eye className="w-3 h-3 mr-1" /> No Index</Badge>;
      case 'disabled':
        return <Badge variant="destructive"><Ban className="w-3 h-3 mr-1" /> Disabled</Badge>;
      case 'archived':
        return <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-100 border-slate-200"><Archive className="w-3 h-3 mr-1" /> Archived</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Calculators</h1>
          <p className="text-slate-500">Manage all solar calculators and their configuration.</p>
        </div>
        <Button asChild>
          <Link to="/admin/calculators/new">
            <Plus className="w-4 h-4 mr-2" /> New Calculator
          </Link>
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input 
            placeholder="Search calculators..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex gap-2">
                <Filter className="w-4 h-4" />
                {statusFilter === 'all' ? 'All Statuses' : statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setStatusFilter('all')}>All Statuses</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('published')}>Published</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('draft')}>Draft</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('review')}>Review</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('noindex')}>No Index</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('disabled')}>Disabled</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('archived')}>Archived</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Countries</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              [1, 2, 3, 4, 5].map(i => (
                <TableRow key={i}>
                  <TableCell colSpan={6} className="h-12 animate-pulse bg-slate-50/50"></TableCell>
                </TableRow>
              ))
            ) : filteredCalculators?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center text-slate-500">
                  No calculators found.
                </TableCell>
              </TableRow>
            ) : (
              filteredCalculators?.map((calc) => (
                <TableRow key={calc.id} className="hover:bg-slate-50/50">
                  <TableCell className="font-medium">
                    <div>{calc.name}</div>
                    <div className="text-xs text-slate-400 font-normal">{calc.slug}</div>
                  </TableCell>
                  <TableCell>
                    {calc.calculator_categories?.name || 'Uncategorized'}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(calc.status)}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {calc.countries.map((c: string) => (
                        <span key={c} className="text-[10px] px-1.5 py-0.5 bg-slate-100 rounded text-slate-600 font-bold uppercase">
                          {c}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-500 text-sm">
                    {calc.updated_at ? format(new Date(calc.updated_at), 'MMM d, yyyy') : 'Never'}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                          <Link to={`/admin/calculators/${calc.id}`} className="flex items-center">
                            <Edit className="w-4 h-4 mr-2" /> Edit Configuration
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to={calc.slug} target="_blank" className="flex items-center">
                            <ExternalLink className="w-4 h-4 mr-2" /> View Public Page
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {calc.status !== 'published' ? (
                          <DropdownMenuItem onClick={() => publishMutation.mutate(calc.id)}>
                            <CheckCircle className="w-4 h-4 mr-2 text-green-600" /> Publish Now
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem onClick={() => unpublishMutation.mutate(calc.id)}>
                            <Clock className="w-4 h-4 mr-2 text-orange-600" /> Set to Draft
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem>
                          <Archive className="w-4 h-4 mr-2 text-slate-500" /> Archive
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
