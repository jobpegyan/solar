import React, { useState, useEffect } from "react";
import { useSolarSettings } from "@/lib/location/location-context";

import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

import { RelatedCalculators } from "@/components/RelatedCalculators";
import { MainCalculator } from "@/components/MainCalculator";
import { ResultsDisplay } from "@/components/ResultsDisplay";
import { Disclaimer } from "@/components/Disclaimer";
import { AdSlot } from "@/components/monetization/AdSlot";
import { HomeCalculatorDirectory } from "@/components/home/HomeCalculatorDirectory";
import { Zap, Sun, ShieldCheck, MapPin, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    title: "Solar Panel Calculator — Free Solar Calculators for Cost, Savings & System Size",
    meta: [
      { name: "description", content: "Use free solar calculators to estimate solar panel requirements, system size, energy production, battery storage, inverter capacity, solar costs, savings and payback." },
      { property: "og:title", content: "Solar Panel Calculator — Free Solar Calculators for Cost, Savings & System Size" },
      { property: "og:description", content: "Use free solar calculators to estimate solar panel requirements, system size, energy production, battery storage, inverter capacity, solar costs, savings and payback." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Solar Panel Calculator — Free Solar Calculators for Cost, Savings & System Size" },
      { name: "twitter:description", content: "Use free solar calculators to estimate solar panel requirements, system size, energy production, battery storage, inverter capacity, solar costs, savings and payback." },
    ],
    links: [
      { rel: "canonical", href: "https://solarpanel-calculator.com/" },
    ],
  }),
});

function Index() {
  const [results, setResults] = useState<any>(null);
  const { country } = useSolarSettings();
  const [isUS, setIsUS] = useState(false);

  useEffect(() => {
    setIsUS(country.code === 'US');
  }, [country]);


  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Hero */}
      <section className="mb-16 text-center">
        <div className="inline-flex items-center justify-center p-2 bg-solar/10 rounded-full mb-6 text-solar font-bold text-sm tracking-widest uppercase px-4 border border-solar/20">
          Professional Solar Analysis Tool
        </div>
        <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl max-w-4xl mx-auto leading-tight">
          Design Your Perfect <span className="text-solar">Solar System</span> in Seconds
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-xl text-muted-foreground">
          Estimate solar system size, panel count, battery storage, inverter capacity, costs,
          savings and payback with free, location-aware solar calculators.
        </p>






        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="solar" size="xl" onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}>
            Start Free Calculation
          </Button>
          <Button variant="outline" size="xl" asChild>
            <Link to="/off-grid-solar-calculator">Explore Off-Grid</Link>
          </Button>
        </div>
        <AdSlot type="homepage_top" />
      </section>

      {isUS && (
        <section className="mb-12 p-6 bg-slate-900 text-white rounded-3xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-solar/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-4 text-solar">Solar Calculators for the United States</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <Link to="/solar-calculator/usa" className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors text-sm font-medium flex items-center gap-2 border border-white/5">
                <Sun className="w-4 h-4 text-solar" /> Solar Panel Calculator
              </Link>
              <Link to="/solar-panel-cost-calculator/usa" className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors text-sm font-medium flex items-center gap-2 border border-white/5">
                <Zap className="w-4 h-4 text-solar" /> Solar Cost
              </Link>
              <Link to="/solar-panel-savings-calculator/usa" className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors text-sm font-medium flex items-center gap-2 border border-white/5">
                <ShieldCheck className="w-4 h-4 text-solar" /> Solar Savings
              </Link>
              <Link to="/solar-payback-period-calculator/usa" className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors text-sm font-medium flex items-center gap-2 border border-white/5">
                <ArrowRight className="w-4 h-4 text-solar" /> Payback Period
              </Link>
            </div>
          </div>
        </section>
      )}

      {country.code === 'IN' && (
        <section className="mb-12 p-6 bg-slate-900 text-white rounded-3xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-solar/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-4 text-orange-400">Solar Calculators for {country.name}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <Link to="/solar-calculator/india" className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors text-sm font-medium flex items-center gap-2 border border-white/5">
                <Sun className="w-4 h-4 text-solar" /> Solar Calculator India
              </Link>
              <Link to="/solar-panel-cost-calculator/india" className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors text-sm font-medium flex items-center gap-2 border border-white/5">
                <Zap className="w-4 h-4 text-solar" /> Cost in India
              </Link>
              <Link to="/solar-panel-savings-calculator/india" className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors text-sm font-medium flex items-center gap-2 border border-white/5">
                <ShieldCheck className="w-4 h-4 text-solar" /> Savings Estimates
              </Link>
              <Link to="/solar-payback-period-calculator/india" className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors text-sm font-medium flex items-center gap-2 border border-white/5">
                <ArrowRight className="w-4 h-4 text-solar" /> Payback India
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Main App Section */}

      <div id="calculator" className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
        <div className="lg:col-span-5">
          <MainCalculator onResultsChange={setResults} />
        </div>
        <div className="lg:col-span-7">
          {results ? (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <ResultsDisplay results={results} />
              

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Button asChild variant="outline" className="w-full">
                  <Link to="/solar-savings-calculator" search={{ systemSize: results.requiredSystemSizeKW.toString() }}>
                    Detailed Savings →
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/solar-cost-calculator" search={{ systemSize: results.requiredSystemSizeKW.toString() }}>
                    Cost Breakdown →
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/solar-payback-calculator" search={{ systemSize: results.requiredSystemSizeKW.toString() }}>
                    ROI Analysis →
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            <Card className="h-full flex items-center justify-center border-dashed bg-slate-50 min-h-[400px]">
              <div className="text-center p-8">
                <Sun className="w-12 h-12 text-slate-300 mx-auto mb-4 animate-pulse" />
                <p className="text-slate-500 font-medium">Complete the form to see your results</p>
              </div>
            </Card>
          )}
        </div>
      </div>
      
      <AdSlot type="homepage_content" />

      <HomeCalculatorDirectory />

      {/* How It Works */}
      <section className="mb-24">
        <h2 className="text-3xl font-bold text-center mb-16">The Science Behind the Math</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="relative p-8 bg-white rounded-2xl border shadow-sm group hover:border-solar transition-colors">
            <div className="w-12 h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center font-bold mb-6 group-hover:bg-solar transition-colors">1</div>
            <h3 className="text-xl font-bold mb-3">Global Solar Resource Data</h3>
            <p className="text-muted-foreground leading-relaxed">
              We utilize region-specific Peak Sun Hours (PSH) data to account for the actual solar irradiance at your latitude.
            </p>
          </div>
          <div className="relative p-8 bg-white rounded-2xl border shadow-sm group hover:border-solar transition-colors">
            <div className="w-12 h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center font-bold mb-6 group-hover:bg-solar transition-colors">2</div>
            <h3 className="text-xl font-bold mb-3">Performance Ratio Analysis</h3>
            <p className="text-muted-foreground leading-relaxed">
              Calculations include a 75-80% Performance Ratio (PR) to account for real-world losses like heat, dust, and cabling.
            </p>
          </div>
          <div className="relative p-8 bg-white rounded-2xl border shadow-sm group hover:border-solar transition-colors">
            <div className="w-12 h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center font-bold mb-6 group-hover:bg-solar transition-colors">3</div>
            <h3 className="text-xl font-bold mb-3">Economic Forecasting</h3>
            <p className="text-muted-foreground leading-relaxed">
              We combine local electricity tariffs with estimated utility price inflation to project 25-year cumulative savings.
            </p>
          </div>
        </div>
      </section>

      {/* Detailed SEO Content */}
      <section className="mt-24 prose prose-slate max-w-none border-t pt-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-slate-900">Why Use a Solar Panel Calculator?</h2>
          <p className="text-lg leading-relaxed text-slate-600 mb-8">
            Transitioning to renewable energy is a complex engineering and financial decision. A precise solar panel calculator bridges the gap between raw utility bills and a professional system design. By analyzing your location's specific solar resource, we help you avoid two common mistakes: undersizing a system that fails to meet your energy needs, or oversizing a system that extends your payback period unnecessarily.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 not-prose mb-12">
            <div className="bg-slate-50 p-6 rounded-xl border">
              <h4 className="font-bold flex items-center gap-2 mb-3">
                <Zap className="w-5 h-5 text-solar" />
                Energy Independence
              </h4>
              <p className="text-sm text-slate-600">
                Understand how many panels are required to offset 100% of your usage, reducing your reliance on aging electrical grids.
              </p>
            </div>
            <div className="bg-slate-50 p-6 rounded-xl border">
              <h4 className="font-bold flex items-center gap-2 mb-3">
                <ShieldCheck className="w-5 h-5 text-green-600" />
                Financial Verification
              </h4>
              <p className="text-sm text-slate-600">
                Verify installer quotes against independent market pricing and performance data to ensure you're getting a fair deal.
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-bold mb-4">Key Factors in Solar Sizing</h3>
          <ul className="space-y-4 text-slate-600 mb-12">
            <li><strong>Latitudinal Variance:</strong> A system in London requires roughly twice as many panels as one in Dubai to generate the same annual energy due to sunlight intensity differences.</li>
            <li><strong>System Losses:</strong> Inverters are approximately 96-98% efficiency, but temperature-related losses on the roof can reduce panel efficiency by 10-20% during peak summer.</li>
            <li><strong>Roof Geometry:</strong> Our roof area estimates provide the minimum clear space needed, but obstructions like vents and skylights often require additional margin.</li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-24 mb-24 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Solar Resource FAQ</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What are "Peak Sun Hours"?</AccordionTrigger>
            <AccordionContent>
              Peak sun hours isn't just time the sun is up; it's the number of hours where solar radiation averages 1,000 watts per square meter. Most locations receive between 3.5 and 6.5 peak sun hours per day.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Should I calculate based on my highest or average bill?</AccordionTrigger>
            <AccordionContent>
              We recommend using your average monthly bill for the most accurate ROI. If you size for your highest summer bill (with peak A/C usage), you may end up with a surplus of energy in the winter that your utility may not credit at full value.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>How much does the average solar system cost in 2026?</AccordionTrigger>
            <AccordionContent>
              Global prices have stabilized. In the US, systems average $2.50-$3.20 per watt before incentives. In India, costs are significantly lower at ₹60,000-₹75,000 per kW due to localized manufacturing and lower labor costs.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <Disclaimer context="global solar resource estimates" />
      <RelatedCalculators currentId="solar-panel-calculator" />
    </div>
  );
}