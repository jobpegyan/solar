export type IncentiveType = 'Tax Credit' | 'Rebate' | 'Grant' | 'Feed-in' | 'Other';

export interface SolarIncentive {
  id: string;
  countryCode: string;
  regionCode?: string;
  programName: string;
  programType: IncentiveType;
  description: string;
  amount?: number;
  percentage?: number;
  capacityLimitKW?: number;
  startDate?: string;
  endDate?: string;
  source: string;
  sourceUrl: string;
  lastUpdated: string;
}

export const globalIncentives: SolarIncentive[] = [];

export const getIncentives = (countryCode: string, regionCode?: string): SolarIncentive[] => {
  return [];
};
