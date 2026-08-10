import React from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, ChevronRight, Calculator, Sun, Zap, DollarSign, BarChart3, ShieldCheck, Battery, Building2, MapPin, ExternalLink, Info } from "lucide-react";

export const Route = createFileRoute('/disclaimer')({
  head: () => ({
    title: "Solar Calculator Disclaimer | SolarPanelCalculator",
    meta: [
      {
        name: "description",
        content: "Read the SolarPanelCalculator disclaimer about solar estimates, energy production, costs, savings, incentives, payback, ROI, utility rates and third-party information."
      },
      {
        property: "og:title",
        content: "Solar Calculator Disclaimer | SolarPanelCalculator"
      },
      {
        property: "og:description",
        content: "Important information regarding the accuracy and purpose of solar energy estimates provided by SolarPanelCalculator."
      },
      {
        name: "robots",
        content: "index, follow"
      }
    ],
    links: [
      {
        rel: "canonical",
        href: "https://solarpanel-calculator.com/disclaimer"
      }
    ]
  }),
  component: DisclaimerPage,
});

function DisclaimerPage() {
  const lastUpdated = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const sections = [
    { id: "general", title: "General Disclaimer", icon: ShieldCheck },
    { id: "estimates", title: "Calculator Estimates", icon: Calculator },
    { id: "production", title: "Solar Energy Production", icon: Sun },
    { id: "utility", title: "Electricity Usage and Utility Rates", icon: Zap },
    { id: "costs", title: "Solar System Costs", icon: DollarSign },
    { id: "savings", title: "Solar Savings", icon: BarChart3 },
    { id: "payback", title: "Payback and ROI", icon: BarChart3 },
    { id: "incentives", title: "Incentives and Rebates", icon: Info },
    { id: "battery", title: "Battery and Backup Estimates", icon: Battery },
    { id: "commercial", title: "Commercial Solar Estimates", icon: Building2 },
    { id: "location", title: "Location Data", icon: MapPin },
    { id: "third-party", title: "Third-Party Information", icon: ExternalLink },
    { id: "professional", title: "Professional Advice", icon: ShieldCheck },
    { id: "user-info", title: "User-Provided Information", icon: Info },
    { id: "changes", title: "Changes to Information", icon: Info },
    { id: "availability", title: "No Guarantee of Availability", icon: Info },
    { id: "reliance", title: "Limitation of Reliance", icon: ShieldCheck },
    { id: "contact", title: "Contact Us", icon: Info },
  ];

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            SolarPanelCalculator Disclaimer
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            Last Updated: {lastUpdated}
          </p>
          <div className="prose prose-slate max-w-none text-lg leading-relaxed text-slate-700">
            <p>
              SolarPanelCalculator provides online calculators, estimates and educational information designed to help users explore solar energy options and understand potential system sizes, energy production, costs and savings.
            </p>
            <p>
              The information provided through this website is for general informational and planning purposes only. Calculator results are estimates and should not be treated as guarantees or as a substitute for professional advice.
            </p>
          </div>
        </header>

        {/* Important Notice Callout */}
        <Card className="bg-amber-50 border-amber-200 mb-12 shadow-sm overflow-hidden">
          <CardContent className="p-6 md:p-8">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-8 h-8 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-amber-900 mb-4">Important Notice</h2>
                <p className="text-amber-800 mb-6 font-medium">SolarPanelCalculator does not guarantee:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-6">
                  {[
                    "Solar production", "Electricity savings", "System performance",
                    "System cost", "Payback period", "ROI",
                    "Incentive eligibility", "Utility bill reductions", "Battery performance",
                    "Equipment performance", "Project profitability"
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-amber-800">
                      <ChevronRight className="w-4 h-4 opacity-60" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-8 text-amber-900 font-medium">
                  Actual results depend on many factors that can vary by property, location, utility, equipment, weather and individual circumstances.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Table of Contents - Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 p-6 bg-slate-50 rounded-2xl border border-slate-100 hidden lg:block">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6 px-2">Table of Contents</h3>
              <nav className="space-y-1">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:text-solar-yellow hover:bg-white rounded-lg transition-all"
                  >
                    <section.icon className="w-4 h-4 opacity-60" />
                    <span>{section.title}</span>
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            <div className="space-y-16 prose prose-slate max-w-none">
              
              <section id="general">
                <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3 mb-6">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-500 text-sm">1</span>
                  General Disclaimer
                </h2>
                <div className="text-slate-700 leading-relaxed space-y-4">
                  <p>SolarPanelCalculator provides calculators and informational resources to help users explore solar energy possibilities.</p>
                  <p>The information is provided on an informational basis and may contain estimates, assumptions, third-party data or user-provided information.</p>
                  <p>Users should independently verify important information before making financial, installation, purchasing or other significant decisions.</p>
                </div>
              </section>

              <section id="estimates">
                <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3 mb-6">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-500 text-sm">2</span>
                  Calculator Estimates
                </h2>
                <div className="text-slate-700 leading-relaxed space-y-4">
                  <p>Calculators on this platform may estimate:</p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 list-none p-0">
                    {["Solar system size", "Number of panels", "Solar generation", "Roof area", "Battery capacity", "Inverter capacity", "Electricity savings", "Solar system cost", "Payback period", "ROI", "Long-term financial benefit"].map(item => (
                      <li key={item} className="flex items-center gap-2 m-0"><ChevronRight className="w-4 h-4 text-solar-yellow" /> {item}</li>
                    ))}
                  </ul>
                  <p>Results depend on the inputs and assumptions used. Small changes in assumptions can produce significantly different results.</p>
                  
                  <h3 className="text-xl font-bold mt-8 mb-4">Input Data and Accuracy</h3>
                  <p>Results may depend on critical factors such as electricity consumption, bill amounts, solar panel wattage, peak sun hours, performance ratios, and utility billing structures. If users provide inaccurate information, the resulting estimate may also be inaccurate.</p>
                </div>
              </section>

              <section id="production">
                <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3 mb-6">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-500 text-sm">3</span>
                  Solar Energy Production
                </h2>
                <div className="text-slate-700 leading-relaxed space-y-4">
                  <p>Solar generation estimates depend on location-specific solar irradiance, weather patterns, panel orientation, tilt, shading, and system efficiency. Actual solar production may be higher or lower than the calculator estimate.</p>
                  <p><strong>Weather Disclaimer:</strong> Weather conditions vary significantly from year to year. Historical data does not guarantee future production. Environmental factors like cloud cover, storms, dust, and smoke can impact generation.</p>
                </div>
              </section>

              <section id="utility">
                <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3 mb-6">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-500 text-sm">4</span>
                  Electricity Usage and Utility Rates
                </h2>
                <div className="text-slate-700 leading-relaxed space-y-4">
                  <p>Electricity rates change over time. Rates shown may be user-provided, regional estimates, or utility-specific data. Users should verify current rates with their provider before making financial decisions.</p>
                  <p>Actual utility bills depend on energy charges, fixed/demand charges, time-of-use rates, taxes, and net metering rules. Calculator results may not reproduce every component of an actual utility bill.</p>
                  
                  <h3 className="text-xl font-bold mt-8 mb-4">Net Metering and Export Compensation</h3>
                  <p>Estimates for exported electricity value depend on specific utility tariffs and local rules. These arrangements vary significantly between jurisdictions. Calculator estimates are not confirmation of eligibility or compensation.</p>
                </div>
              </section>

              <section id="costs">
                <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3 mb-6">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-500 text-sm">5</span>
                  Solar System Costs
                </h2>
                <div className="text-slate-700 leading-relaxed space-y-4">
                  <p>Installation costs vary based on location, equipment, roof conditions, labor, and site-specific needs. Calculator cost estimates are planning estimates only; they are not quotes or offers from a solar installer.</p>
                </div>
              </section>

              <section id="savings">
                <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3 mb-6">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-500 text-sm">6</span>
                  Solar Savings
                </h2>
                <div className="text-slate-700 leading-relaxed space-y-4">
                  <p>Estimated savings depend on consumption patterns, rates, production, and system degradation. Actual savings may differ from estimates. Savings should not be treated as guaranteed income or bill reductions.</p>
                </div>
              </section>

              <section id="payback">
                <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3 mb-6">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-500 text-sm">7</span>
                  Payback and ROI
                </h2>
                <div className="text-slate-700 leading-relaxed space-y-4">
                  <p>Payback estimates are based on assumptions about initial investment, incentives, and savings. Actual payback periods may be longer than estimated. ROI calculations are illustrative estimates; actual performance depends on many variables including financing and maintenance.</p>
                </div>
              </section>

              <section id="incentives">
                <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3 mb-6">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-500 text-sm">8</span>
                  Solar Incentives, Rebates and Tax Programs
                </h2>
                <div className="text-slate-700 leading-relaxed space-y-4">
                  <p>We may display information about tax credits, rebates, or grants. However, displaying an incentive does not mean you qualify for it. Eligibility depends on location, income, tax status, and program requirements.</p>
                  <p><strong>Incentive Expiration:</strong> Government and utility programs may change or expire without notice. We do not guarantee that any incentive will remain available.</p>
                </div>
              </section>

              <section id="battery">
                <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3 mb-6">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-500 text-sm">9</span>
                  Battery and Backup Estimates
                </h2>
                <div className="text-slate-700 leading-relaxed space-y-4">
                  <p>Battery calculations estimate capacity and backup duration based on manufacturer specs and load assumptions. Actual performance depends on chemistry, discharge depth, load profiles, and temperature. Backup duration can vary significantly depending on actual usage.</p>
                </div>
              </section>

              <section id="commercial">
                <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3 mb-6">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-500 text-sm">10</span>
                  Commercial Solar Estimates
                </h2>
                <div className="text-slate-700 leading-relaxed space-y-4">
                  <p>Commercial calculations are preliminary planning tools. They do not replace engineering studies, electrical designs, structural assessments, or financial underwriting required for large-scale projects.</p>
                </div>
              </section>

              <section id="location">
                <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3 mb-6">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-500 text-sm">11</span>
                  Location and Solar Resource Data
                </h2>
                <div className="text-slate-700 leading-relaxed space-y-4">
                  <p>Location-based calculations use regional or ZIP-code data. Precision varies by location. A localized result does not mean the calculator has analyzed your exact property conditions (shading, orientation, roof structure).</p>
                </div>
              </section>

              <section id="third-party">
                <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3 mb-6">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-500 text-sm">12</span>
                  Third-Party Information
                </h2>
                <div className="text-slate-700 leading-relaxed space-y-4">
                  <p>Some data may come from government sources, utilities, or technology providers. We do not guarantee this information is complete or accurate. External links to third-party sites are accessed at your own discretion.</p>
                </div>
              </section>

              <section id="professional" className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
                <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3 mb-6">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-500 text-sm">13</span>
                  Professional Advice
                </h2>
                <div className="text-slate-700 leading-relaxed space-y-4">
                  <p><strong>SolarPanelCalculator is not a substitute for qualified professional advice.</strong></p>
                  <p>Depending on the project, you may need advice from solar installers, engineers, electricians, financial advisers, or tax professionals. Always seek appropriate professional guidance before making significant decisions.</p>
                </div>
              </section>

              <section id="user-info">
                <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3 mb-6">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-500 text-sm">14</span>
                  User-Provided Information
                </h2>
                <div className="text-slate-700 leading-relaxed space-y-4">
                  <p>Users are responsible for ensuring input accuracy (e.g., usage, bills, roof area). Incorrect or incomplete inputs can produce inaccurate results.</p>
                </div>
              </section>

              <section id="reliance">
                <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3 mb-6">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-500 text-sm">17</span>
                  Limitation of Reliance
                </h2>
                <div className="text-slate-700 leading-relaxed space-y-4">
                  <p>Users should not rely solely on SolarPanelCalculator results when making significant financial, installation, or construction decisions. Use the calculators as initial planning and educational tools.</p>
                </div>
              </section>

              {/* Financial Disclaimer Callout */}
              <div className="bg-red-50 border border-red-200 p-8 rounded-2xl">
                <h2 className="text-2xl font-bold text-red-900 mb-4 flex items-center gap-2">
                  <AlertCircle className="w-6 h-6" />
                  Financial Disclaimer
                </h2>
                <div className="text-red-800 space-y-4">
                  <p>SolarPanelCalculator does not provide financial, investment or tax advice. Any financial calculation on the website is an estimate for informational and planning purposes.</p>
                  <p>Users should consult an appropriately qualified professional before making significant financial or tax decisions.</p>
                </div>
              </div>

              {/* Engineering Disclaimer Callout */}
              <div className="bg-slate-900 p-8 rounded-2xl text-white">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Building2 className="w-6 h-6 text-solar-yellow" />
                  Engineering and Installation Disclaimer
                </h2>
                <div className="text-slate-300 space-y-4">
                  <p>Calculator results are not engineering drawings, electrical plans, structural assessments or installation instructions.</p>
                  <p>Final system design should be reviewed by qualified professionals and must comply with applicable electrical codes, building codes, and utility requirements.</p>
                </div>
              </div>

              <section id="adsense">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Advertising and Sponsored Content</h2>
                <div className="text-slate-700 leading-relaxed space-y-4">
                  <p>Advertisements may be provided by third-party advertising networks. Advertising does not constitute a guarantee or endorsement of the advertised product or service by SolarPanelCalculator.</p>
                  <p>We maintain a clear distinction between advertisements and our calculator controls or editorial content.</p>
                </div>
              </section>

              <div className="pt-12 border-t border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">Legal Links</h4>
                  <div className="flex flex-col gap-2">
                    <Link to="/privacy-policy" className="text-solar-yellow hover:underline">Privacy Policy</Link>
                    <Link to="/terms" className="text-solar-yellow hover:underline">Terms of Use</Link>
                  </div>
                </div>
                <div id="contact">
                  <h4 className="font-bold text-slate-900 mb-2">Questions?</h4>
                  <Link to="/contact" className="text-solar-yellow hover:underline">Contact Us</Link>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">Version Control</h4>
                  <p className="text-slate-500 text-sm">Last Updated: {lastUpdated}</p>
                </div>
              </div>

            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
