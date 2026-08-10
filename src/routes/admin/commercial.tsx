import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building2, Save, History, TrendingUp } from 'lucide-react';

export const Route = createFileRoute('/admin/commercial')({
  component: AdminCommercialSettings
});

function AdminCommercialSettings() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Commercial Settings</h1>
          <p className="text-muted-foreground">Manage commercial solar assumptions and pricing.</p>
        </div>
        <Button className="bg-solar text-white gap-2">
          <Save className="w-4 h-4" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Commercial Assumptions</CardTitle>
            <CardDescription>Global defaults for commercial calculations</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="design">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="design">System Design</TabsTrigger>
                <TabsTrigger value="financial">Financial</TabsTrigger>
                <TabsTrigger value="area">Area & Spacing</TabsTrigger>
              </TabsList>
              
              <TabsContent value="design" className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Default DC/AC Ratio</Label>
                    <Input type="number" defaultValue="1.25" step="0.05" />
                  </div>
                  <div className="space-y-2">
                    <Label>Commercial Performance Ratio</Label>
                    <Input type="number" defaultValue="0.80" step="0.01" />
                  </div>
                  <div className="space-y-2">
                    <Label>Default Panel Wattage (W)</Label>
                    <Input type="number" defaultValue="550" />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="financial" className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Commercial Electricity Inflation (%)</Label>
                    <Input type="number" defaultValue="3.5" />
                  </div>
                  <div className="space-y-2">
                    <Label>Maintenance Cost (USD/kW/yr)</Label>
                    <Input type="number" defaultValue="15" />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="area" className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Rooftop Area Factor</Label>
                    <Input type="number" defaultValue="1.2" />
                  </div>
                  <div className="space-y-2">
                    <Label>Ground Mount Area Factor</Label>
                    <Input type="number" defaultValue="2.5" />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-solar" />
                Quick Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-dashed">
                <span className="text-sm text-muted-foreground">Commercial Leads</span>
                <span className="font-bold">124</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-dashed">
                <span className="text-sm text-muted-foreground">Avg. System Size</span>
                <span className="font-bold">245 kW</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-muted-foreground">Top Market</span>
                <span className="font-bold">Texas, USA</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Building2 className="w-5 h-5 text-solar" />
                Property Types
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {['Office', 'Retail', 'Warehouse', 'Factory', 'Farm'].map(type => (
                  <div key={type} className="text-sm p-2 bg-slate-50 rounded border flex justify-between">
                    <span>{type}</span>
                    <Button variant="ghost" size="sm" className="h-6 text-xs">Edit</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
