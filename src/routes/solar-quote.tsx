import { createFileRoute } from '@tanstack/react-router';
import { LeadForm } from '@/components/LeadForm';
import { z } from 'zod';

const quoteSearchSchema = z.object({
  size: z.number().optional(),
  bill: z.number().optional(),
  country: z.string().optional(),
});

export const Route = createFileRoute('/solar-quote')({
  validateSearch: (search) => quoteSearchSchema.parse(search),
  component: SolarQuotePage,
});

function SolarQuotePage() {
  const { size, bill, country } = Route.useSearch();

  return (
    <div className="container py-12 px-4 md:px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Get Your Free Solar Quotes
          </h1>
          <p className="text-xl text-muted-foreground">
            Compare offers from local verified installers and save thousands on your installation.
          </p>
        </div>

        <LeadForm 
          initialData={{
            system_size_kw: size,
            monthly_bill: bill,
            country_code: country || 'US'
          }}
          calculatorSource="direct"
          onSuccess={() => {
            // Redirect or show success view handled by component
          }}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-solar/10 text-solar rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="font-bold">1</span>
            </div>
            <h4 className="font-bold">Submit Request</h4>
            <p className="text-sm text-muted-foreground">Tell us about your property and energy needs.</p>
          </div>
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-solar/10 text-solar rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="font-bold">2</span>
            </div>
            <h4 className="font-bold">Local Matching</h4>
            <p className="text-sm text-muted-foreground">We match you with the best solar experts in your region.</p>
          </div>
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-solar/10 text-solar rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="font-bold">3</span>
            </div>
            <h4 className="font-bold">Compare & Save</h4>
            <p className="text-sm text-muted-foreground">Choose the best offer and start generating clean energy.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
