// src/components/monetization/AdSenseScript.tsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMonetizationSettings } from '@/lib/monetization/settings.functions';

/**
 * Loads the AdSense script once, globally, when ads are enabled and configured.
 * Rendered inside the app tree (needs QueryClientProvider).
 */
export const AdSenseScript: React.FC = () => {
  const { data: settings } = useQuery({
    queryKey: ['monetization-settings'],
    queryFn: () => getMonetizationSettings(),
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  const publisherId = settings?.adsense_publisher_id;
  const enabled = Boolean(settings?.ads_enabled && publisherId?.startsWith('ca-pub-'));

  React.useEffect(() => {
    if (!enabled || typeof document === 'undefined') return;
    const src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`;
    if (document.querySelector(`script[src="${src}"]`)) return;

    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);
  }, [enabled, publisherId]);

  return null;
};
