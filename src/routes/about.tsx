import { createFileRoute, Link } from '@tanstack/react-router';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { AlertCircle, Sun, Zap, DollarSign, BarChart3, Battery, Building2, Globe2, ShieldCheck, HelpCircle } from 'lucide-react';

export const Route = createFileRoute('/about')({
  head: () => ({
    title: 'About SolarPanelCalculator | Free Solar Energy Tools',
    meta: [
      { name: 'description', content: 'Learn about SolarPanelCalculator, our mission to make solar planning easier with free calculators for system sizing, savings, costs, batteries, payback and more.' },
      { property: 'og:title', content: 'About SolarPanelCalculator | Free Solar Energy Tools' },
      { property: 'og:description', content: 'Learn about SolarPanelCalculator, our mission to make solar planning easier with free calculators for system sizing, savings, costs, batteries, payback and more.' },
      { property: 'og:url', content: 'https://solarpanel-calculator.com/about' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'robots', content: 'index, follow' }
    ],
    links: [
      { rel: 'canonical', href: 'https://solarpanel-calculator.com/about' }
    ]
  }),
  component: AboutPage,
});

function AboutPage() {
  const currentYear = new Date().getFullYear();
  const lastUpdated = 'August 2026';

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="bg-muted/30 py-20 border-b">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
            About SolarPanelCalculator
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-2xl mx-auto font-medium">
            Simple, transparent solar planning tools for homes and businesses around the world.
          </p>
          <p className="text-lg text-muted-foreground mb-10 max-w-3xl mx-auto">
            SolarPanelCalculator helps homeowners, businesses and anyone exploring solar energy estimate system size, electricity generation, potential savings, costs, battery requirements and other solar planning scenarios.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="solar" size="xl" asChild>
              <Link to="/">Try the Solar Calculator</Link>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <Link to="/solar-savings-calculator">Explore All Calculators</Link>
            </Button>
          </div>
          <p className="mt-8 text-sm text-muted-foreground">
            Last Updated: {lastUpdated}
          </p>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto space-y-24">
          
          {/* Our Mission */}
          <section id="mission">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                  <Sun className="h-8 w-8 text-solar" />
                  Our Mission
                </h2>
                <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    Solar energy decisions can involve complicated information about electricity usage, solar production, system size, equipment, costs, utility rates and incentives.
                  </p>
                  <p>
                    Our goal is to make the early planning stage easier by providing accessible calculators and educational resources that help people understand the numbers before speaking with installers, utilities or other professionals.
                  </p>
                </div>
              </div>
              <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Easier to understand",
                  "More transparent",
                  "Accessible globally",
                  "Useful for all levels",
                  "Clearly explained assumptions"
                ].map((point, i) => (
                  <div key={i} className="bg-muted/50 p-4 rounded-lg flex items-center gap-3 border border-border/50">
                    <ShieldCheck className="h-5 w-5 text-solar shrink-0" />
                    <span className="font-medium">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* What We Do */}
          <section id="what-we-do">
            <h2 className="text-3xl font-bold mb-10 text-center">What We Do</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: BarChart3, title: "Solar System Sizing", desc: "Estimate solar capacity, panel counts, and estimated generation for your specific needs." },
                { icon: Zap, title: "Solar Savings", desc: "Estimate potential electricity savings, solar coverage, and monthly bill reduction." },
                { icon: DollarSign, title: "Solar Costs", desc: "Explore estimated installation and equipment costs alongside potential incentives." },
                { icon: BarChart3, title: "Solar Payback", desc: "Calculate your estimated payback period and cumulative long-term financial benefits." },
                { icon: Battery, title: "Battery Storage", desc: "Explore battery capacity needs, backup requirements, and solar + storage scenarios." },
                { icon: Building2, title: "Commercial Solar", desc: "Support planning for businesses, warehouses, retail, and other commercial properties." },
              ].map((tool, i) => (
                <Card key={i} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-8">
                    <tool.icon className="h-10 w-10 text-solar mb-4" />
                    <h3 className="text-xl font-bold mb-3">{tool.title}</h3>
                    <p className="text-muted-foreground">{tool.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Global Audience & US/India Focus */}
          <section id="global">
            <div className="bg-muted/30 p-8 md:p-12 rounded-2xl border">
              <div className="flex flex-col md:flex-row gap-12">
                <div className="md:w-1/2">
                  <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                    <Globe2 className="h-8 w-8 text-solar" />
                    Built for the World
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    SolarPanelCalculator is designed for users across the United States, India, Canada, Australia, the United Kingdom, and other international markets.
                  </p>
                  <p className="text-muted-foreground italic text-sm">
                    Note: Data availability for specific utility rates and incentives can vary by location.
                  </p>
                </div>
                <div className="md:w-1/2 border-l md:pl-12">
                  <h3 className="text-2xl font-bold mb-4">Focus on USA & India</h3>
                  <div className="space-y-3 text-muted-foreground">
                    <p>We specifically support regional differences including:</p>
                    <ul className="grid grid-cols-2 gap-2 text-sm">
                      <li className="flex items-center gap-2">✓ Local Utility Rates</li>
                      <li className="flex items-center gap-2">✓ Multiple Currencies</li>
                      <li className="flex items-center gap-2">✓ Imperial & Metric Units</li>
                      <li className="flex items-center gap-2">✓ Solar Resource Data</li>
                      <li className="flex items-center gap-2">✓ Regional Incentives</li>
                      <li className="flex items-center gap-2">✓ Residential/Commercial</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Transparency & How It Works */}
          <section id="transparency">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-6">Transparency Matters</h2>
                <div className="p-6 bg-solar/10 border-l-4 border-solar rounded-r-lg mb-6">
                  <p className="text-lg font-bold text-solar-foreground">
                    Estimate, not guarantee.
                  </p>
                </div>
                <p className="text-muted-foreground mb-4">
                  We don't want users to treat estimates as final guarantees. Calculator results are based on inputs and assumptions that we strive to make clear.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2"><span>•</span> Calculation assumptions shown where relevant</li>
                  <li className="flex gap-2"><span>•</span> Data freshness indicators</li>
                  <li className="flex gap-2"><span>•</span> Transparency on data sources</li>
                  <li className="flex gap-2"><span>•</span> Clear identification of limitations</li>
                </ul>
              </div>
              <div className="bg-muted/50 p-8 rounded-xl border">
                <h2 className="text-2xl font-bold mb-6">How Our Calculators Work</h2>
                <div className="flex flex-col gap-4">
                  {[
                    "User Inputs (Bill/Usage)",
                    "Location & Solar Resource Data",
                    "Core Solar Calculations",
                    "Financial & Utility Assumptions",
                    "Estimated Results"
                  ].map((step, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="h-8 w-8 rounded-full bg-solar text-solar-foreground flex items-center justify-center font-bold text-sm">
                        {i + 1}
                      </div>
                      <span className="font-medium">{step}</span>
                      {i < 4 && <div className="hidden md:block text-muted-foreground text-xs ml-auto">↓</div>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Data, Sources & Not An Installer */}
          <section id="disclaimers">
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="pt-8">
                  <h3 className="text-xl font-bold mb-4">Data and Assumptions</h3>
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    Our data comes from public datasets, government sources, utility information, regional estimates, and third-party providers. However, data can change frequently.
                  </p>
                  <p className="text-sm font-medium text-solar">
                    Users should always verify important information with their local utility or government program before making financial commitments.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-solar/20 bg-solar/5">
                <CardContent className="pt-8">
                  <h3 className="text-xl font-bold mb-4">What We Are — and Isn't</h3>
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    SolarPanelCalculator is an educational planning platform. Unless explicitly stated, we are not:
                  </p>
                  <div className="grid grid-cols-2 gap-y-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground opacity-80">
                    <div>✖ Installer</div>
                    <div>✖ Engineering Firm</div>
                    <div>✖ Tax Adviser</div>
                    <div>✖ Financial Planner</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Why Use & Who For */}
          <section id="benefits">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Use SolarPanelCalculator?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Get professional-grade solar insights without the complexity of spreadsheets or initial sales calls.
              </p>
            </div>
            <div className="grid md:grid-cols-5 gap-4">
              {[
                { t: "Fast", d: "Get estimates in seconds." },
                { t: "Transparent", d: "See the math behind the numbers." },
                { t: "Flexible", d: "Compare different system sizes." },
                { t: "Global", d: "Works for multiple countries." },
                { t: "Free", d: "Core tools require no payment." }
              ].map((b, i) => (
                <div key={i} className="text-center p-4 bg-muted/20 rounded-lg border border-border/50">
                  <div className="font-bold text-lg mb-1">{b.t}</div>
                  <div className="text-xs text-muted-foreground">{b.d}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Users We Serve */}
          <section id="users">
            <h2 className="text-3xl font-bold mb-10 text-center">Who Is SolarPanelCalculator For?</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
              {[
                { title: "Homeowners", desc: "Exploring residential solar options." },
                { title: "Renters / Researchers", desc: "Understanding technology and economics." },
                { title: "Businesses", desc: "Exploring commercial solar scenarios." },
                { title: "Students", desc: "Learning how solar calculations work." },
                { title: "Researchers", desc: "Quickly comparing regional scenarios." },
                { title: "Professionals", desc: "Preliminary planning tools." },
              ].map((user, i) => (
                <div key={i} className="p-6 rounded-xl border hover:bg-muted/30 transition-colors">
                  <h3 className="font-bold mb-2">{user.title}</h3>
                  <p className="text-sm text-muted-foreground">{user.desc}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-center text-xs text-muted-foreground max-w-xl mx-auto">
              Professional users should independently verify calculations before using them for engineering, contracting or financial decisions.
            </p>
          </section>

          {/* Quality & Improvement */}
          <section id="quality" className="border-t border-b py-12">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold mb-6">Our Approach to Quality</h2>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">✓ Clear Assumptions</div>
                  <div className="flex items-center gap-2">✓ Consistent Logic</div>
                  <div className="flex items-center gap-2">✓ Useful Location Data</div>
                  <div className="flex items-center gap-2">✓ Mobile-Friendly</div>
                  <div className="flex items-center gap-2">✓ Accessibility</div>
                  <div className="flex items-center gap-2">✓ Performance</div>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-6 text-solar">We Keep Improving</h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Solar technology, utility rates, and energy markets change constantly. We update our assumptions, models, and data sources regularly to reflect these changes.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq">
            <h2 className="text-3xl font-bold mb-10 text-center flex items-center justify-center gap-2">
              <HelpCircle className="h-8 w-8 text-solar" />
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto border rounded-xl overflow-hidden bg-card">
              <AccordionItem value="item-1" className="px-6 border-b-0">
                <AccordionTrigger className="hover:no-underline py-6">Is SolarPanelCalculator free?</AccordionTrigger>
                <AccordionContent className="pb-6 text-muted-foreground">
                  Our core solar planning calculators are free to use. They are designed to provide accessible estimates without requiring a paid consultation.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="px-6 border-b-0 border-t">
                <AccordionTrigger className="hover:no-underline py-6">Can I use the calculator without an account?</AccordionTrigger>
                <AccordionContent className="pb-6 text-muted-foreground">
                  Yes, you can use our primary calculators immediately without creating an account. However, saving your scenarios or generating detailed PDF reports may require a free account.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="px-6 border-b-0 border-t">
                <AccordionTrigger className="hover:no-underline py-6">Does SolarPanelCalculator install solar panels?</AccordionTrigger>
                <AccordionContent className="pb-6 text-muted-foreground">
                  No. SolarPanelCalculator is an online planning and educational tool. We do not provide installation, engineering, or contracting services ourselves.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="px-6 border-b-0 border-t">
                <AccordionTrigger className="hover:no-underline py-6">Are the results guaranteed?</AccordionTrigger>
                <AccordionContent className="pb-6 text-muted-foreground">
                  No. Results are estimates based on various assumptions. Actual system performance and financial outcomes depend on many local factors and should be verified with a professional.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5" className="px-6 border-b-0 border-t">
                <AccordionTrigger className="hover:no-underline py-6">Does it work outside the USA?</AccordionTrigger>
                <AccordionContent className="pb-6 text-muted-foreground">
                  Yes! We have built-in data for multiple countries including India, Canada, and Australia, and support global planning through manual inputs for sun hours and local electricity rates.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6" className="px-6 border-b-0 border-t">
                <AccordionTrigger className="hover:no-underline py-6">Can I use it for commercial projects?</AccordionTrigger>
                <AccordionContent className="pb-6 text-muted-foreground">
                  Yes, we offer a specialized Commercial Solar Calculator for businesses. Note that these results are intended for preliminary planning only.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          {/* Legal Links & Privacy */}
          <section id="privacy-disclaimer" className="bg-muted/20 p-8 rounded-2xl border border-dashed text-center">
            <h2 className="text-xl font-bold mb-4">Your Privacy & Important Disclaimers</h2>
            <p className="text-muted-foreground text-sm max-w-2xl mx-auto mb-6">
              SolarPanelCalculator provides estimates for informational purposes only. We take your privacy seriously and handle data according to our policies.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm font-semibold">
              <Link to="/privacy-policy" className="text-solar hover:underline">Privacy Policy</Link>
              <Link to="/cookie-policy" className="text-solar hover:underline">Cookie Policy</Link>
              <Link to="/disclaimer" className="text-solar hover:underline">Full Disclaimer</Link>
              <Link to="/terms" className="text-solar hover:underline">Terms of Use</Link>
            </div>
          </section>

          {/* Final CTA */}
          <section className="text-center pb-12">
            <div className="bg-foreground text-background p-12 rounded-3xl">
              <h2 className="text-3xl font-bold mb-6">Ready to see your solar potential?</h2>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="solar" size="xl" asChild>
                  <Link to="/">Start Now</Link>
                </Button>
                <Button variant="outline" size="xl" className="bg-transparent border-white hover:bg-white hover:text-foreground" asChild>
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
