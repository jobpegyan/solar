// src/routes/admin/monetization.tsx
import { createFileRoute } from '@tanstack/react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMonetizationSettings, updateMonetizationSettings } from '@/lib/monetization/settings.functions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { DEFAULT_AD_PLACEMENTS } from '@/lib/monetization/constants';
import { AdPlacement } from '@/lib/monetization/types';

export const Route = createFileRoute('/admin/monetization')({
  component: AdminMonetization,
});

function AdminMonetization() {
  const queryClient = useQueryClient();
  const { data: settings, isLoading } = useQuery({
    queryKey: ['monetization-settings'],
    queryFn: () => getMonetizationSettings(),
  });

  const mutation = useMutation({
    mutationFn: (data: any) => updateMonetizationSettings(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['monetization-settings'] });
      toast.success('Monetization settings updated');
    },
    onError: (error: any) => {
      toast.error(`Update failed: ${error.message}`);
    },
  });

  if (isLoading) return <div className="p-8">Loading monetization settings...</div>;
  if (!settings) return <div className="p-8 text-red-500">Failed to load settings</div>;

  const handleToggleAds = (enabled: boolean) => {
    mutation.mutate({ ads_enabled: enabled });
  };

  const handleUpdatePublisherId = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const publisherId = formData.get('publisherId') as string;
    
    if (publisherId && !publisherId.startsWith('ca-pub-')) {
      toast.error('Publisher ID must start with ca-pub-');
      return;
    }
    
    mutation.mutate({ adsense_publisher_id: publisherId });
  };

  const handleTogglePlacement = (placementId: string, enabled: boolean) => {
    const updatedPlacements = {
      ...(settings.ad_placements || DEFAULT_AD_PLACEMENTS),
      [placementId]: {
        ...(settings.ad_placements?.[placementId] || DEFAULT_AD_PLACEMENTS[placementId]),
        enabled
      }
    };
    mutation.mutate({ ad_placements: updatedPlacements });
  };

  return (
    <div className="container mx-auto p-8 max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Monetization Management</h1>
        <p className="text-muted-foreground">Configure advertising and monetization settings across the platform.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className={!settings.ads_enabled ? "border-red-200" : "border-green-200"}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Global Ad Status</CardTitle>
                <CardDescription>Master toggle for all platform advertising.</CardDescription>
              </div>
              <Switch 
                checked={settings.ads_enabled} 
                onCheckedChange={handleToggleAds}
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${settings.ads_enabled ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="font-medium">{settings.ads_enabled ? 'Ads are ACTIVE' : 'Ads are DISABLED'}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Google AdSense</CardTitle>
            <CardDescription>Primary advertising provider configuration.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdatePublisherId} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="publisherId">Publisher ID</Label>
                <Input 
                  id="publisherId" 
                  name="publisherId"
                  defaultValue={settings.adsense_publisher_id || ''} 
                  placeholder="ca-pub-XXXXXXXXXXXXXXXX" 
                />
              </div>
              <Button type="submit" disabled={mutation.isPending}>
                Save Publisher ID
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Page Visibility</CardTitle>
          <CardDescription>Enable or disable ads on specific page types.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Calculator Pages</Label>
              <p className="text-sm text-muted-foreground">Show ads on specific calculator tool pages.</p>
            </div>
            <Switch 
              checked={settings.calculator_ads_enabled} 
              onCheckedChange={(checked) => mutation.mutate({ calculator_ads_enabled: checked })}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Guide Pages</Label>
              <p className="text-sm text-muted-foreground">Show ads within solar educational guides.</p>
            </div>
            <Switch 
              checked={settings.guide_ads_enabled} 
              onCheckedChange={(checked) => mutation.mutate({ guide_ads_enabled: checked })}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Homepage</Label>
              <p className="text-sm text-muted-foreground">Enable advertising on the main landing page.</p>
            </div>
            <Switch 
              checked={settings.homepage_ads_enabled} 
              onCheckedChange={(checked) => mutation.mutate({ homepage_ads_enabled: checked })}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Category Directory</Label>
              <p className="text-sm text-muted-foreground">Show ads in calculator category listings.</p>
            </div>
            <Switch 
              checked={settings.category_ads_enabled} 
              onCheckedChange={(checked) => mutation.mutate({ category_ads_enabled: checked })}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Manual Ad Placements</CardTitle>
          <CardDescription>Granular control over specific ad slot locations.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.values(DEFAULT_AD_PLACEMENTS).map((placement) => (
              <div key={placement.id} className="flex items-center justify-between p-4 border rounded-lg bg-slate-50">
                <div className="space-y-0.5">
                  <Label className="capitalize">{placement.name}</Label>
                  <code className="text-[10px] text-muted-foreground block">{placement.id}</code>
                </div>
                <Switch 
                  checked={settings.ad_placements?.[placement.id]?.enabled ?? true} 
                  onCheckedChange={(checked) => handleTogglePlacement(placement.id, checked)}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Conversion & Affiliate</CardTitle>
          <CardDescription>Future monetization and tracking settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Affiliate Links</Label>
              <p className="text-sm text-muted-foreground">Enable future affiliate link integration.</p>
            </div>
            <Switch 
              checked={settings.affiliate_links_enabled} 
              onCheckedChange={(checked) => mutation.mutate({ affiliate_links_enabled: checked })}
            />
          </div>
          <div className="space-y-2">
            <Label>Affiliate Disclosure</Label>
            <Input 
              value={settings.affiliate_disclosure || ''} 
              onChange={(e) => mutation.mutate({ affiliate_disclosure: e.target.value })}
              placeholder="e.g. As an Amazon Associate I earn from qualifying purchases." 
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
