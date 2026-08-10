import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/lib/auth-context";
import { getProfile, updateProfile, deleteAccount } from "@/lib/user.functions";
import { useSuspenseQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { User, Shield, Bell, Download, Trash2, Globe } from "lucide-react";

export const Route = createFileRoute("/dashboard/settings")({
  component: SettingsPage,
  head: () => ({
    title: "Account Settings | Solar Panel Calculator",
    meta: [{ name: "robots", content: "noindex" }],
  }),
});

function SettingsPage() {
  const { user, logout } = useAuth();
  const { data: profile } = useSuspenseQuery({
    queryKey: ['profile'],
    queryFn: () => getProfile()
  });

  const [formData, setFormData] = useState({
    full_name: profile?.full_name || "",
    country: profile?.country || "",
    region: profile?.region || "",
    preferred_currency: profile?.preferred_currency || "USD",
    preferred_unit_system: profile?.preferred_unit_system || "imperial",
  });

  const [marketingConsent, setMarketingConsent] = useState(profile?.marketing_consent || false);

  const updateMutation = useMutation({
    mutationFn: (data: any) => updateProfile({ data }),
    onSuccess: () => toast.success("Settings updated successfully")
  });

  const handleDeleteAccount = () => {
    if (confirm("Are you sure? This will permanently delete your account and all saved calculations.")) {
      deleteAccount().then(() => {
        toast.success("Account deleted");
        logout();
      });
    }
  };

  const handleExportData = () => {
    const data = { profile, calculations: [] };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my-solar-data.json';
    a.click();
    toast.success("Data export started");
  };

  return (
    <div className="container py-12 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-muted-foreground text-lg">Manage your personal information, preferences, and data.</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="profile" className="gap-2">
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="preferences" className="gap-2">
            <Globe className="w-4 h-4" />
            <span className="hidden sm:inline">Preferences</span>
          </TabsTrigger>
          <TabsTrigger value="privacy" className="gap-2">
            <Shield className="w-4 h-4" />
            <span className="hidden sm:inline">Privacy</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="w-4 h-4" />
            <span className="hidden sm:inline">Alerts</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your account details and location.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    value={formData.full_name} 
                    onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" value={profile?.email} disabled />
                  <p className="text-[10px] text-muted-foreground">Email cannot be changed directly.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input 
                    id="country" 
                    value={formData.country} 
                    onChange={(e) => setFormData({...formData, country: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="region">State / Region</Label>
                  <Input 
                    id="region" 
                    value={formData.region} 
                    onChange={(e) => setFormData({...formData, region: e.target.value})}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="solar" onClick={() => updateMutation.mutate(formData)}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>App Preferences</CardTitle>
              <CardDescription>Customize how solar calculations are displayed.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Default Currency</Label>
                <Select 
                  value={formData.preferred_currency} 
                  onValueChange={(v) => setFormData({...formData, preferred_currency: v})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD ($)</SelectItem>
                    <SelectItem value="EUR">EUR (€)</SelectItem>
                    <SelectItem value="INR">INR (₹)</SelectItem>
                    <SelectItem value="GBP">GBP (£)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Unit System</Label>
                <Select 
                  value={formData.preferred_unit_system} 
                  onValueChange={(v) => setFormData({...formData, preferred_unit_system: v})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="metric">Metric (kg, m, cm)</SelectItem>
                    <SelectItem value="imperial">Imperial (lb, ft, in)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="solar" onClick={() => updateMutation.mutate(formData)}>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="privacy">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Data Management</CardTitle>
                <CardDescription>Control your account data and marketing preferences.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Marketing Communications</Label>
                    <p className="text-sm text-muted-foreground">Receive updates about new solar incentives and features.</p>
                  </div>
                  <Switch checked={marketingConsent} onCheckedChange={(checked) => setMarketingConsent(checked)} />
                </div>
                <div className="pt-4 border-t flex flex-col sm:flex-row gap-4">
                  <Button variant="outline" className="gap-2" onClick={handleExportData}>
                    <Download className="w-4 h-4" />
                    Download My Data (JSON)
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-destructive/20 bg-destructive/5">
              <CardHeader>
                <CardTitle className="text-destructive">Danger Zone</CardTitle>
                <CardDescription>Permanently remove your account and all associated data.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Once deleted, your account cannot be recovered. All saved solar calculations, scenarios, and preferences will be permanently lost.
                </p>
                <Button variant="destructive" className="gap-2" onClick={handleDeleteAccount}>
                  <Trash2 className="w-4 h-4" />
                  Delete My Account
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Center</CardTitle>
              <CardDescription>Configure which alerts you receive within the platform.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Calculations Saved</Label>
                  <p className="text-sm text-muted-foreground">Get a notification when you successfully save a new estimate.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Report Generated</Label>
                  <p className="text-sm text-muted-foreground">Notification when your professional solar PDF report is ready.</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
