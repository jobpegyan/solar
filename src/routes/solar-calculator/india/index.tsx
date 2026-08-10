import React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Sun, BarChart3, Wallet, Battery, Radio } from "lucide-react";
import { regions } from "@/lib/data/regions";

export const Route = createFileRoute("/solar-calculator/india/")({
  component: IndiaSolarHub,
  head: () => ({
    title: "India Solar Calculator Hub – Estimate Savings for All States",
    meta: [
      { name: "description", content: "Comprehensive solar calculators for India. Find solar sizing, savings, costs, and payback estimates tailored to Indian states and PM Surya Ghar scheme." },
      { property: "og:title", content: "India Solar Calculator Hub" },
      { property: "og:description", content: "Professional solar analysis tools for homeowners across India." },
    ],
  }),
});

function IndiaSolarHub() {
  const indiaRegions = regions.filter(r => r.countryCode === "IN");
  
  const calculators = [
    { title: "Solar Panel Calculator", icon: <Sun className="w-5 h-5" />, href: "/solar-panel-calculator/india" },
    { title: "Solar Savings Calculator", icon: <Wallet className="w-5 h-5" />, href: "/solar-savings-calculator" },
    { title: "Solar Cost Calculator", icon: <Zap className="w-5 h-5" />, href: "/solar-cost-calculator" },
    { title: "Solar Payback Calculator", icon: <BarChart3 className="w-5 h-5" />, href: "/solar-payback-calculator" },
    { title: "Solar Battery Calculator", icon: <Battery className="w-5 h-5" />, href: "/solar-battery-calculator" },
    { title: "Off-Grid Solar Calculator", icon: <Radio className="w-5 h-5" />, href: "/off-grid-solar-calculator" },
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <Breadcrumbs />
      
      <section className="mb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
          India Solar <span className="text-solar">Calculator Hub</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Navigate the Indian solar landscape with tools optimized for INR (₹), metric units, and local utility tariff structures.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
        {calculators.map((calc) => (
          <Card key={calc.href} className="group hover:border-solar transition-all">
            <CardHeader>
              <div className="w-10 h-10 rounded-lg bg-solar/10 flex items-center justify-center text-solar mb-4 group-hover:bg-solar group-hover:text-white transition-colors">
                {calc.icon}
              </div>
              <CardTitle>{calc.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full group-hover:bg-solar group-hover:text-white transition-colors">
                <Link to={calc.href as any}>Open Tool</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-8">Solar Analysis by State</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {indiaRegions.map((region) => (
            <Link 
              key={region.code}
              to="/solar-calculator/india/$state"
              params={{ state: region.name.toLowerCase() }}
              className="p-4 border rounded-xl hover:border-solar hover:bg-solar/5 transition-all text-center"
            >
              <span className="font-bold text-slate-900">{region.name}</span>
            </Link>
          ))}
        </div>
      </section>
      
      <section className="prose prose-slate max-w-none bg-slate-50 p-12 rounded-3xl border">
        <div className="max-w-4xl mx-auto">
          <h2>Solar Energy in India: 2026 Overview</h2>
          <p>
            India is rapidly becoming a global solar leader, with the PM-Surya Ghar Muft Bijli Yojana providing significant subsidies for residential rooftops.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 not-prose mt-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h4 className="font-bold mb-2">High Potential States</h4>
              <p className="text-sm text-slate-600">Rajasthan and Gujarat lead the country in solar irradiance, offering maximum generation potential for rooftop systems.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h4 className="font-bold mb-2">Subsidy & Policy</h4>
              <p className="text-sm text-slate-600">Homeowners can avail subsidies for systems up to 3kW, significantly reducing the initial investment cost and improving ROI.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
