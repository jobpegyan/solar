// src/lib/monetization/types.ts

export type AdPlacement = {
  id: string;
  name: string;
  enabled: boolean;
  type: 'responsive' | 'fixed' | 'in-feed';
  format?: string;
  slotId?: string;
};

export interface MonetizationSettings {
  id: string;
  ads_enabled: boolean;
  adsense_publisher_id: string | null;
  auto_ads_enabled: boolean;
  calculator_ads_enabled: boolean;
  guide_ads_enabled: boolean;
  category_ads_enabled: boolean;
  homepage_ads_enabled: boolean;
  max_ads_per_page: number;
  ad_placements: Record<string, AdPlacement>;
  affiliate_links_enabled: boolean;
  affiliate_disclosure: string | null;
  updated_at: string;
}

export type AdSlotType = 
  | 'homepage_top'
  | 'homepage_content'
  | 'calculator_before'
  | 'calculator_after'
  | 'calculator_sidebar'
  | 'guide_content'
  | 'guide_after_intro'
  | 'guide_end'
  | 'category_content';
