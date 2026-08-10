export type RateType = 'Country' | 'Region' | 'Utility' | 'User';

export interface ElectricityRateData {
  countryCode: string;
  regionCode?: string;
  utilityName?: string;
  consumerType: 'Residential' | 'Commercial';
  rate: number;
  currency: string;
  unit: string;
  rateType: RateType;
  source?: string;
  sourceUrl?: string;
  effectiveDate?: string;
  lastUpdated: string;
}

// Data store for global rates
export const globalElectricityRates: ElectricityRateData[] = [
  // US and India already handled in existing data structures, 
  // but we can normalize them here if needed or just use fallbacks.
];

export const getElectricityRate = (countryCode: string, regionCode?: string): ElectricityRateData | null => {
  // Logic to find best available rate
  return null; // Fallback to manual entry if not found
};
