import { z } from 'zod';

export const IncentiveType = z.enum([
  'Tax Credit',
  'Rebate',
  'Property Tax Incentive',
  'Sales Tax Exemption',
  'Performance Incentive',
  'Other'
]);

export type IncentiveType = z.infer<typeof IncentiveType>;

export interface Incentive {
  id: string;
  programName: string;
  programType: IncentiveType;
  eligibility: string;
  amount?: number;
  percentage?: number;
  startDate?: string;
  endDate?: string;
  source: string;
  sourceUrl: string;
  lastUpdated: string;
  countryCode: string;
  regionCode?: string; // e.g. State code
}

export const incentives: Incentive[] = [
  {
    id: 'federal-itc',
    programName: 'Federal Solar Tax Credit (ITC)',
    programType: 'Tax Credit',
    eligibility: 'Residential and commercial solar systems',
    percentage: 30,
    source: 'Department of Energy',
    sourceUrl: 'https://www.energy.gov/eere/solar/homeowners-guide-federal-tax-credit-solar-photovoltaics',
    lastUpdated: '2024-01-01',
    countryCode: 'US'
  }
];

export const getIncentives = (countryCode: string, regionCode?: string) => {
  return incentives.filter(i => 
    i.countryCode === countryCode && 
    (!i.regionCode || i.regionCode === regionCode)
  );
};
