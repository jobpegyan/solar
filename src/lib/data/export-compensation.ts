import { z } from 'zod';

export const ExportCompensationType = z.enum([
  'Retail Rate',
  'Avoided Cost',
  'Fixed Export Rate',
  'User Entered',
  'Unknown'
]);

export type ExportCompensationType = z.infer<typeof ExportCompensationType>;

export interface ExportCompensation {
  countryCode: string;
  regionCode?: string;
  exportCompensationType: ExportCompensationType;
  exportRate?: number;
  retailRatePercentage?: number;
  creditExpiration?: string;
  source: string;
  lastUpdated: string;
}

export const exportPolicies: ExportCompensation[] = [
  {
    countryCode: 'US',
    regionCode: 'CA',
    exportCompensationType: 'Avoided Cost', // NEM 3.0
    source: 'CPUC',
    lastUpdated: '2024-01-01'
  },
  {
    countryCode: 'US',
    regionCode: 'TX',
    exportCompensationType: 'Fixed Export Rate',
    source: 'Utility Specific',
    lastUpdated: '2024-01-01'
  }
];

export const getExportPolicy = (countryCode: string, regionCode?: string) => {
  return exportPolicies.find(p => p.countryCode === countryCode && p.regionCode === regionCode);
};
