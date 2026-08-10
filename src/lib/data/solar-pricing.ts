export interface SolarPricingData {
  countryCode: string;
  regionCode?: string;
  costPerWatt: number;
  currency: string;
  lastUpdated: string;
}

export const solarPricing: SolarPricingData[] = [
  { countryCode: 'US', costPerWatt: 3.0, currency: 'USD', lastUpdated: '2025-01-15' },
  { countryCode: 'US', regionCode: 'CA', costPerWatt: 3.2, currency: 'USD', lastUpdated: '2025-01-15' },
  { countryCode: 'IN', costPerWatt: 65, currency: 'INR', lastUpdated: '2025-01-15' },
  { countryCode: 'UK', costPerWatt: 1.5, currency: 'GBP', lastUpdated: '2025-01-15' },
  { countryCode: 'AU', costPerWatt: 1.2, currency: 'AUD', lastUpdated: '2025-01-15' },
  { countryCode: 'DE', costPerWatt: 1.6, currency: 'EUR', lastUpdated: '2025-01-15' },
];

export const getSolarCostPerWatt = (countryCode: string, regionCode?: string): number | null => {
  if (regionCode) {
    const regional = solarPricing.find(p => p.countryCode === countryCode && p.regionCode === regionCode);
    if (regional) return regional.costPerWatt;
  }
  const countryPricing = solarPricing.find(p => p.countryCode === countryCode && !p.regionCode);
  return countryPricing ? countryPricing.costPerWatt : null;
};
