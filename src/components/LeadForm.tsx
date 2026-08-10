import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { trackEvent } from '@/lib/analytics/tracker';

const leadSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Valid phone number is required'),
  country_code: z.string().default('US'),
  postal_code: z.string().min(3, 'Postal code is required'),
  property_type: z.enum(['residential', 'commercial']).default('residential'),
  is_owner: z.boolean().default(true),
  monthly_bill: z.number().optional(),
  system_size_kw: z.number().optional(),
  battery_interest: z.boolean().default(false),
  consent: z.boolean().refine(v => v === true, {
    message: 'You must provide consent',
  }),
});

type LeadFormValues = z.infer<typeof leadSchema>;

interface LeadFormProps {
  initialData?: Partial<LeadFormValues>;
  calculatorSource?: string;
  onSuccess?: () => void;
}

export const LeadForm: React.FC<LeadFormProps> = ({ initialData, calculatorSource, onSuccess }) => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, setValue, watch } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema) as any,
    defaultValues: {
      ...initialData,
      is_owner: true,
      property_type: 'residential',
      consent: false
    }
  });

  const onSubmit = async (data: LeadFormValues) => {
    try {
      const { consent, ...leadData } = data;
      const { error } = await supabase.from('solar_leads').insert({
        ...leadData,
        lead_source: calculatorSource,
      });

      if (error) throw error;

      toast.success('Quote request submitted successfully!');
      trackEvent('lead_submitted', { countryCode: data.country_code, calculatorType: calculatorSource || 'direct' });
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Lead submission error:', error);
      toast.error('Failed to submit request. Please try again.');
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto border-solar/20">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Request Solar Quotes</CardTitle>
        <CardDescription>
          Get connected with verified solar professionals in your area. No obligation.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" {...register('name')} placeholder="John Doe" />
              {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" {...register('email')} placeholder="john@example.com" />
              {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" {...register('phone')} placeholder="+1 (555) 000-0000" />
              {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="postal_code">ZIP / Postal Code</Label>
              <Input id="postal_code" {...register('postal_code')} placeholder="90210" />
              {errors.postal_code && <p className="text-sm text-destructive">{errors.postal_code.message}</p>}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="consent" 
              checked={watch('consent')} 
              onCheckedChange={(checked) => setValue('consent', checked === true)} 
            />
            <Label htmlFor="consent" className="text-sm leading-tight text-muted-foreground">
              I agree to be contacted about solar products and services based on the information I submitted. 
              View our <a href="/privacy-policy" className="text-solar hover:underline">Privacy Policy</a>.
            </Label>
          </div>
          {errors.consent && <p className="text-sm text-destructive">{errors.consent.message}</p>}

          <Button 
            type="submit" 
            variant="solar" 
            className="w-full" 
            disabled={isSubmitting || !watch('consent')}
          >
            {isSubmitting ? 'Submitting...' : 'Request Free Quotes'}
          </Button>
          
          <p className="text-xs text-center text-muted-foreground italic">
            Your information is only used according to your consent. We never sell your personal data.
          </p>
        </form>
      </CardContent>
    </Card>
  );
};
