export interface SolarResourceData {
  countryCode: string;
  regionCode?: string;
  cityName?: string;
  latitude?: number;
  longitude?: number;
  peakSunHours: number;
  solarIrradiation?: number; // kWh/m²/day
  monthlyPeakSunHours?: number[]; // [Jan, Feb, ..., Dec]
  source?: string;
  sourceUrl?: string;
  lastUpdated: string;
}

export const globalSolarResource: SolarResourceData[] = [];

export const getSolarResource = (countryCode: string, regionCode?: string): SolarResourceData | null => {
  return null; // Fallback to manual entry
};
