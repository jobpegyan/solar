import React from "react";
import { Breadcrumbs } from "./Breadcrumbs";
import { RelatedCalculators } from "@/components/RelatedCalculators";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Clock, BookOpen } from "lucide-react";
import { AdSlot } from "@/components/monetization/AdSlot";

interface ArticleProps {
  title: string;
  introduction: string;
  content: string;
  keyTakeaways: string[];
  lastUpdated: string;
  author?: string;
  category: string;
  faqs?: { question: string; answer: string }[];
  relatedTools?: { label: string; href: string }[];
  sources?: { name: string; url?: string }[];
}

export function ArticleTemplate({
  title,
  introduction,
  content,
  keyTakeaways,
  lastUpdated,
  author = "Solar Panel Calculator Editorial Team",
  category,
  faqs,
  relatedTools,
  sources
}: ArticleProps) {
  return (
    <article className="container mx-auto px-4 py-8 max-w-6xl">
      <Breadcrumbs />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8">
          <Badge variant="outline" className="mb-4 bg-solar/5 text-solar border-solar/20">
            {category}
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground mb-6 leading-tight">
            {title}
          </h1>
          
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-8 border-b pb-8">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              Last Updated: {lastUpdated}
            </div>
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              {author}
            </div>
            <div className="flex items-center gap-1 text-green-600 font-medium">
              <BookOpen className="w-4 h-4" />
              Reviewed for Accuracy
            </div>
          </div>

          <div className="prose prose-slate max-w-none mb-12">
            <p className="text-xl leading-relaxed text-muted-foreground mb-8">
              {introduction}
            </p>
            
            <AdSlot type="guide_after_intro" />
            
            <Card className="bg-slate-50 border-slate-200 mb-8 not-prose">
              <CardContent className="pt-6">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-solar" />
                  Key Takeaways
                </h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {keyTakeaways.map((item, idx) => (
                    <li key={idx} className="flex gap-2 text-sm text-slate-700">
                      <span className="text-solar font-bold">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <div dangerouslySetInnerHTML={{ __html: content }} />

            <AdSlot type="guide_end" />
          </div>

          {faqs && faqs.length > 0 && (
            <section className="mt-16 bg-white rounded-2xl border p-8 shadow-sm">
              <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="border-b pb-6 last:border-0">
                    <h3 className="text-lg font-bold mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                ))}
          {sources && sources.length > 0 && (
            <section className="mt-12 pt-8 border-t">
              <h2 className="text-xl font-bold mb-4">Sources</h2>
              <ul className="space-y-2">
                {sources.map((source, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground">
                    {source.url ? (
                      <a href={source.url} target="_blank" rel="noopener noreferrer" className="hover:text-solar underline">
                        {source.name}
                      </a>
                    ) : (
                      source.name
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
            </section>
          )}
        </div>

        <aside className="lg:col-span-4 space-y-8">
          <div className="sticky top-24">
            {relatedTools && (
              <Card className="mb-8">
                <CardContent className="pt-6">
                  <h3 className="font-bold mb-4 border-b pb-2">Related Calculators</h3>
                  <div className="space-y-2">
                    {relatedTools.map((tool) => (
                      <a 
                        key={tool.href} 
                        href={tool.href}
                        className="block p-3 rounded-lg hover:bg-slate-50 text-sm font-medium transition-colors border border-transparent hover:border-slate-100"
                      >
                        {tool.label}
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
            
            <Card className="bg-slate-900 text-white overflow-hidden">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-4">Calculate Your Savings</h3>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                  Get a professional solar estimate tailored to your location and energy needs.
                </p>
                <a 
                  href="/#calculator" 
                  className="inline-flex w-full items-center justify-center bg-solar text-slate-900 font-bold py-3 rounded-xl hover:bg-solar/90 transition-colors"
                >
                  Start Calculator
                </a>
              </CardContent>
            </Card>
          </div>
        </aside>
      </div>

      <div className="mt-24 border-t pt-16">
        <h2 className="text-2xl font-bold mb-12 text-center">More Solar Resources</h2>
        <RelatedCalculators />
      </div>
    </article>
  );
}
