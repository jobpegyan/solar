import React from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';

export const Route = createFileRoute('/terms')({
  head: () => ({
    title: 'Terms of Use | SolarPanelCalculator',
    meta: [
      {
        name: 'description',
        content: 'Read the SolarPanelCalculator Terms of Use covering website access, solar calculators, estimates, user accounts, content, third-party services, limitations and responsibilities.',
      },
      {
        name: 'robots',
        content: 'index, follow',
      },
      {
        property: 'og:title',
        content: 'Terms of Use | SolarPanelCalculator',
      },
      {
        property: 'og:description',
        content: 'Read the SolarPanelCalculator Terms of Use covering website access, solar calculators, estimates, user accounts, content, third-party services, limitations and responsibilities.',
      },
      {
        property: 'og:url',
        content: 'https://solarpanel-calculator.com/terms',
      },
    ],
    links: [
      {
        rel: 'canonical',
        href: 'https://solarpanel-calculator.com/terms',
      },
    ],
  }),
  component: TermsOfUse,
});

function TermsOfUse() {
  const lastUpdated = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const sections = [
    { id: 'acceptance', title: '1. Acceptance of These Terms' },
    { id: 'about', title: '2. About the Website' },
    { id: 'eligibility', title: '3. Eligibility' },
    { id: 'calculators', title: '4. Use of Solar Calculators' },
    { id: 'estimates', title: '5. Estimates and Assumptions' },
    { id: 'professional-advice', title: '6. No Professional Advice' },
    { id: 'utility-rates', title: '7. Utility Rates and Energy Data' },
    { id: 'incentives', title: '8. Incentives and Government Programs' },
    { id: 'commercial', title: '9. Commercial Solar Calculations' },
    { id: 'accounts', title: '10. User Accounts' },
    { id: 'saved-data', title: '11. Saved Calculations' },
    { id: 'sharing', title: '12. Shared Estimates' },
    { id: 'quotes', title: '13. Solar Quote Requests' },
    { id: 'responsibilities', title: '14. User Responsibilities' },
    { id: 'prohibited', title: '15. Prohibited Uses' },
    { id: 'ip', title: '16. Intellectual Property' },
    { id: 'third-party', title: '17. Third-Party Services and Links' },
    { id: 'advertising', title: '18. Advertising' },
    { id: 'availability', title: '19. Availability and Changes' },
    { id: 'disclaimers', title: '20. Disclaimers' },
    { id: 'liability', title: '21. Limitation of Liability' },
    { id: 'indemnity', title: '22. Indemnification' },
    { id: 'privacy', title: '23. Privacy' },
    { id: 'termination', title: '24. Termination' },
    { id: 'law', title: '25. Governing Law' },
    { id: 'changes', title: '26. Changes to These Terms' },
    { id: 'contact', title: '27. Contact Us' },
  ];

  return (
    <div className="bg-background min-h-screen pb-20">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Breadcrumbs />
        
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Terms of Use</h1>
          <p className="text-muted-foreground mb-8 text-lg">Last Updated: {lastUpdated}</p>
          <div className="prose prose-slate dark:prose-invert max-w-none border-l-4 border-solar pl-6 py-2 bg-muted/30">
            <p className="text-lg font-medium">
              These Terms of Use govern your access to and use of SolarPanelCalculator and its website, calculators, tools, content and related services.
            </p>
            <p className="mb-0">
              By accessing or using the website, you agree to these Terms of Use. If you do not agree with these terms, please do not use the website.
            </p>
          </div>
        </header>

        {/* Quick Summary Section */}
        <section className="bg-solar/5 rounded-2xl p-6 md:p-8 mb-12 border border-solar/20 shadow-sm">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-solar flex items-center justify-center text-white text-sm italic font-serif">i</span>
            Quick Summary
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base">
            <li className="flex gap-2">
              <span className="text-solar font-bold">•</span>
              <span>SolarPanelCalculator provides informational and planning tools.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-solar font-bold">•</span>
              <span>Calculator results are estimates intended for educational purposes, not guarantees.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-solar font-bold">•</span>
              <span>Users are responsible for verifying important information with professionals before making decisions.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-solar font-bold">•</span>
              <span>We are not solar installers, engineers, tax advisers, or financial advisers.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-solar font-bold">•</span>
              <span>Electricity rates, incentives, and solar production data are subject to change.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-solar font-bold">•</span>
              <span>Some features, like saving estimates, require a user account.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-solar font-bold">•</span>
              <span>Quote requests involve sharing information with providers only where clearly disclosed.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-solar font-bold">•</span>
              <span>Third-party services linked here have their own terms and policies.</span>
            </li>
          </ul>
        </section>

        {/* Table of Contents */}
        <nav className="mb-16 p-6 bg-card border rounded-xl shadow-sm sticky top-24 z-10 hidden md:block max-h-[70vh] overflow-y-auto scrollbar-thin">
          <h2 className="text-lg font-semibold mb-4">Table of Contents</h2>
          <ul className="grid grid-cols-2 gap-y-2 text-xs lg:text-sm">
            {sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className="text-primary hover:text-solar transition-colors">
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-12">
          <section id="acceptance">
            <h2 className="text-3xl font-bold mb-6">1. Acceptance of These Terms</h2>
            <p>
              By accessing, browsing, or using SolarPanelCalculator ("the Website"), you acknowledge that you have read, understood, and agree to be bound by these Terms of Use and our Privacy Policy. If you do not agree to these terms, please stop using the website immediately.
            </p>
          </section>

          <section id="about">
            <h2 className="text-3xl font-bold mb-6">2. About the Website</h2>
            <p>
              SolarPanelCalculator provides online tools and informational resources related to residential and commercial solar planning. Our suite of tools includes:
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {['Solar sizing', 'Energy production', 'Solar costs', 'Savings estimates', 'Payback analysis', 'Battery storage', 'Inverter requirements', 'Off-grid solutions', 'Hybrid systems', 'Commercial analysis', 'Utility billing', 'ROI planning'].map(item => (
                <span key={item} className="px-3 py-1 bg-muted rounded-full text-xs font-medium">{item}</span>
              ))}
            </div>
            <p>We aim to simplify the complexity of solar planning through data-driven estimates and localized solar resource information.</p>
          </section>

          <section id="eligibility">
            <h2 className="text-3xl font-bold mb-6">3. Eligibility</h2>
            <p>
              You must be legally permitted to use the website under the laws of your jurisdiction. If you create an account, you agree to provide accurate, current, and complete information and maintain the security of your credentials. You are responsible for all activities that occur under your account.
            </p>
          </section>

          <section id="calculators">
            <h2 className="text-3xl font-bold mb-6">4. Use of Solar Calculators</h2>
            <p>
              Our calculators are designed for educational and preliminary planning purposes. They process various inputs (such as electricity usage, location, roof area, and equipment types) to provide estimated outcomes (such as recommended system size, panel counts, generation, and financial benefits).
            </p>
            <p>
              The accuracy of the results is highly dependent on the accuracy of your inputs and the available regional data used by the models.
            </p>
          </section>

          <section id="estimates" className="bg-muted/50 p-6 md:p-8 rounded-xl border-l-8 border-solar">
            <h2 className="text-3xl font-bold mb-6">5. Estimates and Assumptions</h2>
            <p className="font-bold text-lg">Calculator results are estimates and should not be treated as guaranteed outcomes.</p>
            <p>Actual performance and financial results can vary significantly due to factors including, but not limited to:</p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
              <li>Variable weather and solar irradiance</li>
              <li>Site-specific shading (trees, buildings)</li>
              <li>Roof orientation and tilt</li>
              <li>Equipment efficiency and degradation</li>
              <li>Installation quality and maintenance</li>
              <li>Changing utility tariffs and export rates</li>
              <li>Financing terms and interest rates</li>
              <li>Local regulatory and permit requirements</li>
            </ul>
            <p className="mt-4 font-medium italic">Users must obtain site-specific professional advice before making significant installation or financial commitments.</p>
          </section>

          <section id="professional-advice">
            <h2 className="text-3xl font-bold mb-6">6. No Professional Advice</h2>
            <p>
              The information provided by SolarPanelCalculator is for informational purposes only. It does NOT constitute:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Engineering or electrical design advice</li>
              <li>Financial or investment advice</li>
              <li>Tax or legal advice</li>
              <li>Structural or roofing assessments</li>
            </ul>
            <p>Calculator results should never replace a qualified professional assessment from a licensed solar installer, engineer, or financial advisor.</p>
          </section>

          <section id="utility-rates">
            <h2 className="text-3xl font-bold mb-6">7. Utility Rates and Energy Data</h2>
            <p>
              Electricity rates used in calculations may come from public databases, regional estimates, or user-provided values. We do not guarantee that a displayed rate is your current tariff. Utility rates and billing structures are subject to change by your provider. You should verify current rates directly with your utility company.
            </p>
          </section>

          <section id="incentives">
            <h2 className="text-3xl font-bold mb-6">8. Incentives and Government Programs</h2>
            <p>
              We may display information about tax incentives, rebates, and subsidies. However, displaying an incentive does not mean you qualify for it. Eligibility depends on location, property type, income, installation dates, and specific program rules which change frequently.
            </p>
            <p className="font-bold">
              Government and utility programs can expire or be modified without notice. SolarPanelCalculator does not guarantee the availability or value of any incentive.
            </p>
          </section>

          <section id="commercial">
            <h2 className="text-3xl font-bold mb-6">9. Commercial Solar Calculations</h2>
            <p>
              Commercial calculations are preliminary planning estimates. They are not structural assessments, electrical designs, or interconnection studies. Large-scale solar projects require rigorous professional engineering and investment underwriting that exceeds the scope of online calculators.
            </p>
          </section>

          <section id="accounts">
            <h2 className="text-3xl font-bold mb-6">10. User Accounts</h2>
            <p>If you create an account, you are responsible for:</p>
            <ul>
              <li>Keeping your login credentials strictly confidential.</li>
              <li>Not sharing your account with others.</li>
              <li>Reporting any unauthorized activity immediately.</li>
            </ul>
            <p>We reserve the right to suspend or terminate accounts that violate these terms or compromise site security.</p>
          </section>

          <section id="saved-data">
            <h2 className="text-3xl font-bold mb-6">11. Saved Calculations</h2>
            <p>
              Registered users may save calculation scenarios. These results depend on the assumptions used at the time of creation. As models and data sources are updated, older saved calculations may not be directly comparable with new ones.
            </p>
          </section>

          <section id="sharing">
            <h2 className="text-3xl font-bold mb-6">12. Shared Estimates</h2>
            <p>
              If you generate a public sharing link for an estimate, you understand that anyone with the link can view the calculation data. You should not include sensitive personal or confidential business information in fields that appear in a shared report.
            </p>
          </section>

          <section id="quotes">
            <h2 className="text-3xl font-bold mb-6">13. Solar Quote Requests</h2>
            <p>
              Submitting a quote request through our platform does not guarantee a response, a specific price, or project approval. Where you consent, your request is shared with third-party providers who operate under their own terms and privacy policies.
            </p>
          </section>

          <section id="responsibilities">
            <h2 className="text-3xl font-bold mb-6">14. User Responsibilities</h2>
            <p>Users agree to use the Website responsibly and provide accurate information. You must review third-party terms when interacting with partners linked from our site.</p>
          </section>

          <section id="prohibited">
            <h2 className="text-3xl font-bold mb-6">15. Prohibited Uses</h2>
            <p>You must not:</p>
            <ul>
              <li>Attempt unauthorized access to our systems or user accounts.</li>
              <li>Upload malicious code or disrupt website functionality.</li>
              <li>Submit fraudulent information or impersonate others.</li>
              <li>Use the Website for any unlawful purpose.</li>
            </ul>
          </section>

          <section id="ip">
            <h2 className="text-3xl font-bold mb-6">16. Intellectual Property</h2>
            <p>
              The design, logos, original text, and calculator software are owned by or licensed to the website operator. You may use calculator results for your personal or business planning, but you may not scrape or reproduce the software interfaces without permission.
            </p>
          </section>

          <section id="third-party">
            <h2 className="text-3xl font-bold mb-6">17. Third-Party Services and Links</h2>
            <p>
              We link to external websites such as government agencies and solar providers. We do not control or guarantee the accuracy, security, or privacy practices of these external sites.
            </p>
          </section>

          <section id="advertising">
            <h2 className="text-3xl font-bold mb-6">18. Advertising</h2>
            <p>
              We may display advertisements from third-party networks to support our free tools. Displaying an ad does not constitute an individual endorsement of the product or service.
            </p>
          </section>

          <section id="availability">
            <h2 className="text-3xl font-bold mb-6">19. Availability and Changes</h2>
            <p>
              We aim for high availability but do not promise uninterrupted service. We may modify, add, or remove features at any time to improve the platform or reflect changing solar industry data.
            </p>
          </section>

          <section id="disclaimers" className="bg-red-50 dark:bg-red-900/10 p-6 rounded-xl border border-red-200 dark:border-red-900/30">
            <h2 className="text-3xl font-bold mb-6 text-red-800 dark:text-red-400">20. Disclaimers</h2>
            <p className="uppercase font-bold tracking-tight text-sm mb-4">Important Financial & Engineering Disclaimer</p>
            <p>
              SolarPanelCalculator does not provide financial, investment, tax, or engineering advice. Savings, ROI, and payback estimates are informational only. Actual results may differ significantly. A qualified professional must verify your roof structure and electrical system before installation.
            </p>
            <p className="mt-4">
              TO THE EXTENT PERMITTED BY LAW, THIS WEBSITE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.
            </p>
          </section>

          <section id="liability">
            <h2 className="text-3xl font-bold mb-6">21. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, SolarPanelCalculator and its operators are not liable for any losses arising from your reliance on calculator estimates, changes in electricity rates, installation decisions, or website interruptions.
            </p>
          </section>

          <section id="indemnity">
            <h2 className="text-3xl font-bold mb-6">22. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless SolarPanelCalculator from any claims arising from your misuse of the website, violation of these Terms, or infringement of third-party rights.
            </p>
          </section>

          <section id="privacy">
            <h2 className="text-3xl font-bold mb-6">23. Privacy</h2>
            <p>
              Your use of the Website is also subject to our <Link to="/privacy-policy" className="text-primary font-medium hover:underline">Privacy Policy</Link>, which describes how we handle your information.
            </p>
          </section>

          <section id="termination">
            <h2 className="text-3xl font-bold mb-6">24. Termination</h2>
            <p>
              We may suspend access for violations of these terms or security concerns. You may stop using the website at any time.
            </p>
          </section>

          <section id="law">
            <h2 className="text-3xl font-bold mb-6">25. Governing Law</h2>
            <p>
              These Terms are subject to the laws and jurisdiction applicable to the entity operating SolarPanelCalculator, except where applicable law provides otherwise for international users.
            </p>
          </section>

          <section id="changes">
            <h2 className="text-3xl font-bold mb-6">26. Changes to These Terms</h2>
            <p>
              We update these Terms as our platform evolves. Material changes will be reflected by an updated "Last Updated" date.
            </p>
          </section>

          <section id="contact" className="pb-12 border-b">
            <h2 className="text-3xl font-bold mb-6">27. Contact Us</h2>
            <p>
              If you have questions about these Terms, please reach out via our 
              <Link to="/contact" className="mx-1 text-primary font-medium hover:underline">Contact page</Link>.
            </p>
          </section>
        </div>

        <footer className="mt-12 text-sm text-muted-foreground flex flex-wrap gap-x-8 gap-y-4 justify-between items-center bg-muted/50 p-6 rounded-lg">
          <span>Last Updated: {lastUpdated}</span>
          <div className="flex flex-wrap gap-4">
            <Link to="/privacy-policy" className="hover:text-solar transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-solar font-bold transition-colors">Terms of Use</Link>
            <Link to="/disclaimer" className="hover:text-solar transition-colors">Disclaimer</Link>
            <Link to="/cookie-policy" className="hover:text-solar transition-colors">Cookie Policy</Link>
            <Link to="/contact" className="hover:text-solar transition-colors">Contact Us</Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
