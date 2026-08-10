import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Users, Calculator, Target, TrendingUp, Globe } from 'lucide-react';

const COLORS = ['#FFB800', '#00C49F', '#FF8042', '#0088FE', '#8884d8'];

export default function AdminAnalytics() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['admin-analytics'],
    queryFn: async () => {
      const [leads, events] = await Promise.all([
        supabase.from('solar_leads').select('*'),
        supabase.from('analytics_events').select('*')
      ]);

      const leadsData = leads.data || [];
      const eventsData = events.data || [];

      // Calculate conversions
      const started = eventsData.filter(e => e.event_name === 'calculator_started').length;
      const completed = eventsData.filter(e => e.event_name === 'calculator_completed').length;
      const leadSubs = leadsData.length;

      // Group by country
      const countryStats = eventsData.reduce((acc: any, event) => {
        const country = event.country_code || 'Unknown';
        acc[country] = (acc[country] || 0) + 1;
        return acc;
      }, {});

      const pieData = Object.entries(countryStats).map(([name, value]) => ({ name, value }));

      return {
        totalLeads: leadSubs,
        completionRate: started > 0 ? (completed / started) * 100 : 0,
        leadConvRate: completed > 0 ? (leadSubs / completed) * 100 : 0,
        sessions: started,
        pieData,
        funnelData: [
          { name: 'Started', value: started },
          { name: 'Completed', value: completed },
          { name: 'Leads', value: leadSubs }
        ]
      };
    }
  });

  if (isLoading) return <div className="p-8">Loading analytics...</div>;

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">Analytics Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Calculator Sessions</CardTitle>
            <Calculator className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.sessions}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.completionRate.toFixed(1)}%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalLeads}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Lead Conv. Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.leadConvRate.toFixed(1)}%</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Conversion Funnel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats?.funnelData || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#FFB800" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Traffic by Country
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats?.pieData || []}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {(stats?.pieData || []).map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length] || '#FFB800'} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
