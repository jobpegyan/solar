import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Plus, 
  RefreshCw, 
  Trash2, 
  CheckCircle, 
  XCircle,
  AlertTriangle,
  ExternalLink
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
import { Badge } from '@/components/ui/badge';
import { 
  getAdminRedirects, 
  createRedirect 
} from '@/lib/admin/calculator.functions';
import { toast } from 'sonner';
import { format } from 'date-fns';

export const Route = createFileRoute('/admin/redirects')({
  component: AdminRedirects,
});

function AdminRedirects() {
  const queryClient = useQueryClient();

  const { data: redirects, isLoading } = useQuery({
    queryKey: ['admin-redirects'],
    queryFn: () => getAdminRedirects(),
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">301 Redirects</h1>
          <p className="text-slate-500">Manage URL changes and prevent 404 errors.</p>
        </div>
        <Button disabled>
          <Plus className="w-4 h-4 mr-2" /> New Redirect
        </Button>
      </div>

      <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg flex gap-3 text-amber-800">
        <AlertTriangle className="w-5 h-5 flex-shrink-0" />
        <div className="text-sm">
          Redirects are automatically created when a calculator slug changes. Manual redirects should be used sparingly for legacy URL support.
        </div>
      </div>

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Source Path</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
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
            ) : !redirects || redirects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center text-slate-500">
                  No redirects configured.
                </TableCell>
              </TableRow>
            ) : (
              redirects.map((redir: any) => (
                <TableRow key={redir.id} className="hover:bg-slate-50/50">
                  <TableCell className="font-mono text-xs">
                    {redir.source_path}
                  </TableCell>
                  <TableCell className="font-mono text-xs flex items-center gap-2">
                    {redir.destination_path}
                    <a href={redir.destination_path} target="_blank" rel="noreferrer">
                      <ExternalLink className="w-3 h-3 text-slate-400 hover:text-slate-600" />
                    </a>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{redir.status_code}</Badge>
                  </TableCell>
                  <TableCell>
                    {redir.active ? (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200">Active</Badge>
                    ) : (
                      <Badge variant="secondary">Inactive</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-slate-500 text-sm">
                    {format(new Date(redir.created_at), 'MMM d, yyyy')}
                  </TableCell>
                  <TableCell className="text-right">
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
