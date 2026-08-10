import React, { useState, useMemo } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { getCategories } from '@/calculators/categories';
import { getActiveCalculators } from '@/calculators/helpers';
import { CalculatorCard } from '@/components/calculator/CalculatorCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Globe, X } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

export const Route = createFileRoute('/calculators/')({
  component: CalculatorDirectory,
  head: () => ({
    title: 'Solar Calculators — Free Solar Energy Tools & Estimators',
    meta: [
      { name: 'description', content: 'Explore our complete library of free solar calculators for system sizing, cost estimation, payback period, battery backup, and ROI analysis.' },
      { name: 'keywords', content: 'solar calculator, solar panel calculator, solar battery calculator, solar cost estimator, solar roi calculator' },
      { property: 'og:title', content: 'Solar Calculators — Free Solar Energy Tools' },
      { property: 'og:description', content: 'Browse 50+ professional solar calculators for residential and commercial projects.' },
    ],
    links: [
      { rel: 'canonical', href: 'https://solarpanel-calculator.com/calculators' },
    ],
  }),
});

function CalculatorDirectory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const categories = getCategories();
  const allCalculators = getActiveCalculators();

  const filteredCalculators = useMemo(() => {
    return allCalculators.filter(calc => {
      const matchesSearch = 
        calc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        calc.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        calc.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory ? calc.category === selectedCategory || (selectedCategory === 'load-micro' && (calc.category === 'load' || calc.category === 'micro')) : true;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, allCalculators]);

  const featuredCalculators = useMemo(() => {
    return allCalculators.filter(c => c.featured).slice(0, 6);
  }, [allCalculators]);

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Solar Calculators</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <section className="mb-16 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-6">
          Solar Calculators
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Estimate your solar potential with our suite of professional-grade tools. We provide precise calculations for system size, panel requirements, energy production, costs, savings, batteries, inverters, and electrical loads.
        </p>
      </section>

      {/* Search and Filters */}
      <section className="mb-12 sticky top-20 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-4 border-b">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input 
              placeholder="Search solar calculators..." 
              className="pl-10 h-12 text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={selectedCategory === null ? "solar" : "outline"}
              onClick={() => setSelectedCategory(null)}
              className="rounded-full"
            >
              All
            </Button>
            {categories.map(cat => (
              <Button 
                key={cat.slug}
                variant={selectedCategory === cat.slug ? "solar" : "outline"}
                onClick={() => setSelectedCategory(cat.slug)}
                className="rounded-full"
              >
                {cat.name.replace(' Solar Calculators', '')}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <div className="space-y-16">
        {!searchQuery && !selectedCategory && (
          <section>
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <Badge variant="outline" className="bg-solar/5 text-solar border-solar/20">Featured</Badge>
              Popular Solar Calculators
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCalculators.map(calc => (
                <CalculatorCard key={calc.id} calculator={calc} />
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="text-2xl font-bold mb-8">
            {searchQuery || selectedCategory ? `Results (${filteredCalculators.length})` : 'All Calculators'}
          </h2>
          {filteredCalculators.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCalculators.map(calc => (
                <CalculatorCard key={calc.id} calculator={calc} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-slate-50 rounded-3xl border border-dashed">
              <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">No calculators found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters to find what you're looking for.</p>
              <Button 
                variant="link" 
                onClick={() => { setSearchQuery(''); setSelectedCategory(null); }}
                className="mt-4"
              >
                Clear all filters
              </Button>
            </div>
          )}
        </section>

        {/* Categories Directory */}
        {!searchQuery && !selectedCategory && (
          <section className="bg-slate-900 text-white p-12 rounded-[2.5rem]">
            <h2 className="text-3xl font-bold mb-12 text-center">Browse by Category</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {categories.map(cat => (
                <Link 
                  key={cat.slug} 
                  to="/calculators/$category" params={{ category: cat.slug }}
                  className="group p-6 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors border border-white/5"
                >
                  <div className="mb-4 p-3 bg-solar/20 rounded-xl w-fit group-hover:bg-solar transition-colors">
                    <cat.icon className="w-6 h-6 text-solar group-hover:text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{cat.name}</h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-4">{cat.description}</p>
                  <div className="flex items-center text-solar font-bold text-sm">
                    View Calculators <Icons.ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Schema Markup */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Solar Calculators Directory",
          "description": "A comprehensive directory of free solar energy calculators.",
          "url": "https://solarpanel-calculator.com/calculators",
          "mainEntity": {
            "@type": "ItemList",
            "itemListElement": filteredCalculators.map((calc, index) => ({
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

import * as Icons from 'lucide-react';
