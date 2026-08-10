import React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { GUIDE_CATEGORIES, Guide } from "@/lib/content/types";
import { getGuides } from "@/lib/content/guides.functions";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export const Route = createFileRoute("/guides/$category")({
  component: GuideCategoryPage,
  head: ({ params }) => {
    const category = GUIDE_CATEGORIES.find(c => c.id === params.category);
    return {
      title: `${category?.title || 'Solar Guides'} – Learn About Solar Energy`,
      meta: [
        { name: "description", content: category?.description || "Expert solar energy guides and planning resources." },
      ],
    };
  },
});

function GuideCategoryPage() {
  const getGuidesFn = useServerFn(getGuides);
  const { category: categoryId } = Route.useParams();
  const category = GUIDE_CATEGORIES.find(c => c.id === categoryId);

  const { data: guides, isLoading } = useQuery({
    queryKey: ['guides', categoryId],
    queryFn: () => getGuidesFn({ data: { category: categoryId, status: 'published' } })
  });

  if (!category) {
    return <div className="container mx-auto py-24 text-center">Category not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <Breadcrumbs />
      
      <section className="mb-12">
        <h1 className="text-4xl font-bold mb-4">{category.title}</h1>
        <p className="text-xl text-muted-foreground">{category.description}</p>
      </section>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <Card key={i} className="animate-pulse h-48 bg-slate-100" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides?.map((guide: Guide) => (
            <Card key={guide.id} className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="group-hover:text-solar transition-colors">
                  {guide.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6 line-clamp-3">
                  {guide.metaDescription || guide.intro}
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/guides/$slug" params={{ slug: guide.slug }}>
                    Read Guide <ChevronRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
          {(!guides || guides.length === 0) && (
            <div className="col-span-full py-12 text-center text-muted-foreground bg-slate-50 rounded-xl">
              Coming soon! We're currently writing expert guides for this category.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
