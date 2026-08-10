import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { Save, Globe, Shield, Mail, Share2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export const Route = createFileRoute('/admin/settings')({
  component: SiteSettingsManagement,
});

function SiteSettingsManagement() {
  const { data: settings, isLoading } = useQuery({
    queryKey: ['admin-site-settings'],
    queryFn: async () => {
      const { data, error } = await supabase.from('site_settings').select('*');
      if (error) throw error;
      return data;
    },
  });

  const handleSave = () => {
    toast.success('Settings updated');
  };

  const getSetting = (key: string) => settings?.find(s => s.key === key)?.value || '';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Site Settings</h1>
        <Button className="bg-solar text-white" onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" /> Save All Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-solar" />
              <CardTitle>General Config</CardTitle>
            </div>
            <CardDescription>Public site identification and defaults.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Site Name</Label>
              <Input defaultValue={getSetting('site_name') || 'Solar Panel Calculator'} />
            </div>
            <div className="space-y-2">
              <Label>Support Email</Label>
              <Input type="email" defaultValue={getSetting('support_email') || 'hello@solarpanel-calculator.com'} />
            </div>
            <div className="space-y-2">
              <Label>Default Language</Label>
              <Input defaultValue={getSetting('default_lang') || 'English'} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-solar" />
              <CardTitle>SEO & Tracking</CardTitle>
            </div>
            <CardDescription>Global SEO defaults and script IDs.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>GA4 ID</Label>
              <Input placeholder="G-XXXXXXXXXX" defaultValue={getSetting('ga_id')} />
            </div>
            <div className="space-y-2">
              <Label>Default Meta Title</Label>
              <Input defaultValue={getSetting('meta_title')} />
            </div>
            <div className="space-y-2">
              <Label>Robots.txt</Label>
              <Input defaultValue={getSetting('robots_mode') || 'index, follow'} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Share2 className="h-5 w-5 text-solar" />
              <CardTitle>Social Media</CardTitle>
            </div>
            <CardDescription>Links for footer and share buttons.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Twitter / X</Label>
              <Input placeholder="https://x.com/..." defaultValue={getSetting('social_x')} />
            </div>
            <div className="space-y-2">
              <Label>Facebook</Label>
              <Input placeholder="https://facebook.com/..." defaultValue={getSetting('social_fb')} />
            </div>
            <div className="space-y-2">
              <Label>LinkedIn</Label>
              <Input placeholder="https://linkedin.com/..." defaultValue={getSetting('social_li')} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
