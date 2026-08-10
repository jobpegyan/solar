export interface IndiaSubsidy {
  id: string;
  programName: string;
  state?: string; // Optional for central programs
  capacityRange: { min: number; max: number };
  amount: number; // Flat amount or per kW
  amountType: 'flat' | 'per-kw';
  eligibility: string;
  source: string;
  sourceUrl: string;
  lastUpdated: string;
}

export const indiaSubsidies: IndiaSubsidy[] = [
  {
    id: 'pm-surya-ghar-1',
    programName: 'PM Surya Ghar: Muft Bijli Yojana',
    capacityRange: { min: 0, max: 2 },
    amount: 30000,
    amountType: 'per-kw',
    eligibility: 'Residential households up to 2kW',
    source: 'Ministry of New and Renewable Energy',
    sourceUrl: 'https://pmsuryaghar.gov.in/',
    lastUpdated: '2024-02-15'
  },
  {
    id: 'pm-surya-ghar-2',
    programName: 'PM Surya Ghar: Muft Bijli Yojana (Additional)',
    capacityRange: { min: 2, max: 3 },
    amount: 18000,
    amountType: 'per-kw',
    eligibility: 'Additional subsidy for 3rd kW',
    source: 'MNRE',
    sourceUrl: 'https://pmsuryaghar.gov.in/',
    lastUpdated: '2024-02-15'
  }
];

export const calculateIndiaSubsidy = (systemSizeKW: number) => {
  let totalSubsidy = 0;
  
  if (systemSizeKW <= 2) {
    totalSubsidy = systemSizeKW * 30000;
  } else if (systemSizeKW <= 3) {
    totalSubsidy = (2 * 30000) + ((systemSizeKW - 2) * 18000);
  } else {
    totalSubsidy = 78000; // Capped at 3kW for residential central subsidy
  }
  
  return totalSubsidy;
};
