import React from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Card, CardContent } from "@/components/ui/card";
import { 
  Cookie, 
  ChevronRight, 
  ShieldCheck, 
  Settings, 
  BarChart3, 
  Zap, 
  Info, 
  Lock, 
  Eye, 
  Trash2,
  ExternalLink,
  Globe
} from "lucide-react";

export const Route = createFileRoute('/cookie-policy')({
  head: () => ({
    title: "Cookie Policy | SolarPanelCalculator",
    meta: [
      {
        name: "description",
        content: "Learn how SolarPanelCalculator uses cookies and similar technologies for essential functionality, preferences, analytics, security and advertising."
      },
      {
        property: "og:title",
        content: "Cookie Policy | SolarPanelCalculator"
      },
      {
        property: "og:description",
        content: "Our policy on cookies and browser storage technologies used to provide the solar calculator experience."
      },
      {
        name: "robots",
        content: "index, follow"
      }
    ],
    links: [
      {
        rel: "canonical",
        href: "https://solarpanel-calculator.com/cookie-policy"
      }
    ]
  }),
  component: CookiePolicyPage,
});

function CookiePolicyPage() {
  const lastUpdated = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const sections = [
    { id: "what-are-cookies", title: "What Are Cookies?", icon: Cookie },
    { id: "how-we-use-them", title: "How We Use Cookies", icon: Settings },
    { id: "types", title: "Types of Cookies", icon: Info },
    { id: "essential", title: "Essential Cookies", icon: Lock },
    { id: "functional", title: "Functional Cookies", icon: Zap },
    { id: "analytics", title: "Analytics Cookies", icon: BarChart3 },
    { id: "advertising", title: "Advertising Cookies", icon: Eye },
    { id: "third-party", title: "Third-Party Cookies", icon: Globe },
    { id: "storage", title: "Local Storage & Technologies", icon: Settings },
    { id: "consent", title: "Cookie Consent", icon: ShieldCheck },
    { id: "managing", title: "Managing Cookies", icon: Trash2 },
    { id: "retention", title: "Cookie Retention", icon: Info },
    { id: "changes", title: "Policy Changes", icon: Info },
    { id: "contact", title: "Contact Us", icon: Globe },
  ];

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Cookie Policy
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            Last Updated: {lastUpdated}
          </p>
          <div className="prose prose-slate max-w-none text-lg leading-relaxed text-slate-700">
            <p>
              SolarPanelCalculator uses cookies and similar technologies to operate the website, remember certain preferences, understand website usage and, where applicable, support advertising and security.
            </p>
            <p>
              This Cookie Policy explains what cookies are, how they may be used on SolarPanelCalculator, what types of cookies may be present, and what choices users may have.
            </p>
          </div>
        </header>

        {/* Cookie Summary Callout */}
        <Card className="bg-blue-50 border-blue-200 mb-12 shadow-sm overflow-hidden">
          <CardContent className="p-6 md:p-8">
            <div className="flex items-start gap-4">
              <Cookie className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-blue-900 mb-4">Cookie Summary</h2>
                <p className="text-blue-800 mb-6">
                  Cookies are small files or pieces of information stored on your browser or device. SolarPanelCalculator may use cookies and similar technologies for:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-6">
                  {[
                    "Essential website functionality", "Authentication", "Security",
                    "Preferences", "Analytics", "Performance monitoring",
                    "Advertising (where enabled)"
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-blue-800">
                      <ShieldCheck className="w-4 h-4 opacity-60" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-8 text-blue-900 font-medium">
                  Not every category will necessarily be active for every visitor.
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
              
              <section id="what-are-cookies">
                <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3 mb-6">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-500 text-sm">1</span>
                  What Are Cookies?
                </h2>
                <div className="text-slate-700 leading-relaxed space-y-4">
                  <p>Cookies are small pieces of data stored on your browser or device. They help websites remember settings, maintain sessions, recognize returning browsers, measure usage, and support advertising.</p>
                  <p>Similar technologies used by modern web applications include <strong>Local Storage</strong>, <strong>Session Storage</strong>, and <strong>Service Worker caches</strong>, which help provide faster repeat visits and offline functionality.</p>
                </div>
              </section>

              <section id="how-we-use-them">
                <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3 mb-6">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-500 text-sm">2</span>
                  How SolarPanelCalculator Uses Cookies
                </h2>
                <div className="text-slate-700 leading-relaxed space-y-4">
                  <p>We use these technologies for the following purposes:</p>
                  <ul className="space-y-4 list-none p-0">
                    <li className="flex gap-3">
                      <Lock className="w-5 h-5 text-solar-yellow flex-shrink-0 mt-1" />
                      <div>
                        <strong>Essential & Security:</strong> Used to maintain authentication sessions, protect accounts from unauthorized access, and prevent abuse of our solar calculator services.
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <Zap className="w-5 h-5 text-solar-yellow flex-shrink-0 mt-1" />
                      <div>
                        <strong>Preferences:</strong> Used to remember your location settings, currency, unit preferences (Metric/Imperial), and calculator modes (Simple/Advanced).
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <BarChart3 className="w-5 h-5 text-solar-yellow flex-shrink-0 mt-1" />
                      <div>
                        <strong>Analytics:</strong> Used to understand which calculators are most popular, identify performance bottlenecks, and improve the overall usability of the platform.
                      </div>
                    </li>
                  </ul>
                </div>
              </section>

              <section id="types">
                <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3 mb-6">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-500 text-sm">3</span>
                  Types of Cookies
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse border border-slate-200">
                    <thead>
                      <tr className="bg-slate-50">
                        <th className="p-4 border border-slate-200 font-bold">Category</th>
                        <th className="p-4 border border-slate-200 font-bold">Purpose</th>
                        <th className="p-4 border border-slate-200 font-bold">Optional?</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-4 border border-slate-200 font-bold">Essential</td>
                        <td className="p-4 border border-slate-200">Functionality, security and authentication.</td>
                        <td className="p-4 border border-slate-200">Required</td>
                      </tr>
                      <tr>
                        <td className="p-4 border border-slate-200 font-bold">Functional</td>
                        <td className="p-4 border border-slate-200">Preferences and customized settings.</td>
                        <td className="p-4 border border-slate-200">Optional</td>
                      </tr>
                      <tr>
                        <td className="p-4 border border-slate-200 font-bold">Analytics</td>
                        <td className="p-4 border border-slate-200">Usage measurement and performance tracking.</td>
                        <td className="p-4 border border-slate-200">Optional</td>
                      </tr>
                      <tr>
                        <td className="p-4 border border-slate-200 font-bold">Advertising</td>
                        <td className="p-4 border border-slate-200">Ad delivery and performance measurement.</td>
                        <td className="p-4 border border-slate-200">Consent-based</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section id="essential">
                <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3 mb-6">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-500 text-sm">4</span>
                  Essential Cookies
                </h2>
                <p>These are necessary for session management, authentication, and security. In our application, these primarily support user logins and session integrity via Supabase. Disabling these may prevent the application from functioning correctly.</p>
              </section>

              <section id="functional">
                <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3 mb-6">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-500 text-sm">5</span>
                  Functional Cookies
                </h2>
                <p>Functional technologies remember your preferred <strong>Currency</strong>, <strong>Units</strong>, and <strong>Calculator Mode</strong>. Disabling these means you may have to re-select these preferences on each visit.</p>
              </section>

              <section id="analytics">
                <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3 mb-6">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-500 text-sm">6</span>
                  Analytics Cookies
                </h2>
                <p>SolarPanelCalculator may use analytics services to understand page visits, calculator interactions, and traffic sources. This helps us prioritize feature updates and improve accuracy.</p>
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 mt-4">
                  <h4 className="font-bold mb-2">Google Analytics</h4>
                  <p className="text-sm text-slate-600 mb-4">
                    If enabled, Google Analytics uses cookies to measure how you interact with site content. You can learn more about how Google uses information from sites that use its services:
                  </p>
                  <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-solar-yellow flex items-center gap-2 text-sm hover:underline">
                    <ExternalLink className="w-4 h-4" />
                    How Google uses information from sites or apps that use our services
                  </a>
                </div>
              </section>

              <section id="advertising">
                <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3 mb-6">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-500 text-sm">7</span>
                  Advertising Cookies
                </h2>
                <p>If advertising services such as Google AdSense are enabled, third-party providers may use cookies to serve ads, limit how many times you see the same ad, and measure performance.</p>
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 mt-4">
                  <h4 className="font-bold mb-2">Google AdSense</h4>
                  <p className="text-sm text-slate-600 mb-4">
                    Google and its partners may use cookies for advertising purposes. You can manage your Google Ad settings here:
                  </p>
                  <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer" className="text-solar-yellow flex items-center gap-2 text-sm hover:underline">
                    <Settings className="w-4 h-4" />
                    Google Ads Settings
                  </a>
                </div>
              </section>

              <section id="storage">
                <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3 mb-6">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-500 text-sm">9</span>
                  Local Storage and Similar Technologies
                </h2>
                <div className="space-y-4">
                  <p>As a modern Progressive Web App (PWA), we use browser storage (Local Storage and IndexedDB) to support:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Offline calculator functionality</li>
                    <li>Fast repeat loading of previously calculated results</li>
                    <li>Application installation status</li>
                    <li>Temporary calculation state</li>
                  </ul>
                  <p className="text-amber-800 font-medium bg-amber-50 p-4 rounded-lg">
                    Note: Offline/cached data may become outdated. Always reconnect to verify current utility rates and incentive data.
                  </p>
                </div>
              </section>

              <section id="consent">
                <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3 mb-6">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-500 text-sm">10</span>
                  Cookie Consent
                </h2>
                <p>Depending on your location, we may request consent before using non-essential cookies. Visitors in the EEA, UK, and Switzerland are presented with specific choices regarding analytics and personalized advertising.</p>
              </section>

              <section id="managing">
                <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3 mb-6">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-500 text-sm">11</span>
                  Managing Cookies
                </h2>
                <p>You can manage cookies through your browser settings. Most browsers allow you to block, delete, or restrict cookies. Note that blocking essential cookies will prevent you from using features like "Saved Calculations."</p>
              </section>

              <div className="pt-12 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-slate-900 mb-4">Related Privacy Info</h4>
                  <div className="flex flex-col gap-2">
                    <Link to="/privacy-policy" className="text-solar-yellow hover:underline flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4" /> Privacy Policy
                    </Link>
                    <Link to="/terms" className="text-solar-yellow hover:underline flex items-center gap-2">
                      <ChevronRight className="w-4 h-4" /> Terms of Use
                    </Link>
                    <Link to="/disclaimer" className="text-solar-yellow hover:underline flex items-center gap-2">
                      <ChevronRight className="w-4 h-4" /> Disclaimer
                    </Link>
                  </div>
                </div>
                <div id="contact">
                  <h4 className="font-bold text-slate-900 mb-4">Contact Us</h4>
                  <p className="text-slate-600 text-sm mb-2">Questions about our cookie usage?</p>
                  <Link to="/contact" className="text-solar-yellow hover:underline flex items-center gap-2">
                    <Globe className="w-4 h-4" /> Contact Support
                  </Link>
                  <p className="text-slate-400 text-xs mt-4">Last Updated: {lastUpdated}</p>
                </div>
              </div>

            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
