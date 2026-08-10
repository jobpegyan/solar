// src/components/monetization/AdSlot.tsx
import React, { useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMonetizationSettings } from '@/lib/monetization/settings.functions';
import { AdSlotType } from '@/lib/monetization/types';
import { cn } from '@/lib/utils';

interface AdSlotProps {
  type: AdSlotType;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * A reusable ad slot component that respects global and placement-specific settings.
 */
export const AdSlot: React.FC<AdSlotProps> = ({ type, className, style }) => {
  const adRef = useRef<HTMLModElement>(null);
  const { data: settings } = useQuery({
    queryKey: ['monetization-settings'],
    queryFn: () => getMonetizationSettings(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const isEnabled = settings?.ads_enabled && 
    ((type.startsWith('calculator_') && settings.calculator_ads_enabled) ||
     (type.startsWith('guide_') && settings.guide_ads_enabled) ||
     (type.startsWith('homepage_') && settings.homepage_ads_enabled) ||
     (type.startsWith('category_') && settings.category_ads_enabled));

  const placement = settings?.ad_placements?.[type];
  const isPlacementEnabled = placement?.enabled ?? true;

  useEffect(() => {
    if (isEnabled && isPlacementEnabled) {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.error('AdSense error:', err);
      }
    }
  }, [isEnabled, isPlacementEnabled]);

  if (!isEnabled || !isPlacementEnabled || !settings?.adsense_publisher_id) {
    return null;
  }

  return (
    <div 
      className={cn(
        "my-8 flex justify-center overflow-hidden min-h-[90px] w-full",
        className
      )}
      style={style}
    >
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%' }}
        data-ad-client={settings.adsense_publisher_id}
        data-ad-slot={placement?.slotId || ''}
        data-ad-format={placement?.format || 'auto'}
        data-full-width-responsive="true"
        ref={adRef}
      />
    </div>
  );
};
