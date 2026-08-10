export interface IndiaTariff {
  id: string;
  utilityName: string;
  state: string;
  consumerCategory: 'Residential' | 'Commercial' | 'Industrial';
  slabs?: { from: number; to: number; rate: number }[];
  flatRate?: number;
  fixedCharges?: number;
  effectiveDate?: string;
  source: string;
  sourceUrl: string;
}

export const indiaTariffs: IndiaTariff[] = [
  {
    id: 'maha-vitaran-res',
    utilityName: 'MSEDCL (Mahavitaran)',
    state: 'MH',
    consumerCategory: 'Residential',
    slabs: [
      { from: 0, to: 100, rate: 5.58 },
      { from: 101, to: 300, rate: 10.40 },
      { from: 301, to: 500, rate: 14.68 },
      { from: 501, to: 10000, rate: 16.51 }
    ],
    fixedCharges: 116,
    source: 'MERC',
    sourceUrl: 'https://www.mahadiscom.in/en/consumer-tariffs/',
    effectiveDate: '2024-04-01'
  }
];

export const getIndiaTariff = (stateCode: string, category: 'Residential' | 'Commercial' = 'Residential') => {
  return indiaTariffs.find(t => t.state === stateCode && t.consumerCategory === category);
};
