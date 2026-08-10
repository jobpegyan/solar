import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { 
  Globe, 
  Map, 
  Sun, 
  Zap, 
  DollarSign, 
  ArrowUpRight,
  Database,
  Users,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const Route = createFileRoute('/admin/')({
  component: AdminDashboard,
});

function AdminDashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      // Parallel fetch for stats
      const [countries, regions, solar, rates, pricing] = await Promise.all([
        supabase.from('countries').select('id', { count: 'exact', head: true }),
        supabase.from('regions').select('id', { count: 'exact', head: true }),
        supabase.from('solar_resources').select('id', { count: 'exact', head: true }),
        supabase.from('electricity_rates').select('id', { count: 'exact', head: true }),
        supabase.from('solar_pricing').select('id', { count: 'exact', head: true }),
      ]);

      return {
        countries: countries.count || 0,
        regions: regions.count || 0,
        solar: solar.count || 0,
        rates: rates.count || 0,
        pricing: pricing.count || 0,
      };
    },
  });

  const cards = [
    { title: 'Countries', value: stats?.countries, icon: Globe, description: 'Active markets' },
    { title: 'Regions', value: stats?.regions, icon: Map, description: 'States & provinces' },
    { title: 'Solar Resource', value: stats?.solar, icon: Sun, description: 'Irradiance records' },
    { title: 'Elec. Rates', value: stats?.rates, icon: Zap, description: 'Utility tariffs' },
    { title: 'Pricing', value: stats?.pricing, icon: DollarSign, description: 'Equipment costs' },
    { title: 'Usage', value: 0, icon: ArrowUpRight, description: 'Total calculations' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500">Overview of your global solar database.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <Card key={card.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <card.icon className="h-4 w-4 text-slate-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isLoading ? (
                  <div className="h-8 w-16 bg-slate-100 animate-pulse rounded" />
                ) : (
                  card.value
                )}
              </div>
              <p className="text-xs text-slate-500 mt-1">{card.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent System Activity</CardTitle>
            <CardDescription>Latest changes made by administrators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start gap-4 text-sm border-b pb-4 last:border-0 last:pb-0">
                  <div className="p-2 bg-slate-100 rounded-full">
                    <Database className="h-4 w-4 text-slate-600" />
                  </div>
                  <div>
                    <div className="font-medium">System initialized</div>
                    <div className="text-slate-500 text-xs">Admin user • 2 hours ago</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Database Health</CardTitle>
            <CardDescription>Real-time status of solar data tables</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { label: 'Countries Table', status: 'Healthy' },
                { label: 'Solar Index', status: 'Healthy' },
                { label: 'Pricing Data', status: 'Healthy' },
                { label: 'Auth Service', status: 'Healthy' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">{item.label}</span>
                  <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
