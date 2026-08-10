import React from 'react';
import { CalculatorSEOData, FAQItem } from '@/calculators/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { AdSlot } from '@/components/monetization/AdSlot';
import { Calculator, Info, BookOpen, Lightbulb, AlertTriangle, HelpCircle } from 'lucide-react';

interface CalculatorSEOLayoutProps {
  seoData: CalculatorSEOData;
  children: React.ReactNode; // The actual calculator component
}

export const CalculatorSEOLayout: React.FC<CalculatorSEOLayoutProps> = ({ seoData, children }) => {
  return (
    <div className="flex flex-col space-y-12">
      {/* Introduction Section */}
      <section className="max-w-4xl mx-auto text-center px-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl mb-6">
          {seoData.h1}
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          {seoData.intro}
        </p>
      </section>

      {/* Main Calculator Section */}
      <section id="calculator-top" className="scroll-mt-24 space-y-8">
        <AdSlot type="calculator_before" />
        {children}
        <AdSlot type="calculator_after" />
      </section>

      {/* Structured SEO Content */}
      <div className="max-w-4xl mx-auto px-4 space-y-16 py-12 border-t border-border/40">
        
        {/* How It Works */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-solar/10 rounded-lg text-solar">
              <Info className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold">How This Calculator Works</h2>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {seoData.howItWorks}
          </p>
        </section>

        {/* Methodology & Formula */}
        <section className="space-y-6 bg-slate-50 p-8 rounded-2xl border border-border/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
              <BookOpen className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold">Calculation Methodology</h2>
          </div>
          <div className="prose prose-slate max-w-none">
            <p className="text-muted-foreground italic mb-4">Our mathematical model uses the following logic:</p>
            <div className="bg-white p-6 rounded-xl border font-mono text-sm shadow-sm overflow-x-auto whitespace-pre-wrap">
              {seoData.methodology}
            </div>
          </div>
        </section>

        {/* Illustrative Example */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg text-green-600">
              <Lightbulb className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold">Illustrative Example</h2>
          </div>
          <Card className="border-green-100 bg-green-50/30">
            <CardContent className="pt-6">
              <p className="text-muted-foreground leading-relaxed">
                {seoData.example}
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Important Limitations */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold">Factors & Limitations</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            {seoData.limitations}
          </p>
          <div className="text-sm text-slate-500 italic p-4 border-l-4 border-slate-200 bg-slate-50">
            Note: Results are estimates for planning purposes only. Site-specific engineering and financial factors will influence final system performance.
          </div>
        </section>

        {/* FAQ Section */}
        {seoData.faq && seoData.faq.length > 0 && (
          <section className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                <HelpCircle className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {seoData.faq.map((item, index) => (
                <AccordionItem key={index} value={`faq-${index}`}>
                  <AccordionTrigger className="text-left text-lg font-medium hover:text-solar">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        )}
      </div>
    </div>
  );
};
