import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { Save, RotateCcw } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export const Route = createFileRoute('/admin/calculator-settings')({
  component: CalculatorSettingsManagement,
});

function CalculatorSettingsManagement() {
  const { data: settings, isLoading } = useQuery({
    queryKey: ['admin-calculator-settings'],
    queryFn: async () => {
      const { data, error } = await supabase.from('calculator_settings').select('*').order('category');
      if (error) throw error;
      return data;
    },
  });

  const handleUpdate = (key: string) => {
    if (!confirm('Changing this value can affect calculator results across the website. Continue?')) return;
    toast.info(`Updating ${key}...`);
  };

  const categories = [...new Set(settings?.map(s => s.category) || [])];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Calculator Assumptions</h1>
          <p className="text-sm text-slate-500">Core parameters used in calculations.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {isLoading ? (
          <div className="col-span-2 text-center py-12 bg-white rounded-lg border border-dashed">
            Loading settings...
          </div>
        ) : categories.map(category => (
          <Card key={category}>
            <CardHeader>
              <CardTitle className="capitalize">{category} Settings</CardTitle>
              <CardDescription>Default values for {category} components.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {settings?.filter(s => s.category === category).map(setting => (
                <div key={setting.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label className="text-sm font-medium">{setting.key.replace(/_/g, ' ')}</Label>
                    <span className="text-xs text-slate-400">{setting.unit || ''}</span>
                  </div>
                  <div className="flex gap-2">
                    <Input defaultValue={setting.value} className="flex-1" />
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => handleUpdate(setting.key)}
                    >
                      <Save className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-[10px] text-slate-400">{setting.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
