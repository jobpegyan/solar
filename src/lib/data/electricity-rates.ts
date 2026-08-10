import { countries } from "./countries";
import { regions } from "./regions";

export interface ElectricityRateData {
  countryCode: string;
  regionCode?: string;
  avgRate: number;
  currency: string;
  source: string;
  lastUpdated: string;
}

export const electricityRates: ElectricityRateData[] = [
  // US State Rates (approx averages 2024/2025)
  { countryCode: 'US', regionCode: 'CA', avgRate: 0.28, currency: 'USD', source: 'EIA', lastUpdated: '2025-01-15' },
  { countryCode: 'US', regionCode: 'TX', avgRate: 0.14, currency: 'USD', source: 'EIA', lastUpdated: '2025-01-15' },
  { countryCode: 'US', regionCode: 'FL', avgRate: 0.15, currency: 'USD', source: 'EIA', lastUpdated: '2025-01-15' },
  { countryCode: 'US', regionCode: 'NY', avgRate: 0.22, currency: 'USD', source: 'EIA', lastUpdated: '2025-01-15' },
  
  // India State Rates (approx residential slabs)
  { countryCode: 'IN', regionCode: 'MH', avgRate: 9.5, currency: 'INR', source: 'MERC', lastUpdated: '2025-01-15' },
  { countryCode: 'IN', regionCode: 'GJ', avgRate: 7.2, currency: 'INR', source: 'GERC', lastUpdated: '2025-01-15' },
  { countryCode: 'IN', regionCode: 'KA', avgRate: 8.0, currency: 'INR', source: 'KERC', lastUpdated: '2025-01-15' },
  { countryCode: 'AU', regionCode: 'NSW', avgRate: 0.30, currency: 'AUD', source: 'EnergyMadeEasy', lastUpdated: '2025-01-15' },
  { countryCode: 'AU', regionCode: 'VIC', avgRate: 0.28, currency: 'AUD', source: 'EnergyMadeEasy', lastUpdated: '2025-01-15' },
  { countryCode: 'GB', avgRate: 0.28, currency: 'GBP', source: 'Ofgem', lastUpdated: '2025-01-15' },
  { countryCode: 'ZA', regionCode: 'GT', avgRate: 3.0, currency: 'ZAR', source: 'Eskom', lastUpdated: '2025-01-15' },

];

export const getElectricityRate = (countryCode: string, regionCode?: string): number => {
  if (regionCode) {
    const regional = electricityRates.find(r => r.countryCode === countryCode && r.regionCode === regionCode);
    if (regional) return regional.avgRate;
  }
  const country = countries.find(c => c.code === countryCode);
  return country?.defaultElectricityRate || 0.15;
};
