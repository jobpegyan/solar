import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WifiOff, Calculator, RefreshCw } from 'lucide-react';

export const Route = createFileRoute('/offline')({
  component: OfflinePage,
  head: () => ({
    title: 'Offline – Solar Panel Calculator',
    meta: [
      { name: 'robots', content: 'noindex' }
    ]
  })
});

function OfflinePage() {
  return (
    <div className="container mx-auto px-4 py-20 flex items-center justify-center min-h-[60vh]">
      <Card className="max-w-md w-full text-center p-8">
        <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-6">
          <WifiOff className="w-8 h-8 text-slate-400" />
        </div>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">You're Offline</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground leading-relaxed">
            You can still use the basic solar calculator if you enter the required assumptions manually.
          </p>
          <div className="flex flex-col gap-3">
            <Button variant="solar" className="w-full" asChild>
              <a href="/">
                <Calculator className="w-4 h-4 mr-2" />
                Open Solar Calculator
              </a>
            </Button>
            <Button variant="outline" className="w-full" onClick={() => window.location.reload()}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry Connection
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
