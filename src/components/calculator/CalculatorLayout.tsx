import React, { ReactNode } from 'react';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Disclaimer } from '@/components/Disclaimer';
import { RelatedCalculators } from '@/components/RelatedCalculators';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface CalculatorLayoutProps {
  title: string;
  description: string;
  heroContent?: ReactNode | undefined;
  calculator: ReactNode;
  results?: ReactNode | undefined;
  howItWorks?: ReactNode | undefined;
  faq?: { question: string; answer: string }[] | undefined;
  relatedCalculators?: string[] | undefined;
  currentId?: string;
  calculatorSpecificContent?: ReactNode | undefined;
}

export function CalculatorLayout({
  title,
  description,
  heroContent,
  calculator,
  results,
  howItWorks,
  faq,
  relatedCalculators,
  currentId,
  calculatorSpecificContent
}: CalculatorLayoutProps) {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <Breadcrumbs />
      
      {/* Header */}
      <section className="mb-12 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
          {title}
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          {description}
        </p>
        {heroContent}
      </section>

      {/* Main Calculator Experience */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
        <div className="lg:col-span-5 space-y-8">
          {calculator}
        </div>

        <div className="lg:col-span-7 space-y-8">
          {results}
        </div>
      </div>

      {/* Structured SEO Content Area */}
      {calculatorSpecificContent && (
        <section className="prose prose-slate max-w-none mb-20 bg-slate-50 p-8 md:p-12 rounded-3xl border">
          {calculatorSpecificContent}
        </section>
      )}

      {/* How It Works Section */}
      {howItWorks && (
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8">How It Works</h2>
          {howItWorks}
        </section>
      )}

      {/* FAQ Section */}
      {faq && faq.length > 0 && (
        <section className="mb-20 max-w-3xl">
          <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faq.map((item, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`}>
                <AccordionTrigger className="text-left font-semibold">{item.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      )}

      {/* Footer Elements */}
      <div className="space-y-12">
        <RelatedCalculators currentId={currentId} />
        <Disclaimer context={title} />
      </div>

    </div>
  );
}
