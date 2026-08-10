import React from 'react';
import { createFileRoute, Link, useParams } from '@tanstack/react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Save, 
  ArrowLeft, 
  Eye, 
  Settings, 
  FileText, 
  Globe, 
  Search,
  MessageSquare,
  Layout,
  Info,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  getCalculatorDetails, 
  updateCalculator, 
  getAdminCategories 
} from '@/lib/admin/calculator.functions';
import { toast } from 'sonner';

export const Route = createFileRoute('/admin/calculators/$id')({
  component: AdminCalculatorEditor,
});

function AdminCalculatorEditor() {
  const { id } = useParams({ from: '/admin/calculators/$id' });
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = React.useState('general');

  const { data: calculator, isLoading } = useQuery({
    queryKey: ['admin-calculator', id],
    queryFn: () => getCalculatorDetails({ data: { id } }),
  });

  const { data: categories } = useQuery({
    queryKey: ['admin-categories'],
    queryFn: () => getAdminCategories(),
  });

  const updateMutation = useMutation({
    mutationFn: (updates: any) => updateCalculator({ data: { id, updates } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-calculator', id] });
      toast.success('Calculator configuration saved');
    },
    onError: (error: any) => {
      toast.error('Failed to save: ' + error.message);
    }
  });

  if (isLoading) return <div className="p-8 text-center">Loading calculator configuration...</div>;
  if (!calculator) return <div className="p-8 text-center text-red-500">Calculator not found.</div>;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const updates = Object.fromEntries(formData.entries());
    
    // Handle specific types
    const typedUpdates: Record<string, any> = {
      ...updates,
      countries: calculator.countries, // Keep as is for now
      status: updates['status'] || calculator['status']
    };

    updateMutation.mutate(typedUpdates);
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/admin/calculators">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
            <Link to="/admin/calculators" className="hover:text-slate-900">Calculators</Link>
            <ChevronRight className="w-3 h-3" />
            <span>Editor</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900">{calculator.name}</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link to={calculator.slug} target="_blank">
              <Eye className="w-4 h-4 mr-2" /> View Public
            </Link>
          </Button>
          <Button onClick={() => (document.getElementById('edit-form') as HTMLFormElement)?.requestSubmit()}>
            <Save className="w-4 h-4 mr-2" /> Save Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-white border p-1 h-auto flex-wrap sm:flex-nowrap">
          <TabsTrigger value="general" className="gap-2 px-4 py-2">
            <Settings className="w-4 h-4" /> General
          </TabsTrigger>
          <TabsTrigger value="seo" className="gap-2 px-4 py-2">
            <Search className="w-4 h-4" /> SEO & Meta
          </TabsTrigger>
          <TabsTrigger value="content" className="gap-2 px-4 py-2">
            <FileText className="w-4 h-4" /> Content Hub
          </TabsTrigger>
          <TabsTrigger value="advanced" className="gap-2 px-4 py-2">
            <Layout className="w-4 h-4" /> Configuration
          </TabsTrigger>
        </TabsList>

        <form id="edit-form" onSubmit={handleSave} className="mt-6 space-y-6">
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Core identity and routing for this calculator.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Display Name</Label>
                    <Input id="name" name="name" defaultValue={calculator.name} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug / URL Path</Label>
                    <Input id="slug" name="slug" defaultValue={calculator.slug} required />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category_id">Category</Label>
                    <Select name="category_id" defaultValue={calculator.category_id || undefined}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories?.map((cat: any) => (
                          <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Publishing Status</Label>
                    <Select name="status" defaultValue={calculator.status}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft (Private)</SelectItem>
                        <SelectItem value="review">Needs Review</SelectItem>
                        <SelectItem value="published">Published (Public)</SelectItem>
                        <SelectItem value="noindex">Published (No-Index)</SelectItem>
                        <SelectItem value="disabled">Disabled</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Global Coverage</CardTitle>
                <CardDescription>Which regions should this calculator be active for?</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {['US', 'IN', 'CA', 'AU', 'UK', 'DE', 'FR', 'ES', 'IT', 'NL', 'NZ', 'ZA'].map(country => (
                    <div key={country} className="flex items-center gap-2 px-3 py-1.5 border rounded-lg bg-slate-50">
                      <Switch 
                        checked={calculator.countries?.includes(country)} 
                        onCheckedChange={(checked) => {
                          const newCountries = checked 
                            ? [...(calculator.countries || []), country]
                            : calculator.countries.filter((c: string) => c !== country);
                          updateMutation.mutate({ countries: newCountries });
                        }}
                      />
                      <span className="text-sm font-medium">{country}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seo" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Meta Tags</CardTitle>
                <CardDescription>Optimize how this calculator appears in search engines.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="meta_title">Meta Title</Label>
                  <Input id="meta_title" name="meta_title" defaultValue={calculator.meta_title} />
                  <p className="text-xs text-slate-400">Recommended length: 50-60 characters.</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="meta_description">Meta Description</Label>
                  <Textarea id="meta_description" name="meta_description" defaultValue={calculator.meta_description} className="h-24" />
                  <p className="text-xs text-slate-400">Recommended length: 150-160 characters.</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Headings & Directives</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="h1_title">Page H1 Title</Label>
                  <Input id="h1_title" name="h1_title" defaultValue={calculator.h1_title || calculator.name} />
                </div>
                <div className="flex items-center gap-6 pt-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="is_noindex" name="is_noindex" defaultChecked={calculator.status === 'noindex'} />
                    <Label htmlFor="is_noindex">No Index (Robots)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="is_nofollow" name="is_nofollow" defaultChecked={false} />
                    <Label htmlFor="is_nofollow">No Follow</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg flex gap-3 text-amber-800">
              <Info className="w-5 h-5 flex-shrink-0" />
              <div className="text-sm">
                Content below is for the default (global) version. Regional overrides can be managed in the "Country Specific" section.
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Introduction & Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="intro_text">Page Intro (Short)</Label>
                  <Textarea id="intro_text" name="intro_text" defaultValue={calculator.intro_text} className="h-20" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="methodology">How It Works / Methodology</Label>
                  <Textarea id="methodology" name="methodology" defaultValue={calculator.methodology} className="h-40" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Methodology Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="formula_text">The Formula (Display Only)</Label>
                  <Input id="formula_text" name="formula_text" defaultValue={calculator.formula_text} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="example_calculation">Example Calculation</Label>
                  <Textarea id="example_calculation" name="example_calculation" defaultValue={calculator.example_calculation} className="h-32" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Technical Parameters</CardTitle>
                <CardDescription>JSON configuration for calculator-specific logic.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="config_json">Configuration (JSON)</Label>
                  <Textarea 
                    id="config_json" 
                    name="config_json" 
                    defaultValue={JSON.stringify(calculator.config || {}, null, 2)} 
                    className="h-64 font-mono text-xs" 
                  />
                  <p className="text-xs text-slate-400">Used for defaults like loss factors, constants, and feature flags.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </form>
      </Tabs>
    </div>
  );
}
