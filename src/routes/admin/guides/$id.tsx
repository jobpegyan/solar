import React, { useEffect, useState } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useServerFn } from '@tanstack/react-start';
import { getGuideBySlug } from '@/lib/content/guides.functions';
import { createOrUpdateGuide, manageGuideSources, manageGuideFAQs } from '@/lib/admin/guide.functions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Save, 
  ArrowLeft, 
  Eye, 
  Plus, 
  Trash2, 
  Globe, 
  FileText, 
  HelpCircle, 
  Link as LinkIcon 
} from 'lucide-react';
import { toast } from 'sonner';
import { GUIDE_CATEGORIES, Guide, ContentStatus, GuideCategory } from '@/lib/content/types';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';

export const Route = createFileRoute('/admin/guides/$id')({
  component: AdminGuideEditor,
});

function AdminGuideEditor() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const getGuideFn = useServerFn(getGuideBySlug);
  const saveGuideFn = useServerFn(createOrUpdateGuide);
  const saveSourcesFn = useServerFn(manageGuideSources);
  const saveFAQsFn = useServerFn(manageGuideFAQs);

  const [formData, setFormData] = useState<Partial<Guide>>({
    title: '',
    slug: '',
    h1: '',
    metaTitle: '',
    metaDescription: '',
    intro: '',
    content: '',
    category: 'solar-basics',
    status: 'draft',
    featured: false,
    calculatorLinks: [],
    country: '',
  });

  const [faqs, setFaqs] = useState<any[]>([]);
  const [sources, setSources] = useState<any[]>([]);
  const [isNew, setIsNew] = useState(id === 'new');

  const { data: existingGuide, isLoading } = useQuery({
    queryKey: ['admin-guide', id],
    queryFn: async () => {
      if (id === 'new') return null;
      // We need to fetch by ID or slug. The registry use case suggests slug for public, ID for admin.
      // But getGuideBySlug uses slug. Let's try fetching by ID directly via supabase client for admin editor.
      const { data, error } = await supabase.from('guides').select('*, faqs:guide_faqs(*), sources:guide_sources(*)').eq('id', id).single();
      if (error) throw error;
      return data;
    },
    enabled: id !== 'new'
  });

  useEffect(() => {
    if (existingGuide) {
      setFormData(existingGuide);
      setFaqs(existingGuide.faqs || []);
      setSources(existingGuide.sources || []);
    }
  }, [existingGuide]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      const guide = await saveGuideFn({ data: {
        ...formData,
        id: isNew ? undefined : id,
        category: formData.category as string,
        status: formData.status as string,
      } as any });

      if (guide?.id) {
        await Promise.all([
          saveSourcesFn({ data: { guideId: guide.id, sources } }),
          saveFAQsFn({ data: { guideId: guide.id, faqs } })
        ]);
      }
      return guide;
    },
    onSuccess: (data) => {
      toast.success("Guide saved successfully");
      queryClient.invalidateQueries({ queryKey: ['admin-guides'] });
      if (isNew && data?.id) {
        navigate({ to: '/admin/guides/$id', params: { id: data.id } });
      }
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to save guide");
    }
  });

  if (isLoading) return <div className="p-8 text-center">Loading editor...</div>;

  const handleAddFaq = () => {
    setFaqs([...faqs, { question: '', answer: '', display_order: faqs.length }]);
  };

  const handleAddSource = () => {
    setSources([...sources, { name: '', url: '', source_type: 'Research' }]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate({ to: '/admin/guides' })}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">
            {isNew ? 'New Guide' : 'Edit Guide'}
          </h1>
        </div>
        <div className="flex gap-2">
          {!isNew && (
            <Button variant="outline" asChild>
              <a href={`/guides/${formData.slug}`} target="_blank" rel="noopener noreferrer">
                <Eye className="w-4 h-4 mr-2" /> Preview
              </a>
            </Button>
          )}
          <Button onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending}>
            <Save className="w-4 h-4 mr-2" /> Save Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="general" className="gap-2"><Globe className="w-4 h-4" /> General</TabsTrigger>
          <TabsTrigger value="content" className="gap-2"><FileText className="w-4 h-4" /> Content</TabsTrigger>
          <TabsTrigger value="faqs" className="gap-2"><HelpCircle className="w-4 h-4" /> FAQs</TabsTrigger>
          <TabsTrigger value="links" className="gap-2"><LinkIcon className="w-4 h-4" /> Links & Sources</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader><CardTitle>General Settings</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Title</label>
                  <Input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Slug</label>
                  <Input value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <select 
                    className="w-full h-10 px-3 rounded-md border"
                    value={formData.category} 
                    onChange={e => setFormData({...formData, category: e.target.value as GuideCategory})}
                  >
                    {GUIDE_CATEGORIES.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.title}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <select 
                    className="w-full h-10 px-3 rounded-md border"
                    value={formData.status} 
                    onChange={e => setFormData({...formData, status: e.target.value as ContentStatus})}
                  >
                    <option value="draft">Draft</option>
                    <option value="review">Review</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Country (ISO, optional)</label>
                  <Input value={formData.country || ''} onChange={e => setFormData({...formData, country: e.target.value})} placeholder="e.g. US, IN" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content">
          <Card>
            <CardHeader><CardTitle>Guide Content</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">H1 Title (defaults to Title)</label>
                <Input value={formData.h1 || ''} onChange={e => setFormData({...formData, h1: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Introduction</label>
                <Textarea value={formData.intro || ''} onChange={e => setFormData({...formData, intro: e.target.value})} rows={3} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Main Content (HTML)</label>
                <Textarea 
                  className="font-mono text-sm" 
                  value={formData.content} 
                  onChange={e => setFormData({...formData, content: e.target.value})} 
                  rows={20} 
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faqs">
          <Card>
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle>Frequently Asked Questions</CardTitle>
              <Button size="sm" onClick={handleAddFaq}><Plus className="w-4 h-4 mr-2" /> Add FAQ</Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {faqs.map((faq, idx) => (
                <div key={idx} className="p-4 border rounded-lg space-y-4 relative">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-2 right-2 text-destructive"
                    onClick={() => setFaqs(faqs.filter((_, i) => i !== idx))}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Question</label>
                    <Input value={faq.question} onChange={e => {
                      const newFaqs = [...faqs];
                      newFaqs[idx].question = e.target.value;
                      setFaqs(newFaqs);
                    }} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Answer</label>
                    <Textarea value={faq.answer} onChange={e => {
                      const newFaqs = [...faqs];
                      newFaqs[idx].answer = e.target.value;
                      setFaqs(newFaqs);
                    }} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="links">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="flex flex-row justify-between items-center">
                <CardTitle>Sources</CardTitle>
                <Button size="sm" onClick={handleAddSource}><Plus className="w-4 h-4 mr-2" /> Add Source</Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {sources.map((source, idx) => (
                  <div key={idx} className="p-4 border rounded-lg space-y-3 relative">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute top-2 right-2 text-destructive"
                      onClick={() => setSources(sources.filter((_, i) => i !== idx))}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    <div className="space-y-2">
                      <Input placeholder="Source Name" value={source.name} onChange={e => {
                        const newSources = [...sources];
                        newSources[idx].name = e.target.value;
                        setSources(newSources);
                      }} />
                    </div>
                    <div className="space-y-2">
                      <Input placeholder="URL (optional)" value={source.url} onChange={e => {
                        const newSources = [...sources];
                        newSources[idx].url = e.target.value;
                        setSources(newSources);
                      }} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Calculator Links</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground mb-4">Add calculator slugs (one per line) to link them to this guide.</p>
                <Textarea 
                  placeholder="solar-panel-size-calculator" 
                  value={formData.calculatorLinks?.join('\n')} 
                  onChange={e => setFormData({...formData, calculatorLinks: e.target.value.split('\n').filter(Boolean)})}
                  rows={5}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
