import { countries } from "./countries";
import { regions } from "./regions";

export interface SolarResourceData {
  countryCode: string;
  regionCode?: string;
  peakSunHours: number;
  performanceRatio: number;
  source: string;
  lastUpdated: string;
}

export const solarResources: SolarResourceData[] = [
  { countryCode: 'US', regionCode: 'CA', peakSunHours: 5.5, performanceRatio: 0.75, source: 'NREL', lastUpdated: '2025-01-15' },
  { countryCode: 'US', regionCode: 'AZ', peakSunHours: 6.0, performanceRatio: 0.75, source: 'NREL', lastUpdated: '2025-01-15' },
  { countryCode: 'IN', regionCode: 'RJ', peakSunHours: 5.8, performanceRatio: 0.8, source: 'MNRE', lastUpdated: '2025-01-15' },
  { countryCode: 'IN', regionCode: 'GJ', peakSunHours: 5.5, performanceRatio: 0.8, source: 'MNRE', lastUpdated: '2025-01-15' },
  { countryCode: 'AU', regionCode: 'QLD', peakSunHours: 5.8, performanceRatio: 0.8, source: 'BOM', lastUpdated: '2025-01-15' },
  { countryCode: 'AU', regionCode: 'NSW', peakSunHours: 5.2, performanceRatio: 0.8, source: 'BOM', lastUpdated: '2025-01-15' },
  { countryCode: 'GB', peakSunHours: 3.5, performanceRatio: 0.75, source: 'PVGIS', lastUpdated: '2025-01-15' },
  { countryCode: 'ZA', regionCode: 'GT', peakSunHours: 5.5, performanceRatio: 0.8, source: 'SANEDI', lastUpdated: '2025-01-15' },

];

export const getSolarResource = (countryCode: string, regionCode?: string) => {
  if (regionCode) {
    const regional = solarResources.find(r => r.countryCode === countryCode && r.regionCode === regionCode);
    if (regional) return { peakSunHours: regional.peakSunHours, performanceRatio: regional.performanceRatio };
  }
  const country = countries.find(c => c.code === countryCode);
  return {
    peakSunHours: country?.defaultPeakSunHours || 4.5,
    performanceRatio: country?.defaultPerformanceRatio || 0.75
  };
};
