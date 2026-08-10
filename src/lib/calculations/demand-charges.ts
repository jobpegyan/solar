import { estimateDemandSavings } from './commercial-solar';

export interface DemandChargeInput {
  peakDemandKw: number;
  demandChargeRate: number; // e.g., $15/kW
  solarCapacityKw: number;
  coincidentalFactor?: number;
}

export const calculateDemandChargeSavings = (input: DemandChargeInput) => {
  const { peakDemandKw, demandChargeRate, solarCapacityKw, coincidentalFactor = 0.3 } = input;
  
  const savings = estimateDemandSavings(solarCapacityKw, peakDemandKw, demandChargeRate, coincidentalFactor);
  
  return {
    beforeSolar: peakDemandKw * demandChargeRate,
    afterSolar: (peakDemandKw - savings.demandReductionKw) * demandChargeRate,
    monthlySavings: savings.monthlySavings,
    annualSavings: savings.annualSavings,
    reductionKw: savings.demandReductionKw
  };
};
