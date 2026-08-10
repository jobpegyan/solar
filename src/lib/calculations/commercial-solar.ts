// Commercial Solar Calculation Types
export interface SolarPricing {
  costPerWatt: number;
  installationCost: number;
}


export interface CommercialLoadProfile {
  morning: number;   // 6 AM - 12 PM
  afternoon: number; // 12 PM - 6 PM
  evening: number;   // 6 PM - 12 AM
  night: number;     // 12 AM - 6 AM
}

export interface CommercialSystemSizingInput {
  annualConsumptionKwh: number;
  location: {
    lat: number;
    lng: number;
    sunHoursPerDay: number;
  };
  peakDemandKw?: number;
  propertyType: string;
  installationType: 'rooftop' | 'ground' | 'carport' | 'mixed';
  dcAcRatio: number;
  deratingFactor: number;
}

export interface CommercialFinancialInput {
  systemSizeKw: number;
  costPerWatt: number;
  incentives: number;
  electricityRate: number;
  demandChargeSavings?: number;
  maintenanceCostPerKw: number;
  inflationRate: number;
  discountRate: number;
  projectionYears: number;
}

/**
 * Calculates recommended commercial system size range
 */
export const calculateCommercialSystemSize = (input: CommercialSystemSizingInput) => {
  const { annualConsumptionKwh, location, dcAcRatio, deratingFactor } = input;
  
  // Basic sizing: Target 100% offset of annual consumption
  // Size (kW) = Annual Energy (kWh) / (Sun Hours * 365 * PR)
  const baseSizeKw = annualConsumptionKwh / (location.sunHoursPerDay * 365 * deratingFactor);
  
  // Recommend a range around the base size
  const minSizeKw = Math.max(1, baseSizeKw * 0.8);
  const maxSizeKw = baseSizeKw * 1.2;
  const recommendedKw = baseSizeKw;

  // Inverter AC sizing based on DC/AC ratio
  const inverterAcKw = recommendedKw / dcAcRatio;

  return {
    recommendedKw: Math.round(recommendedKw * 10) / 10,
    range: {
      min: Math.round(minSizeKw * 10) / 10,
      max: Math.round(maxSizeKw * 10) / 10
    },
    inverterAcKw: Math.round(inverterAcKw * 10) / 10,
    dcAcRatio
  };
};

/**
 * Estimates required area for commercial systems
 */
export const calculateCommercialArea = (systemSizeKw: number, type: 'rooftop' | 'ground' | 'carport', panelEfficiency = 0.20) => {
  // Typical solar power density: ~200W per sq meter (20% efficient panels)
  // Area = Power / Density
  // Adjust for spacing/setbacks based on type
  const density = 0.20; // 0.2 kW per sqm
  let areaFactor = 1.2; // 20% extra for walkways/spacing on roofs
  
  if (type === 'ground') areaFactor = 2.5; // Significant spacing for row shading/access
  if (type === 'carport') areaFactor = 1.3;

  const netAreaSqm = systemSizeKw / density;
  const grossAreaSqm = netAreaSqm * areaFactor;

  return {
    sqm: Math.ceil(grossAreaSqm),
    sqft: Math.ceil(grossAreaSqm * 10.764)
  };
};

/**
 * Simplified Demand Charge Savings Estimation
 * This is a planning estimate only. Actual demand savings require interval data.
 */
export const estimateDemandSavings = (systemSizeKw: number, peakDemandKw: number, demandCharge: number, coincidentalFactor = 0.3) => {
  // Solar usually only shaves demand by a fraction of its peak capacity 
  // because peak demand may happen when sun is low or cloudy.
  const demandReductionKw = Math.min(peakDemandKw, systemSizeKw * coincidentalFactor);
  const monthlySavings = demandReductionKw * demandCharge;
  
  return {
    demandReductionKw: Math.round(demandReductionKw * 10) / 10,
    monthlySavings: Math.round(monthlySavings * 100) / 100,
    annualSavings: Math.round(monthlySavings * 12 * 100) / 100
  };
};
