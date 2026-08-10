import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { getFeaturedCalculators, getRelatedCalculators, getCalculatorById } from "@/calculators/helpers";
import { getCategoryBySlug } from "@/calculators/categories";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

interface RelatedCalculatorsProps {
  currentId?: string | undefined;
}

export function RelatedCalculators({ currentId }: RelatedCalculatorsProps) {
  const calculators = currentId 
    ? getRelatedCalculators(currentId) 
    : getFeaturedCalculators();

  const currentCalc = currentId ? getCalculatorById(currentId) : null;
  const category = currentCalc ? getCategoryBySlug(currentCalc.category) : null;

  if (calculators.length === 0 && !currentId) return null;

  return (
    <section className="mt-24 border-t pt-16">
      {currentCalc && category && (
        <Breadcrumb className="mb-12 flex justify-center">
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
              <BreadcrumbLink asChild><Link to={`/calculators/${category.slug}` as any}>{category.name}</Link></BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{currentCalc.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )}

      <h2 className="text-3xl font-bold text-center mb-12">
        {currentId ? "Related Solar Calculators" : "Popular Solar Calculators"}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {calculators.map((calc) => (
          <Link 
            key={calc.id} 
            to={calc.slug as any}
            className="block"
          >
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">{calc.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{calc.shortDescription}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      
      {category && (
        <div className="mt-12 text-center">
          <Link 
            to={`/calculators/${category.slug}` as any}
            className="inline-flex items-center text-solar font-bold hover:underline"
          >
            View all {category.name} <Icons.ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      )}
    </section>
  );
}

import * as Icons from 'lucide-react';

