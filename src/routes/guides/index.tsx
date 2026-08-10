import React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Zap, Wallet, Sun, Battery, Settings } from "lucide-react";

export const Route = createFileRoute("/guides/")({
  component: SolarGuidesHub,
  head: () => ({
    title: "Solar Learning Center – Expert Guides & Sizing Manuals",
    meta: [
      { name: "description", content: "Master solar energy with our comprehensive guides. Learn how to calculate panel size, battery capacity, and understand solar economics." },
    ],
  }),
});

function SolarGuidesHub() {
  const categories = [
    {
      title: "Solar Basics",
      icon: <BookOpen className="w-5 h-5" />,
      guides: [
        { title: "What Is Solar Energy?", href: "/guides/what-is-solar-energy" },
        { title: "How Solar Panels Work", href: "/guides/how-solar-panels-work" },
        { title: "How Much Electricity Does a Solar Panel Produce?", href: "/guides/how-much-electricity-solar-panel-produce" },
      ]
    },
    {
      title: "Solar Planning",
      icon: <Settings className="w-5 h-5" />,
      guides: [
        { title: "How to Calculate Solar Panel Size", href: "/guides/how-to-calculate-solar-panel-size" },
        { title: "How Much Roof Space Do Solar Panels Need?", href: "/guides/how-much-roof-space-solar-panels-need" },
        { title: "How to Calculate Solar Battery Size", href: "/guides/how-to-calculate-solar-battery-size" },
      ]
    },
    {
      title: "Solar Economics",
      icon: <Wallet className="w-5 h-5" />,
      guides: [
        { title: "Solar Panel Cost Guide", href: "/guides/solar-panel-cost" },
        { title: "Solar Payback Period Explained", href: "/guides/solar-payback-period" },
        { title: "Grid vs Solar Comparison", href: "/guides/solar-vs-grid-electricity" },
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <Breadcrumbs />
      
      <section className="mb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
          Solar <span className="text-solar">Learning Center</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Free educational resources to help you plan, size, and finance your transition to renewable energy.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-20">
        {categories.map((cat) => (
          <div key={cat.title}>
            <div className="flex items-center gap-3 mb-6 text-xl font-bold border-b pb-4">
              <div className="w-8 h-8 rounded-lg bg-solar/10 flex items-center justify-center text-solar">
                {cat.icon}
              </div>
              {cat.title}
            </div>
            <ul className="space-y-4">
              {cat.guides.map((guide) => (
                <li key={guide.href}>
                  <Link 
                    to={guide.href as any}
                    className="text-slate-600 hover:text-solar flex items-center gap-2 group transition-colors"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-solar" />
                    {guide.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <Card className="bg-slate-900 text-white p-8 md:p-12 rounded-3xl overflow-hidden relative">
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-3xl font-bold mb-6">Ready to Run the Numbers?</h2>
          <p className="text-slate-400 text-lg mb-8">
            Knowledge is power, but data is better. Use our professional calculators to get a personalized solar report in under 60 seconds.
          </p>
          <div className="flex flex-wrap gap-4">
             <Button asChild variant="solar" size="lg">
              <Link to="/">Main Calculator</Link>
            </Button>
             <Button asChild variant="outline" size="lg" className="bg-transparent border-white/20 hover:bg-white/10 text-white">
              <Link to="/solar-savings-calculator">Estimate Savings</Link>
            </Button>
          </div>
        </div>
        <Sun className="absolute -bottom-10 -right-10 w-64 h-64 text-white/5" />
      </Card>
    </div>
  );
}
