import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ShieldCheck, Info, Zap } from 'lucide-react';
import { Link } from '@tanstack/react-router';

interface QuoteCTAProps {
  systemSize?: number;
  monthlyBill?: number;
  countryCode?: string;
}

export const QuoteCTA: React.FC<QuoteCTAProps> = ({ systemSize, monthlyBill, countryCode }) => {
  return (
    <Card className="bg-solar/5 border-solar/20 my-8 overflow-hidden">
      <CardContent className="p-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-solar/10 text-solar text-sm font-medium">
              <Zap className="h-4 w-4" />
              Ready to go solar?
            </div>
            <h3 className="text-2xl font-bold">Get Professional Solar Quotes</h3>
            <p className="text-muted-foreground text-lg">
              Based on your estimate of <strong>{systemSize?.toFixed(1) || '0.0'} kW</strong>, 
              local installers can provide detailed quotes and final system designs.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-green-500" />
                Free & No Obligation
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-green-500" />
                Verified Installers
              </div>
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-blue-500" />
                Expert Site Evaluation
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-solar" />
                Maximize Local Rebates
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-auto">
            <Button asChild size="lg" variant="solar" className="w-full md:w-auto px-8 py-6 text-lg h-auto">
              <Link to="/solar-quote" search={{ 
                size: systemSize, 
                bill: monthlyBill, 
                country: countryCode 
              }}>
                Request Solar Quotes
              </Link>
            </Button>
            <p className="mt-3 text-xs text-center text-muted-foreground">
              Takes less than 60 seconds
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
