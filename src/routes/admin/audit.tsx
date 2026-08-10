import { createFileRoute } from '@tanstack/react-router';
import { performAudit } from '@/lib/audit.functions';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';

export const Route = createFileRoute('/admin/audit')({
  component: AuditPage,
});

function AuditPage() {
  const { data: audit, isLoading, error } = useQuery({
    queryKey: ['production-audit'],
    queryFn: () => performAudit(),
  });

  if (isLoading) return <div className="p-8">Running Production Audit...</div>;
  if (error) return <div className="p-8 text-destructive">Audit Failed: {(error as Error).message}</div>;

  return (
    <div className="container mx-auto p-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Production Readiness Audit</h1>
        <Badge variant={audit?.status === 'READY' ? 'default' : 'destructive'} className="text-lg px-4 py-1">
          {audit?.status}
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Calculation Engine Accuracy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {audit?.tests.calculations.map((test: any, i: number) => (
              <div key={i} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="font-medium">{test.name}</span>
                {test.passed ? (
                  <CheckCircle2 className="text-green-500 h-5 w-5" />
                ) : (
                  <XCircle className="text-destructive h-5 w-5" />
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Infrastructure & Security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <div className="flex items-center gap-2">
              <AlertTriangle className="text-amber-500 h-5 w-5" />
              <span>Manual Check Required: Supabase RLS Policies</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="text-amber-500 h-5 w-5" />
              <span>Manual Check Required: Environment Variables</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="text-amber-500 h-5 w-5" />
              <span>Manual Check Required: Domain Redirects</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
