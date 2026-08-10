import React from 'react';
import { createFileRoute, Link, useParams, notFound } from '@tanstack/react-router';
import { getCategoryBySlug, getCategories } from '@/calculators/categories';
import { getCalculatorsByCategory } from '@/calculators/helpers';
import { CalculatorCard } from '@/components/calculator/CalculatorCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Calculator, ChevronRight, Info, HelpCircle, ArrowRight } from 'lucide-react';

export const Route = createFileRoute('/calculators/$category')({
  component: CategoryPage,
  loader: ({ params }: { params: { category: string } }) => {
    const category = getCategoryBySlug(params.category);
    if (!category) {
      throw notFound();
    }
    return { category };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { category } = loaderData;
    return {
      title: category.seoTitle,
      meta: [
        { name: 'description', content: category.seoDescription },
        { property: 'og:title', content: category.seoTitle },
        { property: 'og:description', content: category.seoDescription },
      ],
      links: [
        { rel: 'canonical', href: `https://solarpanel-calculator.com/calculators/${category.slug}` },
      ],
    };
  },
});

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const calculators = getCalculatorsByCategory(category.slug as any);
  
  const featured = calculators.filter((c: any) => c.featured);
  const others = calculators.filter((c: any) => !c.featured);
  
  const relatedCats = category.relatedCategories
    .map((slug: string) => getCategoryBySlug(slug))
    .filter((c: any): c is any => !!c);

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild><Link to="/calculators">Solar Calculators</Link></BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{category.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <section className="mb-16 max-w-4xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-solar/10 rounded-2xl text-solar">
            <category.icon className="w-8 h-8" />
          </div>
          <Badge variant="outline" className="text-solar border-solar/20 uppercase tracking-tighter">Category</Badge>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-6">
          {category.name}
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          {category.longDescription}
        </p>
      </section>

      {/* Featured Calculator Section */}
      {featured.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <Badge className="bg-solar text-white">Recommended</Badge>
            Featured Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map(calc => (
              <CalculatorCard key={calc.id} calculator={calc} />
            ))}
          </div>
        </section>
      )}

      {/* Full Calculator List */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8">All {category.name}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {others.map(calc => (
            <CalculatorCard key={calc.id} calculator={calc} />
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-24 pt-16 border-t">
        <div className="lg:col-span-2 space-y-16">
          {/* How They Work */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                <Info className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold">Understanding These Calculators</h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {category.helpfulInfo}
            </p>
          </section>

          {/* FAQ */}
          <section className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                <HelpCircle className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {category.faq.map((item: any, index: number) => (
                <AccordionItem key={index} value={`faq-${index}`}>
                  <AccordionTrigger className="text-left text-lg font-medium">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        </div>

        {/* Sidebar / Related Categories */}
        <div className="space-y-8">
          <div className="p-8 bg-slate-900 text-white rounded-[2rem]">
            <h3 className="text-xl font-bold mb-6">Related Categories</h3>
            <div className="space-y-4">
              {relatedCats.map((cat: any) => (
                <Link 
                  key={cat.slug} 
                  to={`/calculators/${cat.slug}` as any}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <cat.icon className="w-5 h-5 text-solar" />
                    <span className="font-medium">{cat.name.replace(' Solar Calculators', '')}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-solar transition-colors" />
                </Link>
              ))}
              <Link 
                to="/calculators"
                className="flex items-center gap-2 text-solar font-bold mt-8 hover:underline"
              >
                View all calculators <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": category.name,
          "description": category.seoDescription,
          "url": `https://solarpanel-calculator.com/calculators/${category.slug}`,
          "mainEntity": {
            "@type": "ItemList",
            "itemListElement": calculators.map((calc: any, index: number) => ({
              "@type": "ListItem",
              "position": index + 1,
              "url": `https://solarpanel-calculator.com${calc.slug}`,
              "name": calc.name
            }))
          }
        })}
      </script>
    </div>
  );
}
