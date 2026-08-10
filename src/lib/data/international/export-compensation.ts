export type ExportCompensationType = 
  | 'Net Metering' 
  | 'Net Billing' 
  | 'Feed-in Tariff' 
  | 'Fixed Rate' 
  | 'User Defined' 
  | 'Unknown';

export interface ExportCompensationData {
  countryCode: string;
  regionCode?: string;
  utilityName?: string;
  type: ExportCompensationType;
  rate?: number;
  retailRatePercentage?: number;
  creditMechanism?: string;
  source?: string;
  sourceUrl?: string;
  lastUpdated: string;
}

export const globalExportCompensation: ExportCompensationData[] = [];

export const getExportCompensation = (countryCode: string, regionCode?: string): ExportCompensationData | null => {
  return null;
};
