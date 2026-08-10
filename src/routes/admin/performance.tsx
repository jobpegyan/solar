import { createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getPerformanceMetrics } from '@/lib/performance.functions';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Activity, 
  Zap, 
  Clock, 
  BarChart3, 
  Smartphone, 
  Globe, 
  ShieldAlert,
  Gauge
} from 'lucide-react';

export const Route = createFileRoute('/admin/performance')({
  component: AdminPerformance,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData({
      queryKey: ['performance-metrics'],
      queryFn: () => getPerformanceMetrics(),
    });
  },
});

function AdminPerformance() {
  const { data: metrics } = useSuspenseQuery({
    queryKey: ['performance-metrics'],
    queryFn: () => getPerformanceMetrics(),
  });

  const getVitalsColor = (value: number, type: 'lcp' | 'inp' | 'cls') => {
    if (type === 'lcp') return value <= 2.5 ? 'text-green-500' : value <= 4 ? 'text-yellow-500' : 'text-red-500';
    if (type === 'inp') return value <= 200 ? 'text-green-500' : value <= 500 ? 'text-yellow-500' : 'text-red-500';
    if (type === 'cls') return value <= 0.1 ? 'text-green-500' : value <= 0.25 ? 'text-yellow-500' : 'text-red-500';
    return 'text-foreground';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Production Audit & Performance</h1>
          <p className="text-muted-foreground">Monitor Core Web Vitals and system reliability.</p>
        </div>
        <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 px-3 py-1">
          <Activity className="w-4 h-4 mr-2" />
          System: Ready
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">LCP (Largest Contentful Paint)</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getVitalsColor(metrics.baseline.lcp, 'lcp')}`}>
              {metrics.baseline.lcp}s
            </div>
            <p className="text-xs text-muted-foreground">Target: ≤ 2.5s</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">INP (Interaction to Next Paint)</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getVitalsColor(metrics.baseline.inp, 'inp')}`}>
              {metrics.baseline.inp}ms
            </div>
            <p className="text-xs text-muted-foreground">Target: ≤ 200ms</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">CLS (Cumulative Layout Shift)</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getVitalsColor(metrics.baseline.cls, 'cls')}`}>
              {metrics.baseline.cls}
            </div>
            <p className="text-xs text-muted-foreground">Target: ≤ 0.1</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">TTFB (Server Response Time)</CardTitle>
            <Gauge className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.baseline.ttfb}s</div>
            <p className="text-xs text-muted-foreground">Target: ≤ 0.8s</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Bundle Size Budget</CardTitle>
            <CardDescription>Targeting &lt; 200KB initial JS.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b pb-2">
                <span>Main Bundle</span>
                <Badge variant="secondary">{metrics.bundleStats.main}</Badge>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span>Vendor Bundle</span>
                <Badge variant="destructive">{metrics.bundleStats.vendor}</Badge>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span>Admin Components</span>
                <Badge variant="secondary">{metrics.bundleStats.admin}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Slow Request Log</CardTitle>
            <CardDescription>Top requests exceeding 1000ms.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {metrics.slowRequests.map((req, i) => (
                <div key={i} className="flex justify-between items-center border-b pb-2">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-mono truncate max-w-[200px]">{req.route}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-red-500">{req.duration}ms</div>
                    <div className="text-[10px] text-muted-foreground">{new Date(req.timestamp).toLocaleTimeString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Global Performance Targets</CardTitle>
          <CardDescription>Optimization strategy for Phase 13.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-bold">
                <Smartphone className="w-4 h-4 text-solar" />
                Mobile Optimization
              </div>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Zero layout shift (CLS)</li>
                <li>• Lazy load charts below fold</li>
                <li>• Optimized system fonts</li>
              </ul>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-bold">
                <Globe className="w-4 h-4 text-solar" />
                International Speed
              </div>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Regional CDN caching</li>
                <li>• Lightweight location search</li>
                <li>• Tree-shaked assumptions</li>
              </ul>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-bold">
                <Zap className="w-4 h-4 text-solar" />
                Calculator First
              </div>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Instant local arithmetic</li>
                <li>• Defer SEO content scripts</li>
                <li>• Code-split admin routes</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
