import { createFileRoute, Link } from '@tanstack/react-router';
import { CALCULATORS, CATEGORIES } from '@/calculators/registry';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getIconComponent } from '@/calculators/helpers';
import { ArrowRight, Sun } from 'lucide-react';

export const Route = createFileRoute('/calculators/in')({
  component: IndiaCalculatorsPage,
  head: () => ({
    title: 'Solar Calculators for India – Free Tools & Estimates',
    meta: [
      { name: 'description', content: 'Comprehensive suite of solar calculators localized for India. Estimate system size, panels, cost, savings and ROI with Indian tariffs and subsidies.' },
    ],
  }),
});

function IndiaCalculatorsPage() {
  const indiaCalculators = CALCULATORS.filter(calc => calc.countries.includes('IN') || calc.countries.includes('GLOBAL'));
  
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-orange-100 rounded-lg">
          <Sun className="w-8 h-8 text-orange-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Solar Calculators India</h1>
          <p className="text-muted-foreground">Localized solar analysis tools for the Indian market.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {indiaCalculators.map((calc) => {
          const Icon = getIconComponent(calc.icon);
          const category = CATEGORIES.find(c => c.id === calc.category);
          
          return (
            <Card key={calc.id} className="group hover:border-solar transition-all duration-300 hover:shadow-md flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-solar/10 transition-colors">
                    <Icon className="w-5 h-5 text-slate-600 group-hover:text-solar" />
                  </div>
                  {category && (
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                      {category.name}
                    </span>
                  )}
                </div>
                <CardTitle className="group-hover:text-solar transition-colors">{calc.name}</CardTitle>
                <CardDescription className="line-clamp-2">{calc.shortDescription}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <Link 
                  to={calc.slug as any} 
                  className="inline-flex items-center text-sm font-semibold text-solar hover:underline gap-1"
                >
                  Open Calculator <ArrowRight className="w-4 h-4" />
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      <div className="mt-16 p-8 bg-slate-50 rounded-3xl border">
        <h2 className="text-2xl font-bold mb-4">India Solar Localization</h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          Our India-specific calculators are designed to handle the unique requirements of the Indian solar ecosystem, including support for all states and union territories, Indian Rupee (INR) currency, and localized terminology like "Units" for electricity consumption.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
            <h4 className="font-bold text-sm mb-1">State Tariffs</h4>
            <p className="text-xs text-muted-foreground">Regional electricity rates from Indian DISCOMs.</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
            <h4 className="font-bold text-sm mb-1">Central Subsidies</h4>
            <p className="text-xs text-muted-foreground">Inclusion of PM Surya Ghar Yojana and local rebates.</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
            <h4 className="font-bold text-sm mb-1">PIN Code Sizing</h4>
            <p className="text-xs text-muted-foreground">Location-based solar resource analysis using Indian PIN codes.</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
            <h4 className="font-bold text-sm mb-1">Indian Units</h4>
            <p className="text-xs text-muted-foreground">Support for kWh (Units), kW, and square feet/meters.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
