import React from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const Route = createFileRoute('/privacy-policy')({
  head: () => ({
    title: 'Privacy Policy | SolarPanelCalculator',
    meta: [
      {
        name: 'description',
        content: 'Read the SolarPanelCalculator Privacy Policy to learn how we collect, use, protect and manage information, cookies, analytics, advertising and user data.',
      },
      {
        name: 'robots',
        content: 'index, follow',
      },
      {
        property: 'og:title',
        content: 'Privacy Policy | SolarPanelCalculator',
      },
      {
        property: 'og:description',
        content: 'Read the SolarPanelCalculator Privacy Policy to learn how we collect, use, protect and manage information, cookies, analytics, advertising and user data.',
      },
      {
        property: 'og:url',
        content: 'https://solarpanel-calculator.com/privacy-policy',
      },
    ],
    links: [
      {
        rel: 'canonical',
        href: 'https://solarpanel-calculator.com/privacy-policy',
      },
    ],
  }),
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
  const lastUpdated = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const sections = [
    { id: 'information-we-collect', title: 'Information We Collect' },
    { id: 'information-you-provide', title: 'Information You Provide' },
    { id: 'calculator-information', title: 'Calculator Information' },
    { id: 'automatically-collected-information', title: 'Automatically Collected Information' },
    { id: 'cookies', title: 'Cookies and Similar Technologies' },
    { id: 'google-analytics', title: 'Google Analytics' },
    { id: 'google-adsense', title: 'Google AdSense and Advertising' },
    { id: 'location-information', title: 'Location Information' },
    { id: 'user-accounts', title: 'User Accounts' },
    { id: 'saved-calculations', title: 'Saved Calculations' },
    { id: 'solar-quotes', title: 'Solar Quote and Lead Forms' },
    { id: 'how-we-use-information', title: 'How We Use Information' },
    { id: 'how-information-shared', title: 'How Information May Be Shared' },
    { id: 'third-party-services', title: 'Third-Party Services' },
    { id: 'data-retention', title: 'Data Retention' },
    { id: 'data-security', title: 'Data Security' },
    { id: 'privacy-choices', title: 'Your Privacy Choices' },
    { id: 'international-users', title: 'International Users' },
    { id: 'childrens-privacy', title: 'Children\'s Privacy' },
    { id: 'external-links', title: 'External Links' },
    { id: 'policy-changes', title: 'Changes to This Privacy Policy' },
    { id: 'contact-us', title: 'Contact Us' },
  ];

  return (
    <div className="bg-background min-h-screen pb-20">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Breadcrumbs />
        
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last Updated: {lastUpdated}</p>
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="text-lg">
              SolarPanelCalculator respects your privacy and is committed to being transparent about how information may be collected, used, stored and shared when you use our website, calculators and related services.
            </p>
            <p>
              This Privacy Policy explains what information we may collect, why we use it, how third-party services may process information, how cookies and similar technologies are used, and what choices may be available to you.
            </p>
          </div>
        </header>

        {/* Quick Summary Section */}
        <section className="bg-muted/50 rounded-2xl p-6 md:p-8 mb-12 border border-border">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-solar flex items-center justify-center text-white text-sm">!</span>
            Privacy at a Glance
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base">
            <li className="flex gap-2">
              <span className="text-solar font-bold">•</span>
              <span>You can use the basic solar calculators without creating an account.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-solar font-bold">•</span>
              <span>Some features, such as saving estimates, may require an account.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-solar font-bold">•</span>
              <span>Calculator inputs are processed to generate estimates and may be stored if you save them.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-solar font-bold">•</span>
              <span>Account information is used to provide account-related functionality and security.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-solar font-bold">•</span>
              <span>Analytics help us understand website usage and improve the service.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-solar font-bold">•</span>
              <span>Advertising services like Google AdSense may use cookies when enabled to support the site.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-solar font-bold">•</span>
              <span>Quote/lead forms collect information only when you voluntarily submit them.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-solar font-bold">•</span>
              <span>We do not need your exact home address for basic estimates; ZIP/postal codes are used for local solar data.</span>
            </li>
          </ul>
          <p className="mt-6 text-xs text-muted-foreground italic">
            * Users should avoid entering sensitive personal information (like passwords for other sites or private ID numbers) into calculator notes or custom fields.
          </p>
        </section>

        {/* Table of Contents */}
        <nav className="mb-16 p-6 bg-card border rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Table of Contents</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 text-sm">
            {sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className="text-primary hover:text-solar transition-colors">
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-16">
          <section id="information-we-collect">
            <h2 className="text-3xl font-bold mb-6">Information We Collect</h2>
            <p>
              The information we collect depends on how you use SolarPanelCalculator. We collect information through three main channels: information you provide directly, information related to calculator usage, and information collected automatically through technical systems.
            </p>
          </section>

          <section id="information-you-provide">
            <h3 className="text-2xl font-bold mb-4">Information You Provide</h3>
            <p>We may collect information you provide directly to us when you create an account, submit a form, or communicate with us. This may include:</p>
            <ul>
              <li><strong>Account Details:</strong> Name, email address, and authentication information.</li>
              <li><strong>Contact Information:</strong> Phone number and location details (Country, State, City, ZIP/Postal code).</li>
              <li><strong>Saved Data:</strong> Names for your saved calculations and preferences.</li>
              <li><strong>Communications:</strong> Any information provided through contact forms or quote requests.</li>
            </ul>
          </section>

          <section id="calculator-information">
            <h3 className="text-2xl font-bold mb-4">Calculator Information</h3>
            <p>
              When you use our solar analysis tools, you may enter data to generate estimates. This information is processed to provide you with insights into system sizing, financial savings, and environmental impact.
            </p>
            <p>Inputs may include:</p>
            <ul>
              <li>Electricity usage (kWh) and monthly bill amounts.</li>
              <li>Local electricity rates and utility providers.</li>
              <li>Physical attributes like roof area, orientation, tilt, and shading factors.</li>
              <li>Equipment preferences such as panel wattage, battery capacity, and inverter types.</li>
              <li>Commercial property details for business-scale analysis.</li>
            </ul>
            <p>
              <strong>Important:</strong> Basic calculator inputs are processed locally or in memory to provide immediate results. Inputs are only stored permanently if you choose to "Save" the calculation to your account.
            </p>
          </section>

          <section id="automatically-collected-information">
            <h3 className="text-2xl font-bold mb-4">Automatically Collected Information</h3>
            <p>
              Depending on enabled services and your browser configuration, we may automatically receive technical information when you visit. This helps us ensure the security and performance of the site.
            </p>
            <ul>
              <li><strong>Technical Data:</strong> IP address, browser type, device type, and operating system.</li>
              <li><strong>Usage Data:</strong> Pages visited, referring URLs, date/time stamps, and interaction patterns.</li>
              <li><strong>Diagnostic Data:</strong> Error logs and performance metrics to help us fix bugs.</li>
            </ul>
            <p>This data is used for security, fraud prevention, analytics, and advertising measurement.</p>
          </section>

          <section id="cookies">
            <h2 className="text-3xl font-bold mb-6">Cookies and Similar Technologies</h2>
            <p>
              SolarPanelCalculator uses cookies, local storage, and similar technologies to improve your experience. Cookies are small data files stored on your device.
            </p>
            <Accordion type="single" collapsible className="w-full border rounded-lg overflow-hidden">
              <AccordionItem value="necessary" className="px-4">
                <AccordionTrigger>Strictly Necessary Cookies</AccordionTrigger>
                <AccordionContent>
                  These are required for the website to function. They handle security, user authentication, and basic session management. The site cannot function properly without these.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="functional" className="px-4">
                <AccordionTrigger>Functional Cookies</AccordionTrigger>
                <AccordionContent>
                  These allow us to remember your preferences, such as your selected country, currency, unit system (metric/imperial), and calculator settings, so you don't have to re-enter them.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="analytics" className="px-4">
                <AccordionTrigger>Analytics Cookies</AccordionTrigger>
                <AccordionContent>
                  These help us understand how visitors interact with the site, which calculators are most popular, and where we might have performance issues.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="advertising" className="px-4">
                <AccordionTrigger>Advertising Cookies</AccordionTrigger>
                <AccordionContent>
                  When advertising is enabled, partners may use cookies to deliver relevant ads, prevent you from seeing the same ad repeatedly, and measure the effectiveness of advertising campaigns.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          <section id="google-analytics">
            <h3 className="text-2xl font-bold mb-4">Google Analytics</h3>
            <p>
              We use Google Analytics to help us understand how visitors use our platform. Google Analytics uses cookies to collect information such as the number of visitors, traffic sources, and the pages they visit. This information is used to improve our website usability and content.
            </p>
            <p>
              You can learn more about how Google uses data when you use our site by visiting: 
              <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="ml-1 text-primary">
                How Google uses information from sites or apps that use our services.
              </a>
            </p>
          </section>

          <section id="google-adsense">
            <h3 className="text-2xl font-bold mb-4">Google AdSense and Advertising</h3>
            <p>
              To support the free operation of our calculators, we may display advertisements via Google AdSense or other third-party networks.
            </p>
            <ul>
              <li>Third-party advertising providers may use cookies, web beacons, and IP addresses to serve and personalize ads.</li>
              <li>Google uses information associated with advertising technologies to deliver relevant ads and prevent fraud.</li>
              <li>Users may manage their Google advertising preferences through the <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer" className="text-primary">Google Ads Settings</a> page.</li>
            </ul>
          </section>

          <section id="location-information">
            <h3 className="text-2xl font-bold mb-4">Location Information</h3>
            <p>We use location information to provide accurate solar data, electricity rates, and currency settings.</p>
            <ul>
              <li><strong>User-Entered Location:</strong> We use ZIP codes, postal codes, cities, or regions that you manually enter into the calculator.</li>
              <li><strong>General IP Location:</strong> We may use your IP address to suggest a default country or region to improve your initial experience.</li>
            </ul>
            <p>We do not track your precise GPS location unless the application explicitly asks for browser geolocation permission and you grant it.</p>
          </section>

          <section id="user-accounts">
            <h3 className="text-2xl font-bold mb-4">User Accounts</h3>
            <p>
              If you create an account, we store your profile information (name, email) and preferences. This allows you to sync your data across devices and access protected features. We use industry-standard security measures to protect your account, and we never store your password in a readable format.
            </p>
          </section>

          <section id="saved-calculations">
            <h3 className="text-2xl font-bold mb-4">Saved Calculations</h3>
            <p>
              Logged-in users can save calculations to their dashboard. This includes the calculator type, all inputs, calculated results, and timestamp. You can manage or delete these saved calculations at any time through your dashboard.
            </p>
          </section>

          <section id="solar-quotes">
            <h3 className="text-2xl font-bold mb-4">Solar Quote and Lead Forms</h3>
            <p>
              If you choose to use our "Get a Quote" service, you voluntarily provide contact information (name, email, phone) and project details. 
            </p>
            <p>
              This information is used to respond to your request. With your clear disclosure and consent, it may be shared with verified solar service providers or partners who can provide you with the specific services you requested. We do not sell your personal information to generic marketing lists.
            </p>
          </section>

          <section id="how-we-use-information">
            <h2 className="text-3xl font-bold mb-6">How We Use Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-lg mb-2 text-solar">Provide & Operate</h4>
                <ul className="text-sm list-disc pl-5">
                  <li>Operate solar calculators and generate results</li>
                  <li>Maintain user accounts and saved data</li>
                  <li>Provide localized regional data</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2 text-solar">Improve & Optimize</h4>
                <ul className="text-sm list-disc pl-5">
                  <li>Understand which features are most useful</li>
                  <li>Fix technical bugs and improve performance</li>
                  <li>Develop new solar analysis tools</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2 text-solar">Security & Safety</h4>
                <ul className="text-sm list-disc pl-5">
                  <li>Detect and prevent abuse or fraud</li>
                  <li>Protect user accounts and infrastructure</li>
                  <li>Maintain service integrity</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2 text-solar">Communications</h4>
                <ul className="text-sm list-disc pl-5">
                  <li>Respond to your contact or quote requests</li>
                  <li>Send account-related security notifications</li>
                  <li>Provide updates to your saved estimates</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="how-information-shared">
            <h2 className="text-3xl font-bold mb-6">How Information May Be Shared</h2>
            <p>We share information only in limited circumstances:</p>
            <ul>
              <li><strong>Service Providers:</strong> We use third-party vendors for hosting (like Cloudflare), database services (Supabase), and email delivery. These providers access data only to perform tasks on our behalf.</li>
              <li><strong>Advertising Partners:</strong> Where enabled, advertising networks may receive technical identifiers to serve ads.</li>
              <li><strong>Solar Partners:</strong> Only when you explicitly submit a quote request, your details are shared with the partners necessary to fulfill that request.</li>
              <li><strong>Legal Requirements:</strong> We may disclose information if required by law, such as to comply with a subpoena or protect our legal rights.</li>
            </ul>
          </section>

          <section id="third-party-services">
            <h2 className="text-3xl font-bold mb-6">Third-Party Services</h2>
            <p>Our platform integrates several specialized services to provide functionality:</p>
            <ul>
              <li><strong>Supabase:</strong> Provides our secure database, authentication, and backend infrastructure.</li>
              <li><strong>Google Services:</strong> Used for analytics (Google Analytics) and potentially advertising (AdSense).</li>
              <li><strong>Cloudflare:</strong> Used for content delivery, performance, and security.</li>
            </ul>
          </section>

          <section id="data-retention">
            <h2 className="text-3xl font-bold mb-6">Data Retention</h2>
            <p>
              We retain information for as long as necessary to provide our services, maintain your account, and comply with legal obligations. Anonymous analytics data may be retained for longer periods to understand long-term website trends. You can request deletion of your account and saved calculations at any time.
            </p>
          </section>

          <section id="data-security">
            <h2 className="text-3xl font-bold mb-6">Data Security</h2>
            <p>
              We implement reasonable technical and organizational measures to protect your information, including encryption in transit (SSL/TLS), secure database access controls (RLS), and regular monitoring.
            </p>
            <p className="bg-muted p-4 rounded border-l-4 border-solar text-sm italic">
              Please note that while we take reasonable measures to protect your information, no internet transmission or storage system can be guaranteed to be 100% secure.
            </p>
          </section>

          <section id="privacy-choices">
            <h2 className="text-3xl font-bold mb-6">Your Privacy Choices</h2>
            <ul>
              <li><strong>Account Settings:</strong> You can update your profile and delete saved calculations in your dashboard.</li>
              <li><strong>Cookies:</strong> You can disable or delete cookies through your browser settings.</li>
              <li><strong>Ads:</strong> You can opt-out of personalized advertising through Google's Ads Settings.</li>
              <li><strong>Analytics:</strong> You can use the Google Analytics Opt-out Browser Add-on.</li>
            </ul>
          </section>

          <section id="international-users">
            <h2 className="text-3xl font-bold mb-6">International Users</h2>
            <p>
              SolarPanelCalculator is a global platform. Information may be processed by service providers in countries other than your own, including the United States. We ensure appropriate safeguards are in place for international data transfers.
            </p>
            <p>
              Residents of the EEA, UK, Switzerland, and certain US states (like California) may have specific rights regarding access, deletion, and portability of their personal data.
            </p>
          </section>

          <section id="childrens-privacy">
            <h2 className="text-3xl font-bold mb-6">Children's Privacy</h2>
            <p>
              Our website is not designed for children under the age of 13. We do not knowingly collect personal information from children. If you believe we have inadvertently collected such information, please contact us immediately.
            </p>
          </section>

          <section id="external-links">
            <h2 className="text-3xl font-bold mb-6">External Links</h2>
            <p>
              Our site may link to external websites, such as government incentive pages, utility websites, or affiliate partners. We do not control the privacy practices of these external sites and encourage you to review their policies.
            </p>
          </section>

          <section id="policy-changes">
            <h2 className="text-3xl font-bold mb-6">Changes to This Privacy Policy</h2>
            <p>
              We may update this policy periodically to reflect changes in our site functionality, advertising practices, or legal requirements. When we make changes, we will update the "Last Updated" date at the top and bottom of this page.
            </p>
          </section>

          <section id="contact-us" className="pb-12 border-b">
            <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or our data practices, please use our 
              <Link to="/contact" className="mx-1 text-primary">Contact page</Link> 
              to submit a privacy-related request.
            </p>
          </section>
        </div>

        <footer className="mt-12 text-sm text-muted-foreground flex flex-wrap gap-4">
          <span>Last Updated: {lastUpdated}</span>
          <div className="flex gap-4">
            <Link to="/privacy-policy" className="hover:text-solar underline">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-solar underline">Terms of Use</Link>
            <Link to="/disclaimer" className="hover:text-solar underline">Disclaimer</Link>
            <Link to="/cookie-policy" className="hover:text-solar underline">Cookie Policy</Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
