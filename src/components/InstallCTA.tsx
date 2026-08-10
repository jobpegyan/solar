import React, { useState, useEffect } from 'react';
import { useInstallPrompt } from '@/lib/hooks/use-install-prompt';
import { Button } from '@/components/ui/button';
import { Download, X } from 'lucide-react';

export function InstallCTA() {
  const { isInstallable, showPrompt, dismissPrompt } = useInstallPrompt();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isInstallable) {
      // Show after 10 seconds or meaningful interaction
      const timer = setTimeout(() => setIsVisible(true), 10000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [isInstallable]);

  if (!isInstallable || !isVisible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm">
      <div className="bg-white border rounded-xl shadow-lg p-4 flex items-center gap-4 animate-in slide-in-from-bottom-10 duration-500">
        <div className="w-12 h-12 bg-solar/10 rounded-lg flex items-center justify-center flex-shrink-0">
          <Download className="w-6 h-6 text-solar" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-sm">Install Solar Calculator</h4>
          <p className="text-xs text-muted-foreground truncate">Add to home screen for quick access</p>
        </div>
        <div className="flex flex-col gap-1">
          <Button size="sm" variant="solar" className="h-8 px-3" onClick={showPrompt}>
            Install
          </Button>
          <Button size="icon" variant="ghost" className="h-8 w-8 absolute -top-2 -right-2 bg-white border rounded-full shadow-sm" onClick={() => {
            setIsVisible(false);
            dismissPrompt();
          }}>
            <X className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}
